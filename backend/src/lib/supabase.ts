import { createClient, SupabaseClient } from '@supabase/supabase-js'

function getConfig() {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  return { url, anonKey, serviceKey }
}

export function validateEnv() {
  const { url, anonKey } = getConfig()
  const missing: string[] = []
  if (!url) missing.push('SUPABASE_URL')
  if (!anonKey) {
    missing.push('SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)')
  }
  if (missing.length) {
    throw new Error(
      `Missing backend env: ${missing.join(', ')}. Copy backend/.env.example to backend/.env.`
    )
  }
}

function createAdminClient(): SupabaseClient | null {
  const { url, serviceKey } = getConfig()
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey)
}

export function createUserClient(accessToken: string): SupabaseClient {
  const { url, anonKey } = getConfig()
  if (!url || !anonKey) {
    throw new Error('Supabase is not configured')
  }
  return createClient(url, anonKey, {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  })
}

export function getDbClient(accessToken: string): SupabaseClient {
  return createAdminClient() ?? createUserClient(accessToken)
}
