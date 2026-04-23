import { createServerSupabaseClient } from '@/lib/auth/server'
import type { VimoEvent } from '@/lib/supabase/types'

// Get all events for current user
export async function getUserEvents(): Promise<VimoEvent[]> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) throw error
  return data ?? []
}

// Get single event by ID
export async function getEvent(id: string): Promise<VimoEvent | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

// Get event by slug (public - for RSVP page)
export async function getEventBySlug(slug: string): Promise<VimoEvent | null> {
  const supabase = createServerSupabaseClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

// Create new event
export async function createEvent(
  payload: Omit<VimoEvent, 'id' | 'slug' | 'user_id' | 'total_invited' | 'rsvp_confirmed' | 'rsvp_declined' | 'rsvp_pending' | 'created_at' | 'updated_at'>
): Promise<VimoEvent> {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('events')
    .insert({ ...payload, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

// Update event
export async function updateEvent(id: string, payload: Partial<VimoEvent>): Promise<VimoEvent> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from('events')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Delete event
export async function deleteEvent(id: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw error
}
