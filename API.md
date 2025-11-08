# CityPulse API Documentation

Complete REST API documentation for the CityPulse platform.

**Base URL**: `https://your-domain.vercel.app/api` or `http://localhost:3000/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Issues](#issues)
3. [Comments](#comments)
4. [Votes](#votes)
5. [Dashboard](#dashboard)
6. [User Profile](#user-profile)
7. [Error Handling](#error-handling)
8. [Rate Limits](#rate-limits)

---

## Authentication

All authenticated endpoints require an `Authorization` header with a Bearer token.

```
Authorization: Bearer {your-jwt-token}
```

### POST /auth/signup

Register a new user account.

**Request:**
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": "1699876543210-abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Rules:**
- `name`: Required, min 2 characters
- `email`: Required, valid email format
- `password`: Required, min 8 characters
- `confirmPassword`: Must match password

**Error Responses:**
```json
// 400 Bad Request - Invalid input
{
  "success": false,
  "error": "Password must be at least 8 characters long"
}

// 409 Conflict - User exists
{
  "success": false,
  "error": "User with this email already exists"
}
```

---

### POST /auth/login

Login to an existing account.

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "1699876543210-abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
// 400 Bad Request - Invalid input
{
  "success": false,
  "error": "Invalid email address"
}

// 401 Unauthorized - Wrong credentials
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

## Issues

### GET /issues

Retrieve a list of issues with optional filtering, sorting, and pagination.

**Request:**
```http
GET /api/issues?status=open&category=pothole&sortBy=votes&sortOrder=desc&limit=20&offset=0
Authorization: Bearer {token}
```

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| status | string | Filter by status: `open`, `in-progress`, `resolved`, `closed` | - |
| category | string | Filter by category: `pothole`, `streetlight`, `garbage`, etc. | - |
| priority | string | Filter by priority: `low`, `medium`, `high`, `critical` | - |
| userId | string | Filter by user ID | - |
| search | string | Search in title, description, location | - |
| sortBy | string | Sort field: `createdAt`, `votes`, `priority` | `createdAt` |
| sortOrder | string | Sort order: `asc`, `desc` | `desc` |
| limit | number | Results per page (1-100) | 100 |
| offset | number | Pagination offset | 0 |

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "issues": [
      {
        "id": "1699876543210-xyz789",
        "title": "Pothole on Main Street",
        "description": "Large pothole causing traffic issues",
        "category": "pothole",
        "location": "Main Street, Panjim, Goa",
        "coordinates": {
          "lat": 15.4909,
          "lng": 73.8278
        },
        "photoUrl": "https://example.com/photo.jpg",
        "status": "open",
        "priority": "high",
        "userId": "1699876543210-abc123",
        "votes": 12,
        "comments": [...],
        "createdAt": "2024-01-15T10:30:00.000Z",
        "updatedAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```

---

### POST /issues

Create a new issue (requires authentication).

**Request:**
```http
POST /api/issues
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues and vehicle damage. Needs immediate attention.",
  "category": "pothole",
  "location": "Main Street, Panjim, Goa",
  "coordinates": {
    "lat": 15.4909,
    "lng": 73.8278
  },
  "photoUrl": "https://example.com/photo.jpg"
}
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Issue title (min 5 chars) |
| description | string | Yes | Detailed description (min 10 chars) |
| category | string | Yes | One of: `pothole`, `streetlight`, `garbage`, `water_leak`, `road`, `sanitation`, `drainage`, `electricity`, `traffic`, `other` |
| location | string | Yes | Address or location description |
| coordinates | object | Yes | GPS coordinates (`lat`, `lng`) |
| photoUrl | string | No | URL to uploaded photo |

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Issue reported successfully",
  "data": {
    "id": "1699876543210-xyz789",
    "title": "Pothole on Main Street",
    "description": "Large pothole causing traffic issues...",
    "category": "pothole",
    "location": "Main Street, Panjim, Goa",
    "coordinates": {
      "lat": 15.4909,
      "lng": 73.8278
    },
    "photoUrl": "https://example.com/photo.jpg",
    "status": "open",
    "priority": "medium",
    "userId": "1699876543210-abc123",
    "votes": 0,
    "comments": [],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login to report issues"
}

// 400 Bad Request
{
  "success": false,
  "error": "Title must be at least 5 characters long"
}
```

---

### GET /issues/:id

Get a single issue by ID.

**Request:**
```http
GET /api/issues/1699876543210-xyz789
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1699876543210-xyz789",
    "title": "Pothole on Main Street",
    "description": "Large pothole causing traffic issues",
    "category": "pothole",
    "location": "Main Street, Panjim, Goa",
    "coordinates": {
      "lat": 15.4909,
      "lng": 73.8278
    },
    "photoUrl": "https://example.com/photo.jpg",
    "status": "open",
    "priority": "high",
    "userId": "1699876543210-abc123",
    "votes": 12,
    "comments": [
      {
        "id": "comment-id",
        "userId": "user-id",
        "userName": "Jane Doe",
        "content": "I saw this too!",
        "createdAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "success": false,
  "error": "Issue not found"
}
```

---

### PUT /issues/:id

Update an issue (requires authentication and ownership or admin role).

**Request:**
```http
PUT /api/issues/1699876543210-xyz789
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated: Pothole on Main Street",
  "status": "in-progress",
  "priority": "critical"
}
```

**Request Body (all fields optional):**

| Field | Type | Description |
|-------|------|-------------|
| title | string | Updated title (min 5 chars) |
| description | string | Updated description (min 10 chars) |
| status | string | One of: `open`, `in-progress`, `resolved`, `closed` |
| priority | string | One of: `low`, `medium`, `high`, `critical` |
| assignedTo | string | User ID of assigned authority |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": "1699876543210-xyz789",
    "title": "Updated: Pothole on Main Street",
    "status": "in-progress",
    "priority": "critical",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    ...
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// 403 Forbidden
{
  "success": false,
  "error": "Forbidden - You can only update your own issues"
}

// 404 Not Found
{
  "success": false,
  "error": "Issue not found"
}
```

---

### DELETE /issues/:id

Delete an issue (requires authentication and ownership or admin role).

**Request:**
```http
DELETE /api/issues/1699876543210-xyz789
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Issue deleted successfully"
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// 403 Forbidden
{
  "success": false,
  "error": "Forbidden - You can only delete your own issues"
}

// 404 Not Found
{
  "success": false,
  "error": "Issue not found"
}
```

---

## Comments

### GET /issues/:id/comments

Get all comments for a specific issue.

**Request:**
```http
GET /api/issues/1699876543210-xyz789/comments
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "1699876600000-com123",
        "issueId": "1699876543210-xyz789",
        "userId": "1699876543210-abc123",
        "userName": "John Doe",
        "content": "This is a serious issue that needs immediate attention.",
        "createdAt": "2024-01-15T11:00:00.000Z"
      },
      {
        "id": "1699876700000-com456",
        "issueId": "1699876543210-xyz789",
        "userId": "1699876543210-def456",
        "userName": "Jane Smith",
        "content": "I agree, saw this yesterday.",
        "createdAt": "2024-01-15T11:30:00.000Z"
      }
    ],
    "total": 2
  }
}
```

---

### POST /issues/:id/comments

Add a comment to an issue (requires authentication).

**Request:**
```http
POST /api/issues/1699876543210-xyz789/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "This is a serious issue that needs immediate attention."
}
```

**Validation Rules:**
- `content`: Required, min 2 chars, max 1000 chars

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Comment added successfully",
  "data": {
    "id": "1699876600000-com123",
    "issueId": "1699876543210-xyz789",
    "userId": "1699876543210-abc123",
    "userName": "John Doe",
    "content": "This is a serious issue that needs immediate attention.",
    "createdAt": "2024-01-15T11:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login to comment"
}

// 400 Bad Request
{
  "success": false,
  "error": "Comment must be at least 2 characters long"
}

// 404 Not Found
{
  "success": false,
  "error": "Issue not found"
}
```

---

### DELETE /issues/:id/comments

Delete a comment (requires authentication and ownership or admin role).

**Request:**
```http
DELETE /api/issues/1699876543210-xyz789/comments?commentId=1699876600000-com123
Authorization: Bearer {token}
```

**Query Parameters:**
- `commentId` (required): ID of the comment to delete

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Comment deleted successfully"
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// 403 Forbidden
{
  "success": false,
  "error": "Forbidden - You can only delete your own comments"
}

// 404 Not Found
{
  "success": false,
  "error": "Comment not found"
}
```

---

## Votes

### POST /issues/:id/vote

Toggle vote for an issue (requires authentication). If user hasn't voted, adds a vote. If user has already voted, removes the vote.

**Request:**
```http
POST /api/issues/1699876543210-xyz789/vote
Authorization: Bearer {token}
```

**Response (200 OK) - Vote Added:**
```json
{
  "success": true,
  "message": "Vote added",
  "data": {
    "voted": true,
    "votes": 13
  }
}
```

**Response (200 OK) - Vote Removed:**
```json
{
  "success": true,
  "message": "Vote removed",
  "data": {
    "voted": false,
    "votes": 12
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login to vote"
}

// 404 Not Found
{
  "success": false,
  "error": "Issue not found"
}
```

---

### GET /issues/:id/vote

Check if the current user has voted for an issue (requires authentication).

**Request:**
```http
GET /api/issues/1699876543210-xyz789/vote
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "voted": true,
    "votes": 13
  }
}
```

**Response (200 OK) - No Authentication:**
```json
{
  "success": true,
  "data": {
    "voted": false
  }
}
```

---

## Dashboard

### GET /dashboard

Get comprehensive dashboard statistics (requires authentication).

**Request:**
```http
GET /api/dashboard
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalIssues": 150,
    "openIssues": 45,
    "inProgressIssues": 30,
    "resolvedIssues": 75,
    "totalReports": 150,
    "averageResolutionTime": 5.2,
    "categoryBreakdown": [
      {
        "category": "pothole",
        "count": 35
      },
      {
        "category": "streetlight",
        "count": 28
      },
      {
        "category": "garbage",
        "count": 42
      },
      {
        "category": "water_leak",
        "count": 20
      },
      {
        "category": "other",
        "count": 25
      }
    ],
    "recentActivity": [
      {
        "date": "2024-01-15",
        "count": 12
      },
      {
        "date": "2024-01-14",
        "count": 8
      },
      {
        "date": "2024-01-13",
        "count": 15
      }
    ]
  }
}
```

**Statistics Explained:**
- `totalIssues`: Total number of issues reported
- `openIssues`: Issues with status "open"
- `inProgressIssues`: Issues with status "in-progress"
- `resolvedIssues`: Issues with status "resolved"
- `averageResolutionTime`: Average days to resolve issues
- `categoryBreakdown`: Issue count by category
- `recentActivity`: Daily issue count for last 30 days

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}
```

---

## User Profile

### GET /user

Get current user profile with statistics (requires authentication).

**Request:**
```http
GET /api/user
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "1699876543210-abc123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "citizen",
      "avatar": "https://example.com/avatar.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "stats": {
      "totalIssues": 12,
      "openIssues": 5,
      "inProgressIssues": 3,
      "resolvedIssues": 4,
      "totalVotes": 48
    }
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// 404 Not Found
{
  "success": false,
  "error": "User not found"
}
```

---

### PUT /user

Update user profile (requires authentication).

**Request:**
```http
PUT /api/user
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Updated Doe",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Request Body (all fields optional):**

| Field | Type | Description |
|-------|------|-------------|
| name | string | Updated name (min 2 chars) |
| avatar | string | URL to avatar image |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "1699876543210-abc123",
    "name": "John Updated Doe",
    "email": "john@example.com",
    "role": "citizen",
    "avatar": "https://example.com/new-avatar.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// 400 Bad Request
{
  "success": false,
  "error": "Name must be at least 2 characters long"
}
```

---

### DELETE /user

Delete user account (requires authentication). This will also delete all issues created by the user.

**Request:**
```http
DELETE /api/user
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Error Responses:**
```json
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized - Please login"
}
```

---

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or validation error |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server error |

### Common Error Messages

```json
// Missing authentication
{
  "success": false,
  "error": "Unauthorized - Please login"
}

// Invalid token
{
  "success": false,
  "error": "Unauthorized - Invalid or expired token"
}

// Validation error
{
  "success": false,
  "error": "Title must be at least 5 characters long"
}

// Permission denied
{
  "success": false,
  "error": "Forbidden - You can only update your own issues"
}

// Resource not found
{
  "success": false,
  "error": "Issue not found"
}

// Server error
{
  "success": false,
  "error": "Internal server error. Please try again later."
}
```

---

## Rate Limits

The API implements rate limiting to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **Issue creation**: 10 requests per minute per user
- **Comments/Votes**: 30 requests per minute per user
- **Read operations**: 100 requests per minute per user

When rate limit is exceeded:

```json
{
  "success": false,
  "error": "Rate limit exceeded. Please try again later."
}
```

HTTP Status: `429 Too Many Requests`

---

## Best Practices

### Authentication

1. Store the JWT token securely (localStorage or httpOnly cookie)
2. Include the token in every authenticated request
3. Handle token expiration gracefully
4. Implement token refresh mechanism

**Example Client Code:**

```javascript
// Store token after login/signup
localStorage.setItem('token', response.token);

// Include in requests
const headers = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
};

fetch('/api/issues', { headers })
  .then(res => res.json())
  .then(data => console.log(data));
```

### Error Handling

Always check the `success` field in responses:

```javascript
const response = await fetch('/api/issues', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(issueData)
});

const data = await response.json();

if (data.success) {
  console.log('Success:', data.data);
} else {
  console.error('Error:', data.error);
}
```

### Pagination

For large datasets, use pagination:

```javascript
// Get first page
fetch('/api/issues?limit=20&offset=0')

// Get second page
fetch('/api/issues?limit=20&offset=20')

// Get third page
fetch('/api/issues?limit=20&offset=40')
```

### Filtering & Search

Combine multiple filters for precise results:

```javascript
const params = new URLSearchParams({
  status: 'open',
  category: 'pothole',
  search: 'main street',
  sortBy: 'votes',
  sortOrder: 'desc'
});

fetch(`/api/issues?${params.toString()}`);
```

---

## TypeScript Types

For TypeScript projects, use these type definitions:

```typescript
// User types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin' | 'authority';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Issue types
interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  photoUrl?: string;
  status: IssueStatus;
  priority: IssuePriority;
  userId: string;
  votes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

type IssueCategory = 
  | 'pothole' 
  | 'streetlight' 
  | 'garbage' 
  | 'water_leak' 
  | 'road' 
  | 'sanitation' 
  | 'drainage' 
  | 'electricity' 
  | 'traffic' 
  | 'other';

type IssueStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

// Comment types
interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token?: string;
}
```

---

## Support

For API support or questions:
- 📧 Email: api-support@citypulse.com
- 🐛 Issues: [GitHub Issues](https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1/issues)
- 📖 Docs: [Full Documentation](https://citypulse-docs.vercel.app)

---

**Last Updated**: January 2024  
**API Version**: 1.0.0  
**Maintained by**: CityPulse Team