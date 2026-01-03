# 🚀 Deployment Instructions

## Quick Deploy to Vercel

### Step 1: Set Up PostgreSQL Database (Required for Vercel)

**Option A: Neon (Recommended - Free & Easy)**
1. Go to https://neon.tech
2. Sign up with GitHub (free)
3. Click "Create Project"
4. Name: `genex-db`
5. Copy the connection string (looks like: `postgresql://user:pass@ep-xxx.region.neon.tech/dbname`)

**Option B: Vercel Postgres**
1. After importing to Vercel, go to Storage tab
2. Create PostgreSQL database
3. Copy the connection string

### Step 2: Update Prisma Schema for Production

The schema needs to use PostgreSQL for deployment. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Or keep SQLite locally and use environment variable (see Step 5).

### Step 3: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import Repository**: Select your GitHub repo
4. **Configure Project**:
   - **Root Directory**: `gene-expression-app` ⚠️ IMPORTANT
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Install Command**: `npm install` (default)
5. **Environment Variables**:
   - Add: `DATABASE_URL` = your PostgreSQL connection string
   - Make sure it's enabled for Production, Preview, and Development
6. **Click "Deploy"**

### Step 4: Run Database Migrations

After first deployment, create the database tables:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Link to your project
cd gene-expression-app
vercel link

# Pull environment variables
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Create and apply migration
npx prisma migrate deploy
```

Or via Vercel Dashboard:
1. Go to your project → Settings → Environment Variables
2. Ensure `DATABASE_URL` is set
3. Trigger a new deployment (build script will run migrations)

### Step 5: Local Development Setup

To keep SQLite for local development, create `.env.local`:

```env
DATABASE_URL="file:./dev.db"
```

Update `prisma/schema.prisma` to use environment variable:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

For production, Vercel will use PostgreSQL via the `DATABASE_URL` environment variable.

**Better approach**: Use separate schema files or update schema to detect provider from URL:
- SQLite: `file:./dev.db`
- PostgreSQL: `postgresql://...`

### Step 6: Verify Deployment

1. Visit your app URL (e.g., `https://your-app.vercel.app`)
2. Test file upload on the Analyzer page
3. Check History page to see stored data

## ⚠️ Important Notes

- **Database**: Vercel requires PostgreSQL (SQLite won't work)
- **Root Directory**: Must be set to `gene-expression-app`
- **Environment Variables**: `DATABASE_URL` must be set in Vercel dashboard
- **Migrations**: Run `prisma migrate deploy` after first deployment

## 🔧 Troubleshooting

### Build Fails
- Check `DATABASE_URL` is set in Vercel dashboard
- Verify Root Directory is `gene-expression-app`
- Check build logs for specific errors

### Database Connection Error
- Verify PostgreSQL connection string is correct
- Ensure database allows connections from Vercel IPs
- Check that migrations ran successfully

### Migration Issues
- Run `npx prisma migrate deploy` manually
- Or create migration: `npx prisma migrate dev --name init`

