import { supabase } from './supabase'
import { getOnboardingStatus } from './api'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Handles the "Get Free Audit" button click across the app.
 * - If not signed in → redirect to /auth
 * - If already submitted an audit → redirect to /plans
 * - Otherwise → redirect to /onboarding
 */
export async function handleAuditClick(router: AppRouterInstance) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    router.push('/auth')
    return
  }

  const { hasAudit } = await getOnboardingStatus()
  router.push(hasAudit ? '/plans' : '/onboarding')
}
