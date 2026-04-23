// ─── Event ───────────────────────────────────────────────────
export type EventType = 'wedding' | 'birthday' | 'business' | 'party' | 'bar-mitzvah' | 'other'
export type EventStatus = 'draft' | 'published' | 'completed'

export interface VimoEvent {
  id: string
  name: string
  type: EventType
  date: string      // ISO date
  time: string      // e.g. "19:30"
  venue: string
  address?: string
  emoji: string
  coverGradient?: string
  status: EventStatus
  totalInvited: number
  rsvpConfirmed: number
  rsvpDeclined: number
  rsvpPending: number
  createdAt: string
  slug: string
}

// ─── Guest ───────────────────────────────────────────────────
export type GuestStatus = 'coming' | 'not-coming' | 'maybe' | 'pending'

export interface Guest {
  id: string
  name: string
  phone: string
  email?: string
  group: string
  status: GuestStatus
  count: number
  message?: string
  eventId: string
  createdAt: string
}

// ─── Template ────────────────────────────────────────────────
export type TemplateCategory = 'all' | 'wedding' | 'birthday' | 'business' | 'party' | 'bar-mitzvah'

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  preview: string       // CSS gradient or image URL
  isPremium: boolean
  description: string
  tags: string[]
}

// ─── Pricing ─────────────────────────────────────────────────
export interface PricingPlan {
  id: string
  name: string
  price: number
  period: 'month' | 'event'
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

// ─── Blog / Article ──────────────────────────────────────────
export interface Article {
  slug: string
  title: string
  description: string
  category: string
  date: string
  readTime: number
  image?: string
  content?: string
}
