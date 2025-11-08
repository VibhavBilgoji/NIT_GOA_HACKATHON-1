# CityPulse Backend API Documentation

This directory contains the backend API routes for CityPulse - a Local Issue Reporting & Impact Tracking System.

## API Endpoints

### Authentication

#### POST /api/auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /api/auth/login
Login to an existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "email": "john@example.com"
  }
}
```

---

### Issues

#### GET /api/issues
Get all reported issues with optional filters.

**Query Parameters:**
- `status` (optional): Filter by status (open, in_progress, resolved, closed, rejected)
- `category` (optional): Filter by category (pothole, streetlight, garbage, water_leak, road, sanitation, other)

**Response (200):**
```json
{
  "issues": [
    {
      "id": "1234567890",
      "title": "Pothole on Main Street",
      "description": "Large pothole causing traffic issues",
      "category": "pothole",
      "location": "Main Street, near City Hall",
      "coordinates": {
        "lat": 15.4909,
        "lng": 73.8278
      },
      "photoUrl": "https://example.com/photo.jpg",
      "status": "open",
      "priority": "medium",
      "userId": "user123",
      "votes": 15,
      "comments": [],
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

#### POST /api/issues
Report a new civic issue.

**Request Body:**
```json
{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "category": "pothole",
  "location": "Main Street, near City Hall",
  "coordinates": {
    "lat": 15.4909,
    "lng": 73.8278
  },
  "photoUrl": "https://example.com/photo.jpg",
  "userId": "user123"
}
```

**Response (201):**
```json
{
  "message": "Issue reported successfully",
  "issue": {
    "id": "1234567890",
    "title": "Pothole on Main Street",
    "description": "Large pothole causing traffic issues",
    "category": "pothole",
    "location": "Main Street, near City Hall",
    "coordinates": {
      "lat": 15.4909,
      "lng": 73.8278
    },
    "photoUrl": "https://example.com/photo.jpg",
    "status": "open",
    "priority": "medium",
    "userId": "user123",
    "votes": 0,
    "comments": [],
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z"
  }
}
```

---

## Issue Categories

- `pothole` - Road potholes
- `streetlight` - Broken or non-functional streetlights
- `garbage` - Overflowing garbage bins or illegal dumping
- `water_leak` - Water leaks or pipeline issues
- `road` - Road damage or maintenance
- `sanitation` - Sanitation and cleanliness issues
- `lighting` - Public lighting issues
- `drainage` - Drainage and sewage problems
- `other` - Other civic issues

## Issue Statuses

- `open` - Newly reported issue
- `in_progress` - Issue is being worked on by authorities
- `resolved` - Issue has been fixed
- `closed` - Issue is closed (may or may not be resolved)
- `rejected` - Issue was rejected (duplicate, invalid, etc.)

## Issue Priority Levels

Priority is auto-assigned based on votes, frequency, and category:
- `low` - Minor issues
- `medium` - Standard issues
- `high` - Important issues affecting many people
- `critical` - Emergency issues requiring immediate attention

---

## TODO: Future Endpoints

### Issues
- `GET /api/issues/:id` - Get single issue by ID
- `PATCH /api/issues/:id` - Update issue (admin/moderator only)
- `DELETE /api/issues/:id` - Delete issue (admin only)
- `POST /api/issues/:id/vote` - Vote on an issue
- `POST /api/issues/:id/comment` - Comment on an issue
- `POST /api/issues/:id/status` - Update issue status (admin/moderator only)

### Analytics
- `GET /api/analytics` - Get analytics dashboard data
- `GET /api/analytics/ward/:id` - Get ward-wise analytics
- `GET /api/analytics/trends` - Get trending issues

### User Management
- `GET /api/users/:id` - Get user profile
- `PATCH /api/users/:id` - Update user profile
- `GET /api/users/:id/issues` - Get user's reported issues
- `GET /api/users/:id/history` - Get user activity history

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `DELETE /api/notifications/:id` - Delete notification

---

## Database Integration (TODO)

Currently using in-memory storage. Next steps:
1. Set up MongoDB/PostgreSQL database
2. Create database models using Prisma/Mongoose
3. Implement authentication with JWT/NextAuth
4. Add image upload functionality (Cloudinary/S3)
5. Implement real-time updates with WebSockets/Server-Sent Events
6. Add geospatial queries for map-based filtering

## Environment Variables

Create a `.env.local` file with:

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# File Upload
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (for notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"
```

## Development

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run development server: `npm run dev`
4. API will be available at `http://localhost:3000/api`

## Testing

Test endpoints using:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL:
```bash
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Issue",
    "description": "Test description",
    "category": "pothole",
    "location": "Test Location",
    "coordinates": {"lat": 15.4909, "lng": 73.8278}
  }'
```
