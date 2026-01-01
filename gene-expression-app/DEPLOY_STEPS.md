# Quick Deployment Steps

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git push origin main
```

### Step 2: Set up PostgreSQL Database

**Option A: Vercel Postgres (Easiest)**
1. Go to [vercel.com](https://vercel.com) and sign in
2. After importing your repo, go to your project dashboard
3. Click "Storage" tab → "Create Database" → "Postgres"
4. Choose a name (e.g., "genex-db") and region
5. Copy the connection string (it will be auto-added as `DATABASE_URL`)

**Option B: External PostgreSQL (Free Options)**
- **Supabase**: https://supabase.com (free tier)
- **Neon**: https://neon.tech (free tier)
- **Railway**: https://railway.app (free tier)

### Step 3: Deploy on Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `gene-expression-app` (if repo contains the app folder) or leave blank
   - **Build Command**: `npm run build` (or leave default)
   - **Install Command**: `npm install` (or leave default)
4. **Environment Variables**:
   - Add `DATABASE_URL` = your PostgreSQL connection string
5. Click "Deploy"

### Step 4: Run Database Migrations

The build script will automatically run migrations, but if you encounter issues:

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
cd gene-expression-app
vercel link

# Run migrations
npx prisma migrate deploy
```

### Step 5: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Test uploading a file
3. Check the history page

## ⚠️ Important Notes

1. **Database**: The app now uses PostgreSQL (required for Vercel). If you were using SQLite locally, you'll need to:
   - Set up a local PostgreSQL, OR
   - Use a cloud PostgreSQL for development too

2. **Local Development**: Update your `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/genex_dev?schema=public"
   ```

3. **Migrations**: The first deployment will create the database tables automatically via the build script.

## 🎉 You're Done!

Your app should now be live at your Vercel URL!

