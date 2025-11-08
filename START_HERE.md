# 🚀 START HERE - CityPulse Backend Setup

## ✅ What's Been Done

Your CityPulse application now has a **complete, production-ready backend** integrated with Supabase!

All API endpoints are working and ready to deploy. The implementation is complete.

---

## 🎯 Next Steps (5 Minutes to Get Running)

### Step 1: Install Dependencies

```bash
npm install
```

**Note:** `@supabase/supabase-js` has already been added to your `package.json`.

### Step 2: Setup Supabase

#### 2.1 Get Your Credentials

1. Go to your Supabase project:
   ```
   https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   ```

2. Click **Settings** (⚙️) → **API**

3. Copy these two values:
   - **Project URL**: `https://bceawmcnwvxvffhmwibp.supabase.co`
   - **anon public key**: (long string under "Project API keys")

#### 2.2 Create Environment File

Create a file named `.env.local` in your project root:

**Windows (PowerShell):**
```powershell
New-Item .env.local
notepad .env.local
```

**Mac/Linux:**
```bash
touch .env.local
nano .env.local
```

#### 2.3 Add Your Credentials

Paste this into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_actual_anon_key_here
JWT_SECRET=change_this_to_a_secure_random_string_in_production
```

**⚠️ IMPORTANT:** Replace `paste_your_actual_anon_key_here` with your actual key from Step 2.1!

### Step 3: Setup Database Schema

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)

2. Click **New Query**

3. Open the file `supabase/schema.sql` from your project

4. Copy **ALL** the content (it's about 240 lines)

5. Paste it into the Supabase SQL Editor

6. Click **Run** (or press `Ctrl+Enter`)

7. Wait for: ✅ **"Success. No rows returned"**

### Step 4: Start Your App

```bash
npm run dev
```

**Look for this in the console:**
```
✅ Using Supabase database
```

If you see this instead:
```
⚠️ Using in-memory database (data will be lost on restart)
```
→ Go back to Step 2 and make sure `.env.local` is configured correctly.

### Step 5: Test It!

1. Open `http://localhost:3000`

2. Click **Login**

3. Use demo account:
   - Email: `john@example.com`
   - Password: `Demo1234`

4. Try creating an issue - it will save to Supabase!

5. Verify in Supabase:
   - Dashboard → **Table Editor** → `issues` table
   - You should see your new issue!

---

## 🎉 You're Done!

Your backend is now fully functional with:

✅ Real PostgreSQL database (via Supabase)
✅ User authentication (JWT-based)
✅ All CRUD operations for issues
✅ Comments and voting system
✅ Dashboard statistics
✅ Production-ready and scalable

---

## 📚 Documentation

- **Quick Setup** (this file)
- **Detailed Supabase Setup**: `SUPABASE_SETUP.md` (460 lines)
- **Deployment Guide**: `DEPLOYMENT.md` (508 lines)
- **API Documentation**: `API.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`

---

## 🚢 Deploy to Production (Optional)

Ready to deploy? It takes just 10 minutes:

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add Supabase backend"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and import your repo

3. Add the same 3 environment variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`

4. Click **Deploy**

5. Your app is live! 🎉

**Full deployment guide:** See `DEPLOYMENT.md`

---

## 🐛 Troubleshooting

### Issue: App still using in-memory database

**Check:**
1. `.env.local` exists in project root (not in a subfolder)
2. Both Supabase variables are set (no typos)
3. Restart dev server: Stop (`Ctrl+C`) and run `npm run dev` again

### Issue: Can't login with demo account

**Solution:** 
- Run the `schema.sql` file again in Supabase SQL Editor
- It includes seed data with demo accounts

### Issue: "relation does not exist" error

**Solution:**
- You didn't run `schema.sql` - go back to Step 3

### Issue: Build errors with TypeScript

**Solution:**
```bash
# Delete build cache and rebuild
rm -rf .next
npm run build
```

---

## 💡 What's Working

All these API endpoints are fully functional:

**Authentication:**
- ✅ `POST /api/auth/signup` - Register new user
- ✅ `POST /api/auth/login` - Login user

**Issues:**
- ✅ `GET /api/issues` - List issues (filters, search, pagination)
- ✅ `POST /api/issues` - Create issue
- ✅ `GET /api/issues/[id]` - Get single issue
- ✅ `PUT /api/issues/[id]` - Update issue
- ✅ `DELETE /api/issues/[id]` - Delete issue

**Comments:**
- ✅ `GET /api/issues/[id]/comments` - Get comments
- ✅ `POST /api/issues/[id]/comments` - Add comment
- ✅ `DELETE /api/issues/[id]/comments` - Delete comment

**Votes:**
- ✅ `GET /api/issues/[id]/vote` - Check vote status
- ✅ `POST /api/issues/[id]/vote` - Toggle vote

**Dashboard & User:**
- ✅ `GET /api/dashboard` - Get statistics
- ✅ `GET /api/user` - Get user profile
- ✅ `PUT /api/user` - Update profile
- ✅ `DELETE /api/user` - Delete account

---

## 📊 Database Schema

Your Supabase database includes:

**Tables:**
- `users` - User accounts with authentication
- `issues` - Civic issues with location data
- `comments` - User comments on issues
- `votes` - User votes (one per user per issue)

**Features:**
- 🔒 Row Level Security (RLS) enabled
- 🚀 Optimized with indexes
- ⚡ Auto-updating triggers
- 🔄 Cascade deletes
- 📊 Statistics view

---

## 🔐 Security

✅ **Passwords** - Hashed with bcrypt
✅ **JWT Tokens** - Expire after 7 days
✅ **Row Level Security** - Users can only modify their own data
✅ **HTTPS** - Automatic with Vercel deployment
✅ **API Validation** - Input sanitization on all endpoints

---

## 💰 Costs

**Development & Small Projects:**
- ✅ Supabase Free Tier: 500MB database, 2GB bandwidth/month
- ✅ Vercel Free Tier: 100GB bandwidth, unlimited deployments
- **Total Cost: $0**

**Production Scale:**
- Upgrade when you exceed free tier limits
- Both platforms have affordable paid plans

---

## 📞 Need Help?

1. **Quick Reference**: This file (you're reading it!)
2. **Detailed Setup**: `SUPABASE_SETUP.md`
3. **Deployment**: `DEPLOYMENT.md`
4. **API Docs**: `API.md`
5. **Check Logs**:
   - Browser Console (F12)
   - Supabase Dashboard → Logs
   - Vercel Dashboard → Functions

---

## ✅ Checklist

Before moving forward:

- [ ] Installed dependencies (`npm install`)
- [ ] Created `.env.local` with Supabase credentials
- [ ] Ran `schema.sql` in Supabase SQL Editor
- [ ] Started dev server (`npm run dev`)
- [ ] Saw "✅ Using Supabase database" in console
- [ ] Successfully logged in with demo account
- [ ] Tested creating an issue
- [ ] Verified data appears in Supabase Table Editor

**All done?** You're ready to develop or deploy! 🚀

---

## 🎯 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
```

---

## 📁 Important Files

```
📂 Your Project
├── 📄 START_HERE.md           ← You are here!
├── 📄 SUPABASE_QUICKSTART.md  ← 5-minute guide
├── 📄 SUPABASE_SETUP.md       ← Complete setup (460 lines)
├── 📄 DEPLOYMENT.md           ← Vercel deployment (508 lines)
├── 📄 .env.local              ← Create this! (your credentials)
├── 📄 .env.local.example      ← Template for .env.local
├── 📂 supabase/
│   └── 📄 schema.sql          ← Run this in Supabase SQL Editor!
├── 📂 lib/
│   ├── 📄 supabase.ts         ← Supabase client config
│   ├── 📄 db-supabase.ts      ← Database operations (Supabase)
│   ├── 📄 db-memory.ts        ← Fallback (in-memory)
│   └── 📄 db.ts               ← Smart wrapper (auto-detects)
└── 📂 app/api/                ← All API routes (working!)
```

---

**Status:** ✅ Complete and Production Ready  
**Last Updated:** January 2025  
**Time to Setup:** 5 minutes  
**Cost:** $0 (free tiers)

---

<div align="center">
  <strong>🎉 Happy Building! 🎉</strong>
  <br /><br />
  <sub>Built with Next.js • Supabase • TypeScript</sub>
  <br />
  <sub>Deployed on Vercel</sub>
  <br /><br />
  <em>Questions? Check SUPABASE_SETUP.md for detailed troubleshooting</em>
</div>