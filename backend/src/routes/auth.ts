import { Router, Request, Response } from 'express'
import { createUserClient } from '../lib/supabase'

const router = Router()

/**
 * GET /api/auth/callback?code=...
 *
 * Exchanges an OAuth authorization code for a Supabase session.
 * The frontend redirects here after the OAuth provider (Google) callback,
 * sends the code, and receives session tokens to establish a client-side session.
 */
router.get('/callback', async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string | undefined

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' })
    }

    const supabase = createUserClient('')

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error || !data.session) {
      console.error('OAuth code exchange failed:', error?.message)
      return res.status(401).json({ error: error?.message ?? 'Code exchange failed' })
    }

    res.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    })
  } catch (err) {
    console.error('GET /callback error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
