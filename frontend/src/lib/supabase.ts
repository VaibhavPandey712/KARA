import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

/** Returns the singleton Supabase browser client, created on first access. */
export function getSupabase(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    _client = createClient(url, key)
  }
  return _client
}

/**
 * Convenience alias — use this in client components.
 * Kept as a getter so the client isn't created at module-load time
 * (which breaks Next.js static prerendering when env vars aren't available).
 */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop: string) {
    return (getSupabase() as unknown as Record<string, unknown>)[prop]
  },
})
