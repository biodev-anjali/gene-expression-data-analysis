# Fix Connection Failed Error

## Issue: Database Connection Failed

The build is trying to connect to PostgreSQL database, but it's not running locally.

## Solution for Local Development

You have two options:

### Option 1: Use SQLite for Local Development (Easier)

1. Create a `.env.local` file in `gene-expression-app` directory:
```env
DATABASE_URL="file:./dev.db"
```

2. Update `prisma/schema.prisma` temporarily:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

3. Run migrations:
```bash
cd gene-expression-app
npx prisma migrate dev --name init_sqlite
npx prisma generate
```

4. Start dev server:
```bash
npm run dev
```

**Note:** Remember to switch back to PostgreSQL before deploying to Vercel.

### Option 2: Skip Migrations in Dev Build (Quick Fix)

Update `package.json` to skip migrations in dev:

```json
"scripts": {
  "dev": "next dev",
  "build": "prisma generate && next build",
  "build:prod": "prisma generate && prisma migrate deploy && next build",
  ...
}
```

Then run:
```bash
npm run dev
```

**Note:** This won't work for production builds on Vercel, but it's fine for local development.

### Option 3: Set Up Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database
3. Set `DATABASE_URL` in `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/genex_dev?schema=public"
```

4. Run migrations:
```bash
npx prisma migrate dev
```

## Recommended: Option 1 (SQLite for Local)

This is the easiest for local development. Just remember to use PostgreSQL on Vercel.

