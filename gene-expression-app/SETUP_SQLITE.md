# SQLite Setup for Local Development

## ✅ SQLite is Now Configured!

The Prisma schema has been updated to use SQLite for local development.

## What Was Changed:

1. **Schema Updated**: Changed from PostgreSQL to SQLite
2. **Database Location**: `prisma/dev.db` (SQLite file)

## To Use:

1. The migrations should have run automatically. If not, run:
   ```bash
   cd gene-expression-app
   npx prisma migrate dev
   npx prisma generate
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Important Notes:

### For Production/Vercel Deployment:

Before deploying to Vercel, you'll need to switch back to PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Make sure Vercel has `DATABASE_URL` environment variable set to your PostgreSQL connection string

3. The build script `build:prod` will handle migrations automatically

### Current Setup:

- **Local Development**: SQLite (file:./dev.db)
- **Production**: PostgreSQL (via DATABASE_URL env var on Vercel)

This setup allows you to develop locally without needing PostgreSQL installed!

