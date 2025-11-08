# CityPulse - Local Issue Reporting & Impact Tracker

## Project Overview

**CityPulse** is a smart, transparent, and community-driven platform that enables effortless civic issue reporting, real-time tracking, and improved collaboration between citizens and municipal authorities. This project is built for the NIT Goa Hackathon under the **CivicTech | Social Good** theme.

---

## Problem Statement

### The Challenge

Urban citizens often face everyday civic issues such as:
- Potholes
- Broken streetlights
- Overflowing garbage
- Water leaks

However, the absence of accessible and transparent reporting systems prevents these problems from being efficiently addressed.

### Key Issues Identified

1. **Inaccessibility and Non-Transparency**: There is an absence of accessible and transparent reporting systems.

2. **Lack of Resolution Updates**: Even when citizens do report problems, they rarely receive updates on their resolution.

3. **Low Engagement**: This lack of feedback and transparency leads to low citizen engagement in civic processes.

4. **Inefficiency for Authorities**: The current system causes duplicate reports, real-time tracking difficulties, and a lack of accountability for municipal authorities.

---

## Solution

CityPulse is a web-based Local Issue Reporting & Impact Tracking System that:

### For Citizens
- **Report Issues Easily**: Submit civic complaints with description, photos, and live GPS location
- **Track Progress**: View real-time updates on issue resolution progress
- **Interactive Map**: See all reported issues on a city map with color-coded status markers
- **Community Engagement**: Vote, comment, and support issues to highlight their importance

### For Authorities
- **Centralized Dashboard**: Manage and prioritize all reported issues from one place
- **Data-Driven Insights**: Access analytics showing issue trends, hotspots, and resolution rates
- **Role-Based Access**: Verify, categorize, and update issue statuses
- **Accountability**: Track performance metrics and resolution times

---

## Core Features

### 1. User Interface
- ✅ Responsive, mobile-friendly web platform
- ✅ Interactive city map displaying reported issues
- ✅ Color-coded markers (Unresolved → In Progress → Resolved)
- ✅ User authentication (Login/Signup)

### 2. Issue Reporting & Tracking
- Real-time submission and tracking of civic complaints
- Map-based or form-based input
- Photo upload capability
- Live GPS location capture
- Automated status updates and notifications (Open → In Progress → Resolved)

### 3. Admin & Moderator Dashboard
- Role-based access for municipal authorities
- Verify, categorize, and update issue statuses
- Visual analytics showing issue trends, hotspots, and resolution rates
- Performance metrics

### 4. Community Engagement
- Vote and comment on existing issues
- Support issues to highlight importance
- Before-and-after image verification for resolved cases

### 5. Transparency & Accountability
- Impact reports with metrics (average resolution time, response efficiency, ward-wise performance)
- Public access to anonymized data for transparency and policy insights

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### Backend
- **API**: Next.js API Routes
- **Runtime**: Node.js
- **Database**: To be integrated (MongoDB/PostgreSQL recommended)
- **Authentication**: To be implemented (NextAuth.js recommended)

### Planned Integrations
- **Maps**: Google Maps API / Mapbox
- **Image Upload**: Cloudinary / AWS S3
- **Real-time Updates**: WebSockets / Server-Sent Events
- **Notifications**: Email (SMTP) / Push Notifications

---

## Project Structure

```
citypulse/
├── app/
│   ├── api/                    # Backend API routes
│   │   ├── auth/
│   │   │   ├── login/         # Login endpoint
│   │   │   └── signup/        # Signup endpoint
│   │   └── issues/            # Issues CRUD endpoints
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── page.tsx               # Home page
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                    # shadcn UI components
│   ├── login-form.tsx         # Login form component
│   └── signup-form.tsx        # Signup form component
├── lib/
│   ├── db/
│   │   └── schema.ts          # Database schema types
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
```

---

## API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
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

#### POST `/api/auth/login`
Login to existing account.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Issues Endpoints

#### GET `/api/issues`
Get all reported issues with optional filters.

**Query Parameters:**
- `status`: Filter by status (open, in_progress, resolved)
- `category`: Filter by category (pothole, streetlight, garbage, etc.)

#### POST `/api/issues`
Report a new civic issue.

**Request Body:**
```json
{
  "title": "Pothole on Main Street",
  "description": "Large pothole causing traffic issues",
  "category": "pothole",
  "location": "Main Street, near City Hall",
  "coordinates": { "lat": 15.4909, "lng": 73.8278 },
  "photoUrl": "https://example.com/photo.jpg"
}
```

---

## Issue Categories

- **Pothole**: Road potholes and damage
- **Streetlight**: Broken or non-functional streetlights
- **Garbage**: Overflowing bins or illegal dumping
- **Water Leak**: Water leaks or pipeline issues
- **Road**: Road maintenance issues
- **Sanitation**: Cleanliness and sanitation problems
- **Lighting**: Public lighting issues
- **Drainage**: Drainage and sewage problems
- **Other**: Other civic issues

---

## Issue Status Flow

```
Open → In Progress → Resolved
  ↓
Rejected (if invalid/duplicate)
  ↓
Closed (archived)
```

---

## Priority Levels

Issues are assigned priority based on votes, frequency, and severity:
- **Critical**: Emergency issues requiring immediate attention
- **High**: Important issues affecting many people
- **Medium**: Standard issues
- **Low**: Minor issues

---

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/lostuser01/NIT_GOA_HACKATHON.git
   cd NIT_GOA_HACKATHON/citypulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` file:
   ```env
   DATABASE_URL="your-database-url"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to `http://localhost:3000`

---

## Current Status

### ✅ Completed
- Project setup with Next.js 14 and TypeScript
- shadcn/ui integration
- Login and Signup pages with CityPulse branding
- Navigation menu
- Responsive home page with problem statement
- Backend API structure (auth, issues)
- Database schema types
- API documentation

### 🚧 In Progress / TODO
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication with JWT/NextAuth
- [ ] Interactive map with Google Maps/Mapbox
- [ ] Image upload functionality
- [ ] Issue submission form
- [ ] Dashboard for citizens (My Issues)
- [ ] Admin/Moderator dashboard
- [ ] Real-time notifications
- [ ] Analytics and reporting
- [ ] Vote and comment functionality
- [ ] Before/after image verification
- [ ] Email notifications
- [ ] AI-powered issue categorization (bonus feature)
- [ ] Mobile responsiveness testing
- [ ] Performance optimization

---

## Additional Features (For Higher Scores)

### AI-Powered Issue Categorization & Priority Ranking

Integrate a lightweight AI/ML model that automatically classifies reported issues based on:
- Text description analysis
- Image recognition
- Location-based patterns

Assign priority scores based on:
- Severity
- Frequency
- Location
- Community votes

This helps authorities allocate resources efficiently and respond to critical issues faster.

---

## Expected Outcome

A functional prototype of CityPulse that:

✅ **Empowers Citizens** to actively participate in improving their local environment

✅ **Enables Authorities** to manage, prioritize, and resolve issues faster using real-time data

✅ **Builds** a transparent, accountable, and participatory civic ecosystem through technology and collaboration

---

## Design Philosophy

### User-Centric Design
- Clean, intuitive interface
- Mobile-first responsive design
- Accessibility considerations

### Transparency
- Open data access
- Real-time status updates
- Public analytics

### Community-Driven
- Voting and commenting system
- Community engagement features
- Collaborative problem-solving

### Data-Driven Governance
- Analytics dashboard
- Performance metrics
- Trend analysis

---

## Contributing

This is a hackathon project. Contributions and suggestions are welcome!

---

## Team

Built for **NIT Goa Hackathon**

**Theme**: CivicTech | Social Good | Full Stack Web Development

---

## License

This project is created for the NIT Goa Hackathon. See LICENSE file for details.

---

## Contact & Support

For questions or support regarding CityPulse, please refer to the project documentation or contact the development team.

---

## Acknowledgments

- NIT Goa for organizing the hackathon
- shadcn/ui for the beautiful UI components
- Next.js team for the amazing framework
- All contributors and supporters of civic technology

---

**CityPulse** - *Fostering a culture of civic participation and data-driven governance*