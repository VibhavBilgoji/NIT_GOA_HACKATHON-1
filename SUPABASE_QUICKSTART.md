# ⚡ Supabase Quick Start - CityPulse Backend

Get your CityPulse backend running with Supabase in **5 minutes**!

---

## 🎯 What You Need

- Supabase Project: `https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp`
- 5 minutes of your time

---

## 🚀 Setup Steps

### Step 1: Get Supabase Credentials (2 minutes)

1. Open your Supabase project dashboard:
   ```
   https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
   ```

2. Click **Settings** (gear icon) → **API**

3. Copy these values:
   - **Project URL**: `https://bceawmcnwvxvffhmwibp.supabase.co`
   - **anon public key**: (copy the long string under "anon public")

### Step 2: Create Environment File (1 minute)

1. In your project root, create `.env.local`:

   **Windows (PowerShell):**
   ```powershell
   New-Item .env.local
   ```

   **Mac/Linux:**
   ```bash
   touch .env.local
   ```

2. Open `.env.local` and paste:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
   JWT_SECRET=my_super_secret_jwt_key_change_in_production
   ```

   **Replace** `paste_your_anon_key_here` with your actual key from Step 1!

### Step 3: Setup Database Schema (2 minutes)

1. In Supabase dashboard, click **SQL Editor** (left sidebar)

2. Click **New Query**

3. Open the file `supabase/schema.sql` in your project

4. Copy **ALL** the content from `schema.sql`

5. Paste it into the Supabase SQL Editor

6. Click **Run** (or press `Ctrl+Enter`)

7. Wait for success message: ✅ "Success. No rows returned"

### Step 4: Start Your App

```bash
npm run dev
```

You should see:
```
✅ Using Supabase database
```

---

## 🧪 Test It Works

1. Open `http://localhost:3000`

2. Click **Login**

3. Use demo account:
   - **Email**: `john@example.com`
   - **Password**: `Demo1234`

4. Try creating an issue - it should save to Supabase!

5. Check your data in Supabase:
   - Go to **Table Editor** in Supabase dashboard
   - Click on `issues` table
   - See your new issue!

---

## 🎉 You're Done!

Your CityPulse app is now using Supabase as the database!

### What's Working Now:

✅ User authentication (signup/login)
✅ Issue creation and management
✅ Comments on issues
✅ Voting system
✅ Dashboard statistics
✅ Data persists across restarts
✅ Ready for production deployment

---

## 🚢 Deploy to Vercel (Optional)

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repo

3. Add the same environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://bceawmcnwvxvffhmwibp.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   JWT_SECRET=your_jwt_secret
   ```

4. Click **Deploy**

5. Your app is live! 🎉

---

## 📚 Next Steps

- Read full guide: `SUPABASE_SETUP.md`
- Deployment guide: `DEPLOYMENT.md`
- API documentation: `API.md`

---

## 🐛 Troubleshooting

### App still using in-memory database?

**Check:**
- ✅ `.env.local` exists in project root
- ✅ Both Supabase variables are set
- ✅ Restarted dev server (`Ctrl+C` then `npm run dev`)

### Can't login with demo account?

**Solution:** Run `schema.sql` again in Supabase SQL Editor

### "relation does not exist" error?

**Solution:** You didn't run `schema.sql` - go back to Step 3

---

## 💡 Tips

- `.env.local` is ignored by git (already in `.gitignore`)
- Never commit your Supabase keys to GitHub
- Use different Supabase projects for dev/staging/production
- Free tier gives you 500MB database and 2GB bandwidth/month

---

## 📞 Need Help?

1. Check `SUPABASE_SETUP.md` for detailed troubleshooting
2. View Supabase logs in dashboard → Logs
3. Check browser console for errors

---

**Made with ❤️ for CityPulse** | Next.js + Supabase + TypeScript