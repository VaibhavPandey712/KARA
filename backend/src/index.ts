import './env'
import express from 'express'
import cors from 'cors'
import onboardingRoutes from './routes/onboarding'
import { validateEnv } from './lib/supabase'

const app = express()
const PORT = Number(process.env.PORT) || 4000
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000'

app.use(cors({ origin: FRONTEND_URL, credentials: true }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/onboarding', onboardingRoutes)

try {
  validateEnv()
} catch (err) {
  console.error((err as Error).message)
  process.exit(1)
}

const server = app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${PORT} is already in use.\n` +
        `Close the other backend terminal or run:\n` +
        `  netstat -ano | findstr :${PORT}\n` +
        `  taskkill /PID <pid> /F\n`
    )
    process.exit(1)
  }
  throw err
})
