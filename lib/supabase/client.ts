import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (uses anon key + RLS)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side admin client (bypasses RLS — use only in API routes / server actions)
export function createAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient<Database>(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
