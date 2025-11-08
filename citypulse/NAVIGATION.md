# 🧭 CityPulse - Navigation System Guide

## 📋 Overview

CityPulse now features a **global navigation system** that works exactly like React Router DOM - the navigation bar appears on **every page** and clicking any link only changes the content while keeping the navbar persistent.

---

## ✨ Key Features

### 1. **Global Navigation Bar**
- ✅ Appears on **all pages** automatically
- ✅ Transparent backdrop with blur effect
- ✅ Sticky positioning (stays at top when scrolling)
- ✅ Active state highlighting for current page
- ✅ Responsive design for mobile and desktop

### 2. **Smart Routing**
- ✅ Next.js Link components for instant navigation
- ✅ No page reloads (SPA-like experience)
- ✅ Active route detection with `usePathname`
- ✅ Visual separator between navigation sections
- ✅ Icons for key sections (Map, Team)

### 3. **Consistent Layout**
- ✅ Navigation in root `layout.tsx` (appears everywhere)
- ✅ Theme toggle always accessible
- ✅ CityPulse logo links back to home
- ✅ Clean, minimal design matching shadcn/ui

---

## 🗺️ Navigation Structure

```
CityPulse
├── Map          (with icon)
├── Dashboard
├── Team         (with icon)
│
├── [Separator]
│
├── Login
├── Sign Up
│
└── Theme Toggle
```

---

## 📍 Available Routes

| Route | Label | Icon | Description |
|-------|-------|------|-------------|
| `/` | CityPulse Logo | MapPin | Home page |
| `/map` | Map | Map | Interactive map with issue reporting |
| `/dashboard` | Dashboard | - | Analytics and statistics |
| `/team` | Team | Users | Team member profiles |
| `/login` | Login | - | User authentication |
| `/signup` | Sign Up | - | New user registration |

---

## 🎨 Active State Styling

When you're on a page, the corresponding navigation button shows:
- **Light Mode**: Light gray background (`bg-gray-100`)
- **Dark Mode**: Dark gray background (`bg-gray-900`)
- **Text**: Black (light mode) / White (dark mode)

---

## 💻 Implementation Details

### Root Layout (`app/layout.tsx`)
```typescript
import { Navigation } from "@/components/navigation";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <Navigation />  {/* Global navbar */}
          {children}      {/* Page content */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Navigation Component (`components/navigation.tsx`)
```typescript
"use client";

import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname(); // Detects current route
  
  // Highlights active link based on pathname
  const isActive = pathname === item.href;
  
  return (
    <header className="sticky top-0 z-50 ...">
      {/* Navigation content */}
    </header>
  );
}
```

---

## 🔧 How It Works

### 1. **Single Source of Truth**
The navigation is defined once in `components/navigation.tsx` and imported into the root layout. This ensures:
- Consistency across all pages
- Easy updates (change once, applies everywhere)
- No code duplication

### 2. **Active Route Detection**
```typescript
const pathname = usePathname(); // Gets current URL path
const isActive = pathname === item.href; // Checks if link is active
```

### 3. **Dynamic Styling**
```typescript
className={cn(
  navigationMenuTriggerStyle(),
  isActive && "bg-gray-100 dark:bg-gray-900" // Conditional styling
)}
```

---

## 📱 Responsive Behavior

### Desktop (>768px)
- Full navigation with all items visible
- Icons displayed alongside text
- Proper spacing between items

### Mobile (<768px)
- Navigation menu may collapse (can be enhanced)
- Icons help identify sections quickly
- Touch-friendly button sizes

---

## 🎯 Navigation Items Configuration

### Main Navigation
```typescript
const navItems = [
  { href: "/map", label: "Map", icon: Map },
  { href: "/dashboard", label: "Dashboard", icon: null },
  { href: "/team", label: "Team", icon: Users },
];
```

### Authentication Links
```typescript
const authItems = [
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Sign Up" },
];
```

---

## ✅ Benefits of This Approach

### 1. **React Router-like Experience**
- Instant navigation without page reloads
- Smooth transitions between pages
- Persistent navigation state

### 2. **Performance**
- No duplicate headers on each page
- Reduced code duplication
- Faster page loads

### 3. **Maintainability**
- Single place to update navigation
- Easy to add/remove items
- Consistent behavior

### 4. **User Experience**
- Always know where you are (active states)
- Easy access to all sections
- Familiar navigation pattern

---

## 🚀 Adding New Routes

To add a new page to the navigation:

1. **Create the page** (e.g., `app/about/page.tsx`)

2. **Add to navigation config** (`components/navigation.tsx`):
```typescript
const navItems = [
  { href: "/map", label: "Map", icon: Map },
  { href: "/dashboard", label: "Dashboard", icon: null },
  { href: "/about", label: "About", icon: Info }, // New item
  { href: "/team", label: "Team", icon: Users },
];
```

3. **Done!** The navigation will automatically:
   - Show the new link
   - Highlight it when active
   - Apply consistent styling

---

## 🎨 Customization

### Change Navigation Height
```typescript
// In components/navigation.tsx
<div className="container mx-auto flex h-14 items-center ...">
//                                         ^^^^ Change this
```

### Adjust Transparency
```typescript
<header className="... bg-white/80 dark:bg-black/80 ...">
//                              ^^^ Adjust opacity (0-100)
```

### Modify Active State Colors
```typescript
isActive && "bg-gray-100 dark:bg-gray-900"
//          ^^^^^^^^^^^  ^^^^^^^^^^^^^^^^
//          Light mode   Dark mode
```

---

## 📊 Navigation Flow

```
User clicks "Map" button
         ↓
Next.js Link component navigates to /map
         ↓
usePathname() detects pathname = "/map"
         ↓
Map button gets active styling
         ↓
Page content updates (Map page renders)
         ↓
Navigation stays in place (no reload)
```

---

## 🔍 Debugging Tips

### Check Current Route
```typescript
console.log("Current pathname:", pathname);
```

### Verify Active State
```typescript
console.log("Is active:", isActive);
```

### Test Navigation
1. Click each navigation item
2. Verify active state highlights correctly
3. Check that URL updates
4. Ensure smooth transitions

---

## 🌟 Best Practices

1. **Keep Navigation Simple**
   - Don't overcrowd with too many items
   - Group related items together
   - Use icons sparingly

2. **Maintain Consistency**
   - Same navigation on all pages
   - Consistent styling and spacing
   - Predictable behavior

3. **Optimize Performance**
   - Use Next.js Link for prefetching
   - Minimize component re-renders
   - Lazy load heavy components

4. **Accessibility**
   - Keyboard navigation support
   - ARIA labels where needed
   - Focus indicators visible

---

## 🐛 Troubleshooting

### Navigation Not Showing
- ✅ Check if `<Navigation />` is in `app/layout.tsx`
- ✅ Verify no conflicting headers in pages
- ✅ Ensure proper imports

### Active State Not Working
- ✅ Confirm `usePathname()` is called
- ✅ Check pathname matching logic
- ✅ Verify conditional class names

### Styling Issues
- ✅ Check Tailwind classes are valid
- ✅ Verify dark mode classes
- ✅ Inspect with browser DevTools

---

## 📚 Related Files

```
citypulse/
├── app/
│   └── layout.tsx                    # Imports Navigation
├── components/
│   ├── navigation.tsx                # Main navigation component
│   ├── theme-toggle.tsx              # Dark/light mode toggle
│   └── ui/
│       └── navigation-menu.tsx       # shadcn/ui component
```

---

## 🎓 Learning Resources

- [Next.js Navigation](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- [usePathname Hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
- [shadcn/ui Navigation Menu](https://ui.shadcn.com/docs/components/navigation-menu)

---

## 🎉 Summary

Your CityPulse navigation now works just like React Router DOM:

✅ **Global navigation** appears on all pages  
✅ **Active states** show current location  
✅ **Smooth routing** without page reloads  
✅ **Consistent design** matching shadcn/ui  
✅ **Easy maintenance** with single source of truth  

---

**CityPulse** - Navigate with confidence! 🧭✨

*Last Updated: 2024*
*Version: 1.0.0*