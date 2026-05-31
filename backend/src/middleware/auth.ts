import { Request, Response, NextFunction } from 'express'
import { createUserClient } from '../lib/supabase'

export interface AuthRequest extends Request {
  user?: { id: string; email?: string; user_metadata?: Record<string, unknown> }
  accessToken?: string
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing authorization token' })
    }

    const token = authHeader.slice(7)
    const supabase = createUserClient(token)
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    req.user = user
    req.accessToken = token
    next()
  } catch (err) {
    console.error('Auth error:', err)
    res.status(500).json({ error: 'Authentication failed' })
  }
}
