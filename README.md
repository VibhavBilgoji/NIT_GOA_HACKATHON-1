# OurStreet - Smart City Issue Reporting Platform

> A modern, serverless Next.js application for citizens to report local issues and authorities to manage them efficiently with real-time tracking, ward-wise analytics, and cloud-based photo management.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)](/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Testing Guide](#-testing-guide)
- [Troubleshooting](#-troubleshooting)
- [Tech Stack](#-tech-stack)

---

## 🌟 Features

### For Citizens
- 📍 **Report Issues** - Submit local problems with GPS location, photos, and category
- 🗺️ **Interactive Map** - View all reported issues on a real-time map
- 📊 **Track Progress** - Monitor status updates on your reported issues
- 👍 **Vote & Comment** - Support important issues and engage in discussions
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🏘️ **Ward Selection** - Select your specific ward/district for accurate tracking
- 📸 **Multi-Photo Upload** - Upload up to 5 photos per report

### For Authorities
- 🛡️ **Admin Dashboard** - Comprehensive admin panel with role-based access control
- 📈 **Ward Analytics** - Performance metrics and resolution rates per ward
- 👥 **User Management** - Manage user roles and permissions
- 🔄 **Bulk Operations** - Update multiple issues simultaneously
- 📊 **Performance Stats** - Real-time statistics and trend analysis
- 🖼️ **Before/After Photos** - Document issue resolution with photo comparisons

### Technical Features
- ⚡ **Serverless Architecture** - Next.js API routes for scalability
- 🔐 **JWT Authentication** - Secure token-based authentication
- ☁️ **Cloud Storage** - Cloudinary/Supabase storage for photo uploads
- 🎨 **Modern UI** - Shadcn/ui components with dark mode support
- 📱 **Responsive Design** - Mobile-first approach
- 🔍 **Advanced Filtering** - Filter by status, category, priority, and ward
- 🌐 **Geolocation** - Real-time GPS tracking for issue reporting

---

## 🔧 Recent Fixes & Improvements

### Build Status: ✅ **ALL ISSUES RESOLVED**
**Date**: 2024 | **Status**: Production Ready | **Build**: Passing with 0 errors

---

### 🎯 Overview

Successfully resolved **all merge conflicts** and ensured **all hover animations** work properly throughout the application without breaking existing functionality. The build now completes successfully with **zero errors**.

---

### 🔴 Critical Issues Fixed

#### 1. **Merge Conflicts (Build-Breaking)**

Found and resolved merge conflicts in **5 files** that were preventing the application from building:

| File | Issue | Resolution |
|------|-------|------------|
| `app/api/health/route.ts` | Triple merge conflict in JWT_SECRET validation | Kept "ourstreet-secret-key-change-in-production" branding |
| `app/report/page.tsx` | Grid layout conflict (3 vs 4 columns) + missing animations | Kept 3-column layout with hover animations |
| `app/transparency/page.tsx` | Button text conflict (CityPulse vs OurStreet) | Updated to "Join OurStreet Today" |
| `lib/analytics.ts` | Import statement formatting conflict | Kept multi-line import format |
| `lib/notifications.ts` | Email sender field formatting | Kept proper OurStreet email format |

**Result**: Build now completes successfully in ~10 seconds

---

#### 2. **Animation System - Conflicts Resolved**

**Issue**: Conflicting className props were overriding built-in NeonGradientCard animations

**Fixed in**: `app/page.tsx`
- Removed `className="transition-shadow hover:shadow-lg"` from 4 feature cards
- Component now handles all animations internally

**Built-in NeonGradientCard Animations**:
- ✨ Mouse-tracking gradient effect (preserved)
- 📈 Scale: `hover:scale-[1.02]` (2% growth)
- ⬆️ Lift: `hover:-translate-y-1` (-4px)
- 🌟 Shadow: `hover:shadow-2xl` (enhanced depth)
- ⏱️ Transition: `duration-300 ease-out` (smooth)
- 👆 Cursor: `cursor-pointer`

---

#### 3. **Consistent Animation Patterns Applied**

All card components now use consistent hover animations:

##### **Small Interactive Cards** (Stat boxes, KPIs)
```css
transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl cursor-pointer
```
**Applied in**: Admin analytics (4 cards), Map stats (4 cards), Report info cards (3 cards)

##### **Medium Cards** (List items)
```css
transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-lg cursor-pointer
```
**Applied in**: Map issue list items, selected states

##### **Large Content Cards** (Containers)
```css
transition-all duration-300 ease-out hover:shadow-lg
```
**Applied in**: Issue detail cards, form containers, chart cards

---

### 📊 Build Verification

#### Build Results:
```
✓ Compiled successfully in 10.4s
✓ TypeScript validation passed
✓ All 29 pages generated
✓ No errors (0)
✓ Warnings: 23 (non-breaking Tailwind v4 syntax suggestions)
```

#### Routes Verified:
- ✅ `/` (Home - NeonGradientCard animations)
- ✅ `/map` (Map - stat cards with BorderBeam)
- ✅ `/report` (Report - form + info cards)
- ✅ `/dashboard` (Dashboard - KPI cards)
- ✅ `/admin/analytics` (Analytics - chart cards)
- ✅ `/issues/[id]` (Issue details)
- ✅ `/transparency` (Transparency page)

---

### 🧪 Animation QA Checklist

#### Quick 5-Minute Test:

1. **Home Page** (`/`): Hover over 4 feature cards - should see mouse-tracking gradient, scale, lift, shadow
2. **Map Page** (`/map`): Hover over 4 stat cards - scale 3%, lift, shadow XL, BorderBeam animation
3. **Report Page** (`/report`): Hover over 3 info cards - scale 3%, lift, shadow XL
4. **Dashboard** (`/dashboard`): Hover over KPI cards - neon gradient + scale/lift effects
5. **Admin Analytics** (`/admin/analytics`): Hover over stat cards - scale 3%, lift, shadow XL

#### Expected Behavior:
- ✅ All animations: 300ms duration, ease-out easing
- ✅ No jitter, layout shifts, or conflicts
- ✅ Smooth GPU-accelerated transforms
- ✅ Consistent across all browsers/devices
- ✅ Dark mode compatible

#### Performance Check:
- ✅ No frame drops below 60fps
- ✅ No layout thrashing
- ✅ Animations clean up properly

---

### 🎨 Animation Design Principles

#### Scale Hierarchy:
- **1.02** = Subtle (list items, medium cards)
- **1.03** = Noticeable (stat cards, KPIs)

#### Shadow Hierarchy:
- **shadow-lg** = Standard depth
- **shadow-xl** = Enhanced depth
- **shadow-2xl** = Maximum depth (NeonGradientCard)

#### Special Effects:
- **NeonGradientCard**: Mouse-tracking gradient border
- **BorderBeam**: Animated border effects
- **Selected states**: Enhanced shadows without hover

---

### 💡 Key Takeaways

1. **Component-level animations** should be self-contained to avoid CSS conflicts
2. **Merge conflicts** can silently break builds - always check for `<<<<<<<`, `=======`, `>>>>>>>` markers
3. **Consistent animation patterns** improve UX and maintainability
4. **Build verification** is essential after resolving conflicts
5. **GPU acceleration** (transform, box-shadow) ensures smooth animations

---

### 📞 Support

If you encounter animation issues:
1. Check browser console for CSS warnings
2. Verify `npm run build` completes successfully
3. Test in multiple browsers (Chrome, Firefox, Safari)
4. Clear `.next` cache if styles don't update
5. Ensure no CSS specificity conflicts

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier) - **Recommended for production**
- Cloudinary account (optional, for photo uploads)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd NIT_GOA_HACKATHON

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
```

### Environment Setup

Create `.env.local` with the following:

```bash
# Supabase Configuration (Required for Production)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# JWT Secret (Required)
JWT_SECRET=your-super-secret-key-change-this-in-production

# Cloudinary Configuration (Optional - for photo uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Supabase Setup (5 Minutes)

1. **Create a Supabase project:**
   - Go to [supabase.com](https://supabase.com) and sign up
   - Create a new project
   - Wait 2-3 minutes for setup

2. **Get your credentials:**
   - Go to Settings → API
   - Copy **Project URL** and **anon public** key
   - Add to `.env.local`

3. **Set up database schema:**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/schema.sql`
   - Paste and run in SQL Editor
   - Wait for success message

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Check Connection:**
- ✅ Terminal shows: `✅ Using Supabase database` - You're connected!
- ⚠️ Terminal shows: `⚠️ Using in-memory database` - Check your `.env.local`

---

## 📁 Project Structure

```
NIT_GOA_HACKATHON/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes (Serverless)
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/route.ts
│   │   │   └── signup/route.ts
│   │   ├── issues/               # Issue CRUD operations
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   ├── admin/                # Admin-only endpoints
│   │   │   ├── issues/route.ts   # Admin issue management
│   │   │   ├── users/route.ts    # User management
│   │   │   └── stats/route.ts    # Ward analytics
│   │   ├── upload/route.ts       # Photo upload
│   │   ├── dashboard/route.ts    # Statistics
│   │   └── user/route.ts         # User profile
│   ├── admin/page.tsx            # Admin dashboard
│   ├── map/page.tsx              # Interactive map
│   ├── report/page.tsx           # Issue reporting form
│   ├── dashboard/page.tsx        # User dashboard
│   ├── settings/page.tsx         # User settings
│   ├── login/page.tsx            # Login page
│   ├── signup/page.tsx           # Signup page
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── ui/                       # Shadcn/ui components
│   ├── before-after-photos.tsx   # Photo gallery
│   ├── navbar.tsx                # Navigation
│   └── map-component.tsx         # Map integration
├── contexts/
│   └── auth-context.tsx          # Authentication state
├── lib/                          # Utilities
│   ├── types.ts                  # TypeScript types
│   ├── db.ts                     # Database wrapper
│   ├── db-supabase.ts            # Supabase operations
│   ├── db-memory.ts              # In-memory fallback
│   ├── auth.ts                   # JWT utilities
│   └── utils.ts                  # Helper functions
├── supabase/
│   ├── schema.sql                # Database schema
│   └── fix-passwords.sql         # Password fix script
└── public/                       # Static assets
```

---

## 🔌 API Documentation

### Base URL
- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

### Authentication
All authenticated endpoints require a Bearer token:
```
Authorization: Bearer <jwt_token>
```

---

### 🔐 Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  },
  "token": "jwt_token_here"
}
```

---

### 📝 Issue Endpoints

#### GET `/api/issues`
List all issues with optional filters.

**Query Parameters:**
- `status` - Filter by status (open, in-progress, resolved)
- `category` - Filter by category
- `priority` - Filter by priority (low, medium, high, critical)
- `ward` - Filter by ward/district
- `userId` - Filter by user ID
- `search` - Search in title/description
- `limit` - Results per page (default: 100)
- `offset` - Pagination offset (default: 0)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "issues": [
      {
        "id": "uuid",
        "title": "Pothole on Main Street",
        "description": "Large pothole causing issues",
        "status": "open",
        "category": "Road & Infrastructure",
        "priority": "high",
        "ward": "Panjim - Fontainhas",
        "coordinates": {
          "lat": 15.4909,
          "lng": 73.8278
        },
        "votes": 15,
        "beforePhotoUrls": ["url1", "url2"],
        "afterPhotoUrls": [],
        "userId": "uuid",
        "userName": "John Doe",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "total": 50,
    "limit": 100,
    "offset": 0
  }
}
```

#### POST `/api/issues`
Create a new issue (authenticated or guest).

**Request:**
```json
{
  "title": "Broken Street Light",
  "description": "Street light not working for 3 days",
  "category": "Street Lights",
  "priority": "medium",
  "ward": "Panjim - Miramar",
  "coordinates": {
    "lat": 15.4909,
    "lng": 73.8278
  },
  "photoUrls": ["url1", "url2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Issue reported successfully",
  "data": {
    "id": "uuid",
    "title": "Broken Street Light",
    "status": "open",
    // ... other fields
  }
}
```

#### GET `/api/issues/[id]`
Get a single issue by ID.

#### PUT `/api/issues/[id]`
Update an issue (authenticated, own issues only or admin).

#### DELETE `/api/issues/[id]`
Delete an issue (authenticated, own issues only or admin).

---

### 📊 Dashboard Endpoint

#### GET `/api/dashboard`
Get dashboard statistics (authenticated).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalIssues": 150,
    "openIssues": 45,
    "inProgressIssues": 30,
    "resolvedIssues": 75,
    "userIssues": 5,
    "categoryBreakdown": {
      "Road & Infrastructure": 40,
      "Street Lights": 25,
      "Waste Management": 35,
      // ...
    }
  }
}
```

---

### 🛡️ Admin Endpoints (Requires Admin/Authority Role)

#### GET `/api/admin/issues`
List all issues with admin view.

#### PATCH `/api/admin/issues`
Bulk update issues.

**Request:**
```json
{
  "issueIds": ["uuid1", "uuid2"],
  "updates": {
    "status": "in-progress",
    "priority": "high"
  }
}
```

#### GET `/api/admin/users`
List all users.

#### PATCH `/api/admin/users`
Update user roles.

#### DELETE `/api/admin/users`
Delete users.

#### GET `/api/admin/stats`
Get ward-wise analytics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "wardStats": [
      {
        "ward": "Panjim - Fontainhas",
        "totalIssues": 25,
        "openIssues": 8,
        "resolvedIssues": 15,
        "resolutionRate": 60,
        "avgResolutionTime": 5.2
      }
    ],
    "overall": {
      "totalIssues": 150,
      "avgResolutionTime": 6.5
    }
  }
}
```

---

### 📤 Upload Endpoint

#### POST `/api/upload`
Upload photos to cloud storage (Cloudinary or Supabase).

**Request (multipart/form-data):**
```
files: [File, File, ...]
```

**Response (200):**
```json
{
  "success": true,
  "urls": [
    "https://cloudinary.com/image1.jpg",
    "https://cloudinary.com/image2.jpg"
  ],
  "message": "Successfully uploaded 2 file(s)"
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Import"

3. **Add Environment Variables:**
   In Vercel project settings, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (optional)
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` (optional)

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- Render
- AWS Amplify
- Digital Ocean App Platform

---

## 🧪 Testing Guide

### Quick Test (No Setup Required)

The app works out-of-the-box with an in-memory database for testing!

```bash
npm install
npm run dev
```

### Test Scenarios

#### 1. Submit Issue WITHOUT Photo
1. Navigate to `/report`
2. Fill in the form (title, category, description 20+ chars)
3. Click "Capture Current Location"
4. Submit
5. **Expected:** Redirects to map with your issue

#### 2. Submit Issue WITH Photo
1. Navigate to `/report`
2. Fill in form
3. Upload photos (1-5 images)
4. Capture location
5. Submit
6. **Expected:** Photos upload, issue appears on map

#### 3. View Issues on Map
1. Navigate to `/map`
2. **Expected:** Map loads with markers
3. Click a marker
4. **Expected:** Issue details popup

#### 4. Admin Dashboard
1. Login as admin (see demo credentials below)
2. Navigate to `/admin`
3. **Expected:** See 3 tabs: Issues, Users, Ward Stats

### Demo Credentials

After running the database schema, use these accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@ourstreet.com | Admin1234 | admin |
| john@example.com | Demo1234 | citizen |
| jane@example.com | Demo1234 | citizen |

---

## 🐛 Troubleshooting

### "Using in-memory database" Warning

**Problem:** App not connecting to Supabase

**Solutions:**
1. Check `.env.local` exists (not `.env.example`)
2. Verify both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
3. Restart dev server: `npm run dev`
4. Check for typos in environment variables

### Login Fails with Demo Accounts

**Problem:** "Invalid email or password" error

**Solution:** Run the password fix script:
1. Open Supabase SQL Editor
2. Copy contents of `supabase/fix-passwords.sql`
3. Run in SQL Editor
4. Try logging in again

### "Supabase credentials not found" Error

**Problem:** Missing or invalid API keys

**Solutions:**
1. Go to Supabase Dashboard → Settings → API
2. Copy **Project URL** and **anon public** key
3. Add to `.env.local`
4. Restart server

### Photo Upload Fails

**Problem:** Photos not uploading

**Solutions:**
1. Check Cloudinary credentials in `.env.local`
2. Verify upload preset is set to "Unsigned" mode
3. Check browser console for errors
4. Ensure files are under 5MB

### Map Not Loading

**Solutions:**
1. Check browser console for errors
2. Verify MapTiler SDK is loading
3. Try hard refresh (Ctrl+Shift+R)
4. Check network connection

---

## 🔒 Security Features

1. **JWT Authentication** - Secure token-based auth
2. **Password Hashing** - bcrypt with 10 rounds
3. **Row Level Security** - Supabase RLS policies
4. **Role-Based Access** - Citizen, Authority, Admin roles
5. **Input Validation** - Server-side validation
6. **File Upload Security** - Type and size validation

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn/ui
- **Maps:** Leaflet + React-Leaflet
- **Icons:** Lucide React
- **State Management:** React Context API

### Backend
- **API:** Next.js API Routes (Serverless)
- **Authentication:** JWT + bcrypt
- **Database:** Supabase (PostgreSQL)
- **File Storage:** Cloudinary or Supabase Storage
- **Validation:** Zod

### DevOps
- **Hosting:** Vercel
- **Version Control:** Git + GitHub
- **Environment:** Node.js 18+
- **Package Manager:** npm

---

## 📊 Database Schema

### Tables

**users**
- id (UUID, primary key)
- name (text)
- email (text, unique)
- password (text, bcrypt hashed)
- role (enum: citizen, authority, admin)
- avatar (text, optional)
- created_at, updated_at (timestamps)

**issues**
- id (UUID, primary key)
- title (text)
- description (text)
- status (enum: open, in-progress, resolved)
- category (text)
- priority (enum: low, medium, high, critical)
- ward (text)
- coordinates (lat/lng)
- votes (integer)
- beforePhotoUrls (text array)
- afterPhotoUrls (text array)
- userId (UUID, foreign key)
- created_at, updated_at (timestamps)

**comments**
- id (UUID, primary key)
- issueId (UUID, foreign key)
- userId (UUID, foreign key)
- text (text)
- created_at (timestamp)

**votes**
- id (UUID, primary key)
- issueId (UUID, foreign key)
- userId (UUID, foreign key)
- created_at (timestamp)
- UNIQUE(issueId, userId)

---

## 📈 Features Overview

### Core Features (Phase 1)
- ✅ JWT-based authentication
- ✅ Issue reporting with GPS
- ✅ Interactive map view
- ✅ Issue CRUD operations
- ✅ Comments & voting
- ✅ User dashboard
- ✅ Settings page
- ✅ Responsive UI
- ✅ Dark mode

### Advanced Features (Phase 2)
- ✅ Admin dashboard (3 tabs)
- ✅ Role-based access control
- ✅ Multi-file upload (up to 5 photos)
- ✅ Before/after photo gallery
- ✅ Ward/district system (10 wards)
- ✅ Ward-wise analytics
- ✅ Bulk operations
- ✅ User management

---

## 🏘️ Available Wards (Goa)

1. Panjim - Fontainhas
2. Panjim - St. Inez
3. Panjim - Miramar
4. Margao - Market Area
5. Margao - Fatorda
6. Vasco - Town Center
7. Mapusa - Municipal Market
8. Ponda - City Center
9. Bicholim - Town
10. Canacona - Chaudi

---

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

---

## 🎯 Success Checklist

Before going live:

- [ ] Supabase project created and schema deployed
- [ ] Environment variables set (`.env.local` for dev, Vercel for prod)
- [ ] Test authentication (signup, login)
- [ ] Test issue creation and viewing
- [ ] Test photo uploads (if Cloudinary configured)
- [ ] Test admin dashboard (role protection)
- [ ] Test on mobile devices
- [ ] Demo accounts removed or passwords changed
- [ ] SSL/HTTPS enabled (automatic on Vercel)
- [ ] Error tracking set up (optional)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- OurStreet Team - NIT Goa Hackathon Project

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Shadcn for the beautiful UI components
- All contributors and testers

---

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

<div align="center">
  <strong>Built with ❤️ for smarter cities</strong>
  <br />
  <sub>OurStreet - Making cities better, one report at a time</sub>
</div>