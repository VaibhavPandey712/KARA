import { Router } from 'express'
import { AuthRequest, requireAuth } from '../middleware/auth'
import { getDbClient } from '../lib/supabase'

const router = Router()

router.get('/status', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!
    const supabase = getDbClient(req.accessToken!)

    const { count, error: countError } = await supabase
      .from('creator_audits')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (countError) {
      return res.status(500).json({ error: countError.message })
    }

    const hasAudit = (count ?? 0) >= 1

    if (hasAudit) {
      await supabase
        .from('profiles')
        .update({ audit_used: true })
        .eq('id', user.id)
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      const { error: insertError } = await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        full_name: (user.user_metadata?.full_name as string) ?? '',
        avatar_url: (user.user_metadata?.avatar_url as string) ?? '',
        audit_used: false,
      })
      if (insertError) {
        return res.status(500).json({ error: insertError.message })
      }
    }

    res.json({ hasAudit, user })
  } catch (err) {
    console.error('GET /status error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/submit', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!
    const supabase = getDbClient(req.accessToken!)
    const {
      name,
      platform,
      profileLink,
      niche,
      problems,
      goals,
      helpNeeded,
      contact,
      contactType,
      specificNote,
      igConnected,
      ytConnected,
      ttConnected,
      liConnected,
    } = req.body

    const { count } = await supabase
      .from('creator_audits')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    if (count && count >= 1) {
      return res.status(409).json({ error: 'Audit already submitted', hasAudit: true })
    }

    const { error: insertError } = await supabase
      .from('creator_audits')
      .insert({
        user_id: user.id,
        name: name?.trim(),
        platform,
        profile_link: profileLink?.trim(),
        niche,
        biggest_problems: problems,
        goals,
        help_needed: helpNeeded,
        contact_detail: contact?.trim(),
        contact_type: contactType,
        specific_note: specificNote?.trim(),
        social_ig_requested: igConnected ?? false,
        social_yt_requested: ytConnected ?? false,
        social_tt_requested: ttConnected ?? false,
        social_li_requested: liConnected ?? false,
      })

    if (insertError) {
      return res.status(500).json({ error: insertError.message })
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ audit_used: true })
      .eq('id', user.id)

    if (updateError) {
      console.warn('audit_used update failed:', updateError.message)
    }

    res.json({ success: true })
  } catch (err) {
    console.error('POST /submit error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
