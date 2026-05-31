import { supabase } from './supabase'
import { getOnboardingStatus, submitOnboarding } from './api'
import type { User } from '@supabase/supabase-js'
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

async function ensureProfile(user: User) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!profile) {
    await supabase.from('profiles').insert({
      id: user.id,
      email: user.email,
      full_name: (user.user_metadata?.full_name as string) ?? '',
      avatar_url: (user.user_metadata?.avatar_url as string) ?? '',
      audit_used: false,
    })
  }
}

async function checkOnboardingStatusDirect(user: User): Promise<{ hasAudit: boolean }> {
  const { count, error: countError } = await supabase
    .from('creator_audits')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (countError) throw countError

  const hasAudit = (count ?? 0) >= 1

  if (hasAudit) {
    await supabase.from('profiles').update({ audit_used: true }).eq('id', user.id)
  } else {
    await ensureProfile(user)
  }

  return { hasAudit }
}

export async function checkOnboardingStatus(user: User): Promise<{ hasAudit: boolean }> {
  try {
    const result = await getOnboardingStatus()
    return { hasAudit: result.hasAudit }
  } catch {
    return checkOnboardingStatusDirect(user)
  }
}

async function submitAuditDirect(userId: string, data: AuditFormData) {
  const { count } = await supabase
    .from('creator_audits')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (count && count >= 1) {
    throw new Error('Audit already submitted')
  }

  const { error: insertError } = await supabase.from('creator_audits').insert({
    user_id: userId,
    name: data.name.trim(),
    platform: data.platform,
    profile_link: data.profileLink.trim(),
    niche: data.niche,
    biggest_problems: data.problems,
    goals: data.goals,
    help_needed: data.helpNeeded,
    contact_detail: data.contact.trim(),
    contact_type: data.contactType,
    specific_note: data.specificNote.trim(),
    social_ig_requested: data.igConnected,
    social_yt_requested: data.ytConnected,
    social_tt_requested: data.ttConnected,
    social_li_requested: data.liConnected,
  })

  if (insertError) throw insertError

  await supabase.from('profiles').update({ audit_used: true }).eq('id', userId)
}

export async function submitAuditForm(userId: string, data: AuditFormData) {
  try {
    await submitOnboarding(data)
  } catch {
    await submitAuditDirect(userId, data)
  }
}

export async function handleAuditClick(router: AppRouterInstance) {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session?.user) {
    router.push('/auth')
    return
  }

  const { hasAudit } = await checkOnboardingStatus(session.user)
  router.push(hasAudit ? '/plans' : '/onboarding')
}
