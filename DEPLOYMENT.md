# 🚀 Deployment Guide - CityPulse on Vercel with Supabase

Complete guide to deploy your CityPulse application to production using Vercel and Supabase.

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Vercel account (free tier is fine)
- [x] Supabase account with project set up
- [x] Code pushed to GitHub repository

---

## 🎯 Quick Deployment (10 minutes)

### Step 1: Prepare Supabase Database

1. **Go to your Supabase project:**
   ```
   https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   ```

2. **Run the database schema:**
   - Click **SQL Editor** in the left sidebar
   - Click **New Query**
   - Copy entire contents of `supabase/schema.sql`
   - Paste and click **Run**
   - Wait for success message

3. **Get your credentials:**
   - Go to **Settings** → **API**
   - Copy your **Project URL**
   - Copy your **anon public** key

### Step 2: Deploy to Vercel

#### Option A: One-Click Deploy (Easiest)

1. Click the button below:
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/NIT_GOA_HACKATHON)

2. When prompted, add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   JWT_SECRET=your_secure_random_string
   ```

3. Click **Deploy**

4. Wait 2-3 minutes for deployment

5. Click **Visit** to see your live app!

#### Option B: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel:**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import your repository:**
   - Click **Add New** → **Project**
   - Select your GitHub repository
   - Click **Import**

3. **Configure project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `next build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables:**
   Click **Environment Variables** and add:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://bceawmcnwvxvffhmwibp.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your_anon_key_from_supabase` |
   | `JWT_SECRET` | `your_secure_random_string` |

   **Important:** Check all three environments (Production, Preview, Development)

5. **Deploy:**
   - Click **Deploy**
   - Wait for build to complete (~2-3 minutes)
   - Get your live URL (e.g., `citypulse.vercel.app`)

#### Option C: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   # First time deployment
   vercel
   
   # Follow prompts and add environment variables when asked
   
   # Deploy to production
   vercel --prod
   ```

4. **Add environment variables via CLI:**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add JWT_SECRET
   ```

### Step 3: Verify Deployment

1. **Open your deployed app:**
   - Visit your Vercel URL (e.g., `https://citypulse.vercel.app`)

2. **Test authentication:**
   - Try logging in with demo account:
     - Email: `john@example.com`
     - Password: `Demo1234`

3. **Test creating an issue:**
   - Go to Report Issue page
   - Fill in the form
   - Submit

4. **Check Supabase:**
   - Go to Supabase Dashboard → Table Editor
   - Verify new data appears in tables

---

## 🔧 Configuration Details

### Environment Variables

#### Required Variables

```env
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# JWT Authentication
JWT_SECRET=your_secure_random_string
```

#### How to Generate JWT_SECRET

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### Vercel Project Settings

**Build & Development Settings:**
```
Framework: Next.js
Build Command: next build
Output Directory: .next
Install Command: npm install
Development Command: next dev
```

**Node.js Version:**
```
Node.js Version: 18.x or 20.x (auto-detected)
```

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Domains**
   - Click **Add**

2. **Enter your domain:**
   ```
   citypulse.com
   www.citypulse.com
   ```

3. **Configure DNS:**
   - Follow Vercel's instructions
   - Add DNS records to your domain registrar
   - Wait for DNS propagation (5-60 minutes)

4. **SSL Certificate:**
   - Vercel automatically provisions SSL
   - Your site will be available via HTTPS

---

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to GitHub, Vercel automatically:

1. **Deploy on push to `main` branch:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   # Vercel deploys automatically
   ```

2. **Preview deployments for branches:**
   ```bash
   git checkout -b feature-branch
   git push origin feature-branch
   # Vercel creates a preview URL
   ```

3. **Preview deployments for Pull Requests:**
   - Every PR gets its own preview URL
   - Perfect for testing before merging

### Deployment Notifications

Configure notifications in Vercel:
- **Settings** → **Notifications**
- Email, Slack, Discord, or webhook
- Get notified on deployment success/failure

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable Analytics:**
   - Go to your project in Vercel
   - Click **Analytics** tab
   - Click **Enable**

2. **What you get:**
   - Page views
   - Visitor demographics
   - Performance metrics (Web Vitals)
   - Real User Monitoring (RUM)

### Supabase Monitoring

1. **Monitor database:**
   - Supabase Dashboard → **Database**
   - View active connections, size, queries

2. **Monitor API usage:**
   - Supabase Dashboard → **Logs**
   - Filter by API, Auth, Realtime, Storage

3. **Set up alerts:**
   - Free tier: 500MB database, 2GB egress/month
   - Get email alerts at 80% usage

---

## 🐛 Troubleshooting

### Build Failures

**Error: "Module not found"**
```bash
# Solution: Make sure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "Environment variable not found"**
```
# Solution: Check Vercel environment variables
1. Go to Settings → Environment Variables
2. Verify all required variables are set
3. Redeploy from Deployments tab
```

### Runtime Errors

**Error: "Supabase credentials not found"**
```
Solution:
1. Verify NEXT_PUBLIC_SUPABASE_URL is set
2. Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is set
3. Check variable names (must match exactly)
4. Redeploy after adding variables
```

**Error: "relation does not exist"**
```
Solution:
1. Go to Supabase SQL Editor
2. Re-run schema.sql file
3. Verify tables in Table Editor
```

**Error: "Invalid JWT"**
```
Solution:
1. Make sure JWT_SECRET is set in Vercel
2. If you changed JWT_SECRET, users need to login again
3. Clear browser cookies and try again
```

### Performance Issues

**Slow API responses:**
```
Solutions:
1. Check Supabase query performance in Logs
2. Verify database indexes are created (check schema.sql)
3. Enable Vercel Edge Functions if needed
4. Consider upgrading Supabase plan for better performance
```

---

## 🔒 Security Checklist

Before going live:

- [ ] **Environment Variables**
  - [ ] All secrets are in Vercel environment variables (not in code)
  - [ ] JWT_SECRET is strong and random
  - [ ] No secrets committed to GitHub

- [ ] **Supabase Security**
  - [ ] Row Level Security (RLS) enabled on all tables
  - [ ] Using anon key (not service role key) in frontend
  - [ ] Database policies tested and working

- [ ] **HTTPS**
  - [ ] Vercel provides automatic HTTPS
  - [ ] All API calls use HTTPS
  - [ ] No mixed content warnings

- [ ] **Authentication**
  - [ ] Password requirements enforced
  - [ ] JWT tokens expire (7 days default)
  - [ ] No sensitive data in JWT payload

- [ ] **API Security**
  - [ ] Input validation on all endpoints
  - [ ] Rate limiting considered
  - [ ] Error messages don't leak sensitive info

---

## 📈 Scaling Considerations

### Vercel Limits (Hobby/Free Tier)

- **Bandwidth:** 100GB/month
- **Function Execution:** 100 GB-Hours
- **Function Duration:** 10s max
- **Build Minutes:** 6000/month
- **Deployments:** Unlimited

**When to upgrade:**
- Traffic exceeds 100GB/month
- Need longer function execution time
- Need team collaboration features

### Supabase Limits (Free Tier)

- **Database:** 500MB
- **File Storage:** 1GB
- **Bandwidth:** 2GB/month
- **API Requests:** 50,000/month

**When to upgrade:**
- Database size > 500MB
- Traffic > 2GB/month
- Need daily backups
- Need point-in-time recovery

---

## 🎯 Post-Deployment Checklist

After deployment:

- [ ] Test all main features
- [ ] Verify authentication works
- [ ] Check all API endpoints
- [ ] Test on mobile devices
- [ ] Verify map functionality
- [ ] Check performance (GTmetrix, Lighthouse)
- [ ] Set up monitoring/alerts
- [ ] Document production URL
- [ ] Update README with live URL
- [ ] Announce to team/users

---

## 🔄 Updating Your Deployment

### Making Changes

1. **Make changes locally:**
   ```bash
   # Edit your code
   npm run dev
   # Test locally
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```

3. **Automatic deployment:**
   - Vercel detects push
   - Builds and deploys automatically
   - Takes 2-3 minutes

4. **Rollback if needed:**
   - Go to Vercel Dashboard → Deployments
   - Find previous working deployment
   - Click "..." → "Promote to Production"

---

## 📞 Support Resources

### Documentation
- **CityPulse:** See project README.md, API.md, SUPABASE_SETUP.md
- **Vercel:** https://vercel.com/docs
- **Supabase:** https://supabase.com/docs
- **Next.js:** https://nextjs.org/docs

### Community
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com
- **Next.js Discussions:** https://github.com/vercel/next.js/discussions

### Status Pages
- **Vercel Status:** https://www.vercel-status.com
- **Supabase Status:** https://status.supabase.com

---

## ✅ Success Criteria

Your deployment is successful when:

- ✅ App is accessible via Vercel URL
- ✅ Login/signup works
- ✅ Users can create issues
- ✅ Users can comment and vote
- ✅ Dashboard shows statistics
- ✅ Map displays issues correctly
- ✅ No console errors
- ✅ Mobile-responsive
- ✅ HTTPS enabled
- ✅ Data persists in Supabase

---

## 🎉 You're Live!

Congratulations! Your CityPulse application is now deployed and accessible to users worldwide.

**Share your deployment:**
```
🏙️ CityPulse is live!
🌐 https://your-app.vercel.app
📊 Built with Next.js, Supabase, and TypeScript
🚀 Deployed on Vercel
```

---

**Last Updated:** January 2025  
**Status:** ✅ Production Ready  
**Deployment:** Vercel + Supabase  

---

<div align="center">
  <strong>Happy Deploying! 🚀</strong>
  <br />
  <sub>Made with ❤️ for CityPulse</sub>
</div>