# Testing Deployment on Vercel

## Quick Testing Checklist

### 1. Verify Deployment Status
- Go to your Vercel dashboard: https://vercel.com/dashboard
- Check that your latest deployment shows "Ready" status
- Note your deployment URL (e.g., `https://gene-expression-app.vercel.app`)

### 2. Test Home Page
**URL:** `https://your-app.vercel.app/`

**Expected:**
- ✅ Page loads successfully
- ✅ Shows "Gene Expression Analyzer" heading
- ✅ Shows "App is live on Vercel 🚀" message
- ✅ "Go to History" link is visible
- ✅ File upload form is displayed
- ✅ "Analyze File" button is present

### 3. Test File Upload
**Steps:**
1. Click "Choose File" button
2. Select any file (can be a text file, CSV, or any file type)
3. Click "Analyze File" button
4. Wait for processing

**Expected:**
- ✅ Loading state shows "Processing..."
- ✅ Success message appears: "✅ New analysis completed."
- ✅ Results section displays:
  - File name
  - Genes count (default: 150)
  - Samples count (default: 12)
  - Mean Expression (default: 6.21)
  - Timestamp

### 4. Test Duplicate Detection
**Steps:**
1. Upload the same file again
2. Click "Analyze File"

**Expected:**
- ✅ Warning message: "⚠️ Sample already analyzed. Showing previous result."
- ✅ Shows previous analysis results (same data)

### 5. Test History Page
**URL:** `https://your-app.vercel.app/history`

**Steps:**
1. Click "Go to History" link from home page
2. Verify page loads

**Expected:**
- ✅ Page loads successfully
- ✅ Shows "Analysis History" heading
- ✅ Displays list of all uploaded files
- ✅ Each entry shows file name, genes, samples, and mean expression
- ✅ Can select multiple entries for comparison
- ✅ Comparison view appears when items are selected

### 6. Test Navigation
- ✅ Home → History navigation works
- ✅ History → Home navigation works (if link exists)
- ✅ Browser back/forward buttons work

### 7. Database Verification
**Check via Vercel CLI (optional):**
```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Link to your project
cd gene-expression-app
vercel link

# Check database connection
npx prisma studio
# This opens Prisma Studio to view your database
```

**Expected:**
- ✅ Database connection works
- ✅ `GeneExpressionRun` table exists
- ✅ Data is persisted after uploads
- ✅ File hashes are stored correctly

## Common Issues & Solutions

### Issue: Build Failed
**Solution:**
- Check build logs in Vercel dashboard
- Verify `DATABASE_URL` environment variable is set
- Ensure migrations ran successfully

### Issue: "Cannot connect to database"
**Solution:**
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check that PostgreSQL database is running
- Ensure database allows connections from Vercel IPs

### Issue: "Migration failed"
**Solution:**
- Run migrations manually via Vercel CLI:
  ```bash
  vercel link
  vercel env pull .env.local
  npx prisma migrate deploy
  ```

### Issue: File upload returns error
**Solution:**
- Check browser console for errors
- Verify API route is working: `/api/analyze`
- Check Vercel function logs in dashboard

### Issue: History page shows no data
**Solution:**
- Verify database has data
- Check `/api/history` endpoint returns data
- Check browser network tab for API responses

## Performance Testing

### Load Time
- ✅ Initial page load < 3 seconds
- ✅ File upload response < 5 seconds
- ✅ History page load < 2 seconds

### Functionality Under Load
- Upload multiple files in succession
- Check that all uploads are saved
- Verify history updates correctly

## Browser Compatibility
Test on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Next Steps After Testing

If all tests pass:
1. ✅ Deployment is successful!
2. Share your app URL with others
3. Monitor Vercel dashboard for any errors
4. Set up custom domain (optional)

If tests fail:
1. Check Vercel deployment logs
2. Verify environment variables
3. Check database connection
4. Review error messages in browser console

