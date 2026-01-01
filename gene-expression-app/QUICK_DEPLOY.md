# 🚀 Quick Deployment Guide

## Step-by-Step: Deploy to Vercel in 5 Minutes

### Step 1: Set Up Free PostgreSQL Database (2 minutes)

Choose one option:

#### Option A: Neon (Recommended - Best for Vercel)
1. Go to https://neon.tech
2. Sign up with GitHub (free)
3. Click "Create Project"
4. Choose a project name: `genex-db`
5. Select region closest to you
6. Click "Create Project"
7. Copy the connection string (looks like: `postgresql://user:pass@host/dbname`)

#### Option B: Supabase (Alternative)
1. Go to https://supabase.com
2. Sign up with GitHub
3. Click "New Project"
4. Fill in details and create project
5. Go to Settings → Database
6. Copy the connection string from "Connection string" → "URI"

### Step 2: Deploy to Vercel (3 minutes)

1. **Go to Vercel**
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Git Repository"
   - Select: `biodev-anjali/gene-expression-data-analysis`
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `gene-expression-app` (or your choice)
   - **Root Directory**: `gene-expression-app` ⚠️ IMPORTANT
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: Leave default (`npm run build`)
   - **Output Directory**: Leave default
   - **Install Command**: Leave default (`npm install`)

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add new variable:
     - **Name**: `DATABASE_URL`
     - **Value**: Paste your PostgreSQL connection string from Step 1
   - Make sure it's selected for "Production", "Preview", and "Development"
   - Click "Save"

5. **Deploy**
   - Click "Deploy" button
   - Wait 2-3 minutes for build to complete
   - ✅ Your app is now live!

### Step 3: Run Database Migrations (IMPORTANT!)

**⚠️ First-time setup:** Since we switched from SQLite to PostgreSQL, you need to create a new migration.

**Option 1: Via Vercel CLI (Recommended for first setup)**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to your app directory
cd gene-expression-app

# Link to your Vercel project (follow prompts)
vercel link

# Pull environment variables
vercel env pull .env.local

# Generate Prisma Client and create migration
npx prisma generate
npx prisma migrate dev --name init_postgres

# Push the new migration to Git
git add prisma/migrations
git commit -m "Add PostgreSQL migration"
git push

# Deploy again (or migrations will run automatically on next deploy)
```

**Option 2: Simple First Deploy (Easier)**
1. After adding `DATABASE_URL` in Vercel, the first deploy might fail on migrations (expected)
2. Install Vercel CLI: `npm install -g vercel`
3. Run the commands above to create the PostgreSQL migration
4. Push changes and redeploy - it will work!

**Option 3: Use prisma db push (Quick test, then migrate)**
```bash
vercel link
vercel env pull .env.local
npx prisma db push
# Then create migration: npx prisma migrate dev --name init_postgres
```

### Step 4: Verify Deployment

1. Visit your app URL (e.g., `https://gene-expression-app.vercel.app`)
2. Test the upload functionality
3. Check the history page

## 🎉 Success!

Your Gene Expression Analyzer is now live!

## 🔧 Troubleshooting

### Build Fails
- Check that `DATABASE_URL` environment variable is set correctly
- Verify Root Directory is set to `gene-expression-app`
- Check build logs in Vercel dashboard

### Database Connection Errors
- Verify your PostgreSQL connection string is correct
- Make sure the database is accessible (not IP-restricted)
- Check that migrations ran successfully

### Migration Issues
- Run `npx prisma migrate deploy` manually via Vercel CLI
- Or create migration manually: `npx prisma migrate dev --name init`

## 📝 Notes

- Your local SQLite database won't work on Vercel
- Use the PostgreSQL connection string for production
- The app will automatically run migrations on build
- Free tiers are sufficient for testing and small projects

