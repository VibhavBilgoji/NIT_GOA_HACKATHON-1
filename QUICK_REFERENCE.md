# CityPulse - Quick Reference Guide

**Last Updated:** December 2024 - Backend Enhanced ✅

> Quick copy-paste code snippets for common tasks

---

## 🚀 Getting Started (5 Minutes)

```bash
# 1. Clone and install
git clone <repo-url>
cd NIT_GOA_HACKATHON
npm install

# 2. Set up environment
cat > .env.local << EOF
JWT_SECRET=your-super-secret-key-change-in-production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
EOF

# 3. Run
npm run dev
```

**Get Cloudinary credentials:** https://cloudinary.com (free account)

---

## 📋 Demo Credentials

```
Admin:     admin@citypulse.com / Admin1234
Citizen 1: john@example.com    / Demo1234
Citizen 2: jane@example.com    / Demo1234
```

---

## 🔌 API Endpoints Cheat Sheet

### Authentication
```typescript
// Signup
POST /api/auth/signup
Body: { name, email, password, confirmPassword }

// Login (Rate Limited: 5 attempts / 15 min)
POST /api/auth/login
Body: { email, password }
Headers: X-RateLimit-Limit, X-RateLimit-Remaining

// Token Refresh (NEW)
POST /api/auth/refresh
Headers: { Authorization: "Bearer <token>" }
Returns: { token: string, user: User }
```

### Issues (Public)
```typescript
// List all issues
GET /api/issues?status=open&category=roads&ward=Panjim

// Create issue
POST /api/issues
Headers: { Authorization: "Bearer <token>" }
Body: { title, description, category, ward, beforePhotoUrls, location, coordinates }

// Get single issue
GET /api/issues/[id]

// Update issue
PUT /api/issues/[id]
Body: { status, priority, afterPhotoUrls }

// Delete issue
DELETE /api/issues/[id]
```

### Upload (Authenticated)
```typescript
// Upload photos (Enhanced - supports Cloudinary + Supabase Storage)
POST /api/upload
Body: FormData with 'files' field (max 5 files, 10MB each)
Headers: { Authorization: "Bearer <token>" }
Returns: { urls: string[], url: string, message: string }

// Check upload configuration (NEW)
GET /api/upload
Headers: { Authorization: "Bearer <token>" }
Returns: { provider: string, maxFileSize: number, allowedTypes: string[] }
```

### Admin (Requires Admin Role)
```typescript
// List all issues (admin view)
GET /api/admin/issues?ward=Panjim&status=open

// Bulk update issues
PATCH /api/admin/issues
Body: { issueIds: string[], updates: { status, priority, assignedTo } }

// List users
GET /api/admin/users?role=citizen

// Update user role
PATCH /api/admin/users
Body: { userId: string, role: string }

// Delete user
DELETE /api/admin/users?userId=<id>

// Get statistics
GET /api/admin/stats?ward=Panjim

// Audit Logs (NEW)
GET /api/admin/audit-logs?userId=xxx&action=login&success=true&limit=100
Query params: userId, action, resource, success, startDate, endDate, limit, offset
Special modes: ?stats=true | ?security=true | ?export=true
Returns: { logs: AuditLogEntry[], total: number, hasMore: boolean }
```

### System Health (NEW)
```typescript
// Health check
GET /api/health
Returns: {
  status: "healthy" | "degraded" | "unhealthy",
  uptime: number,
  checks: { database, storage, environment }
}

// Quick ping
HEAD /api/health
```

---

## 💻 Code Snippets

### 1. Upload Multiple Photos

```typescript
const uploadPhotos = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  
  const data = await response.json();
  return data.urls;
};

// Usage
const photoUrls = await uploadPhotos([file1, file2, file3]);
```

### 2. Create Issue with Photos & Ward

```typescript
import { WARDS } from '@/lib/types';

const createIssue = async () => {
  // 1. Upload photos first
  const photoUrls = await uploadPhotos(selectedFiles);
  
  // 2. Create issue with photo URLs
  const response = await fetch('/api/issues', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues",
      category: "roads",
      ward: "Panjim - Fontainhas",
      beforePhotoUrls: photoUrls,
      location: "15.4909° N, 73.8278° E",
      coordinates: { lat: 15.4909, lng: 73.8278 }
    })
  });
  
  const data = await response.json();
  return data.data;
};
```

### 3. Ward Selector Component

```typescript
import { WARDS } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function WardSelector({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Ward" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Wards</SelectItem>
        {WARDS.map((ward) => (
          <SelectItem key={ward} value={ward}>
            {ward}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### 4. Multi-File Upload Input

```typescript
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export function MultiFileUpload({ onChange }: { onChange: (files: File[]) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validate size (50MB total)
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 50 * 1024 * 1024) {
      alert("Total file size should not exceed 50MB");
      return;
    }
    
    setFiles(selectedFiles);
    onChange(selectedFiles);
  };
  
  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange(newFiles);
  };
  
  return (
    <div className="space-y-4">
      {/* File Input */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="photo-upload"
      />
      
      {/* Upload Button */}
      {files.length === 0 ? (
        <label 
          htmlFor="photo-upload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <div className="text-center">
            <p className="text-sm text-gray-600">Click to upload photos</p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (Max 50MB total)</p>
          </div>
        </label>
      ) : (
        <>
          {/* Preview Grid */}
          <div className="grid grid-cols-4 gap-2">
            {files.map((file, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Add More Button */}
          <label htmlFor="photo-upload" className="btn btn-secondary">
            Add More Photos
          </label>
        </>
      )}
    </div>
  );
}
```

### 5. Before/After Photos Display

```typescript
import { BeforeAfterPhotos } from '@/components/before-after-photos';

export function IssueDetail({ issue }: { issue: Issue }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{issue.title}</h1>
      <p className="text-gray-600">{issue.description}</p>
      
      {/* Display before/after photos */}
      {issue.beforePhotoUrls && (
        <BeforeAfterPhotos
          beforeUrls={issue.beforePhotoUrls}
          afterUrls={issue.afterPhotoUrls}
          issueTitle={issue.title}
          status={issue.status}
        />
      )}
    </div>
  );
}
```

### 6. Filter Issues by Ward

```typescript
'use client';

import { useState, useEffect } from 'react';
import { WARDS } from '@/lib/types';

export function IssuesList() {
  const [ward, setWard] = useState('');
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchIssues();
  }, [ward]);
  
  const fetchIssues = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (ward) params.append('ward', ward);
      
      const response = await fetch(`/api/issues?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setIssues(data.data.issues);
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Ward Filter */}
      <WardSelector value={ward} onChange={setWard} />
      
      {/* Issues List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 7. Admin: Resolve Issue with After Photos

```typescript
const resolveIssueWithPhotos = async (issueId: string, afterPhotos: File[]) => {
  try {
    // 1. Upload after photos
    const afterPhotoUrls = await uploadPhotos(afterPhotos);
    
    // 2. Update issue status and add after photos
    const response = await fetch(`/api/issues/${issueId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        status: 'resolved',
        afterPhotoUrls: afterPhotoUrls
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to resolve issue');
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error resolving issue:', error);
    throw error;
  }
};
```

### 8. Admin: Get Ward Analytics

```typescript
const getWardAnalytics = async (ward?: string) => {
  const params = new URLSearchParams();
  if (ward) params.append('ward', ward);
  
  const response = await fetch(`/api/admin/stats?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  
  if (data.success) {
    return {
      totalIssues: data.data.totalIssues,
      resolvedIssues: data.data.resolvedIssues,
      wardPerformance: data.data.wardPerformance,
      categoryBreakdown: data.data.categoryBreakdown
    };
  }
};

// Usage
const analytics = await getWardAnalytics('Panjim - Fontainhas');
console.log(`Resolution Rate: ${analytics.wardPerformance[0].resolutionRate}%`);
```

### 9. Admin: Bulk Update Issues

```typescript
const bulkUpdateIssues = async (issueIds: string[], updates: Partial<Issue>) => {
  const response = await fetch('/api/admin/issues', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      issueIds,
      updates
    })
  });
  
  const data = await response.json();
  return data;
};

// Usage: Mark multiple issues as in-progress
await bulkUpdateIssues(
  ['issue-1', 'issue-2', 'issue-3'],
  { status: 'in-progress', assignedTo: 'admin-id' }
);
```

### 10. Complete Report Form Example

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WARDS } from '@/lib/types';

export default function ReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    ward: '',
    photos: [] as File[]
  });
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          alert('Could not get your location');
        }
      );
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      alert('Please allow location access');
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Upload photos
      let photoUrls: string[] = [];
      if (formData.photos.length > 0) {
        photoUrls = await uploadPhotos(formData.photos);
      }
      
      // 2. Create issue
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          ward: formData.ward,
          beforePhotoUrls: photoUrls,
          location: `${location.lat}, ${location.lng}`,
          coordinates: location
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create issue');
      }
      
      alert('Issue reported successfully!');
      router.push('/map');
      
    } catch (error) {
      alert('Failed to report issue');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Report an Issue</h1>
      
      {/* Title */}
      <input
        type="text"
        placeholder="Issue Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      
      {/* Category */}
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        <option value="roads">Roads</option>
        <option value="water">Water Supply</option>
        <option value="electricity">Electricity</option>
        <option value="waste">Waste Management</option>
        <option value="safety">Safety</option>
        <option value="other">Other</option>
      </select>
      
      {/* Ward */}
      <WardSelector 
        value={formData.ward}
        onChange={(ward) => setFormData({ ...formData, ward })}
      />
      
      {/* Description */}
      <textarea
        placeholder="Describe the issue..."
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        rows={5}
        className="w-full p-2 border rounded"
      />
      
      {/* Photos */}
      <MultiFileUpload 
        onChange={(photos) => setFormData({ ...formData, photos })}
      />
      
      {/* Location */}
      <button
        type="button"
        onClick={getLocation}
        className="w-full p-2 bg-blue-500 text-white rounded"
      >
        {location ? '✓ Location Captured' : 'Get My Location'}
      </button>
      
      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 bg-green-500 text-white rounded font-semibold"
      >
        {loading ? 'Submitting...' : 'Report Issue'}
      </button>
    </form>
  );
}
```

---

## 🎨 TypeScript Types

```typescript
import { WARDS } from '@/lib/types';

// User
interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'authority' | 'admin';
  createdAt: string;
}

// Issue
interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'roads' | 'water' | 'electricity' | 'waste' | 'safety' | 'other';
  location: string;
  coordinates: { lat: number; lng: number };
  photoUrl?: string;
  beforePhotoUrls?: string[];
  afterPhotoUrls?: string[];
  ward?: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  userId: string;
  assignedTo?: string;
  votes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// Wards (10 predefined)
type Ward = typeof WARDS[number];
```

---

## 🐛 Troubleshooting

```bash
# Port already in use
lsof -ti:3000 | xargs kill -9

# Clear build cache
rm -rf .next node_modules
npm install
npm run dev

# Check environment variables
cat .env.local

# Test API endpoint
curl http://localhost:3000/api/issues

# Check logs
npm run dev | tee app.log
```

---

## 🚀 Deployment Checklist

```bash
# 1. Verify environment variables
✓ JWT_SECRET set
✓ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME set
✓ NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET set

# 2. Build and test locally
npm run build
npm start

# 3. Deploy to Vercel
vercel --prod

# 4. Add env vars in Vercel Dashboard
# 5. Test production deployment
```

---

## 📊 Available Wards

```typescript
const WARDS = [
  "Panjim - Fontainhas",
  "Panjim - St. Inez",
  "Panjim - Miramar",
  "Margao - Market Area",
  "Margao - Fatorda",
  "Vasco - Town Center",
  "Mapusa - Municipal Market",
  "Ponda - City Center",
  "Bicholim - Town",
  "Canacona - Chaudi"
];
```

---

## 🔐 Authentication Helper

```typescript
// Save token
localStorage.setItem('token', token);

// Get token
const token = localStorage.getItem('token');

// Add to headers
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}

// Check if logged in
const isLoggedIn = !!localStorage.getItem('token');

// Logout
localStorage.removeItem('token');
```

---

**For full documentation, see README.md**