# Database Fix Guide - OurStreet/CityPulse

## Problem Summary

Users have to create accounts repeatedly when registering as admin because the database Row Level Security (RLS) policies are too restrictive, preventing proper user persistence.

## Root Causes

1. **RLS Policies Too Restrictive**: The original RLS policies don't allow proper INSERT operations from unauthenticated users during registration
2. **Service Role Key Not Used**: User creation should use Supabase service role key to bypass RLS
3. **Missing Service Role Configuration**: The admin client wasn't properly configured

## What Has Been Fixed

### 1. Updated Supabase Client Configuration (`lib/supabase.ts`)
- ✅ Added `supabaseAdmin` client that uses service role key
- ✅ Added `getSupabaseClient()` helper function
- ✅ Proper warning messages for missing credentials

### 2. Updated Database Layer (`lib/db-supabase.ts`)
- ✅ User creation now uses `supabaseAdmin` to bypass RLS
- ✅ Added `getSupabaseAdmin()` helper function
- ✅ Falls back to regular client if service role not available

### 3. Created SQL Fix Script (`supabase/fix_rls_policies.sql`)
- ✅ Drops old restrictive policies
- ✅ Creates new permissive policies
- ✅ Includes test cases and verification
- ✅ Adds debugging views

## Step-by-Step Fix Instructions

### Step 1: Set Environment Variables

Add the following to your `.env.local` file:

```bash
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret (REQUIRED for auth)
JWT_SECRET=your_secure_jwt_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Gemini AI (for analytics)
GEMINI_API_KEY=your_gemini_api_key
```

#### How to Get Supabase Keys:

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Click on your project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **KEEP THIS SECRET!**

#### Generate JWT Secret:

```bash
# On macOS/Linux:
openssl rand -base64 32

# Or use Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 2: Run Database Schema (If Not Already Done)

In Supabase SQL Editor, run these in order:

1. **First, run the main schema:**
   ```sql
   -- Copy and paste contents of supabase/schema.sql
   ```

2. **Then, run the ward management schema:**
   ```sql
   -- Copy and paste contents of supabase/ward_management_schema.sql
   ```

### Step 3: Fix RLS Policies

In Supabase SQL Editor, run the fix script:

```sql
-- Copy and paste contents of supabase/fix_rls_policies.sql
```

This will:
- Drop old restrictive policies
- Create new permissive policies
- Test user creation
- Provide verification output

### Step 4: Verify Database Setup

Run these queries in Supabase SQL Editor to verify:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('users', 'issues', 'comments', 'votes');

-- Check RLS policies
SELECT schemaname, tablename, policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'users';

-- Test user insert (should succeed)
INSERT INTO users (name, email, password, role)
VALUES ('Test Admin', 'testadmin@example.com', '$2b$10$TestHashedPassword', 'admin')
RETURNING id, name, email, role;

-- Clean up test user
DELETE FROM users WHERE email = 'testadmin@example.com';
```

### Step 5: Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)

# Clear Next.js cache
rm -rf .next

# Install any missing dependencies
npm install

# Restart
npm run dev
```

### Step 6: Test Registration

1. **Go to signup page**: http://localhost:3000/signup
2. **Try registering as Admin**:
   - Full Name: Test Admin
   - Email: admin@test.com
   - Account Type: Administrator
   - Password: Test1234
   - Confirm Password: Test1234
3. **Click "Create Account"**
4. **Verify**:
   - You should be redirected to `/admin`
   - No errors in browser console
   - User persists after page refresh

### Step 7: Verify in Database

Check that the user was created:

```sql
-- In Supabase SQL Editor
SELECT id, name, email, role, created_at 
FROM users 
WHERE email = 'admin@test.com';
```

## Common Issues & Solutions

### Issue 1: "Supabase admin client not configured"

**Symptom**: Warning in console or users not persisting

**Solution**: 
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
- Restart your dev server after adding the key
- Verify the key is correct (it's longer than the anon key)

### Issue 2: "new row violates row-level security policy"

**Symptom**: User registration fails with RLS error

**Solution**:
1. Run `supabase/fix_rls_policies.sql` in Supabase SQL Editor
2. Verify policies with the verification queries above
3. Make sure grants are in place for `anon` and `authenticated` roles

### Issue 3: "User already exists" but can't login

**Symptom**: Registration says user exists, but login fails

**Solution**:
```sql
-- Check if user actually exists
SELECT * FROM users WHERE email = 'your@email.com';

-- If user exists but you can't login, delete and re-register
DELETE FROM users WHERE email = 'your@email.com';
```

### Issue 4: JWT_SECRET not set warning

**Symptom**: Warning about JWT_SECRET in console

**Solution**:
```bash
# Generate a secure secret
openssl rand -base64 32

# Add to .env.local
JWT_SECRET=<generated_secret>
```

### Issue 5: Users can't create issues/comments after registration

**Symptom**: Authenticated users get permission errors

**Solution**:
- Run the fix_rls_policies.sql script
- Make sure all tables have permissive policies
- Verify grants are in place

## Testing Checklist

- [ ] Environment variables are set correctly
- [ ] Database schema is created (users table exists)
- [ ] RLS policies have been fixed
- [ ] Service role key is configured
- [ ] Dev server has been restarted
- [ ] Can register as citizen
- [ ] Can register as admin
- [ ] Users persist after page refresh
- [ ] Can login with created account
- [ ] Can create issues after login
- [ ] Can create comments after login
- [ ] No RLS errors in Supabase logs

## Verify Everything Works

Run this comprehensive test:

```bash
# Test the signup endpoint directly
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test1234",
    "confirmPassword": "Test1234",
    "role": "admin"
  }'

# Expected response:
# {
#   "success": true,
#   "message": "Account created successfully",
#   "user": { ... },
#   "token": "..."
# }
```

## Database Monitoring

To monitor your database and catch issues:

```sql
-- Check recent users
SELECT id, name, email, role, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Check for duplicate emails
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Check active sessions (based on recent activity)
SELECT 
  u.id,
  u.name,
  u.email,
  u.role,
  COUNT(i.id) as issues_created
FROM users u
LEFT JOIN issues i ON i.user_id = u.id
GROUP BY u.id, u.name, u.email, u.role
ORDER BY u.created_at DESC;
```

## Additional Resources

- **Supabase RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security
- **Service Role Keys**: https://supabase.com/docs/guides/api/api-keys
- **Next.js Environment Variables**: https://nextjs.org/docs/basic-features/environment-variables

## Still Having Issues?

If you're still experiencing problems:

1. **Check Supabase Logs**:
   - Go to Supabase Dashboard
   - Click "Logs" → "Postgres Logs"
   - Look for RLS policy violations

2. **Check Browser Console**:
   - Open Developer Tools (F12)
   - Look for API errors
   - Check Network tab for failed requests

3. **Check Server Logs**:
   - Look at your terminal where `npm run dev` is running
   - Check for database connection errors
   - Look for authentication errors

4. **Nuclear Option - Fresh Start**:
   ```sql
   -- WARNING: This deletes ALL data!
   DROP TABLE IF EXISTS votes CASCADE;
   DROP TABLE IF EXISTS comments CASCADE;
   DROP TABLE IF EXISTS issues CASCADE;
   DROP TABLE IF EXISTS users CASCADE;
   
   -- Then re-run schema.sql and fix_rls_policies.sql
   ```

## Summary

The key fixes were:
1. ✅ Added service role Supabase client
2. ✅ Updated user creation to use admin client
3. ✅ Fixed RLS policies to be more permissive
4. ✅ Added proper error handling and fallbacks

Your users should now persist correctly when registering as admin or citizen!