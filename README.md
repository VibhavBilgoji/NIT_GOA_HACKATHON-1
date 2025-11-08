# 🏙️ CityPulse - Local Issue Reporting & Impact Tracker

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-black?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-black?style=flat-square)

**CityPulse** is a smart, transparent, and community-driven platform that enables effortless civic issue reporting, real-time tracking, and improved collaboration between citizens and municipal authorities — fostering a culture of civic participation and data-driven governance.

---

## 🎯 Problem Statement

Urban citizens often face everyday civic issues such as **potholes, broken streetlights, overflowing garbage, and water leaks**. However, the absence of accessible and transparent reporting systems prevents these problems from being efficiently addressed.

### Key Challenges
- ❌ Inaccessible and non-transparent reporting systems
- ❌ Citizens rarely receive updates on reported issues
- ❌ Low engagement and duplicate reports
- ❌ Lack of accountability from municipal authorities

### Our Solution
CityPulse is a **web-based Local Issue Reporting & Impact Tracking System** that allows citizens to:
- ✅ Report civic issues with **description, photo, and live GPS location**
- ✅ View issues on an **interactive city map**
- ✅ Track **resolution progress in real-time** (Open → In Progress → Resolved)
- ✅ Bridge the gap between citizens and municipal authorities

---

## ✨ Features

### 🗺️ Interactive Map
- View all reported issues on an interactive city map
- Color-coded markers (Black = Open, Gray = In Progress, Light Gray = Resolved)
- Click on markers to view issue details
- Real-time updates and statistics

### 📝 Issue Reporting
- Easy-to-use reporting form with:
  - Title and description
  - Category selection (Road, Lighting, Sanitation, Water, Drainage)
  - Photo upload with drag & drop
  - **Live GPS location capture**
  - Instant submission

### 📊 Dashboard
- Visual analytics and trends
- Issue statistics and metrics
- Interactive charts (Recharts)
- Data tables with sorting/filtering
- Admin and moderator access

### 👥 Community Features
- Track your reported issues
- View community statistics
- Vote and comment on issues (planned)
- Before/after photo verification (planned)

### 🎨 Design
- **Pure black & white aesthetic** (inspired by shadcn/ui)
- Dark/Light mode with system awareness
- Responsive mobile-first design
- Accessible and keyboard-friendly
- Smooth animations and transitions

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1.git
cd NIT_GOA_HACKATHON-1/citypulse

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📁 Project Structure

```
citypulse/
├── app/
│   ├── page.tsx              # Home page
│   ├── login/                # Login page
│   ├── signup/               # Signup page
│   ├── map/                  # Interactive map with reporting
│   ├── dashboard/            # Analytics dashboard
│   ├── team/                 # Team information
│   ├── layout.tsx            # Root layout with theme
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components (40+)
│   ├── theme-provider.tsx    # Theme context provider
│   ├── theme-toggle.tsx      # Dark/light mode toggle
│   ├── login-form.tsx        # Login form component
│   ├── signup-form.tsx       # Signup form component
│   └── ...                   # Other components
├── lib/
│   └── utils.ts              # Utility functions
├── hooks/
│   └── use-mobile.ts         # Mobile detection hook
└── public/                   # Static assets
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### Backend (Planned)
- **API**: Next.js API Routes
- **Database**: PostgreSQL / MongoDB
- **Auth**: NextAuth.js
- **File Storage**: Cloudinary / AWS S3
- **Real-time**: Socket.io / Pusher
- **Maps**: Google Maps API / Mapbox

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with features and CTA |
| Map | `/map` | Interactive map with issue reporting |
| Dashboard | `/dashboard` | Analytics and data visualization |
| Team | `/team` | Team member profiles |
| Login | `/login` | User authentication |
| Signup | `/signup` | User registration |

---

## 🎨 Design System

### Color Palette
- **Light Mode**: White background, Black text
- **Dark Mode**: Black background, White text
- **Borders**: Gray-200 (light) / Gray-800 (dark)
- **Accent**: Pure black/white with no colored accents

### Typography
- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Headings**: Bold, Black/White
- **Body**: Regular, Gray-600 (light) / Gray-400 (dark)

### Components
All components follow the **shadcn/ui** design system with consistent:
- Border radius: 10px
- Spacing: 4px base unit
- Transitions: Smooth and subtle
- Accessibility: WCAG 2.1 AA compliant

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# File Upload
CLOUDINARY_URL=

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

---

## 📊 Key Features Implementation

### Issue Reporting Form
```typescript
- Title (required)
- Category dropdown (Road, Lighting, Sanitation, Water, etc.)
- Description textarea (required)
- Photo upload (drag & drop, max 5MB)
- Live GPS location capture
- Submit button with validation
```

### Status Tracking
```
Open → In Progress → Resolved
```

Each issue displays:
- Current status with icon
- Color-coded badge
- Timeline updates
- Location on map
- Category tag

---

## 🚧 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Next.js 14
- [x] shadcn/ui integration (40+ components)
- [x] Authentication UI (Login/Signup)
- [x] Dark/Light mode
- [x] Responsive design
- [x] Map page with reporting form
- [x] Dashboard with charts
- [x] Team page

### Phase 2: Backend Integration (In Progress)
- [ ] API routes setup
- [ ] Database schema design
- [ ] User authentication (NextAuth.js)
- [ ] File upload system
- [ ] Real-time notifications

### Phase 3: Core Features (Planned)
- [ ] Google Maps / Mapbox integration
- [ ] Issue CRUD operations
- [ ] Admin dashboard
- [ ] User management
- [ ] Comment system

### Phase 4: Advanced Features (Planned)
- [ ] AI-powered issue categorization
- [ ] Priority ranking algorithm
- [ ] Before/after image verification
- [ ] Analytics and reporting
- [ ] Mobile app

---

## 👥 Team

**NIT Goa Hackathon Team**

This project was built for the **NIT Goa Hackathon** with the theme:
- **CivicTech**
- **Social Good**
- **Full Stack Web Development**

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Recharts](https://recharts.org/) for data visualization

---

## 📞 Support

For questions or support, please:
- Open an issue on [GitHub](https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1/issues)
- Contact the team via the Team page

---

## 🌟 Show Your Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

---

<div align="center">
  <strong>CityPulse</strong> - Empowering communities through technology 🏙️✨
  <br />
  <sub>Built with ❤️ for NIT Goa Hackathon</sub>
</div>