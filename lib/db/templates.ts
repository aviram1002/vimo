import { createServerSupabaseClient } from '@/lib/auth/server'
import { createAdminClient } from '@/lib/supabase/client'
import type { Template } from '@/lib/supabase/types'

// Public: get all active templates
export async function getTemplates(category?: string): Promise<Template[]> {
  const supabase = createServerSupabaseClient()
  let query = supabase
    .from('templates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// Admin: get ALL templates (including inactive)
export async function adminGetAllTemplates(): Promise<Template[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

// Admin: create template
export async function adminCreateTemplate(
  payload: Omit<Template, 'id' | 'created_at' | 'updated_at'>
): Promise<Template> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('templates')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

// Admin: update template
export async function adminUpdateTemplate(
  id: string,
  payload: Partial<Template>
): Promise<Template> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('templates')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Admin: delete template
export async function adminDeleteTemplate(id: string): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.from('templates').delete().eq('id', id)
  if (error) throw error
}
