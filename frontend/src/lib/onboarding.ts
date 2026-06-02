import { supabase } from './supabase'
import { getOnboardingStatus, submitOnboarding } from './api'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

export type AuditFormData = {
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

export async function checkOnboardingStatus(): Promise<{ hasAudit: boolean }> {
  const result = await getOnboardingStatus()
  return { hasAudit: result.hasAudit }
}

export async function submitAuditForm(data: AuditFormData) {
  await submitOnboarding(data)
}

export async function handleAuditClick(router: AppRouterInstance) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    router.push('/auth')
    return
  }

  const { hasAudit } = await checkOnboardingStatus()
  router.push(hasAudit ? '/plans' : '/onboarding')
}
