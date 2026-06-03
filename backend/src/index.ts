import './env'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import onboardingRoutes from './routes/onboarding'
import { validateEnv } from './lib/supabase'

const app = express()
const PORT = Number(process.env.PORT) || 4000

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin ?? allowedOrigins[0])
        return
      }
      callback(null, false)
    },
    credentials: true,
  })
)
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/auth', authRoutes)
app.use('/api/onboarding', onboardingRoutes)

try {
  validateEnv()
} catch (err) {
  console.error((err as Error).message)
  process.exit(1)
}

const server = app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
  console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`)
})

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `\nPort ${PORT} is already in use.\n` +
        `Close the other backend terminal or run:\n` +
        `  lsof -i :${PORT}\n` +
        `  kill -9 <PID>\n`
    )
    process.exit(1)
  }
  throw err
})
