import { Router, Response } from 'express'
import { AuthRequest } from '../middleware/auth'
import { requireAdmin } from '../middleware/admin'
import { getDbClient } from '../lib/supabase'

const router = Router()

/* ── Dashboard Stats ──────────────────────────── */

router.get('/stats', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getDbClient(req.accessToken!)

    // Total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    // Total collabs
    const { count: totalCollabs } = await supabase
      .from('brand_collaborations')
      .select('*', { count: 'exact', head: true })

    // Pending collabs
    const { count: pendingCollabs } = await supabase
      .from('brand_collaborations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // In-progress collabs
    const { count: inProgressCollabs } = await supabase
      .from('brand_collaborations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'in-progress')

    // Completed collabs
    const { count: completedCollabs } = await supabase
      .from('brand_collaborations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'completed')

    // Total audits
    const { count: totalAudits } = await supabase
      .from('creator_audits')
      .select('*', { count: 'exact', head: true })

    // Collabs this week
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const { count: collabsThisWeek } = await supabase
      .from('brand_collaborations')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString())

    res.json({
      totalUsers: totalUsers ?? 0,
      totalCollabs: totalCollabs ?? 0,
      pendingCollabs: pendingCollabs ?? 0,
      inProgressCollabs: inProgressCollabs ?? 0,
      completedCollabs: completedCollabs ?? 0,
      totalAudits: totalAudits ?? 0,
      collabsThisWeek: collabsThisWeek ?? 0,
    })
  } catch (err) {
    console.error('GET /admin/stats error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/* ── List All Collabs (joined with audit + profile) ── */

router.get('/collabs', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const supabase = getDbClient(req.accessToken!)

    // Fetch all brand collaborations
    const { data: collabs, error: collabError } = await supabase
      .from('brand_collaborations')
      .select('*')
      .order('created_at', { ascending: false })

    if (collabError) {
      return res.status(500).json({ error: collabError.message })
    }

    if (!collabs || collabs.length === 0) {
      return res.json([])
    }

    // Get unique user IDs
    const userIds = [...new Set(collabs.map((c) => c.user_id))]

    // Fetch profiles for these users
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .in('id', userIds)

    // Fetch audits for these users
    const { data: audits } = await supabase
      .from('creator_audits')
      .select('*')
      .in('user_id', userIds)

    // Build lookup maps
    const profileMap = new Map(
      (profiles ?? []).map((p) => [p.id, p])
    )
    const auditMap = new Map(
      (audits ?? []).map((a) => [a.user_id, a])
    )

    // Join data
    const joined = collabs.map((collab) => ({
      ...collab,
      profile: profileMap.get(collab.user_id) ?? null,
      audit: auditMap.get(collab.user_id) ?? null,
    }))

    res.json(joined)
  } catch (err) {
    console.error('GET /admin/collabs error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/* ── Update Collab Status ─────────────────────── */

router.patch('/collabs/:id/status', requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const allowed = ['pending', 'in-progress', 'completed']

    if (!status || !allowed.includes(status)) {
      return res
        .status(400)
        .json({ error: `status must be one of: ${allowed.join(', ')}` })
    }

    const supabase = getDbClient(req.accessToken!)

    const { error } = await supabase
      .from('brand_collaborations')
      .update({ status })
      .eq('id', id)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.json({ success: true, status })
  } catch (err) {
    console.error('PATCH /admin/collabs/:id/status error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
