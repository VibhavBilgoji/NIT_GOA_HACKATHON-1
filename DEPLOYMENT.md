# 🚀 CityPulse - Deployment & Demo Guide

## 📋 Table of Contents
1. [Live Demo](#live-demo)
2. [Local Development](#local-development)
3. [Deployment Options](#deployment-options)
4. [Environment Setup](#environment-setup)
5. [Production Checklist](#production-checklist)
6. [Troubleshooting](#troubleshooting)

---

## 🌐 Live Demo

### Quick Links
- **Home Page**: `/`
- **Interactive Map**: `/map` - Report issues with description, photo, and live GPS location
- **Dashboard**: `/dashboard` - Analytics and data visualization
- **Team**: `/team` - Meet the team behind CityPulse
- **Login**: `/login` - User authentication
- **Sign Up**: `/signup` - Create new account

### Demo Features
✅ **Issue Reporting Form**
- Title input field
- Category selection (Road, Lighting, Sanitation, Water, Drainage, Other)
- Description textarea
- Photo upload with drag & drop
- Live GPS location capture button
- Real-time location confirmation

✅ **Interactive Map**
- Color-coded issue markers (Black = Open, Gray = In Progress, Light Gray = Resolved)
- Issue statistics dashboard
- Clickable issue cards with full details

✅ **Dark/Light Mode**
- System-aware theme detection
- Manual toggle in navigation bar
- Persistent theme preference

---

## 💻 Local Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1.git

# 2. Navigate to project directory
cd NIT_GOA_HACKATHON-1/citypulse

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

### Available Pages
| Route | Description |
|-------|-------------|
| `/` | Home page with features |
| `/map` | Interactive map with issue reporting |
| `/dashboard` | Analytics dashboard |
| `/team` | Team information |
| `/login` | Login page |
| `/signup` | Signup page |

---

## 🚢 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Built by Next.js creators
- Zero configuration
- Automatic deployments
- Built-in CDN
- Free SSL certificates

**Deployment Steps:**

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Production deployment
vercel --prod
```

**Or deploy via GitHub:**
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

**Environment Variables:**
Add these in Vercel dashboard under Settings → Environment Variables:
```
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

### 2. Netlify

**Deployment Steps:**

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build the project
npm run build

# 4. Deploy
netlify deploy --prod
```

**Build Settings:**
- Build Command: `npm run build`
- Publish Directory: `.next`

---

### 3. Railway

**Quick Deploy:**

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

**Manual Steps:**
1. Visit [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy

---

### 4. Docker

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Build and Run:**

```bash
# Build image
docker build -t citypulse .

# Run container
docker run -p 3000:3000 citypulse
```

---

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (PostgreSQL example)
DATABASE_URL=postgresql://user:password@localhost:5432/citypulse

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl

# OAuth Providers
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret

# File Upload (Cloudinary example)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
# OR
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Email (Optional - for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## ✅ Production Checklist

### Before Deployment

- [ ] **Environment Variables**
  - [ ] All required env vars are set
  - [ ] Secrets are properly secured
  - [ ] API keys are valid

- [ ] **Code Quality**
  - [ ] No console.log statements
  - [ ] No TODO comments in critical code
  - [ ] ESLint passes without errors
  - [ ] TypeScript compiles without errors

- [ ] **Performance**
  - [ ] Images are optimized
  - [ ] Bundle size is reasonable
  - [ ] Lighthouse score > 90

- [ ] **Security**
  - [ ] No sensitive data in client code
  - [ ] CORS is properly configured
  - [ ] Rate limiting is implemented
  - [ ] Input validation is in place

- [ ] **SEO & Meta**
  - [ ] Meta tags are set
  - [ ] Sitemap.xml is generated
  - [ ] Robots.txt is configured
  - [ ] Open Graph images are set

- [ ] **Testing**
  - [ ] All pages load correctly
  - [ ] Forms submit properly
  - [ ] Dark/Light mode works
  - [ ] Mobile responsive
  - [ ] Cross-browser compatible

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Fails

**Error:** `Module not found`
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

#### 2. Port Already in Use

**Error:** `Port 3000 is already in use`
```bash
# Solution: Use different port
PORT=3001 npm run dev

# Or kill process on port 3000
npx kill-port 3000
```

#### 3. Environment Variables Not Loading

**Solution:**
- Ensure `.env.local` is in root directory
- Restart development server after adding env vars
- For client-side vars, prefix with `NEXT_PUBLIC_`

#### 4. Dark Mode Not Working

**Solution:**
- Clear browser cache
- Check if `next-themes` is installed
- Verify ThemeProvider wraps the app in layout.tsx

#### 5. shadcn/ui Components Not Styling Correctly

**Solution:**
```bash
# Reinstall components
npx shadcn@latest add button -y --overwrite
```

---

## 📊 Performance Optimization

### Image Optimization

```jsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // For above-the-fold images
/>
```

### Font Optimization

Already configured with Geist Sans and Geist Mono.

### Bundle Analysis

```bash
# Install bundle analyzer
npm install @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

---

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env.local` to Git
- Use different secrets for production
- Rotate secrets regularly

### 2. API Routes
```typescript
// Add rate limiting
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### 3. Content Security Policy
```typescript
// In next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]
```

---

## 📈 Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```jsx
// In app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```bash
# Initialize Sentry
npx @sentry/wizard@latest -i nextjs
```

---

## 🎯 Post-Deployment

### Domain Setup
1. Purchase domain (e.g., citypulse.com)
2. Configure DNS in Vercel/Netlify
3. Add custom domain in platform settings
4. Wait for SSL certificate provisioning

### Database Migration
```bash
# Run migrations
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### CDN Configuration
- Enable CDN in hosting platform
- Configure cache headers
- Optimize static assets

---

## 📞 Support & Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [GitHub Issues](https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1/issues)

---

## 🏆 Success Metrics

### Key Performance Indicators (KPIs)
- Page Load Time < 2 seconds
- Lighthouse Score > 90
- Core Web Vitals: Good
- Uptime > 99.9%
- Zero critical security vulnerabilities

---

**CityPulse** - Ready for Production! 🚀

*Last Updated: 2024*
*Version: 1.0.0*