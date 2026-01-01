# 🧪 Quick Vercel Testing Guide

## Before Testing

1. **Deploy to Vercel** (if not already done):
   - Go to https://vercel.com/new
   - Import your GitHub repo
   - Set Root Directory: `gene-expression-app`
   - Add `DATABASE_URL` environment variable
   - Deploy

2. **Get your app URL**:
   - After deployment, Vercel provides a URL like: `https://your-app.vercel.app`
   - Copy this URL

## Quick Test (5 minutes)

### ✅ Test 1: Home Page Loads
Open your Vercel URL in a browser.

**Expected:**
- Page loads without errors
- Shows "Gene Expression Analyzer" heading
- File upload form is visible
- "Go to History" link works

### ✅ Test 2: File Upload Works
1. Click "Choose File"
2. Select any file (text, CSV, image, etc.)
3. Click "Analyze File"
4. Wait 2-3 seconds

**Expected:**
- Button shows "Processing..." while loading
- Success message: "✅ New analysis completed."
- Results section shows:
  - File name
  - Genes: 150
  - Samples: 12
  - Mean Expression: 6.21

### ✅ Test 3: History Page
1. Click "Go to History" link
2. Wait for page to load

**Expected:**
- History page loads
- Shows list of uploaded files
- Each entry shows file details

### ✅ Test 4: Duplicate Detection
1. Upload the same file again (from home page)
2. Click "Analyze File"

**Expected:**
- Warning: "⚠️ Sample already analyzed. Showing previous result."
- Shows previous results (same data)

## If Tests Fail

### Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Check "Build Logs" and "Function Logs"

### Common Issues:

**Build Failed:**
- Check that `DATABASE_URL` is set in Environment Variables
- Verify Root Directory is `gene-expression-app`

**Database Error:**
- Ensure PostgreSQL database is running
- Verify `DATABASE_URL` connection string is correct
- Run migrations: `npx prisma migrate deploy` (via Vercel CLI)

**File Upload Error:**
- Check browser console (F12) for errors
- Check Vercel Function Logs in dashboard
- Verify API route `/api/analyze` is working

## Success! 🎉

If all tests pass, your app is working correctly on Vercel!

Next steps:
- Share your app URL
- Monitor Vercel dashboard for usage
- Set up custom domain (optional)

