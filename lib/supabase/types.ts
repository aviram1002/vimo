// Auto-generated types matching the Supabase schema
// Re-run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id:              string
          email:           string
          full_name:       string | null
          avatar_url:      string | null
          plan:            'free' | 'pro' | 'business'
          plan_expires_at: string | null
          is_admin:        boolean
          created_at:      string
          updated_at:      string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      templates: {
        Row: {
          id:           string
          name:         string
          name_he:      string
          category:     'wedding' | 'birthday' | 'business' | 'party' | 'bar-mitzvah' | 'other'
          preview_css:  string
          thumbnail_url:string | null
          is_premium:   boolean
          is_active:    boolean
          sort_order:   number
          tags:         string[]
          created_at:   string
          updated_at:   string
        }
        Insert: Omit<Database['public']['Tables']['templates']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['templates']['Insert']>
      }
      events: {
        Row: {
          id:             string
          user_id:        string
          template_id:    string | null
          name:           string
          type:           'wedding' | 'birthday' | 'business' | 'party' | 'bar-mitzvah' | 'other'
          date:           string
          time:           string | null
          venue:          string | null
          address:        string | null
          emoji:          string
          status:         'draft' | 'published' | 'completed' | 'archived'
          slug:           string | null
          design:         Json
          total_invited:  number
          rsvp_confirmed: number
          rsvp_declined:  number
          rsvp_pending:   number
          created_at:     string
          updated_at:     string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'slug' | 'total_invited' | 'rsvp_confirmed' | 'rsvp_declined' | 'rsvp_pending' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      guests: {
        Row: {
          id:         string
          event_id:   string
          name:       string
          phone:      string | null
          email:      string | null
          group_name: string
          status:     'coming' | 'not-coming' | 'maybe' | 'pending'
          count:      number
          message:    string | null
          rsvp_at:    string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['guests']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['guests']['Insert']>
      }
      subscriptions: {
        Row: {
          id:             string
          user_id:        string
          plan:           'pro' | 'business'
          status:         'active' | 'cancelled' | 'expired'
          amount:         number
          currency:       string
          payment_method: string | null
          starts_at:      string
          expires_at:     string | null
          created_at:     string
        }
        Insert: Omit<Database['public']['Tables']['subscriptions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['subscriptions']['Insert']>
      }
    }
  }
}

// Convenience types
export type Profile      = Database['public']['Tables']['profiles']['Row']
export type Template     = Database['public']['Tables']['templates']['Row']
export type VimoEvent    = Database['public']['Tables']['events']['Row']
export type Guest        = Database['public']['Tables']['guests']['Row']
export type Subscription = Database['public']['Tables']['subscriptions']['Row']
