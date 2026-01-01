# 🚀 Deploy Now - Simple Instructions

## Your code is ready! Follow these steps:

### 1. Get a Free PostgreSQL Database (2 min)

**Easiest: Neon**
1. Go to https://neon.tech and sign up with GitHub
2. Click "Create Project" → Name it `genex-db`
3. Copy the connection string (looks like: `postgresql://user:pass@host/dbname`)

### 2. Deploy to Vercel (3 min)

1. Go to https://vercel.com/new
2. Sign in with GitHub
3. Import: `biodev-anjali/gene-expression-data-analysis`
4. **IMPORTANT Settings:**
   - **Root Directory**: `gene-expression-app` ⚠️
   - Leave everything else as default
5. **Environment Variable:**
   - Add `DATABASE_URL` = paste your Neon connection string
6. Click "Deploy"

### 3. First Migration Setup (5 min)

After first deployment, the build might fail (expected - we need to create PostgreSQL migration):

```bash
# Install Vercel CLI
npm install -g vercel

# Go to your app folder
cd gene-expression-app

# Link to Vercel project
vercel link

# Pull environment variables
vercel env pull .env.local

# Create PostgreSQL migration
npx prisma generate
npx prisma migrate dev --name init_postgres

# Push to GitHub
git add prisma/migrations
git commit -m "Add PostgreSQL migration"
git push

# Vercel will auto-deploy, or trigger manual deploy in dashboard
```

### 4. Done! 🎉

Visit your Vercel URL and test the app!

---

**Need help?** Check `QUICK_DEPLOY.md` for detailed troubleshooting.

