/**
 * Resolves the API base URL for backend requests.
 *
 * Production (Vercel etc.):
 *   - Set BACKEND_URL on the host (for Next.js rewrites) + optional NEXT_PUBLIC_API_URL
 *   - If NEXT_PUBLIC_API_URL is missing or still localhost, uses same-origin `/api/backend` proxy
 *
 * Local dev:
 *   - Defaults to http://localhost:4000
 */
export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  if (envUrl && !isLocalhost(envUrl)) {
    return envUrl.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    const { hostname } = window.location
    if (!isLocalhost(hostname)) {
      return ''
    }
  }

  return envUrl?.replace(/\/$/, '') || 'http://localhost:4000'
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return ''
}

/** Build full URL for an API path like `/api/onboarding/status` */
export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = getApiBaseUrl()

  if (!base) {
    const subPath = normalized.replace(/^\/api\//, '')
    return `/api/backend/${subPath}`
  }

  return `${base}${normalized}`
}

function isLocalhost(value: string): boolean {
  return (
    value.includes('localhost') ||
    value.includes('127.0.0.1') ||
    value === '::1'
  )
}
