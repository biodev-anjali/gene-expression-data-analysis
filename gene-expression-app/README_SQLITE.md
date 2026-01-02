# ✅ SQLite Setup Complete!

## What's Done:

1. ✅ Prisma schema switched to SQLite
2. ✅ Database file location: `prisma/dev.db`
3. ✅ Migrations configured

## To Start Development:

```bash
cd gene-expression-app
npm run dev
```

Then open http://localhost:3000

## Important: Before Deploying to Vercel

**You MUST switch back to PostgreSQL!**

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Commit and push - Vercel will use PostgreSQL from environment variables

## Current Status:

- **Local**: SQLite (works without any database server)
- **Production**: Will use PostgreSQL on Vercel (set via DATABASE_URL env var)

The app should now work locally! 🎉

