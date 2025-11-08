# 🚀 Quick Start Guide: New Features

Get up and running with the three new features in under 10 minutes!

---

## 📋 What's New?

1. **📊 Impact Reports & Analytics Dashboard** - Comprehensive performance metrics
2. **🔔 Automated Notifications System** - Email/SMS alerts on status changes
3. **🌐 Public Transparency Page** - Public-facing statistics

---

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies (if needed)

```bash
cd NIT_GOA_HACKATHON
npm install
```

### Step 2: Configure Email Notifications (Required)

Sign up for Resend (free tier available):

1. Go to [resend.com](https://resend.com)
2. Create account and verify email
3. Get API key from dashboard
4. Add to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=CityPulse <notifications@yourdomain.com>
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🎯 Feature Access

### 📊 Analytics Dashboard

**URL**: `http://localhost:3000/admin/analytics`

**Requirements**: 
- Must be logged in
- Admin or Authority role only

**Quick Test**:
```bash
# 1. Login as admin (or create admin user)
# 2. Navigate to /admin/analytics
# 3. View ward performance and metrics
# 4. Try different date ranges
# 5. Click "Export" to download CSV
```

### 🔔 Notifications

**Automatic** - No manual access needed!

**Test Email Notifications**:
```bash
# 1. Report an issue (or use existing issue)
# 2. Change issue status: open → in-progress
# 3. Check email inbox for notification
# 4. Change status to: resolved
# 5. Check email for resolution notification
```

**What Triggers Notifications**:
- ✅ Status changes (any transition)
- ✅ Issue resolved (special template)
- ✅ New comments (except self-comments)
- ✅ Issue assignments (to authorities)

### 🌐 Transparency Page

**URL**: `http://localhost:3000/transparency`

**Requirements**: None! Public page, no login needed

**Quick Test**:
```bash
# 1. Open in browser (even incognito)
# 2. View public statistics
# 3. Check ward performance
# 4. See recent resolutions
# 5. Share the link!
```

---

## 📱 Quick Feature Tour

### Analytics Dashboard Features

1. **Summary Cards**
   - Total issues, resolution rate, avg time, hotspots

2. **Ward Performance Table**
   - Click column headers to sort
   - See color-coded performance indicators
   - Track resolution rates per ward

3. **Hotspots Section**
   - Auto-identified problem areas
   - Severity levels: Low, Medium, High, Critical
   - Categories affected

4. **Category Performance**
   - Visual progress bars
   - Resolution metrics per type
   - Identify bottlenecks

5. **Export**
   - Click "Export" button
   - Downloads CSV with all data
   - Open in Excel/Sheets

### Notification Features

**Email Templates Include**:
- 📧 Beautiful HTML design
- 🎨 Color-coded status badges
- 🔗 Direct links to issues
- 📱 Mobile responsive
- 🌙 Dark mode support

**Types of Notifications**:
1. Status Change - Blue theme
2. Resolution - Green theme with celebration
3. Comment - Blue with comment box
4. Assignment - Orange with urgent styling

### Transparency Features

**Public Dashboard Shows**:
- 📊 4 key metric cards
- 📍 Ward performance table
- 📈 Category breakdown with icons
- ✅ Recent 10 resolutions
- 👥 Community impact stats

---

## 🛠️ Common Tasks

### View Analytics Report

```bash
# 1. Login as admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# 2. Get analytics (use token from login)
curl http://localhost:3000/api/analytics/impact-report \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Public Stats (No Auth)

```bash
curl http://localhost:3000/api/public/stats
```

### Trigger Notification

```bash
# Update issue status (use your token and issue ID)
curl -X PUT http://localhost:3000/api/issues/ISSUE_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"in-progress"}'

# Check server logs for: "Notification sent to..."
```

---

## 🔧 Configuration Options

### Minimal Setup (Development)

```env
# Only these are required for local dev
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Email notifications
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=CityPulse <noreply@citypulse.app>
```

### Full Setup (Production)

```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

# Uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset

# Auth
JWT_SECRET=your_secret_key

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email Notifications (Required)
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=CityPulse <notifications@yourdomain.com>

# SMS Notifications (Optional)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 📊 Sample Data

The app includes sample data with:
- 50+ issues across all wards
- Various statuses and categories
- Sample users (citizen, admin, authority)
- Comments and votes

**Sample Admin Login**:
```
Email: admin@citypulse.com
Password: Admin123!
```

---

## 🎨 Customization Quick Tips

### Change Transparency Page Colors

Edit `/app/transparency/page.tsx`:

```typescript
// Change gradient header
className="bg-gradient-to-r from-blue-600 to-purple-600"
// To your colors:
className="bg-gradient-to-r from-green-600 to-teal-600"
```

### Customize Email Templates

Edit `/lib/notifications.ts`:

```typescript
// Find generateEmailContent() function
// Modify HTML and CSS
// Change colors, fonts, layout
```

### Add New Analytics Metric

1. Calculate in `/lib/analytics.ts`:
```typescript
export function calculateNewMetric(issues: Issue[]): number {
  // Your calculation
  return result;
}
```

2. Add to API in `/app/api/analytics/impact-report/route.ts`:
```typescript
const newMetric = calculateNewMetric(allIssues);
// Add to response
```

3. Display in `/app/admin/analytics/page.tsx`:
```typescript
// Add new card or chart
```

---

## 🐛 Troubleshooting

### "Notifications not sending"

**Check**:
```bash
# 1. Verify env variable
echo $RESEND_API_KEY

# 2. Check server logs
npm run dev
# Look for: "Notification sent" or "Notification error"

# 3. Test Resend API key
curl https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"test@yourdomain.com","to":"you@email.com","subject":"Test","html":"Test"}'
```

**Solution**: 
- Verify API key is correct
- Check domain is verified in Resend
- In development, use test email addresses

### "Analytics page shows 403 Forbidden"

**Solution**: Login with admin or authority role
```typescript
// Check user role in localStorage
JSON.parse(localStorage.getItem('user'))?.role
```

### "Transparency page empty"

**Solution**: Add some issues first
```bash
# Go to /report and create a few test issues
# Or seed database with sample data
```

---

## 📖 Documentation Links

- **Full Documentation**: `NEW_FEATURES_DOCUMENTATION.md`
- **Implementation Details**: `FEATURES_IMPLEMENTATION_COMPLETE.md`
- **API Reference**: See NEW_FEATURES_DOCUMENTATION.md § API Reference
- **Troubleshooting**: See NEW_FEATURES_DOCUMENTATION.md § Troubleshooting

---

## 🚀 Production Deployment

### Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "feat: add analytics, notifications, and transparency"
git push

# 2. Deploy to Vercel
vercel --prod

# 3. Add environment variables in Vercel dashboard
# Settings → Environment Variables → Add all required vars

# 4. Redeploy
```

### Post-Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Resend API key configured
- [ ] Domain verified in Resend
- [ ] Test email notification works
- [ ] Analytics dashboard accessible
- [ ] Transparency page loads publicly
- [ ] CSV export works
- [ ] Mobile responsive on all pages

---

## 💡 Pro Tips

### For Admins

1. **Weekly Reports**: Export CSV every Monday to track progress
2. **Hotspot Monitoring**: Check hotspots daily, allocate resources
3. **Ward Comparison**: Use ward table to identify underperforming areas
4. **Category Focus**: Target categories with low resolution rates

### For Developers

1. **Notifications**: Test with `console.log` before enabling email
2. **Analytics**: Cache results for better performance
3. **Public Stats**: Already cached (5min), safe for high traffic
4. **Custom Metrics**: Add to `/lib/analytics.ts` utility functions

### For Citizens

1. **Transparency**: Share `/transparency` link on social media
2. **Notifications**: Ensure email is correct in profile
3. **Track Progress**: Check transparency page weekly
4. **Community Impact**: View your ward's performance

---

## 🎯 Next Steps

1. ✅ Features are installed and working
2. 📧 Configure email notifications (5 min)
3. 🧪 Test all three features (10 min)
4. 🎨 Customize branding (optional)
5. 🚀 Deploy to production
6. 📣 Share transparency page with community

---

## 📞 Need Help?

- **Documentation**: Read `NEW_FEATURES_DOCUMENTATION.md` (comprehensive guide)
- **API Issues**: Check server logs and console
- **Email Problems**: Verify Resend setup
- **Build Errors**: Run `npm run build` and check output

---

## ✅ Success Checklist

- [ ] App runs locally (`npm run dev`)
- [ ] Can access analytics dashboard
- [ ] Can view transparency page (no login)
- [ ] Email notification received on status change
- [ ] CSV export downloads successfully
- [ ] All pages mobile responsive
- [ ] No console errors

---

**You're all set! 🎉**

The three features are now live and ready to use. Start exploring:

1. 📊 **Analytics**: `/admin/analytics`
2. 🌐 **Transparency**: `/transparency`
3. 🔔 **Notifications**: Automatic (test by updating an issue)

Happy tracking! 🚀