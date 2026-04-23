import { createServerSupabaseClient } from '@/lib/auth/server'
import type { Guest } from '@/lib/supabase/types'

export async function getEventGuests(eventId: string): Promise<Guest[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function addGuest(
  payload: Omit<Guest, 'id' | 'created_at' | 'updated_at' | 'rsvp_at'>
): Promise<Guest> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('guests')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateGuestStatus(
  guestId: string,
  status: Guest['status'],
  message?: string
): Promise<Guest> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('guests')
    .update({
      status,
      message,
      rsvp_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', guestId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteGuest(guestId: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from('guests').delete().eq('id', guestId)
  if (error) throw error
}

// Bulk import guests from array
export async function bulkAddGuests(
  eventId: string,
  guests: Array<{ name: string; phone?: string; group_name?: string }>
): Promise<Guest[]> {
  const supabase = createServerSupabaseClient()
  const payload = guests.map((g) => ({
    event_id: eventId,
    name: g.name,
    phone: g.phone ?? null,
    group_name: g.group_name ?? 'כללי',
    status: 'pending' as const,
    count: 1,
  }))

  const { data, error } = await supabase
    .from('guests')
    .insert(payload)
    .select()

  if (error) throw error
  return data ?? []
}
