import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Lazy initialization to prevent build errors when env vars are missing
let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

// Client-side Supabase (uses anon key, respects RLS)
export const getSupabase = (): SupabaseClient => {
  if (!_supabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase URL and Anon Key are required. Please configure your .env.local file.')
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

// Server-side Supabase Admin (uses service_role key, bypasses RLS)
export const getSupabaseAdmin = (): SupabaseClient => {
  if (!_supabaseAdmin) {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Supabase URL and Service Role Key are required for admin operations.')
    }
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return _supabaseAdmin
}

// Legacy export for backward compatibility (will throw if env vars missing)
export const supabase = {
  get storage() { return getSupabase().storage },
  from: (table: string) => getSupabase().from(table),
}

// Admin client export for server-side operations (bypasses RLS)
export const supabaseAdmin = {
  get storage() { return getSupabaseAdmin().storage },
  from: (table: string) => getSupabaseAdmin().from(table),
}

// Types for career applications
export interface CareerApplication {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  position: string
  applicant_type: string
  experience: string
  cover_letter: string
  cv_file_url?: string
  cv_file_name?: string
  status?: string
  created_at?: string
  updated_at?: string
}
