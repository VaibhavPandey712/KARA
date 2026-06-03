import { Router } from 'express'
import { AuthRequest, requireAuth } from '../middleware/auth'
import { getDbClient } from '../lib/supabase'

const router = Router()

router.post('/submit', requireAuth, async (req: AuthRequest, res) => {
  try {
    const user = req.user!
    const supabase = getDbClient(req.accessToken!)
    const {
      brandTypes,
      collabTypes,
      promoteUnused,
      contactDetail,
      dreamBrands,
    } = req.body

    if (
      !Array.isArray(brandTypes) ||
      brandTypes.length === 0 ||
      !Array.isArray(collabTypes) ||
      collabTypes.length === 0
    ) {
      return res
        .status(400)
        .json({ error: 'brandTypes and collabTypes are required' })
    }

    const { error: insertError } = await supabase
      .from('brand_collaborations')
      .insert({
        user_id: user.id,
        brand_types: brandTypes,
        collab_types: collabTypes,
        promote_unused: promoteUnused ?? null,
        contact_detail: contactDetail?.trim() ?? null,
        dream_brands: dreamBrands?.trim() ?? null,
      })

    if (insertError) {
      return res.status(500).json({ error: insertError.message })
    }

    res.json({ success: true })
  } catch (err) {
    console.error('POST /collab/submit error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
