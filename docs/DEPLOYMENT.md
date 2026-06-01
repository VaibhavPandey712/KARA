## Production deployment (fix localhost redirects)

### 1. Supabase (fixes sign-in redirect to localhost)

In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **URL Configuration**:

| Setting | Value |
|---------|--------|
| **Site URL** | `https://YOUR-FRONTEND-DOMAIN.com` (not localhost) |
| **Redirect URLs** | Add: `https://YOUR-FRONTEND-DOMAIN.com/auth/callback` |

Keep `http://localhost:3000/auth/callback` only if you still develop locally.

### 2. Vercel (frontend)

Project → **Settings** → **Environment Variables** (Production):

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | your key |
| `NEXT_PUBLIC_SITE_URL` | `https://kara.vercel.app` |
| `BACKEND_URL` | `https://your-backend.railway.app` |
| `NEXT_PUBLIC_API_URL` | leave empty OR set same as `BACKEND_URL` (must NOT be localhost) |

Redeploy after saving env vars.

The app uses `/api/backend/*` proxy when not on localhost, so API calls stay on your live domain.

### 3. Backend host (Railway / Render / etc.)

| Variable | Example |
|----------|---------|
| `FRONTEND_URL` | `https://kara.vercel.app` (comma-separate multiple: `https://a.com,http://localhost:3000`) |
| `SUPABASE_URL` | same as frontend |
| `SUPABASE_ANON_KEY` | same public key |
| `PORT` | provided by host |

### 4. Google Cloud Console

OAuth **Authorized redirect URIs** must include Supabase callback:

`https://YOUR-PROJECT.supabase.co/auth/v1/callback`

(Supabase handles Google OAuth — configure in Supabase, not your app URL directly.)
