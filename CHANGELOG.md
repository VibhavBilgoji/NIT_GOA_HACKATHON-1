# Changelog

All notable changes to the CityPulse project will be documented in this file.

## [Latest] - 2024-01-XX

### Added

#### Interactive Map Integration 🗺️
- **MapTiler SDK Integration**: Fully interactive map powered by MapTiler Cloud
- **Live Markers**: Color-coded markers based on issue status (Red=Open, Amber=In Progress, Green=Resolved)
- **Click Interactions**: Click markers to view detailed issue information
- **Geolocation Support**: Built-in user location tracking with high-accuracy positioning
- **Navigation Controls**: Zoom, pan, compass, and geolocation controls
- **Responsive Design**: Map automatically adjusts to container size
- **Smooth Performance**: Dynamic loading with proper cleanup to prevent memory leaks

#### Map Features
- Real-time marker rendering for all civic issues
- Interactive popups showing issue title and status
- Streets v4 map style centered on Goa, India [81.81298, 15.215]
- Custom circular markers with white borders and shadows
- Status-based color coding (red/amber/green)
- Support for browser geolocation API

#### Technical Implementation
- Created `InteractiveMap` component (`components/interactive-map.tsx`)
- Installed `@maptiler/sdk` package
- Imported MapTiler CSS in global styles
- Client-side only rendering with proper cleanup
- TypeScript support with proper typing
- Integration with existing issue data structure

### Changed

### Changed

#### Navigation Redesign
- **Centered main navigation items**: Map, Dashboard, and Team buttons are now centered in the navigation bar for better visual hierarchy
- **Added dashboard icon**: Dashboard link now displays with a LayoutDashboard icon for consistency
- **Restructured layout**: 
  - Logo (CityPulse) positioned on the left
  - Main navigation (Map, Dashboard, Team) centered in the middle
  - Auth buttons (Login, Sign Up) and theme toggle positioned on the right
- **Enhanced Sign Up button**: Sign Up now has a primary button style (black bg in light mode, white bg in dark mode) to encourage user registration
- **Improved spacing**: Better gap spacing between navigation elements for cleaner appearance

#### Typography Overhaul
- **Replaced Geist fonts with Inter**: Switched from Geist Sans and Geist Mono to the modern, highly-readable Inter font
- **Font consistency**: Inter font now applied globally across the entire application
- **Better readability**: Inter provides superior legibility at all sizes, especially for UI elements
- **Professional appearance**: Matches design systems used by leading tech companies and modern web applications

#### Code Quality
- **Fixed Tailwind warnings**: Updated backdrop-filter support classes to use simplified syntax
- **Improved code organization**: Better comments and structure in navigation component
- **Consistent styling**: Added `font-medium` class to all navigation links for uniform weight

### Technical Details

**Modified Files:**
- `app/layout.tsx` - Updated to use Inter font from Google Fonts
- `app/globals.css` - Updated CSS custom properties to reference Inter font
- `components/navigation.tsx` - Complete navigation restructure with centered layout

**Font Configuration:**
```typescript
// Previous: Geist Sans + Geist Mono
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Current: Inter
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
```

**Navigation Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│ Logo          Map | Dashboard | Team          Login | Signup | Theme │
└─────────────────────────────────────────────────────────────┘
   Left                  Center                       Right
```

### Technical Details - Map Integration

**New Files Created:**
- `components/interactive-map.tsx` - Reusable interactive map component
- `MAP_INTEGRATION.md` - Comprehensive map documentation

**Modified Files:**
- `app/map/page.tsx` - Replaced placeholder with live interactive map
- `app/globals.css` - Added MapTiler SDK CSS import
- `package.json` - Added @maptiler/sdk dependency

**Map Configuration:**
```typescript
// Default center: Goa, India
center: [81.81298, 15.215]
zoom: 12
apiKey: "dA7RH7aBOA9zMomjXvTC"
style: MapStyle.STREETS
```

**Marker Structure:**
```typescript
{
  id: number;
  position: [lng, lat];
  title: string;
  status: "open" | "in-progress" | "resolved";
}
```

### Deployment
- Successfully committed and pushed to GitHub repository
- Initial navigation refactor: `deb1f3e`
- Changelog added: `d87e7cc`
- Navigation layout docs: `0ec06f9`
- Fixed legacyBehavior: `1a841e7`
- Interactive map: `77d4d8a`
- Map documentation: `f7662c4`
- Repository: https://github.com/VibhavBilgoji/NIT_GOA_HACKATHON-1.git

---

## Previous Updates

For previous changes and feature additions, see:
- `FEATURES.md` - Complete feature list
- `README_CITYPULSE.md` - Detailed project documentation
- `NAVIGATION.md` - Navigation usage guide