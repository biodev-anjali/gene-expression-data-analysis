# Quick Fix for Connection Failed

## The Problem
Build is failing because it's trying to connect to PostgreSQL database during build.

## Quick Fix (2 minutes)

**Option 1: Skip migrations for local dev (Easiest)**

The build script has been updated. Just run:
```bash
cd gene-expression-app
npm run dev
```

The dev server will start without running migrations.

**Option 2: Use SQLite locally**

1. Create `.env.local` file:
```env
DATABASE_URL="file:./dev.db"
```

2. Temporarily change `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

3. Run:
```bash
npx prisma migrate dev --name init
npm run dev
```

## For Vercel Deployment

Vercel will use the PostgreSQL `DATABASE_URL` from environment variables, so deployments will work fine.

## Try Now

Run this command:
```bash
cd gene-expression-app
npm run dev
```

Then open http://localhost:3000 in your browser.

