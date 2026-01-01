# Deployment Guide - Gene Expression Analyzer

## Deploy to Vercel

### Prerequisites
- GitHub account with your code pushed
- Vercel account (free tier works)

### Step 1: Push to GitHub
Make sure your code is committed and pushed to GitHub.

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub

### Step 3: Add PostgreSQL Database

**Option A: Vercel Postgres (Recommended)**
1. In your Vercel dashboard, go to your project
2. Navigate to "Storage" tab
3. Click "Create Database" → Select "Postgres"
4. Choose a name and region
5. Copy the `DATABASE_URL` connection string

**Option B: External PostgreSQL (Supabase/Neon)**
- [Supabase](https://supabase.com) - Free tier available
- [Neon](https://neon.tech) - Free tier available
- Copy your PostgreSQL connection string

### Step 4: Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `gene-expression-app` (if repo is at root) or leave blank if repo is the app itself
4. **Environment Variables**:
   - Add `DATABASE_URL` with your PostgreSQL connection string
5. Click "Deploy"

### Step 5: Run Migrations

After deployment, you need to run migrations:

**Option 1: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
cd gene-expression-app
vercel link
npx prisma migrate deploy
```

**Option 2: Via Vercel Dashboard**
1. Go to your project → Settings → Environment Variables
2. Ensure `DATABASE_URL` is set
3. Trigger a new deployment (it will run migrations automatically via build script)

### Local Development with PostgreSQL

For local development, create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/genex_dev?schema=public"
```

Or continue using SQLite locally by creating a `.env.local`:
```env
DATABASE_URL="file:./dev.db"
```

And updating `schema.prisma` temporarily for local dev (or use environment-specific schemas).

## Alternative: Deploy with SQLite (Not Recommended)

If you want to use SQLite, consider:
- [Railway](https://railway.app) - Supports persistent volumes
- [Render](https://render.com) - Supports persistent disks
- [Fly.io](https://fly.io) - Supports volumes

Note: These platforms are better for SQLite but PostgreSQL is still recommended for production.

