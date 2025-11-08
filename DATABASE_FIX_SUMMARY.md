# Database Fix Summary - OurStreet/CityPulse

## 🎯 Problem Solved

**Issue**: Users had to create accounts repeatedly when registering as admin because the database Row Level Security (RLS) policies were preventing proper user persistence.

**Root Cause**: 
- Supabase RLS policies were too restrictive for anonymous user registration
- Service role key was not being used for administrative database operations
- User creation was using the public anon key which has limited permissions

## ✅ What Was Fixed

### 1. Enhanced Supabase Client Configuration
**File**: `lib/supabase.ts`

**Changes**:
- ✅ Added `supabaseAdmin` client using service role key
- ✅ Added `getSupabaseClient()` helper function
- ✅ Service role client bypasses RLS for admin operations
- ✅ Proper fallback and warning messages

### 2. Updated Database Layer
**File**: `lib/db-supabase.ts`

**Changes**:
- ✅ User creation now uses `supabaseAdmin` instead of regular client
- ✅ Added `getSupabaseAdmin()` helper function
- ✅ Graceful fallback to regular client if service role not configured
- ✅ All user CRUD operations properly handled

### 3. Fixed RLS Policies
**File**: `supabase/fix_rls_policies.sql`

**Changes**:
- ✅ Dropped old restrictive RLS policies
- ✅ Created new permissive policies that allow:
  - Public user registration (INSERT)
  - Public user profile reading (SELECT)
  - Authenticated profile updates (UPDATE)
  - Self-deletion of accounts (DELETE)
- ✅ Fixed policies for issues, comments, and votes tables
- ✅ Added verification and test queries
- ✅ Created `user_profiles` view for debugging

### 4. Updated Main Schema
**File**: `supabase/schema.sql`

**Changes**:
- ✅ Updated RLS policy names for clarity
- ✅ Added service role bypass policy
- ✅ Improved policy documentation

### 5. Created Comprehensive Documentation
**New Files**:
- ✅ `DATABASE_FIX_GUIDE.md` - Step-by-step fix instructions
- ✅ `test-endpoints.sh` - Automated endpoint testing script
- ✅ `DATABASE_FIX_SUMMARY.md` - This file

## 🚀 How to Apply the Fix

### Step 1: Set Environment Variables

Add to `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret
JWT_SECRET=your_secure_jwt_secret_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Get your Supabase keys**:
1. Go to https://app.supabase.com
2. Select your project
3. Go to Settings → API
4. Copy the keys

**Generate JWT secret**:
```bash
openssl rand -base64 32
```

### Step 2: Run Database Migrations

In Supabase SQL Editor, execute in this order:

1. **Main Schema** (if not already done):
   ```sql
   -- Copy and paste: supabase/schema.sql
   ```

2. **RLS Policy Fix** (REQUIRED):
   ```sql
   -- Copy and paste: supabase/fix_rls_policies.sql
   ```

3. **Ward Management** (optional, for analytics features):
   ```sql
   -- Copy and paste: supabase/ward_management_schema.sql
   ```

### Step 3: Restart Development Server

```bash
# Stop current server (Ctrl+C)
rm -rf .next
npm install
npm run dev
```

### Step 4: Test the Fix

#### Manual Test:
1. Go to http://localhost:3000/signup
2. Register as Admin:
   - Name: Test Admin
   - Email: admin@test.com
   - Account Type: Administrator
   - Password: Test1234
3. Verify you're redirected and stay logged in after refresh

#### Automated Test:
```bash
# Run the comprehensive test suite
./test-endpoints.sh
```

This tests all 26 API endpoints including:
- ✅ Health checks
- ✅ User registration (citizen & admin)
- ✅ Login/authentication
- ✅ Issue creation, reading, updating
- ✅ Comments and voting
- ✅ Dashboard stats
- ✅ Admin endpoints
- ✅ Access control

### Step 5: Verify in Database

```sql
-- Check that users are being created
SELECT id, name, email, role, created_at 
FROM users 
ORDER BY created_at DESC 
LIMIT 10;

-- Check RLS policies
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'users';
```

## 🔍 Key Technical Details

### How Service Role Key Works

```typescript
// Before (using anon key - limited by RLS)
const { data, error } = await supabase
  .from('users')
  .insert({ ...userData })

// After (using service role - bypasses RLS)
const { data, error } = await supabaseAdmin
  .from('users')
  .insert({ ...userData })
```

### RLS Policy Structure

```sql
-- Old (too restrictive)
CREATE POLICY "Users can insert profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id); -- Fails for new users!

-- New (permissive for registration)
CREATE POLICY "public_insert_users" ON users
  FOR INSERT WITH CHECK (true); -- API handles validation
```

### Security Considerations

✅ **Safe**:
- Service role key only used server-side (in API routes)
- Never exposed to client/browser
- API layer still validates all inputs
- RLS still protects against unauthorized updates/deletes

❌ **Not Safe**:
- Using service role key in client-side code
- Exposing service role key in environment variables accessible to browser
- Disabling RLS completely

## 🧪 Testing Checklist

Use this checklist to verify everything works:

- [ ] Environment variables set correctly
- [ ] Database schema created (users table exists)
- [ ] RLS policies fixed (run fix_rls_policies.sql)
- [ ] Service role key configured in .env.local
- [ ] Development server restarted
- [ ] Can register as citizen
- [ ] Can register as admin
- [ ] Users persist after page refresh
- [ ] Can login with created accounts
- [ ] Can create issues after login
- [ ] Can add comments to issues
- [ ] Can vote on issues
- [ ] Admin can access admin panel
- [ ] Citizens cannot access admin endpoints
- [ ] No RLS errors in Supabase logs
- [ ] No console errors in browser
- [ ] Automated test script passes

## 📊 Expected Test Results

After running `./test-endpoints.sh`, you should see:

```
========================================
  Test Results Summary
========================================

Total Tests:  25+
Passed:       25+
Failed:       0

✅ All tests passed!

Your database and all API endpoints are working correctly!
```

## 🔧 Troubleshooting

### Issue: "Supabase admin client not configured"

**Solution**: Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and restart server

### Issue: "new row violates row-level security policy"

**Solution**: Run `supabase/fix_rls_policies.sql` in Supabase SQL Editor

### Issue: Users created but can't login

**Solution**: 
```sql
-- Check if user exists
SELECT * FROM users WHERE email = 'your@email.com';

-- If password is not properly hashed, delete and re-register
DELETE FROM users WHERE email = 'your@email.com';
```

### Issue: "JWT_SECRET not set" warning

**Solution**:
```bash
# Generate secure secret
openssl rand -base64 32

# Add to .env.local
JWT_SECRET=<generated_secret>
```

### Issue: Endpoint tests fail

**Solution**:
1. Check server is running: `npm run dev`
2. Check database is accessible in Supabase
3. Verify environment variables are set
4. Check Supabase logs for errors

## 📁 Files Changed

### Modified Files:
1. `lib/supabase.ts` - Added admin client
2. `lib/db-supabase.ts` - Uses admin client for user ops
3. `supabase/schema.sql` - Updated RLS policies

### New Files:
1. `supabase/fix_rls_policies.sql` - RLS fix script
2. `DATABASE_FIX_GUIDE.md` - Detailed guide
3. `test-endpoints.sh` - Test automation
4. `DATABASE_FIX_SUMMARY.md` - This summary

## 🎓 What You Learned

1. **Supabase RLS Policies**: Understanding when to use permissive vs restrictive policies
2. **Service Role vs Anon Key**: When to use each type of Supabase client
3. **Server-side Operations**: How to safely bypass RLS for admin operations
4. **Security Best Practices**: Protecting sensitive keys while maintaining functionality
5. **Testing Strategies**: Automated endpoint testing for CI/CD

## 🚦 Next Steps

### Immediate:
1. ✅ Apply the fix following Step 1-5 above
2. ✅ Run test script to verify
3. ✅ Test manually by registering users

### Recommended:
1. 📝 Set up proper admin invitation system (don't allow public admin signup in production)
2. 🔒 Add email verification for new accounts
3. 📊 Set up monitoring for failed signup attempts
4. 🧪 Add E2E tests for critical user flows
5. 📚 Document your deployment process

### Production Considerations:
1. 🔐 Rotate JWT_SECRET regularly
2. 🚫 Disable public admin signup (require invite codes)
3. 📧 Enable email verification
4. 🛡️ Add rate limiting for signup endpoint
5. 📝 Set up audit logging for user creation
6. 🔍 Monitor Supabase logs for suspicious activity
7. 💾 Set up automated database backups

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Service Role Keys Guide](https://supabase.com/docs/guides/api/api-keys)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [DATABASE_FIX_GUIDE.md](./DATABASE_FIX_GUIDE.md) - Detailed instructions

## ✨ Summary

Your database is now properly configured with:
- ✅ Service role client for admin operations
- ✅ Permissive RLS policies for user registration
- ✅ Secure JWT-based authentication
- ✅ Comprehensive test coverage
- ✅ Detailed documentation

Users can now register as admin or citizen and their accounts will persist correctly!

---

**Need Help?** Check the detailed [DATABASE_FIX_GUIDE.md](./DATABASE_FIX_GUIDE.md) for troubleshooting steps.