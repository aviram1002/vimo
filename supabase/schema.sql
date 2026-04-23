-- =====================================================
-- VIMO DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── PROFILES (extends Supabase auth.users) ──────────
CREATE TABLE public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email       TEXT NOT NULL,
  full_name   TEXT,
  avatar_url  TEXT,
  plan        TEXT DEFAULT 'free' CHECK (plan IN ('free','pro','business')),
  plan_expires_at TIMESTAMPTZ,
  is_admin    BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── TEMPLATES ────────────────────────────────────────
CREATE TABLE public.templates (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  name_he     TEXT NOT NULL,
  category    TEXT NOT NULL CHECK (category IN ('wedding','birthday','business','party','bar-mitzvah','other')),
  preview_css TEXT NOT NULL,          -- CSS gradient or image URL
  thumbnail_url TEXT,
  is_premium  BOOLEAN DEFAULT FALSE,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  tags        TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── EVENTS ───────────────────────────────────────────
CREATE TABLE public.events (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  template_id  UUID REFERENCES public.templates(id),
  name         TEXT NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('wedding','birthday','business','party','bar-mitzvah','other')),
  date         DATE NOT NULL,
  time         TEXT,
  venue        TEXT,
  address      TEXT,
  emoji        TEXT DEFAULT '🎉',
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','completed','archived')),
  slug         TEXT UNIQUE,
  -- Invitation design JSON
  design       JSONB DEFAULT '{}',
  -- Counts (denormalized for performance)
  total_invited    INTEGER DEFAULT 0,
  rsvp_confirmed   INTEGER DEFAULT 0,
  rsvp_declined    INTEGER DEFAULT 0,
  rsvp_pending     INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-generate slug
CREATE OR REPLACE FUNCTION generate_event_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  base_slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9\u0590-\u05FF]', '-', 'g'));
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  base_slug := base_slug || '-' || to_char(NEW.date, 'YYYY');
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.events WHERE slug = final_slug AND id != NEW.id) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_event_slug
  BEFORE INSERT ON public.events
  FOR EACH ROW
  WHEN (NEW.slug IS NULL)
  EXECUTE FUNCTION generate_event_slug();

-- ─── GUESTS ───────────────────────────────────────────
CREATE TABLE public.guests (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id   UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  name       TEXT NOT NULL,
  phone      TEXT,
  email      TEXT,
  group_name TEXT DEFAULT 'כללי',
  status     TEXT DEFAULT 'pending' CHECK (status IN ('coming','not-coming','maybe','pending')),
  count      INTEGER DEFAULT 1,
  message    TEXT,
  rsvp_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update event counts when guest status changes
CREATE OR REPLACE FUNCTION update_event_counts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.events SET
    total_invited  = (SELECT COUNT(*) FROM public.guests WHERE event_id = COALESCE(NEW.event_id, OLD.event_id)),
    rsvp_confirmed = (SELECT COALESCE(SUM(count),0) FROM public.guests WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) AND status = 'coming'),
    rsvp_declined  = (SELECT COUNT(*) FROM public.guests WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) AND status = 'not-coming'),
    rsvp_pending   = (SELECT COUNT(*) FROM public.guests WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) AND status IN ('pending','maybe')),
    updated_at     = NOW()
  WHERE id = COALESCE(NEW.event_id, OLD.event_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_guest_change
  AFTER INSERT OR UPDATE OR DELETE ON public.guests
  FOR EACH ROW EXECUTE FUNCTION update_event_counts();

-- ─── SUBSCRIPTIONS ────────────────────────────────────
CREATE TABLE public.subscriptions (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan            TEXT NOT NULL CHECK (plan IN ('pro','business')),
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','cancelled','expired')),
  amount          INTEGER NOT NULL,  -- in agorot (₪99 = 9900)
  currency        TEXT DEFAULT 'ILS',
  payment_method  TEXT,
  starts_at       TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── ROW LEVEL SECURITY ───────────────────────────────
ALTER TABLE public.profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: users see only their own
CREATE POLICY "Users see own profile"
  ON public.profiles FOR ALL
  USING (auth.uid() = id);

-- Events: users see only their own
CREATE POLICY "Users manage own events"
  ON public.events FOR ALL
  USING (auth.uid() = user_id);

-- Public RSVP: anyone can read a published event by slug
CREATE POLICY "Public can read published events"
  ON public.events FOR SELECT
  USING (status = 'published');

-- Guests: event owner manages guests
CREATE POLICY "Event owner manages guests"
  ON public.guests FOR ALL
  USING (
    auth.uid() = (SELECT user_id FROM public.events WHERE id = event_id)
  );

-- Public RSVP: anyone can insert/update their own guest record
CREATE POLICY "Public can rsvp"
  ON public.guests FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.events WHERE id = event_id AND status = 'published')
  );

-- Templates: everyone can read active ones
CREATE POLICY "Anyone can read active templates"
  ON public.templates FOR SELECT
  USING (is_active = TRUE);

-- Templates: only admins can modify
CREATE POLICY "Admins manage templates"
  ON public.templates FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Admin: full access to everything
CREATE POLICY "Admins see all profiles"
  ON public.profiles FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins see all events"
  ON public.events FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins see all subscriptions"
  ON public.subscriptions FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- ─── SEED: Default templates ──────────────────────────
INSERT INTO public.templates (name, name_he, category, preview_css, is_premium, sort_order, tags) VALUES
  ('classic-elegance',   'אלגנטיות קלאסית',    'wedding',     'linear-gradient(160deg,#fdf6ff,#f0eeff)', TRUE,  1, ARRAY['חתונה','נקי','פרמיום']),
  ('colorful-party',     'חגיגת צבעים',         'birthday',    'linear-gradient(160deg,#fff0f8,#ffe0f0)', FALSE, 2, ARRAY['יום הולדת','צבעוני']),
  ('urban-minimal',      'מינימליזם אורבני',    'business',    'linear-gradient(160deg,#0f0f1a,#1a1a2e)', FALSE, 3, ARRAY['עסקי','מודרני']),
  ('golden-gala',        'ערב גאלה יוקרתי',     'wedding',     'linear-gradient(160deg,#fef9f0,#fff3e0)', TRUE,  4, ARRAY['יוקרה','זהב','פרמיום']),
  ('fresh-clean',        'נקי ורענן',            'bar-mitzvah', 'linear-gradient(160deg,#e0f7fa,#b2ebf2)', FALSE, 5, ARRAY['ברית','מסורתי']),
  ('floral-soft',        'פרחים עדינים',         'birthday',    'linear-gradient(160deg,#f3e5f5,#e1bee7)', FALSE, 6, ARRAY['נשי','פרחים']),
  ('night-paris',        'לילה בפריז',           'party',       'linear-gradient(160deg,#1a1a2e,#e94560)', TRUE,  7, ARRAY['מסיבה','יוקרה','פרמיום']),
  ('gradient-life',      'גרדיאנט חיים',         'birthday',    'linear-gradient(135deg,#6C3BFF,#3BD1C6)', FALSE, 8, ARRAY['מודרני','טרנדי']);
