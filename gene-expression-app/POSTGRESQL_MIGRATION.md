# PostgreSQL Migration Guide

## ✅ Migration Complete

The application has been migrated from SQLite to PostgreSQL for Vercel serverless deployment compatibility.

## Why PostgreSQL?

- **SQLite is NOT supported in Vercel serverless environments** - SQLite requires file system access, which is not available in serverless functions
- **PostgreSQL works seamlessly** with connection pooling via Neon, Supabase, or similar providers
- **Production-ready** - PostgreSQL is the standard for production deployments

## Changes Made

### 1. Prisma Schema (`prisma/schema.prisma`)
- ✅ Changed provider from `sqlite` to `postgresql`
- ✅ Updated to use `DATABASE_URL` environment variable
- ✅ Model structure remains unchanged (compatible with both databases)

### 2. Prisma Client (`src/lib/prisma.ts`)
- ✅ Optimized for Vercel serverless with connection pooling
- ✅ Added proper logging configuration
- ✅ Maintains singleton pattern for development

### 3. API Routes
- ✅ Added comprehensive error handling in `/api/analyze`
- ✅ Added error handling in `/api/history`
- ✅ All database errors return clean JSON responses (no crashes)
- ✅ Handles race conditions and duplicate detection

### 4. Migration Lock
- ✅ Updated `migration_lock.toml` to PostgreSQL

## Setup Instructions

### For Local Development

1. **Install PostgreSQL** (if not already installed)
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create a local database**
   ```bash
   createdb gene_expression_db
   # Or using psql:
   psql -U postgres
   CREATE DATABASE gene_expression_db;
   ```

3. **Set DATABASE_URL in `.env`**
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/gene_expression_db"
   ```

4. **Run migrations**
   ```bash
   cd gene-expression-app
   npx prisma migrate dev --name init_postgresql
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

### For Vercel Production Deployment

1. **Set up PostgreSQL database**
   - Option A: [Neon](https://neon.tech) (Recommended - serverless PostgreSQL)
   - Option B: [Supabase](https://supabase.com) (Free tier available)
   - Option C: Any PostgreSQL provider with connection pooling

2. **Get connection string**
   - Format: `postgresql://user:password@host:port/database?sslmode=require`
   - Most providers include connection pooling in the URL (e.g., `?pgbouncer=true`)

3. **Add to Vercel Environment Variables**
   - Go to your Vercel project settings
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Make sure to add it for **Production**, **Preview**, and **Development** environments

4. **Deploy**
   ```bash
   # The build script already includes migration deployment
   vercel --prod
   ```

   Or push to your main branch (if auto-deploy is enabled):
   ```bash
   git push origin main
   ```

5. **Run migrations on production**
   ```bash
   # Option 1: Via Vercel build command (already configured)
   # The build:prod script runs: prisma migrate deploy
   
   # Option 2: Manual migration
   npx prisma migrate deploy
   ```

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string

### Optional
- `NEXT_PUBLIC_APP_URL` - Your app URL (for CORS, etc.)

## Verification

### Test Database Connection
```bash
cd gene-expression-app
npx prisma db pull  # Should connect successfully
npx prisma studio   # Opens Prisma Studio to view data
```

### Test API Routes
```bash
# Start dev server
npm run dev

# Test analyze endpoint (upload a CSV file)
# Test history endpoint: http://localhost:3000/api/history
```

## Troubleshooting

### Error: "Unable to open the database file"
- ✅ **Fixed**: This was the SQLite error. With PostgreSQL, this won't occur if `DATABASE_URL` is set correctly.

### Error: "Connection refused"
- Check PostgreSQL is running: `pg_isready`
- Verify `DATABASE_URL` format is correct
- Check firewall/network settings

### Error: "Authentication failed"
- Verify username and password in `DATABASE_URL`
- Check database user permissions

### Error: "Database does not exist"
- Create the database first: `CREATE DATABASE gene_expression_db;`
- Or update `DATABASE_URL` to point to an existing database

### Migration Errors
- If migrations fail, you may need to reset (⚠️ **WARNING**: Deletes all data):
  ```bash
  npx prisma migrate reset
  npx prisma migrate dev
  ```

## Notes

- **Old SQLite database**: The `prisma/dev.db` file is no longer used. You can delete it if desired.
- **Data migration**: If you have existing SQLite data, you'll need to export and import it manually.
- **Connection pooling**: Production PostgreSQL providers (Neon, Supabase) handle connection pooling automatically via the connection string.

## Support

If you encounter issues:
1. Check that `DATABASE_URL` is set correctly
2. Verify PostgreSQL is accessible
3. Check Vercel logs for detailed error messages
4. Ensure migrations have been run: `npx prisma migrate deploy`

