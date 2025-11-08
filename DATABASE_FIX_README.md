# Database Fix - Quick Start Guide

## 🔥 Problem Fixed

**Issue**: Admin accounts had to be recreated every time - users weren't persisting in the database.

**Root Cause**: Supabase Row Level Security (RLS) policies were blocking user registration.

**Solution**: Updated code to use Supabase service role key for user creation, bypassing RLS restrictions.

---

## 🚀 Quick Fix (5 Minutes)

### Option 1: Automated Setup (Recommended)

```bash
# Run the quick fix script
./quick-fix.sh
```

This will guide you through:
1. Setting up environment variables
2. Installing dependencies
3. Verifying database schema
4. Starting the dev server

### Option 2: Manual Setup

1. **Add Service Role Key to `.env.local`:**

```bash
# Get this from Supabase Dashboard → Settings → API
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. **Run the SQL fix in Supabase:**

Copy and paste `supabase/fix_rls_policies.sql` into Supabase SQL Editor and run it.

3. **Restart your server:**

```bash
rm -rf .next
npm run dev
```

---

## 📋 What Was Changed

### Code Changes

1. **`lib/supabase.ts`**
   - Added `supabaseAdmin` client using service role key
   - Service role bypasses RLS for admin operations

2. **`lib/db-supabase.ts`**
   - User creation now uses admin client
   - Ensures users persist in database

3. **`supabase/fix_rls_policies.sql`** (NEW)
   - Fixed RLS policies to allow user registration
   - Made policies more permissive for signup flow

### Files Added

- ✅ `supabase/fix_rls_policies.sql` - Database policy fixes
- ✅ `quick-fix.sh` - Automated setup script
- ✅ `test-endpoints.sh` - Test all 26 API endpoints
- ✅ `DATABASE_FIX_GUIDE.md` - Detailed instructions
- ✅ `DATABASE_FIX_SUMMARY.md` - Technical summary
- ✅ `DATABASE_FIX_README.md` - This file

---

## ✅ Testing

### Manual Test

1. Go to http://localhost:3000/signup
2. Register as Admin:
   - Name: Test Admin
   - Email: admin@test.com
   - Account Type: Administrator
   - Password: Test1234
3. Verify you stay logged in after refresh ✓

### Automated Test

```bash
# Run comprehensive endpoint tests
./test-endpoints.sh
```

Expected output: **All tests passed! ✅**

---

## 🔑 Required Environment Variables

```bash
# .env.local

# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...  # ⚠️ NEW - Must add this!

# JWT (REQUIRED)
JWT_SECRET=generated_secret_here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get Supabase Keys:**
1. Go to https://app.supabase.com
2. Your Project → Settings → API
3. Copy all three keys

**Generate JWT Secret:**
```bash
openssl rand -base64 32
```

---

## 🐛 Troubleshooting

### "Users still not persisting"

**Fix:**
1. Check `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
2. Run `supabase/fix_rls_policies.sql` in Supabase SQL Editor
3. Restart dev server: `npm run dev`

### "RLS policy violation error"

**Fix:**
```sql
-- Run this in Supabase SQL Editor:
-- Copy entire contents of supabase/fix_rls_policies.sql
```

### "JWT_SECRET warning"

**Fix:**
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
JWT_SECRET=<generated_value>
```

---

## 📚 Documentation

- **Quick Start**: This file (DATABASE_FIX_README.md)
- **Detailed Guide**: DATABASE_FIX_GUIDE.md
- **Technical Summary**: DATABASE_FIX_SUMMARY.md
- **SQL Fixes**: supabase/fix_rls_policies.sql

---

## 🎯 Summary

**What you need to do:**

1. ✅ Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
2. ✅ Run `supabase/fix_rls_policies.sql` in Supabase
3. ✅ Restart your dev server
4. ✅ Test signup (users will now persist!)

**Time required:** ~5 minutes

**Scripts available:**
- `./quick-fix.sh` - Automated setup
- `./test-endpoints.sh` - Test everything

---

## ✨ Result

After applying this fix:
- ✅ Admin accounts persist properly
- ✅ Citizen accounts work correctly
- ✅ Users stay logged in after refresh
- ✅ No need to recreate accounts
- ✅ All 26 API endpoints working
- ✅ Database properly connected

---

**Questions?** Check DATABASE_FIX_GUIDE.md for detailed troubleshooting.

**Ready to start?** Run `./quick-fix.sh` now! 🚀