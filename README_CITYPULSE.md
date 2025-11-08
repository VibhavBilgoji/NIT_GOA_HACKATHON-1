# CityPulse - Local Issue Reporting & Impact Tracker

![CityPulse](https://img.shields.io/badge/CityPulse-CivicTech-black)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-black)

## 🌟 Overview

**CityPulse** is a smart, transparent, and community-driven platform that enables effortless civic issue reporting, real-time tracking, and improved collaboration between citizens and municipal authorities — fostering a culture of civic participation and data-driven governance.

### Theme
**CivicTech | Social Good | Full Stack Web Development**

---

## 🎯 Problem Statement

Urban citizens often face everyday civic issues such as potholes, broken streetlights, overflowing garbage, and water leaks. However, the absence of accessible and transparent reporting systems prevents these problems from being efficiently addressed.

### Key Challenges

- **Inaccessibility and Non-Transparency**: Lack of accessible and transparent reporting systems
- **No Resolution Updates**: Citizens rarely receive updates on their reported issues
- **Low Engagement**: This leads to low citizen engagement in civic processes
- **Inefficiency**: Duplicate reports, lack of real-time tracking, and poor accountability

---

## 💡 Solution

CityPulse is a web-based Local Issue Reporting & Impact Tracking System that:

### For Citizens
- Report civic issues with description, photo, and live GPS location
- View issues on an interactive city map with color-coded status markers
- Track resolution progress in real-time (Open → In Progress → Resolved)
- Vote, comment, and support existing issues
- Receive automated updates and notifications

### For Authorities
- Dashboard with visual analytics showing trends, hotspots, and resolution rates
- Role-based access to verify, categorize, and update issue statuses
- Impact reports with metrics like average resolution time and ward-wise performance
- Efficient resource allocation with AI-powered priority scoring

---

## 🚀 Features

### ✅ Core Requirements

1. **User Interface**
   - Responsive, mobile-friendly web platform
   - Interactive city map with color-coded issue markers
   - Real-time issue tracking and updates

2. **Issue Reporting & Tracking**
   - Form-based and map-based submission
   - Photo upload with live GPS location
   - Automated status updates (Open → In Progress → Resolved)

3. **Admin & Moderator Dashboard**
   - Role-based access control
   - Visual analytics and trends
   - Issue verification and categorization

4. **Community Engagement**
   - Voting and commenting system
   - Before-and-after image verification
   - Social sharing capabilities

5. **Transparency & Accountability**
   - Impact reports with key metrics
   - Public access to anonymized data
   - Resolution time tracking

6. **User Management**
   - Secure authentication with role-based permissions
   - User history tracking
   - Issue ownership and notifications

### 🎨 Additional Features (Higher Scores)

- **AI-Powered Issue Categorization**: Automatically classifies issues (road, lighting, sanitation, water) based on text and image inputs
- **Priority Ranking**: ML model assigns priority scores based on severity, frequency, and location
- **Smart Resource Allocation**: Helps authorities allocate resources efficiently

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes (Dark/Light mode)

### UI Libraries Installed
- Dashboard components (dashboard-01)
- Data Tables
- Charts (with Recharts integration)
- Navigation Menu
- Dialog, Select, Table
- Card, Badge, Avatar
- Sidebar, Drawer, Sheet
- Tooltip, Dropdown Menu
- And more...

### Backend (Planned)
- API Routes with Next.js
- Database: PostgreSQL / MongoDB
- Authentication: NextAuth.js
- File Upload: Cloudinary / AWS S3
- Real-time: Socket.io / Pusher
- Maps: Google Maps API / Mapbox

---

## 🎨 Design Philosophy

CityPulse follows a **minimalist black and white design** inspired by shadcn/ui and Tailark:

- **Colors**: Strictly black and white with subtle grays
- **Typography**: Clean, modern fonts (Geist Sans & Geist Mono)
- **Components**: Consistent shadcn/ui components throughout
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive**: Mobile-first design approach
- **Dark Mode**: System-aware theme switching

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1.git
cd NIT_GOA_HACKATHON-1/citypulse

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
citypulse/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Home page
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   └── dashboard/          # Dashboard page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── theme-provider.tsx  # Theme context provider
│   ├── theme-toggle.tsx    # Dark/light mode toggle
│   ├── login-form.tsx      # Login form component
│   ├── signup-form.tsx     # Signup form component
│   └── ...
├── lib/
│   └── utils.ts            # Utility functions
├── hooks/
│   └── use-mobile.ts       # Mobile detection hook
└── public/
    └── ...
```

---

## 🎯 Core Pages

### 🏠 Home Page (`/`)
- Hero section with CTA
- Features showcase
- Problem statement
- Community statistics

### 🔐 Authentication
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration
- OAuth integration (GitHub)
- Dark/Light mode toggle

### 📊 Dashboard (`/dashboard`)
- Issue analytics and charts
- Data table with filters
- Interactive area charts
- Recent issues list
- Sidebar navigation

---

## 🌈 Color Scheme

```css
/* Light Mode */
--background: 0 0% 100%;        /* White */
--foreground: 0 0% 0%;          /* Black */
--border: 0 0% 90%;             /* Light Gray */

/* Dark Mode */
--background: 0 0% 0%;          /* Black */
--foreground: 0 0% 100%;        /* White */
--border: 0 0% 20%;             /* Dark Gray */
```

---

## 🚧 Roadmap

### Phase 1: Foundation (Current)
- [x] Project setup with Next.js 14
- [x] shadcn/ui integration
- [x] Authentication UI (Login/Signup)
- [x] Dark/Light mode
- [x] Dashboard components
- [x] Responsive design

### Phase 2: Backend Integration
- [ ] API routes setup
- [ ] Database schema design
- [ ] User authentication (NextAuth.js)
- [ ] File upload system
- [ ] Real-time notifications

### Phase 3: Core Features
- [ ] Issue reporting form
- [ ] Interactive map integration
- [ ] Issue tracking system
- [ ] Admin dashboard
- [ ] User management

### Phase 4: Advanced Features
- [ ] AI-powered categorization
- [ ] Priority ranking algorithm
- [ ] Analytics and reporting
- [ ] Community engagement features
- [ ] Before/after image verification

### Phase 5: Deployment
- [ ] Production build optimization
- [ ] CI/CD pipeline
- [ ] Monitoring and logging
- [ ] Performance optimization
- [ ] Security hardening

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 👥 Team

**NIT Goa Hackathon Team**

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the beautiful icon set

---

## 📞 Contact

For questions or support, please open an issue on GitHub.

---

**CityPulse** - *Empowering communities through technology* 🏙️✨