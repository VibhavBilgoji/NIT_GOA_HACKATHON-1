# Ward Management System - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install @google/generative-ai @radix-ui/react-switch recharts next-themes
```

Or run the automated script:
```bash
chmod +x install-ward-system.sh
./install-ward-system.sh
```

### Step 2: Configure Environment
Add to your `.env.local`:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

Get your key: https://makersuite.google.com/app/apikey

### Step 3: Setup Database
Run in Supabase SQL Editor:
1. `supabase/schema.sql` (if not done)
2. `supabase/ward_management_schema.sql` ⭐ NEW

### Step 4: Start Application
```bash
npm run dev
```

### Step 5: Access Ward Management
1. Login as admin: `admin@ourstreet.com`
2. Go to: `http://localhost:3000/admin/wards`
3. Click "Generate AI Analysis" for insights

---

## 🎯 Key Features

### Ward Management (`/admin/wards`)
- **Select Ward** → View analytics
- **AI Analysis** → Click button for Gemini insights
- **Charts** → 4 interactive charts (Pie, Bar, Radar, Line)
- **Export** → Download reports as JSON
- **Refresh** → Update data in real-time

### Settings (`/settings`)
- **Profile** → Update personal info
- **Notifications** → 9 notification preferences
- **Appearance** → Light/Dark/System theme
- **Privacy** → Control data visibility
- **Security** → Change password
- **System** → Language, timezone, auto-refresh

### Impact Reports
- Generate AI-powered reports
- Track citizens impacted
- Calculate cost savings
- View key achievements

---

## 📊 Available APIs

### Ward Analytics
```
GET  /api/wards/analytics
GET  /api/wards/analytics?wardId=<id>
GET  /api/wards/analytics?analyze=true
POST /api/wards/analytics
```

### Impact Reports
```
GET    /api/impact-report
GET    /api/impact-report?wardId=<id>
POST   /api/impact-report
DELETE /api/impact-report?id=<id>
```

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Check for errors
npm run lint

# Run type checking
npx tsc --noEmit
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/admin/wards/page.tsx` | Ward management UI |
| `app/api/wards/analytics/route.ts` | Ward analytics API |
| `app/api/impact-report/route.ts` | Impact report API |
| `lib/gemini-client.ts` | AI integration |
| `app/settings/page.tsx` | Settings page |
| `supabase/ward_management_schema.sql` | Database schema |

---

## 🎨 Ward Management Features

### Metrics Displayed
- ✅ Total Issues
- ✅ Resolution Rate (%)
- ✅ Average Resolution Time
- ✅ Critical Issues Count
- ✅ Citizen Satisfaction (1-5)
- ✅ SLA Compliance (%)
- ✅ Budget Utilization (%)

### AI Insights Include
- 🤖 Performance Score (0-100)
- 📈 Trend Direction (Improving/Declining/Stable)
- 💡 Key Insights Summary
- 📋 Actionable Recommendations
- ⚡ Priority Actions (Top 3)
- 🔍 Key Performance Factors

### Charts Available
1. **Pie Chart** - Issue categories
2. **Bar Chart** - Priority levels
3. **Radar Chart** - Performance dimensions
4. **Line Chart** - Time series trends
5. **Comparison** - Cross-ward analysis

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Module not found
npm install @google/generative-ai @radix-ui/react-switch recharts

# Type errors
npx tsc --noEmit

# Clear cache
rm -rf .next
npm run dev
```

### API Issues
- **Gemini API fails**: System uses fallback analysis
- **No data showing**: Check database migrations
- **Authentication issues**: Verify JWT_SECRET in .env.local

### Database Issues
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name LIKE 'ward%';

-- Check ward data
SELECT * FROM wards;
```

---

## 💡 Pro Tips

1. **Without Gemini API**: System works with rule-based fallback
2. **Sample Data**: 5 demo wards included (Goa/Panjim)
3. **Auto-refresh**: Enable in Settings → System tab
4. **Export Data**: Use export buttons for reporting
5. **Dark Mode**: Toggle in Settings → Appearance
6. **Performance**: AI analysis cached for 5 minutes

---

## 🎓 Learning Resources

- **Full Setup**: See `SETUP_WARD_MANAGEMENT.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Database Schema**: See `supabase/ward_management_schema.sql`
- **AI Integration**: See `lib/gemini-client.ts`

---

## 📞 Quick Help

**Q: How do I test without Gemini API?**  
A: System works automatically with fallback analysis.

**Q: How do I add my city's wards?**  
A: Edit `supabase/ward_management_schema.sql` with your ward data.

**Q: Can I customize AI prompts?**  
A: Yes, edit prompts in `lib/gemini-client.ts`.

**Q: How do I access admin features?**  
A: Login with admin account and visit `/admin/wards`.

**Q: Where are charts configured?**  
A: See `app/admin/wards/page.tsx` - uses Recharts.

---

## ✅ Verification Checklist

Before deploying:
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables set (`.env.local`)
- [ ] Database migrations run (Supabase)
- [ ] Gemini API key configured (optional)
- [ ] Build succeeds (`npm run build`)
- [ ] Admin login works
- [ ] Ward page loads (`/admin/wards`)
- [ ] Charts display correctly
- [ ] AI analysis generates (or fallback works)
- [ ] Settings page functional
- [ ] Theme switching works

---

## 🚀 Production Deployment

```bash
# Build
npm run build

# Test build locally
npm start

# Deploy to Vercel/Netlify
# - Add environment variables
# - Connect to Supabase
# - Deploy
```

---

## 📊 Default Wards (Sample Data)

| Ward | Name | Population |
|------|------|------------|
| W001 | Panjim Central | 15,000 |
| W002 | Fontainhas Heritage | 8,000 |
| W003 | Miramar Coastal | 12,000 |
| W004 | Altinho Hills | 6,000 |
| W005 | Santa Cruz | 18,000 |

**Customize**: Update SQL script with your city's ward data.

---

## 🎉 You're Ready!

Navigate to `/admin/wards` and explore the ward management system!

For detailed documentation:
- `SETUP_WARD_MANAGEMENT.md` - Complete setup guide
- `IMPLEMENTATION_SUMMARY.md` - Feature details

**Happy Managing! 🏙️**