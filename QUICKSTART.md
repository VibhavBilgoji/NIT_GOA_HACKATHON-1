# CityPulse - Quick Start Guide

Welcome to CityPulse! This guide will help you get started in 5 minutes.

---

## 📍 Important: Project Location

The main project is in the **root directory**, not in the `citypulse` subdirectory.

```bash
# ✅ CORRECT - Run commands here
cd /Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON

# ❌ WRONG - Don't run commands here
cd /Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON/citypulse
```

---

## 🚀 Quick Start (3 Steps)

### 1. Navigate to Project Root

```bash
cd /Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📁 Project Structure

```
NIT_GOA_HACKATHON/              ← YOU ARE HERE (run commands from here)
├── package.json                 ✅ Main package.json
├── next.config.ts              ✅ Next.js configuration
├── tsconfig.json               ✅ TypeScript configuration
├── app/                        ✅ Pages and API routes
│   ├── page.tsx                   → Home page
│   ├── login/page.tsx             → Login page
│   ├── signup/page.tsx            → Signup page
│   ├── map/page.tsx               → Interactive map
│   ├── dashboard/page.tsx         → Dashboard
│   └── api/                       → Backend API routes
│       ├── auth/
│       ├── issues/
│       ├── dashboard/
│       └── user/
├── components/                 ✅ React components
├── lib/                        ✅ Backend utilities
│   ├── db.ts                      → Database
│   ├── types.ts                   → TypeScript types
│   └── auth.ts                    → Authentication
└── citypulse/                  ⚠️ OLD subdirectory (ignore)
    └── node_modules/              (old dependencies)
```

---

## 🛠️ Available Commands

Run these from `/Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON`:

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🌐 Available Pages

Once the dev server is running:

| Page | URL | Description |
|------|-----|-------------|
| Home | http://localhost:3000 | Landing page |
| Login | http://localhost:3000/login | User login |
| Signup | http://localhost:3000/signup | User registration |
| Map | http://localhost:3000/map | Interactive issue map |
| Dashboard | http://localhost:3000/dashboard | Analytics dashboard |
| Team | http://localhost:3000/team | Team information |

---

## 🔌 API Endpoints

All API endpoints are accessible at `http://localhost:3000/api/*`

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Issues
- `GET /api/issues` - List all issues
- `POST /api/issues` - Create new issue (auth required)
- `GET /api/issues/[id]` - Get single issue
- `PUT /api/issues/[id]` - Update issue (auth required)
- `DELETE /api/issues/[id]` - Delete issue (auth required)

### Comments
- `GET /api/issues/[id]/comments` - Get issue comments
- `POST /api/issues/[id]/comments` - Add comment (auth required)
- `DELETE /api/issues/[id]/comments` - Delete comment (auth required)

### Votes
- `POST /api/issues/[id]/vote` - Toggle vote (auth required)
- `GET /api/issues/[id]/vote` - Check vote status

### Dashboard
- `GET /api/dashboard` - Get analytics (auth required)

### User
- `GET /api/user` - Get user profile (auth required)
- `PUT /api/user` - Update profile (auth required)
- `DELETE /api/user` - Delete account (auth required)

📖 **Full API Documentation**: See [API.md](./API.md)

---

## 🧪 Testing the API

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test1234","confirmPassword":"Test1234"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

**Get Issues:**
```bash
curl http://localhost:3000/api/issues
```

### Using Browser

Visit the pages directly:
- http://localhost:3000/signup - Sign up for an account
- http://localhost:3000/login - Login
- http://localhost:3000/map - Report and view issues

---

## 🗄️ Demo Data

The app comes with pre-seeded demo data:

### Demo Users
- **john@example.com** (password: any - demo mode)
- **jane@example.com** (password: any - demo mode)
- **admin@citypulse.com** (password: any - demo mode)

### Demo Issues
- 5 pre-created issues in Panjim, Goa
- Various categories: pothole, streetlight, garbage, water leak
- Different statuses: open, in-progress, resolved

**Note**: Data is stored in-memory and resets on server restart.

---

## 🚀 Deploying to Vercel

### Option 1: GitHub Integration (Recommended)

```bash
# 1. Commit your changes
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to vercel.com and import your GitHub repository
# 3. Vercel auto-detects Next.js and deploys!
```

### Option 2: Vercel CLI

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy to production
vercel --prod
```

**That's it!** Vercel handles everything automatically.

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Make sure you're in the correct directory
```bash
cd /Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON
npm install
```

### Issue: Port 3000 already in use
**Solution**: Kill the existing process or use a different port
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: Build errors
**Solution**: Clean and rebuild
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: "citypulse/package.json not found"
**Solution**: You're in the wrong directory! Go up one level:
```bash
cd ..
npm run dev
```

---

## 📚 Documentation

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md) (this file)
- **API Documentation**: [API.md](./API.md)
- **Backend Summary**: [BACKEND_SUMMARY.md](./BACKEND_SUMMARY.md)
- **Full README**: [README.md](./README.md)
- **Deployment Guide**: See README.md "Deployment" section

---

## 🆘 Need Help?

1. **Check the terminal** for error messages
2. **Read the error** carefully - it usually tells you what's wrong
3. **Check you're in the right directory**: `/Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON`
4. **Make sure dependencies are installed**: `npm install`
5. **Check the docs**: [API.md](./API.md) and [README.md](./README.md)

---

## 🎯 Next Steps

1. ✅ Start the dev server: `npm run dev`
2. ✅ Open http://localhost:3000
3. ✅ Explore the pages and API endpoints
4. ✅ Test signup/login functionality
5. ✅ Deploy to Vercel when ready

---

## 🌟 Quick Commands Cheat Sheet

```bash
# Navigate to project
cd /Users/vibhuporobo/Documents/GitHub/NIT_GOA_HACKATHON

# Development
npm run dev              # Start dev server
npm run build           # Build production
npm run start           # Start production server

# Check everything is working
curl http://localhost:3000                    # Home page
curl http://localhost:3000/api/issues        # API endpoint

# Deploy to Vercel
vercel                  # Deploy preview
vercel --prod          # Deploy production
```

---

<div align="center">
  <strong>You're all set! 🎉</strong>
  <br />
  <sub>Happy coding with CityPulse!</sub>
</div>