# 🚨 Immediate Fix for 404 Error

## Step-by-Step Fix (5 minutes)

### Step 1: Check Root Directory ⚠️ MOST IMPORTANT

1. Go to https://vercel.com/dashboard
2. Click on your project name
3. Click **Settings** (top menu)
4. Click **General** (left sidebar)
5. Scroll down to **Root Directory**
6. **CRITICAL:** It should say: `gene-expression-app`
   - If it's blank or says something else, click **Edit**
   - Type: `gene-expression-app`
   - Click **Save**

### Step 2: Check Build Status

1. Go to **Deployments** tab (top menu)
2. Look at the latest deployment
3. Is it **Ready** (green checkmark) or **Error** (red X)?

**If Error:**
- Click on the deployment
- Click **View Function Logs** or **Build Logs**
- Read the error message
- Common errors below ↓

**If Ready but still 404:**
- Root Directory is definitely the issue
- Go back to Step 1

### Step 3: Check Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Look for `DATABASE_URL`
3. If missing:
   - Click **Add New**
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Select: Production, Preview, Development
   - Click **Save**

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **...** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes
5. Check if it works now

## Most Likely Fix

**90% of the time, it's the Root Directory.**

Make absolutely sure it's set to: `gene-expression-app`

Then redeploy.

## Still Not Working?

Share the error message from Build Logs and I'll help fix it!

