# Profix Auto Care — Premium Scrollytelling Landing Page

A luxury product-launch style landing experience for Profix Auto Care — a German car workshop in Dubai. Built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
/app
  /components
    CarScroll.tsx        # Hero scrollytelling canvas component (client)
    ServicesBento.tsx    # Services bento grid
    Header.tsx           # Navigation header
    BookingModal.tsx     # Booking form modal
  page.tsx               # Main page component
  layout.tsx             # Root layout with metadata/SEO
  globals.css            # Design system & global styles
/public
  /sequence              # Full-resolution frame sequence
    manifest.json        # Sequence configuration
    poster.webp          # LCP fallback poster
    frame_0001_delay-0.066s.webp
    ...
    frame_0120_delay-0.066s.webp
  /sequence-low          # Low-resolution fallback
    ...
  /brands                # Brand logos
```

## 🎬 Image Sequence Setup

### Creating the Sequence

1. **Source**: Export frames from After Effects, Cinema 4D, or Blender
2. **Format**: WebP, high quality, sRGB color space
3. **Resolution**: 1920×1080 (full) / 960×540 (low-res fallback)
4. **Background**: Matte background exactly `#050505`
5. **Naming**: `frame_XXXX_delay-0.066s.webp` (4-digit padding)
6. **Frame count**: 120 frames (15 FPS × 8 seconds)

### Generating Low-Res Sequence

Use ImageMagick or sharp to create low-resolution fallbacks:

```bash
# Using ImageMagick
mkdir -p public/sequence-low
for f in public/sequence/frame_*.webp; do
  convert "$f" -resize 50% "public/sequence-low/$(basename $f)"
done

# Using FFmpeg (from video source)
ffmpeg -i input.mp4 -vf "scale=960:540" -c:v libwebp -quality 85 public/sequence-low/frame_%04d_delay-0.066s.webp
```

### Creating Poster Image

```bash
# Create blurred poster from first frame
convert public/sequence/frame_0001_delay-0.066s.webp -blur 0x8 -quality 60 public/sequence/poster.webp
```

## ⚡ Performance Tuning

### Memory Configuration

The `CarScroll` component automatically adjusts based on device capabilities:

| Device Type | Max Cached Frames |
|-------------|-------------------|
| Desktop (4+ cores) | 80 frames |
| Mobile (< 4 cores) | 40 frames |

To customize, modify in `CarScroll.tsx`:

```typescript
const maxCachedFrames = typeof window !== 'undefined' && 
  navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 ? 40 : 80;
```

### LRU Cache Behavior

Frames are cached using a Least Recently Used (LRU) strategy. When the cache exceeds `maxCachedFrames`, the oldest accessed frame is evicted.

### Priority Loading

The following frames are preloaded first:
1. Poster image
2. Frames 1-8 (initial reveal)
3. Every 10th frame (scrubbing coverage)
4. Remaining frames (background loading)

## 🎨 Design System

### Colors

```css
--color-background: #050505;
--color-foreground: rgba(255, 255, 255, 0.9);
--color-muted: rgba(255, 255, 255, 0.6);
--glass-bg: rgba(255, 255, 255, 0.04);
--glass-border: rgba(255, 255, 255, 0.06);
```

### Motion

```css
--ease-cinematic: cubic-bezier(0.2, 0.8, 0.2, 1);
--duration-slow: 600ms;
```

## ♿ Accessibility

- **Keyboard Navigation**: All interactive elements are focusable
- **Screen Readers**: Text overlays exist in DOM for assistive technology
- **Reduced Motion**: Respects `prefers-reduced-motion` — shows static fallback
- **Skip Link**: Skip to main content available
- **ARIA Labels**: All buttons and interactive elements labeled

## 📊 Analytics Events

The following events are pushed to `dataLayer`:

| Event | Properties |
|-------|------------|
| `scroll_progress` | `scroll_percent: 0 \| 30 \| 60 \| 90` |
| `cta_click` | `cta_location: string` |
| `booking_submit` | `service_type, vehicle_brand` |

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Analytics (optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# API Endpoints (production)
NEXT_PUBLIC_API_URL=https://api.profixautocare.ae
```

## ✅ QA / Acceptance Checklist

### Canvas Animation
- [ ] Frame scrubbing is smooth (no visible frame flicker)
- [ ] Correct mapping to scroll progress
- [ ] Lerp smoothing applied
- [ ] Canvas background matches page (#050505)

### Loading
- [ ] Poster or spinner shows while minimum frames load
- [ ] No white flashes during load
- [ ] Progressive loading indicator visible

### Performance
- [ ] LCP ≤ 2.5s on 4G throttled mobile (with poster)
- [ ] Initial JS bundle ≤ 200KB gzipped
- [ ] Memory usage stable during scroll

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA attributes present
- [ ] `prefers-reduced-motion` honored
- [ ] Color contrast meets WCAG AA

### Responsive
- [ ] Canvas scales correctly on all viewports
- [ ] Memory fallback used on low-memory mobile
- [ ] Mobile menu functions correctly
- [ ] Mobile sticky CTA visible

### SEO & Schema
- [ ] Title and description present
- [ ] OpenGraph tags present
- [ ] LocalBusiness JSON-LD present
- [ ] Semantic HTML structure

### Analytics
- [ ] Scroll milestone events firing
- [ ] CTA click events firing
- [ ] Booking submission events firing

### Browser Support
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest, desktop & mobile)
- [ ] Edge (latest)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Build

```bash
npm run build
npm start
```

## 📝 License

Proprietary — Profix Auto Care © 2026

---

**Built with precision for performance.** ⚙️
