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
          plan:            string
          plan_expires_at: string | null
          is_admin:        boolean
          created_at:      string
          updated_at:      string
        }
        Insert: {
          id:              string
          email:           string
          full_name?:      string | null
          avatar_url?:     string | null
          plan?:           string
          plan_expires_at?:string | null
          is_admin?:       boolean
        }
        Update: {
          email?:           string
          full_name?:       string | null
          avatar_url?:      string | null
          plan?:            string
          plan_expires_at?: string | null
          is_admin?:        boolean
        }
      }
      templates: {
        Row: {
          id:            string
          name:          string
          name_he:       string
          category:      string
          preview_css:   string
          thumbnail_url: string | null
          is_premium:    boolean
          is_active:     boolean
          sort_order:    number
          tags:          string[]
          created_at:    string
          updated_at:    string
        }
        Insert: {
          name:          string
          name_he:       string
          category:      string
          preview_css:   string
          thumbnail_url?:string | null
          is_premium?:   boolean
          is_active?:    boolean
          sort_order?:   number
          tags?:         string[]
        }
        Update: {
          name?:         string
          name_he?:      string
          category?:     string
          preview_css?:  string
          thumbnail_url?:string | null
          is_premium?:   boolean
          is_active?:    boolean
          sort_order?:   number
          tags?:         string[]
        }
      }
      events: {
        Row: {
          id:             string
          user_id:        string
          template_id:    string | null
          name:           string
          type:           string
          date:           string
          time:           string | null
          venue:          string | null
          address:        string | null
          emoji:          string
          status:         string
          slug:           string | null
          design:         Json
          total_invited:  number
          rsvp_confirmed: number
          rsvp_declined:  number
          rsvp_pending:   number
          created_at:     string
          updated_at:     string
        }
        Insert: {
          user_id:        string
          template_id?:   string | null
          name:           string
          type:           string
          date:           string
          time?:          string | null
          venue?:         string | null
          address?:       string | null
          emoji?:         string
          status?:        string
          design?:        Json
        }
        Update: {
          name?:          string
          type?:          string
          date?:          string
          time?:          string | null
          venue?:         string | null
          address?:       string | null
          emoji?:         string
          status?:        string
          design?:        Json
        }
      }
      guests: {
        Row: {
          id:         string
          event_id:   string
          name:       string
          phone:      string | null
          email:      string | null
          group_name: string
          status:     string
          count:      number
          message:    string | null
          rsvp_at:    string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          event_id:    string
          name:        string
          phone?:      string | null
          email?:      string | null
          group_name?: string
          status?:     string
          count?:      number
          message?:    string | null
        }
        Update: {
          name?:       string
          phone?:      string | null
          status?:     string
          count?:      number
          message?:    string | null
          rsvp_at?:    string | null
        }
      }
      subscriptions: {
        Row: {
          id:             string
          user_id:        string
          plan:           string
          status:         string
          amount:         number
          currency:       string
          payment_method: string | null
          starts_at:      string
          expires_at:     string | null
          created_at:     string
        }
        Insert: {
          user_id:         string
          plan:            string
          amount:          number
          status?:         string
          currency?:       string
          payment_method?: string | null
          expires_at?:     string | null
        }
        Update: {
          plan?:           string
          status?:         string
          expires_at?:     string | null
        }
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
