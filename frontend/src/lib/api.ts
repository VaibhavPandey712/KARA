import { apiUrl } from './config'
import { supabase } from './supabase'

async function getAuthHeaders(): Promise<HeadersInit> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.access_token) {
    throw new Error('Not authenticated')
  }
  return {
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  }
}

export async function getOnboardingStatus() {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/onboarding/status'), { headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? 'Failed to fetch onboarding status')
  }
  return res.json() as Promise<{ hasAudit: boolean; user: unknown }>
}

export async function submitOnboarding(data: {
  name: string
  platform: string
  profileLink: string
  niche: string
  problems: string[]
  goals: string[]
  helpNeeded: string[]
  contact: string
  contactType: string
  specificNote: string
  igConnected: boolean
  ytConnected: boolean
  ttConnected: boolean
  liConnected: boolean
}) {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/onboarding/submit'), {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'Failed to submit onboarding')
  }
  return body
}
