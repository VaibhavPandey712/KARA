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
    const code = searchParams.get('code')

    if (!code) {
      router.replace('/auth')
      return
    }

    async function handleCallback(code: string) {
      try {
        const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

        if (sessionError) {
          throw new Error(sessionError.message)
        }

        router.replace('/onboarding')
      } catch (err) {
        console.error('Auth callback failed:', err)
        setError('Authentication failed. Please try again.')
        setTimeout(() => router.replace('/auth'), 2000)
      }
    }

    handleCallback(code)
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
