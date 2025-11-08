# MapTiler Interactive Map Integration

## Overview
CityPulse now features a fully interactive map powered by MapTiler SDK, allowing users to visualize civic issues with real-time markers, geolocation support, and an intuitive user interface.

## Features

### 🗺️ Interactive Map
- **Real-time Rendering**: MapTiler Streets style map with smooth pan and zoom
- **Dynamic Markers**: Color-coded markers based on issue status
- **Click Interactions**: Click markers to view issue details
- **Responsive Design**: Automatically adjusts to container size

### 📍 Geolocation Support
- **User Location Tracking**: Built-in geolocation control
- **Current Position**: Users can center map on their current location
- **High Accuracy**: Uses browser's high-accuracy positioning

### 🎨 Visual Status Indicators
- **🔴 Red Markers**: Open issues requiring attention
- **🟠 Amber Markers**: Issues in progress
- **🟢 Green Markers**: Resolved issues

### 🧭 Navigation Controls
- **Zoom In/Out**: Standard zoom controls in top-right corner
- **Compass**: Rotation and bearing controls
- **Geolocation Button**: Quick access to user's current location

## Technical Implementation

### MapTiler SDK
```typescript
import { Map, NavigationControl, GeolocateControl, Marker, Popup } from '@maptiler/sdk';
```

### API Key
- **Service**: MapTiler Cloud
- **Key**: `dA7RH7aBOA9zMomjXvTC`
- **Style**: Streets v4
- **Center**: [81.81298, 15.215] (Goa, India)

### Component Structure

#### InteractiveMap Component (`components/interactive-map.tsx`)
```tsx
<InteractiveMap
  center={[lng, lat]}
  zoom={12}
  markers={[
    {
      id: 1,
      position: [lng, lat],
      title: "Issue Title",
      status: "open" | "in-progress" | "resolved"
    }
  ]}
  onMarkerClick={(id) => handleMarkerClick(id)}
/>
```

#### Props Interface
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `center` | `[number, number]` | `[81.81298, 15.215]` | Map center coordinates [lng, lat] |
| `zoom` | `number` | `12` | Initial zoom level (1-20) |
| `markers` | `Array<Marker>` | `[]` | Array of marker objects |
| `onMarkerClick` | `(id: number) => void` | `undefined` | Callback when marker is clicked |

### Marker Configuration

#### Status Colors
```typescript
{
  open: "#ef4444",        // Red - Urgent attention needed
  "in-progress": "#f59e0b", // Amber - Being worked on
  resolved: "#10b981"     // Green - Completed
}
```

#### Marker Styling
- **Size**: 30x30px circular markers
- **Border**: 3px solid white
- **Shadow**: Subtle drop shadow for depth
- **Cursor**: Pointer on hover
- **Animation**: Smooth transitions

### Popup Content
Each marker displays a popup on click with:
- **Issue Title**: Bold, prominent heading
- **Status**: Capitalized status text (e.g., "In Progress")
- **Styling**: Clean, readable design with proper padding

## Integration in Map Page

### Location
`app/map/page.tsx`

### Usage Example
```tsx
<InteractiveMap
  center={[81.81298, 15.215]}
  zoom={12}
  markers={mockIssues.map((issue) => ({
    id: issue.id,
    position: [issue.location.lng, issue.location.lat],
    title: issue.title,
    status: issue.status,
  }))}
  onMarkerClick={(id) => setSelectedIssue(id)}
/>
```

### Mock Data Format
```typescript
{
  id: number;
  title: string;
  description: string;
  category: string;
  status: "open" | "in-progress" | "resolved";
  location: { lat: number; lng: number };
  address: string;
  date: string;
}
```

## Installation

### Dependencies
```bash
npm install @maptiler/sdk
```

### Package Details
- **Package**: `@maptiler/sdk`
- **Version**: Latest
- **Size**: ~34 packages added
- **License**: Check MapTiler terms

### CSS Import
Already imported in `app/globals.css`:
```css
@import "@maptiler/sdk/dist/maptiler-sdk.css";
```

## Browser Support

### Geolocation API
- ✅ Chrome 5+
- ✅ Firefox 3.5+
- ✅ Safari 5+
- ✅ Edge 12+
- ✅ Opera 10.6+

### MapTiler SDK
- ✅ Modern browsers with WebGL support
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 not supported

## Performance Considerations

### Lazy Loading
- Map SDK loaded dynamically only when needed
- Reduces initial bundle size
- Improves first contentful paint

### Client-Side Only
```tsx
"use client"; // Component runs only on client
```

### Cleanup
```typescript
useEffect(() => {
  // ... map initialization
  
  return () => {
    if (mapRef.current) {
      mapRef.current.remove(); // Proper cleanup
      mapRef.current = null;
    }
  };
}, [dependencies]);
```

### Memory Management
- Removes map instance on unmount
- Prevents memory leaks
- Cleans up event listeners

## Customization Options

### Change Map Style
```typescript
style: maptilersdk.MapStyle.STREETS // Current
// Options: SATELLITE, HYBRID, TERRAIN, OUTDOOR, etc.
```

### Adjust Zoom Levels
```typescript
zoom: 12,      // Initial zoom
minZoom: 1,    // Minimum zoom (optional)
maxZoom: 20,   // Maximum zoom (optional)
```

### Custom Marker Icons
Replace the circular div with custom SVG or image:
```typescript
const el = document.createElement('div');
el.innerHTML = '<svg>...</svg>'; // Custom icon
```

### Popup Customization
```typescript
const popup = new maptilersdk.Popup({
  offset: 25,
  closeButton: false,  // Hide close button
  closeOnClick: true,  // Auto-close on map click
  maxWidth: '300px',   // Max popup width
})
```

## Future Enhancements

### Planned Features
- [ ] Clustering for dense marker groups
- [ ] Heatmap layer for issue density
- [ ] Drawing tools for area reports
- [ ] Route planning to issue locations
- [ ] Offline map caching
- [ ] 3D building visualization
- [ ] Custom map themes (dark mode map)
- [ ] Search/geocoding integration
- [ ] Distance measurement tools
- [ ] Export map as image/PDF

### API Integration
- [ ] Connect to backend API for real issues
- [ ] Real-time updates via WebSocket
- [ ] Filter markers by category/status
- [ ] Load markers on map bounds change
- [ ] Paginated marker loading for performance

## Error Handling

### Geolocation Errors
```typescript
if (!navigator.geolocation) {
  console.error("Geolocation not supported");
}

geolocation.getCurrentPosition(
  (position) => { /* success */ },
  (error) => {
    // Handle: PERMISSION_DENIED, POSITION_UNAVAILABLE, TIMEOUT
    console.error("Error getting location:", error);
  }
);
```

### Map Loading Errors
```typescript
loadMapTiler().catch((error) => {
  console.error("Error loading MapTiler:", error);
  // Show fallback UI or error message
});
```

## Security & Privacy

### API Key Management
- ⚠️ Currently hardcoded (development only)
- ✅ Move to environment variables for production:
  ```bash
  NEXT_PUBLIC_MAPTILER_API_KEY=your_key_here
  ```
  ```typescript
  apiKey: process.env.NEXT_PUBLIC_MAPTILER_API_KEY
  ```

### User Privacy
- Geolocation requires user permission
- Location data not stored without consent
- HTTPS required for geolocation API

## Resources

### Documentation
- [MapTiler SDK Docs](https://docs.maptiler.com/sdk-js/)
- [MapTiler Cloud](https://www.maptiler.com/cloud/)
- [API Reference](https://docs.maptiler.com/sdk-js/api/)

### Examples
- [MapTiler Examples](https://docs.maptiler.com/sdk-js/examples/)
- [GitHub Repository](https://github.com/maptiler/maptiler-sdk-js)

### Support
- [Community Forum](https://community.maptiler.com/)
- [Issue Tracker](https://github.com/maptiler/maptiler-sdk-js/issues)

## License & Attribution

### MapTiler
- Check [MapTiler Terms](https://www.maptiler.com/terms/)
- Free tier available with attribution
- Production use may require paid plan

### Map Attribution
MapTiler includes required attributions automatically in the map UI.

---

**Status**: ✅ Implemented and Deployed  
**Last Updated**: Current Version  
**Commit**: `77d4d8a`
