/**
 * Returns the base URL for backend API requests.
 *
 * - In production: uses NEXT_PUBLIC_API_URL or falls back to same-origin proxy
 * - In local dev: defaults to http://localhost:4000
 */
export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  // If a non-localhost URL is configured, use it directly
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/$/, '')
  }

  // In the browser on a deployed domain, use same-origin proxy
  if (typeof window !== 'undefined') {
    const { hostname } = window.location
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return ''
    }
  }

  // Local dev fallback
  return envUrl?.replace(/\/$/, '') || 'http://localhost:4000'
}

/** Build full URL for an API path like `/api/onboarding/status` */
export function apiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  const base = getApiBaseUrl()

  // On deployed environments with no explicit API URL, proxy through Next.js rewrites
  if (!base) {
    const subPath = normalized.replace(/^\/api\//, '')
    return `/api/backend/${subPath}`
  }

  return `${base}${normalized}`
}

/** Returns the current site origin for OAuth redirect URLs */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}
