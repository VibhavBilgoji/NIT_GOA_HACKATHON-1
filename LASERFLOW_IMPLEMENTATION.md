# LaserFlow Implementation Guide

## Overview

The LaserFlow component is a WebGL-based animated light effect that creates a dynamic laser beam falling from the navbar down across the entire application. It uses Three.js and custom GLSL shaders to render a beautiful, performant visual effect.

## Features

- **WebGL-based rendering** using Three.js for high performance
- **Custom GLSL shaders** for complex visual effects
- **Wisps animation** - animated micro-streaks that travel along the beam
- **Volumetric fog** - creates depth and atmosphere
- **Mouse interaction** - fog tilts based on mouse position
- **Auto-performance adjustment** - dynamically adjusts DPR based on FPS
- **Responsive** - adapts to viewport changes
- **Visibility optimization** - pauses when tab is hidden or element is out of view
- **Context loss handling** - recovers from WebGL context loss

## Installation

The component has been installed with the following dependencies:

```bash
npm install three
npm install @types/three --save-dev
```

## File Structure

```
components/
├── laser-flow/
│   ├── LaserFlow.tsx       # Main component with WebGL implementation
│   ├── LaserFlow.css       # Component styles
│   └── index.tsx           # Export file
└── laser-flow-background.tsx  # Wrapper component for app-wide usage
```

## Usage

### App-Wide Background Effect (Current Implementation)

The LaserFlow is currently implemented as a fixed background effect in `app/layout.tsx`:

```tsx
import { LaserFlowBackground } from "@/components/laser-flow-background";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LaserFlowBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
```

### Component-Level Usage

You can also use LaserFlow directly in any component:

```tsx
import LaserFlow from "@/components/laser-flow";

function MyComponent() {
  return (
    <div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
      <LaserFlow
        color="#3b82f6"
        verticalBeamOffset={-0.45}
        horizontalBeamOffset={0.0}
        verticalSizing={3.5}
        horizontalSizing={1.2}
        fogIntensity={0.35}
        wispDensity={1.2}
        flowSpeed={0.25}
        fogFallSpeed={0.8}
      />
    </div>
  );
}
```

## Configuration Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | - | CSS class name |
| `style` | CSSProperties | - | Inline styles |
| `color` | string | '#FF79C6' | Hex color of the laser beam |
| `wispDensity` | number | 1 | Density of animated wisps (0-2) |
| `dpr` | number | auto | Device pixel ratio override |
| `mouseSmoothTime` | number | 0.0 | Mouse movement smoothing time |
| `mouseTiltStrength` | number | 0.01 | How much mouse affects fog tilt |
| `horizontalBeamOffset` | number | 0.1 | Horizontal position offset |
| `verticalBeamOffset` | number | 0.0 | Vertical position offset (-0.45 for top) |
| `flowSpeed` | number | 0.35 | Speed of flow animation |
| `verticalSizing` | number | 2.0 | Vertical beam length multiplier |
| `horizontalSizing` | number | 0.5 | Horizontal beam width multiplier |
| `fogIntensity` | number | 0.45 | Intensity of volumetric fog |
| `fogScale` | number | 0.3 | Scale of fog noise pattern |
| `wispSpeed` | number | 15.0 | Speed of wisp animation |
| `wispIntensity` | number | 5.0 | Brightness of wisps |
| `flowStrength` | number | 0.25 | Strength of pulsing flow effect |
| `decay` | number | 1.1 | Beam decay/falloff |
| `falloffStart` | number | 1.2 | Distance where falloff begins |
| `fogFallSpeed` | number | 0.6 | Speed of fog falling animation |

## Current Configuration

The app uses the following configuration for the navbar-to-screen effect:

```tsx
<LaserFlow
  verticalBeamOffset={-0.45}  // Starts from top (navbar area)
  horizontalBeamOffset={0.0}   // Centered horizontally
  color="#3b82f6"              // Blue color matching brand
  verticalSizing={3.5}         // Extended vertical length
  horizontalSizing={1.2}       // Wide horizontal spread
  fogIntensity={0.35}          // Subtle fog
  wispDensity={1.2}            // Rich wisp animation
  flowSpeed={0.25}             // Smooth, slower flow
  fogFallSpeed={0.8}           // Falling fog effect
/>
```

## Performance Optimizations

1. **Auto DPR Adjustment**: Monitors FPS and reduces device pixel ratio if performance drops below 50 FPS
2. **Visibility Detection**: Pauses rendering when:
   - Tab is hidden (document.hidden)
   - Element is out of viewport (IntersectionObserver)
3. **WebGL Context Management**: Handles context loss/restore gracefully
4. **Efficient Rendering**: Uses raw shaders, minimal overhead
5. **ResizeObserver**: Only re-renders on actual size changes

## Styling Integration

The navbar has been updated with increased transparency to allow the laser effect to show through:

```tsx
// navigation.tsx
<header className="... bg-white/40 dark:bg-black/40 backdrop-blur-md ...">
```

This creates a frosted-glass effect where the laser light is visible behind the navigation bar.

## Troubleshooting

### Performance Issues
- Reduce `wispDensity` (try 0.5 or 0.8)
- Reduce `fogIntensity` (try 0.2 or 0.25)
- Reduce `dpr` manually (try 1.0)

### Effect Not Visible
- Check that container has `position: relative` and a defined height
- Ensure `z-index` hierarchy is correct
- Verify color contrast against background
- Check that parent has `overflow: hidden` if needed

### Too Bright/Distracting
- Reduce `wispIntensity` (try 2.0 or 3.0)
- Reduce `fogIntensity` (try 0.2)
- Adjust `color` to a more subtle tone

## Browser Compatibility

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (with WebGL support)
- ✅ Mobile browsers with WebGL

Requires:
- WebGL 1.0 support
- ES6+ JavaScript
- ResizeObserver API
- IntersectionObserver API

## Technical Details

### Shader Architecture

The component uses two shaders:
1. **Vertex Shader**: Minimal pass-through for fullscreen quad
2. **Fragment Shader**: Complex shader with:
   - Beam rendering with radial falloff
   - Wisp animation system
   - Multi-octave Perlin noise for fog
   - Mouse-reactive fog tilt
   - Edge masking and vignetting
   - sRGB gamma correction

### Animation System

- Uses THREE.Clock for time management
- Exponential moving average for FPS calculation
- Smooth mouse tracking with configurable interpolation
- Separate time counters for flow and fog animations

## Future Enhancements

Potential improvements:
- [ ] Add color presets (blue, purple, green, etc.)
- [ ] Add intensity presets (subtle, normal, intense)
- [ ] Support multiple beams
- [ ] Add particle system overlay
- [ ] Mobile-specific optimizations
- [ ] Color animation/cycling option
- [ ] Reactive to music/audio input

## Credits

Based on the LaserFlow shader effect from @react-bits, adapted and optimized for Next.js 15+ with TypeScript support and enhanced performance monitoring.