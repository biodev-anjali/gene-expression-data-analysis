# Troubleshooting 404 Error on Vercel

## Immediate Actions

### 1. Check Vercel Project Settings

Go to: **Settings** → **General** → **Root Directory**

**MUST BE SET TO:** `gene-expression-app`

If it's blank or set to something else:
1. Change it to `gene-expression-app`
2. Click **Save**
3. Go to **Deployments** tab
4. Click **...** on latest deployment → **Redeploy**

### 2. Check Build Status

In **Deployments** tab:
- Is the build **Ready** (green) or **Error** (red)?
- If Error, click on it to see build logs
- Look for error messages

### 3. Check Environment Variables

Go to: **Settings** → **Environment Variables**

Verify:
- `DATABASE_URL` exists
- Is enabled for Production, Preview, Development
- Value is a valid PostgreSQL connection string

### 4. Common Build Errors & Fixes

#### Error: "Cannot find module"
**Fix:** Root directory is wrong - set to `gene-expression-app`

#### Error: "DATABASE_URL is not set"
**Fix:** Add `DATABASE_URL` environment variable

#### Error: "Migration failed"
**Fix:** See migration setup in DEPLOY_NOW.md

#### Error: "Build command failed"
**Fix:** Check package.json build script is correct

## Quick Test: Local Build

Test if your app builds locally:

```bash
cd gene-expression-app
npm install
npm run build
```

If this fails locally, fix the error first before deploying.

## Still Not Working?

1. Check Vercel deployment logs thoroughly
2. Verify repository structure matches expected layout
3. Try removing vercel.json (Vercel auto-detects Next.js)
4. Check if there are any TypeScript or linting errors

