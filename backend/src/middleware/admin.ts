import { Response, NextFunction } from 'express'
import { AuthRequest, requireAuth } from './auth'

/**
 * Admin middleware — extends requireAuth.
 * Checks if the authenticated user's email is in the ADMIN_EMAILS env var.
 */
export async function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // First run normal auth
  requireAuth(req, res, (err?: unknown) => {
    if (err) return next(err)

    // Check if response was already sent (401 from requireAuth)
    if (res.headersSent) return

    const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)

    const userEmail = req.user?.email?.toLowerCase()

    if (!userEmail || !adminEmails.includes(userEmail)) {
      return res.status(403).json({ error: 'Admin access required' })
    }

    next()
  })
}
