# 🚀 Supabase Setup Guide for CityPulse

This guide will walk you through setting up Supabase as the backend database for CityPulse.

## 📋 Prerequisites

- Supabase account (free tier is sufficient)
- Your Supabase project URL: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp

## 🎯 Quick Setup (5 minutes)

### Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard:
   ```
   https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   ```

2. Click on **Settings** (gear icon) in the left sidebar

3. Click on **API** section

4. Copy these two values:
   - **Project URL** (under "Project URL")
   - **anon public key** (under "Project API keys")

### Step 2: Create Environment Variables File

1. In your project root, create a `.env.local` file:
   ```bash
   # Windows Command Prompt
   type nul > .env.local
   
   # Windows PowerShell
   New-Item .env.local
   
   # Mac/Linux
   touch .env.local
   ```

2. Add your Supabase credentials to `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   
   # JWT Secret (optional - for enhanced security)
   JWT_SECRET=your_secure_random_string_here
   ```

   **Important:** Replace `your_anon_key_here` with your actual anon key from Step 1!

### Step 3: Set Up Database Schema

1. In your Supabase dashboard, click on **SQL Editor** in the left sidebar

2. Click **New Query**

3. Copy the entire contents of `supabase/schema.sql` from this project

4. Paste it into the SQL Editor

5. Click **Run** (or press Ctrl+Enter)

6. Wait for the success message: "Success. No rows returned"

That's it! Your database is now set up with:
- ✅ All tables (users, issues, comments, votes)
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for auto-updating fields
- ✅ Sample seed data for testing

### Step 4: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. You should see in the console:
   ```
   ✅ Using Supabase database
   ```

3. Open http://localhost:3000 and test:
   - Login with demo account: `john@example.com` / `Demo1234`
   - Create a new issue
   - Vote on issues
   - Add comments

## 🔒 Environment Variables Explained

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (safe for client) | Settings → API → anon public key |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | Secret for signing JWT tokens | Auto-generated fallback |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. The anon key is safe to expose as Supabase uses Row Level Security (RLS) for data protection.

## 📊 Database Schema Overview

### Tables

1. **users**
   - Stores user accounts (citizens, admins, authorities)
   - Password hashed with bcrypt
   - Auto-generates UUID for id

2. **issues**
   - Civic issues reported by users
   - Includes location (lat/lng), category, status, priority
   - Auto-tracks votes count
   - References user who created it

3. **comments**
   - User comments on issues
   - References both issue and user
   - Auto-ordered by creation time

4. **votes**
   - Tracks user votes on issues
   - Unique constraint per user+issue (can't vote twice)
   - Triggers auto-update vote count on issues

### Key Features

- **Auto-incrementing votes**: Votes table has triggers that automatically update the `votes` count on issues
- **Auto-timestamps**: `created_at` and `updated_at` are automatically managed
- **Cascade deletes**: Deleting an issue removes all its comments and votes
- **Row Level Security**: Only authenticated users can modify their own data

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

- **Users**: Can read all profiles, update own profile
- **Issues**: Anyone can read, authenticated users can create/update/delete own issues
- **Comments**: Anyone can read, authenticated users can create, users can delete own comments
- **Votes**: Anyone can read, authenticated users can vote, users can remove own votes

### Password Security

- Passwords are hashed using bcrypt with salt rounds = 10
- Never stored or transmitted in plain text
- API never returns password field to clients

### JWT Tokens

- Generated on login/signup
- Include user ID, email, and role
- Expire after 7 days
- Used for all authenticated API calls

## 🚀 Deployment to Vercel

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL = https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key_here
   JWT_SECRET = your_secure_random_string_here
   ```

4. Select which environments to apply to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Click **Save**

### Step 2: Deploy

```bash
# If using Vercel CLI
vercel --prod

# Or push to GitHub (if connected to Vercel)
git add .
git commit -m "Add Supabase integration"
git push origin main
```

Vercel will automatically:
- Detect your Next.js app
- Use environment variables
- Deploy your backend API routes as serverless functions
- Enable automatic HTTPS
- Set up CDN for static assets

## 📝 API Endpoints

All API endpoints work automatically with Supabase. No code changes needed!

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Issues
- `GET /api/issues` - List all issues (with filters)
- `POST /api/issues` - Create new issue (auth required)
- `GET /api/issues/[id]` - Get single issue
- `PUT /api/issues/[id]` - Update issue (owner only)
- `DELETE /api/issues/[id]` - Delete issue (owner only)

### Comments
- `GET /api/issues/[id]/comments` - Get comments for issue
- `POST /api/issues/[id]/comments` - Add comment (auth required)
- `DELETE /api/issues/[id]/comments` - Delete comment (owner only)

### Votes
- `GET /api/issues/[id]/vote` - Check if user voted
- `POST /api/issues/[id]/vote` - Toggle vote (auth required)

### Dashboard
- `GET /api/dashboard` - Get statistics (auth required)

### User Profile
- `GET /api/user` - Get current user profile (auth required)
- `PUT /api/user` - Update profile (auth required)
- `DELETE /api/user` - Delete account (auth required)

## 🧪 Testing

### Demo Accounts (from seed data)

1. **Regular User 1**
   - Email: `john@example.com`
   - Password: `Demo1234`

2. **Regular User 2**
   - Email: `jane@example.com`
   - Password: `Demo1234`

3. **Admin User**
   - Email: `admin@citypulse.com`
   - Password: `Admin1234`

### Test Scenarios

1. **User Registration**
   ```bash
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "Test1234",
       "confirmPassword": "Test1234"
     }'
   ```

2. **Login**
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "Demo1234"
     }'
   ```

3. **Create Issue** (use token from login)
   ```bash
   curl -X POST http://localhost:3000/api/issues \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE" \
     -d '{
       "title": "Test Issue",
       "description": "This is a test issue for Supabase",
       "category": "pothole",
       "location": "Test Location, Goa",
       "coordinates": {"lat": 15.4909, "lng": 73.8278}
     }'
   ```

## 🔄 Switching Between In-Memory and Supabase

The app automatically detects whether Supabase is configured:

**With Supabase** (environment variables set):
```
✅ Using Supabase database
```

**Without Supabase** (no environment variables):
```
⚠️ Using in-memory database (data will be lost on restart)
💡 To use Supabase, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

To switch back to in-memory mode:
1. Remove or comment out the Supabase environment variables in `.env.local`
2. Restart the dev server

## 📊 Monitoring Your Database

### Supabase Dashboard Features

1. **Table Editor**
   - View/edit data in tables
   - Path: Database → Table Editor

2. **SQL Editor**
   - Run custom queries
   - Path: SQL Editor

3. **Database**
   - View schema, relationships, indexes
   - Path: Database → Schema Visualizer

4. **Logs**
   - View API logs and errors
   - Path: Logs → API Logs

5. **API Docs**
   - Auto-generated API documentation
   - Path: API Docs

## 🐛 Troubleshooting

### Error: "Supabase credentials not found"

**Solution:** Make sure you have:
1. Created `.env.local` file in project root
2. Added both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restarted your dev server after adding variables

### Error: "relation does not exist"

**Solution:** You haven't run the schema.sql file:
1. Go to Supabase SQL Editor
2. Run the entire `supabase/schema.sql` file
3. Verify all tables are created in Table Editor

### Error: "row level security policy violation"

**Solution:** RLS policies might not be set up:
1. Re-run the schema.sql file (it includes RLS policies)
2. Or disable RLS temporarily for testing (not recommended for production)

### Error: "Invalid API key"

**Solution:** 
1. Verify you're using the **anon** key, not the service role key
2. Check for extra spaces or line breaks in the key
3. Make sure the key is from the correct project

### App still using in-memory database

**Solution:**
1. Check that environment variables are in `.env.local` (not `.env`)
2. Restart dev server: Stop (Ctrl+C) and run `npm run dev` again
3. Check console for "✅ Using Supabase database" message

### "Cannot read properties of undefined" errors

**Solution:** 
1. Async/await issue - make sure all database operations use `await`
2. Clear Next.js cache: Delete `.next` folder and rebuild

## 💡 Best Practices

### Development

1. **Use `.env.local` for local development**
   - Never commit this file
   - It's already in `.gitignore`

2. **Use demo accounts for testing**
   - Don't create too many test accounts
   - Clean up test data periodically

3. **Monitor your queries**
   - Check Supabase logs for slow queries
   - Use indexes appropriately

### Production

1. **Rotate JWT secrets**
   - Use strong, random strings
   - Rotate periodically for security

2. **Monitor usage**
   - Free tier: 500MB database, 2GB bandwidth/month
   - Upgrade if you exceed limits

3. **Backup your data**
   - Supabase auto-backups on paid plans
   - Export important data regularly on free tier

4. **Use environment-specific projects**
   - Separate Supabase projects for dev/staging/prod
   - Never test in production database

## 🎓 Learn More

### Supabase Documentation
- Main docs: https://supabase.com/docs
- JavaScript client: https://supabase.com/docs/reference/javascript
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security

### CityPulse Documentation
- API Documentation: See `API.md`
- Backend Summary: See `BACKEND_SUMMARY.md`
- Quick Start: See `QUICKSTART.md`

## ✅ Checklist

Before deploying to production:

- [ ] Supabase project created
- [ ] Schema.sql executed successfully
- [ ] Environment variables configured (local and Vercel)
- [ ] Tested all API endpoints
- [ ] Tested authentication flow
- [ ] Verified RLS policies working
- [ ] JWT secret is strong and secure
- [ ] Removed any test data
- [ ] Monitored for errors in Supabase logs
- [ ] App deployed to Vercel
- [ ] Production URL tested

## 🆘 Support

If you encounter issues:

1. Check this guide's Troubleshooting section
2. Check Supabase logs in dashboard
3. Review browser console for errors
4. Check Next.js server logs
5. Search Supabase Discord/community

---

**Last Updated:** January 2025
**Status:** ✅ Production Ready
**Supabase Project:** https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp

---

<div align="center">
  <strong>Built with ❤️ for CityPulse</strong>
  <br />
  <sub>Next.js • Supabase • TypeScript</sub>
</div>