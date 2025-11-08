# CityPulse - Next Steps Summary

## 🎯 Current Status

### ✅ What's Working
1. **Backend is 100% Complete**
   - All API endpoints functional
   - Supabase database connected
   - Authentication system working
   - JWT tokens, password hashing, validation
   - Proper error handling

2. **Frontend is 70% Complete**
   - Landing page ✅
   - Login/Signup pages ✅
   - Dashboard with charts ✅
   - Map with markers ✅
   - Report form UI ✅
   - Dark/light mode ✅
   - Responsive design ✅

### ❌ What's Missing (Critical Issues)

1. **Report Page Not Connected to API** 🔴
   - Form looks good but doesn't actually save data
   - Line 103 in `app/report/page.tsx` has: `await new Promise(resolve => setTimeout(resolve, 1500))`
   - **This is just a fake delay, not a real API call!**

2. **Map Shows Fake Data** 🔴
   - `app/map/page.tsx` has hard-coded `mockIssues` array
   - Doesn't fetch real issues from database
   - Won't show newly reported issues

3. **No Authentication Context** 🔴
   - Login works but token isn't stored globally
   - Each page needs to handle auth separately
   - No way to protect routes
   - User data not accessible across pages

4. **Photos Don't Upload** 🔴
   - Photos only show preview
   - Not uploaded to cloud storage
   - No URL saved to database

5. **Dashboard Uses Mock Data** 🟡
   - Some sections show fake statistics
   - Not connected to real `/api/dashboard` endpoint

---

## 🚀 Immediate Action Items (Priority Order)

### 1. Fix Report Page (HIGHEST PRIORITY) ⏱️ 4-6 hours

**What to do:**
Replace the fake API call with a real one.

**File:** `app/report/page.tsx` (around line 92-121)

**Replace this:**
```javascript
// Simulate API call (replace with actual API endpoint)
await new Promise((resolve) => setTimeout(resolve, 1500));

toast.success("Issue reported successfully!");
router.push("/map");
```

**With this:**
```javascript
// Get auth token from localStorage
const token = localStorage.getItem('authToken');
if (!token) {
  toast.error("Please login first");
  router.push('/login');
  return;
}

// Upload photo first (if exists)
let photoUrl = null;
if (formData.photo) {
  // TODO: Implement Cloudinary/Supabase Storage upload
  // For now, skip photo upload
  toast.warning("Photo upload coming soon - issue will be created without photo");
}

// Create issue via API
const response = await fetch('/api/issues', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: formData.title,
    category: formData.category,
    description: formData.description,
    location: `Location at ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`,
    latitude: location.lat,
    longitude: location.lng,
    photoUrl: photoUrl
  })
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.error || 'Failed to create issue');
}

const result = await response.json();
toast.success("Issue reported successfully!");
router.push("/map");
```

---

### 2. Create Auth Context ⏱️ 3-4 hours

**Why:** Store user data and token globally so all pages can access it.

**Create new file:** `contexts/auth-context.tsx`

```typescript
"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load auth state on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'citizen' })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Signup failed');
    }

    const data = await response.json();
    
    setToken(data.token);
    setUser(data.user);
    
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      signup,
      logout,
      isAuthenticated: !!token,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Then update:** `app/layout.tsx` to wrap with AuthProvider:

```typescript
import { AuthProvider } from '@/contexts/auth-context';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Update login form:** Use `useAuth()` hook instead of direct API calls.

---

### 3. Connect Map to Real Data ⏱️ 2-3 hours

**File:** `app/map/page.tsx`

**Replace mockIssues with real API call:**

```typescript
const [issues, setIssues] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchIssues();
}, []);

async function fetchIssues() {
  try {
    setLoading(true);
    const response = await fetch('/api/issues');
    const data = await response.json();
    
    if (data.success) {
      setIssues(data.data.issues);
    }
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    toast.error('Failed to load issues');
  } finally {
    setLoading(false);
  }
}
```

---

### 4. Connect Dashboard to Real Data ⏱️ 3-4 hours

**File:** `app/dashboard/page.tsx`

**Add API call at component mount:**

```typescript
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchDashboardStats();
}, []);

async function fetchDashboardStats() {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    if (data.success) {
      setStats(data.data);
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error);
  } finally {
    setLoading(false);
  }
}
```

---

### 5. Implement Photo Upload ⏱️ 6-8 hours

**Option A: Cloudinary (Recommended)**

1. Sign up: https://cloudinary.com/
2. Install: `npm install cloudinary`
3. Create API route: `app/api/upload/route.ts`
4. Upload from report form

**Option B: Supabase Storage**

1. Enable Storage in Supabase dashboard
2. Create bucket: `issue-photos`
3. Use Supabase client to upload
4. Get public URL

**Simplified version (for MVP):**

Store base64 image in database (NOT recommended for production):

```typescript
// Convert photo to base64
const reader = new FileReader();
reader.readAsDataURL(formData.photo);
reader.onloadend = () => {
  const base64String = reader.result;
  // Send this to API as photoUrl
};
```

---

## 📋 Step-by-Step Plan for Next Week

### Day 1 (Monday) - Core Functionality
- [ ] Fix report page API integration (4h)
- [ ] Create auth context (3h)
- [ ] Test end-to-end: signup → login → report → view on map

### Day 2 (Tuesday) - Data Integration
- [ ] Connect map to real data (2h)
- [ ] Connect dashboard to real data (3h)
- [ ] Add loading states everywhere (2h)

### Day 3 (Wednesday) - Photo Upload
- [ ] Set up Cloudinary account (1h)
- [ ] Implement upload function (4h)
- [ ] Test with different file sizes (2h)

### Day 4 (Thursday) - New Features
- [ ] Create issue detail page (4h)
- [ ] Add comments functionality (3h)
- [ ] Add vote functionality (1h)

### Day 5 (Friday) - Polish & Testing
- [ ] Fix mobile responsiveness (3h)
- [ ] Test all user flows (2h)
- [ ] Fix bugs found during testing (3h)

### Weekend - Deploy
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test production deployment
- [ ] Create demo video

---

## 🎓 Quick Reference

### How to Test Locally

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Run the SQL fix script:**
   - Go to: https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp/sql/new
   - Copy content from `supabase/fix-passwords.sql`
   - Click "Run"

3. **Login with demo account:**
   - Email: `john@example.com`
   - Password: `Demo1234`

4. **Check console:**
   - Should see: `✅ Using Supabase database`
   - Open browser console (F12) to see errors

### API Testing with curl

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Demo1234"}'

# Get issues
curl http://localhost:3000/api/issues

# Create issue (need token from login)
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Issue",
    "description": "Testing the API",
    "category": "pothole",
    "location": "Test Location",
    "latitude": 15.4909,
    "longitude": 73.8278
  }'
```

---

## 🐛 Known Bugs (Low Priority)

These are minor issues that can be fixed later:

1. Dark mode flashes on page load
2. Map markers sometimes don't respond to clicks
3. Mobile sidebar doesn't collapse properly
4. Form validation allows whitespace-only input
5. Photo upload shows error for files >5MB but still tries to process

---

## 📚 Helpful Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/bceawmcnwvxvffhmwibp
- **MapTiler Docs:** https://docs.maptiler.com/sdk-js/
- **Cloudinary Guide:** https://cloudinary.com/documentation/next_integration
- **Next.js Docs:** https://nextjs.org/docs

---

## 🆘 If You Get Stuck

1. **Check TROUBLESHOOTING.md** for common issues
2. **Run verification script:** `node scripts/verify-setup.js`
3. **Check browser console** (F12) for errors
4. **Check terminal** for server-side errors
5. **Test API directly** with curl or Postman

---

## 🎉 Success Criteria

Your app is ready for demo when:

- [x] Backend works (DONE ✅)
- [ ] Can signup and login
- [ ] Can report issue with photo and location
- [ ] Issue appears on map immediately
- [ ] Dashboard shows real statistics
- [ ] Can comment on issues
- [ ] Can vote on issues
- [ ] Works on mobile

**Target:** Complete by end of next week for hackathon demo! 🚀

---

## 💡 Pro Tips

1. **Start small:** Get one feature working perfectly before moving to next
2. **Test often:** After each change, test in browser immediately
3. **Use console.log:** Add logs everywhere to debug issues
4. **Git commit often:** Commit after each working feature
5. **Take breaks:** Fresh eyes catch bugs faster

Good luck! You're 70% there - just need to connect the dots! 💪