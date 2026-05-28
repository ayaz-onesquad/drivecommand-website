import 'server-only'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

let _supabaseAdmin: SupabaseClient | null = null

/**
 * Get the server-only Supabase admin client with service role key.
 * Returns null if env vars are not configured (allows site to run without Supabase).
 * Has full database access - never expose to client.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  }
  return _supabaseAdmin
}
