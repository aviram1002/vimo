import { createAdminClient } from '@/lib/supabase/client'
import type { Profile } from '@/lib/supabase/types'

// Get all customers with their event counts
export async function adminGetCustomers() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      events:events(count)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

// Get platform-wide stats
export async function adminGetStats() {
  const supabase = createAdminClient()

  const [
    { count: totalUsers },
    { count: totalEvents },
    { count: proUsers },
    { count: totalGuests },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).neq('plan', 'free'),
    supabase.from('guests').select('*', { count: 'exact', head: true }),
  ])

  return {
    totalUsers:   totalUsers  ?? 0,
    totalEvents:  totalEvents ?? 0,
    proUsers:     proUsers    ?? 0,
    totalGuests:  totalGuests ?? 0,
  }
}

// Update customer plan
export async function adminUpdateCustomerPlan(
  userId: string,
  plan: Profile['plan'],
  expiresAt?: string
): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('profiles')
    .update({ plan, plan_expires_at: expiresAt ?? null })
    .eq('id', userId)

  if (error) throw error
}

// Get recent signups (last 30 days)
export async function adminGetRecentSignups() {
  const supabase = createAdminClient()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data ?? []
}
