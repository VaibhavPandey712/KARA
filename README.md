# KARA

The AI operating system for creators — landing site, auth, onboarding, and plans.

## Project structure

```
kara/
├── frontend/                 # Next.js 16 (React) — UI & pages
│   ├── src/
│   │   ├── app/              # Routes (/, /auth, /onboarding, /plans, …)
│   │   ├── components/       # Layout & marketing sections
│   │   └── lib/              # Supabase client, API, onboarding helpers
│   ├── public/
│   └── package.json
├── backend/                  # Express API — onboarding & Supabase
│   ├── src/
│   │   ├── index.ts          # Server entry
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth (JWT)
│   │   └── lib/              # Supabase clients
│   └── package.json
├── package.json              # Monorepo scripts (npm workspaces)
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- A [Supabase](https://supabase.com/) project (Google OAuth enabled)

## Setup

### 1. Install dependencies

```bash
npm install
```

If install fails on Windows, try:

```bash
npm install --ignore-scripts
```

### 2. Environment variables

**Frontend** — copy and edit:

```bash
cp frontend/.env.example frontend/.env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key |
| `NEXT_PUBLIC_API_URL` | Backend URL (`http://localhost:4000` locally) |

**Backend** — copy and edit:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Same URL as frontend |
| `SUPABASE_ANON_KEY` | Same public/anon key as frontend |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional; only if RLS blocks writes |

### 3. Run locally

Both apps:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:4000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:frontend` | Next.js dev server |
| `npm run dev:backend` | Express API |
| `npm run build` | Build backend + frontend |
| `npm run lint` | Lint frontend |

## Push to GitHub

**Do not commit** `.env` or `.env.local` — they are gitignored.

1. Create a new repository on [GitHub](https://github.com/new) (empty, no README).

2. From the project root:

```bash
git add .
git status
```

Confirm no `.env` files appear in the list.

3. Commit and push:

```bash
git commit -m "chore: clean monorepo structure for frontend and backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

If `origin` already exists:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Deployment notes

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for fixing localhost redirects after sign-in.

- **Frontend**: Vercel / Netlify — set env vars from `frontend/.env.example` (`NEXT_PUBLIC_SITE_URL`, `BACKEND_URL`).
- **Backend**: Railway, Render, Fly.io — set `FRONTEND_URL` to your production frontend URL (CORS).
- **Supabase**: Set Site URL and redirect URLs to your production domain (not localhost).

## License

Private — all rights reserved unless otherwise specified.
