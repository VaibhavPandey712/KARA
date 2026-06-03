'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/**
 * Inner component that reads search params and handles the OAuth callback.
 * Wrapped in Suspense because useSearchParams() requires it in Next.js.
 */
function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function handleAuth() {
      // 1. Check if we already have an active session
      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return

      if (session) {
        router.replace('/onboarding')
        return
      }

      // 2. Check for error description or error in query parameters
      const oauthError = searchParams.get('error_description') || searchParams.get('error')
      if (oauthError) {
        console.error('OAuth error from redirect:', oauthError)
        setError(oauthError)
        setTimeout(() => {
          if (!cancelled) router.replace('/auth')
        }, 5000)
        return
      }

      // 3. Handle PKCE Flow (authorization code in query params)
      const code = searchParams.get('code')
      if (code) {
        try {
          const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
          if (cancelled) return

          if (sessionError) {
            throw sessionError
          }

          router.replace('/onboarding')
          return
        } catch (err: any) {
          console.error('Auth callback failed:', err)
          setError(err.message || 'Authentication failed. Please try again.')
          setTimeout(() => {
            if (!cancelled) router.replace('/auth')
          }, 5000)
          return
        }
      }

      // 4. Handle Implicit Flow (tokens in hash fragment e.g., #access_token=...)
      if (typeof window !== 'undefined' && window.location.hash) {
        const hash = window.location.hash
        if (hash.includes('access_token=') || hash.includes('error=')) {
          // Listen to the auth state change; Supabase client automatically processes the hash fragment
          const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
              subscription.unsubscribe()
              router.replace('/onboarding')
            }
          })

          // Fallback timeout in case the hash fragment processing fails or hangs
          setTimeout(() => {
            subscription.unsubscribe()
            supabase.auth.getSession().then(({ data: { session } }) => {
              if (session) {
                router.replace('/onboarding')
              } else {
                router.replace('/auth')
              }
            })
          }, 5000)
          return
        }
      }

      // 5. No code, no hash fragment, no session -> redirect to /auth
      router.replace('/auth')
    }

    handleAuth()

    return () => {
      cancelled = true
    }
  }, [router, searchParams])

  if (error) {
    return (
      <div className="auth-page">
        <div style={{ color: 'var(--color-danger, #ef4444)', fontSize: '14px', textAlign: 'center' }}>
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="auth-page">
      <div style={{ color: 'var(--color-ink-3)', fontSize: '14px' }}>Signing you in...</div>
    </div>
  )
}

/** OAuth callback page — wraps the handler in Suspense for useSearchParams() */
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="auth-page">
        <div style={{ color: 'var(--color-ink-3)', fontSize: '14px' }}>Loading...</div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  )
}
