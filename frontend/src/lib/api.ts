import { apiUrl } from './config'
import { supabase } from './supabase'

// ── Helpers ──────────────────────────────────────────────────────────

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

// ── Auth ─────────────────────────────────────────────────────────────

/** Exchange an OAuth authorization code for session tokens via the backend */
export async function exchangeOAuthCode(code: string): Promise<{
  access_token: string
  refresh_token: string
}> {
  const res = await fetch(apiUrl(`/api/auth/callback?code=${encodeURIComponent(code)}`))
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'OAuth code exchange failed')
  }
  return body
}

// ── Onboarding ───────────────────────────────────────────────────────

export async function getOnboardingStatus(): Promise<{ hasAudit: boolean; user: unknown }> {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/onboarding/status'), { headers })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? 'Failed to fetch onboarding status')
  }
  return res.json()
}

export interface AuditFormData {
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
}

export async function submitOnboarding(data: AuditFormData) {
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

// ── Brand Collaborations ─────────────────────────────────────────

export interface BrandCollabFormData {
  brandTypes: string[]
  collabTypes: string[]
  promoteUnused: string
  contactDetail: string
  dreamBrands: string
}

export async function submitBrandCollab(data: BrandCollabFormData) {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/collab/submit'), {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'Failed to submit collaboration request')
  }
  return body
}

// ── Admin ────────────────────────────────────────────────────────────

export interface AdminStats {
  totalUsers: number
  totalCollabs: number
  pendingCollabs: number
  inProgressCollabs: number
  completedCollabs: number
  totalAudits: number
  collabsThisWeek: number
}

export interface AdminCollabRequest {
  id: string
  user_id: string
  brand_types: string[]
  collab_types: string[]
  promote_unused: string | null
  contact_detail: string | null
  dream_brands: string | null
  status: 'pending' | 'in-progress' | 'completed'
  created_at: string
  profile: {
    id: string
    email: string
    full_name: string | null
    avatar_url: string | null
  } | null
  audit: {
    id: string
    user_id: string
    name: string
    platform: string
    profile_link: string
    niche: string
    biggest_problems: string[]
    goals: string[]
    help_needed: string[]
    contact_type: string
    specific_note: string
    ig_connected: boolean
    yt_connected: boolean
    tt_connected: boolean
    li_connected: boolean
    created_at: string
  } | null
}

export async function getAdminStats(): Promise<AdminStats> {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/admin/stats'), { headers })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'Failed to fetch admin stats')
  }
  return body
}

export async function getAdminCollabs(): Promise<AdminCollabRequest[]> {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl('/api/admin/collabs'), { headers })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'Failed to fetch admin collabs')
  }
  return body
}

export async function updateCollabStatus(id: string, status: 'pending' | 'in-progress' | 'completed'): Promise<{ success: boolean; status: string }> {
  const headers = await getAuthHeaders()
  const res = await fetch(apiUrl(`/api/admin/collabs/${id}/status`), {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ status }),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(body.error ?? 'Failed to update collab status')
  }
  return body
}
