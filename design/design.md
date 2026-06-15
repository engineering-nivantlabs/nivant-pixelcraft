# AI Photo Studio — Design Document

---

## Overview

A premium AI-powered headshot generator that transforms casual selfies into professional-grade portrait photographs. The design language balances cutting-edge AI technology with warm human approachability — cool tech-forward accents meet soft, organic visual elements. The visual identity conveys trust, quality, and effortless transformation.

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **Deep Navy** | `#0A1628` | Primary dark — hero backgrounds, dark sections, footer |
| **Slate Blue** | `#1E3A5F` | Secondary dark — gradients, card backgrounds on dark |
| **Soft White** | `#F8FAFC` | Primary light — page backgrounds, light sections |
| **Pure White** | `#FFFFFF` | Cards, elevated surfaces |
| **Electric Blue** | `#3B82F6` | Primary accent — CTAs, links, highlights, AI magic moments |
| **Violet** | `#7C3AED` | Secondary accent — gradients, decorative elements |
| **Teal** | `#14B8A6` | Tertiary accent — success states, subtle highlights |
| **Text Primary** | `#0F172A` | Main body text on light backgrounds |
| **Text Secondary** | `#64748B` | Captions, descriptions, muted text |
| **Text On Dark** | `#F1F5F9` | Primary text on dark backgrounds |
| **Border Light** | `#E2E8F0` | Subtle borders, dividers |
| **Success Green** | `#22C55E` | Success states, checkmarks |
| **Warning Amber** | `#F59E0B` | Warnings, attention badges |

**Gradients**

| Name | Value | Usage |
|------|-------|-------|
| **Hero Gradient** | `linear-gradient(135deg, #0A1628 0%, #1E3A5F 40%, #3B82F6 100%)` | Hero section background |
| **Accent Gradient** | `linear-gradient(90deg, #3B82F6 0%, #7C3AED 50%, #14B8A6 100%)` | CTA buttons, decorative lines, badges |
| **Card Gradient** | `linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)` | Light cards subtle depth |
| **Dark Card** | `linear-gradient(180deg, #1E3A5F 0%, #0A1628 100%)` | Cards on dark backgrounds |
| **Glow Gradient** | `radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, transparent 70%)` | Decorative background glows |

### Typography

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| **Display/H1** | Space Grotesk | 56px (mobile: 36px) | 700 | 1.1 | -0.02em |
| **H2** | Space Grotesk | 42px (mobile: 28px) | 600 | 1.2 | -0.01em |
| **H3** | Space Grotesk | 28px (mobile: 22px) | 600 | 1.3 | 0 |
| **H4** | Inter | 20px | 600 | 1.4 | 0 |
| **Body** | Inter | 16px | 400 | 1.65 | 0 |
| **Body Large** | Inter | 18px | 400 | 1.6 | 0 |
| **Caption** | Inter | 14px | 500 | 1.5 | 0.01em |
| **Button** | Inter | 15px | 600 | 1 | 0.02em |
| **Nav Link** | Inter | 14px | 500 | 1 | 0.01em |

- **Font stack**: `"Space Grotesk", system-ui, sans-serif` for headings; `"Inter", system-ui, sans-serif` for body.
- Import both from Google Fonts.

### Spacing

| Token | Value |
|-------|-------|
| Section Padding (Desktop) | 96px top/bottom |
| Section Padding (Mobile) | 64px top/bottom |
| Container Max Width | 1280px |
| Container Padding | 24px (mobile: 16px) |
| Card Padding | 32px |
| Card Border Radius | 16px |
| Button Border Radius | 12px |
| Small Radius | 8px |
| Grid Gap | 24px |
| Section Gap | 0px (flush sections) |

### Shadows

| Token | Value |
|-------|-------|
| Card Shadow | `0 4px 24px rgba(10, 22, 40, 0.08)` |
| Card Shadow Hover | `0 8px 40px rgba(10, 22, 40, 0.12)` |
| Button Shadow | `0 4px 16px rgba(59, 130, 246, 0.3)` |
| Glow Shadow | `0 0 60px rgba(59, 130, 246, 0.2)` |
| Inset Shadow | `inset 0 2px 8px rgba(0, 0, 0, 0.06)` |

### Z-Index

| Layer | Z-Index |
|-------|---------|
| Navigation | 100 |
| Modal/Overlay | 200 |
| Toast/Notification | 300 |

---

## Dependencies

- `framer-motion` — Page transitions, scroll reveals, micro-interactions, hover effects
- `lucide-react` — Icons throughout the application
- `react-router-dom` — Client-side routing (HashRouter)

---

## Shared Components

### Navigation

Fixed top bar with frosted glass effect on scroll.

- **Layout**: Logo left, nav links center (desktop), CTA button right.
- **Background**: Transparent on hero → `rgba(248, 250, 252, 0.85)` with `backdrop-blur(12px)` on scroll (past 100px).
- **Height**: 72px.
- **Nav Links**: Home, Pricing, Gallery — smooth-scroll to sections on homepage, route change on sub-pages.
- **CTA Button**: "Get Started" — Accent Gradient background, white text, 12px radius, padding 10px 24px.
- **Mobile**: Hamburger icon → full-screen slide-down overlay with nav links stacked vertically.

### Footer

- **Background**: Deep Navy (`#0A1628`).
- **Layout**: 4-column grid on desktop: Brand column | Quick Links | Resources | Connect.
- **Brand Column**: Logo + brief tagline "Professional headshots powered by AI" in Text Secondary.
- **Quick Links**: Home, Upload, Gallery, Pricing.
- **Resources**: How It Works, Photo Tips, Support, Privacy.
- **Connect**: Social icons (Twitter, Instagram, LinkedIn) in a horizontal row.
- **Bottom Bar**: Copyright text "© 2025 AI Photo Studio. All rights reserved." in Text Secondary, with a subtle top border (`1px solid rgba(255,255,255,0.08)`).

---

## Global Interactions

### Smooth Scrolling
- All in-page anchor navigation uses smooth scroll behavior (`scroll-behavior: smooth`).
- Nav link clicks scroll to section with 80px offset for fixed header.

### Page Transitions
- Route changes: fade-out (200ms) → content swap → fade-in (400ms) with slight upward translate (20px → 0).
- Managed via `framer-motion` `AnimatePresence` wrapping route outlet.

### Scroll-Reveal Pattern
- Default entrance animation for all sections: `opacity: 0 → 1`, `translateY(40px) → 0`, duration `0.6s`, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Triggered when element enters viewport at `threshold: 0.15`.
- Staggered children: `staggerChildren: 0.08s` for card grids, list items.

### Button Hover States
- **Primary CTA (gradient)**: Subtle brightness increase (`filter: brightness(1.1)`), slight scale (`1.02`), shadow intensifies.
- **Secondary (outline)**: Background fills from left with primary accent color, text color inverts.
- **Ghost**: Background appears at `rgba(59, 130, 246, 0.08)`.

### Card Hover States
- Subtle lift: `translateY(-4px)`, shadow intensifies to Card Shadow Hover.
- Duration: 300ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`.

### Form Inputs
- Focus: Border transitions to Electric Blue, subtle glow shadow (`0 0 0 3px rgba(59,130,246,0.15)`).
- Label floats above on focus/filled (if using floating labels).

---

## Assets

### Images

| Filename | Description | Page | Dimensions | Type |
|----------|-------------|------|------------|------|
| `hero-bg.jpg` | Abstract soft gradient mesh background with flowing organic shapes in deep navy, slate blue, and subtle electric blue highlights — reminiscent of aurora or flowing silk, dark and atmospheric with gentle light leaks at edges | Home | 1920×1080 | Image |
| `hero-before.jpg` | Casual selfie photo of a young professional — slightly uneven lighting, informal pose, outdoor/indoor hybrid background, phone-camera quality with natural skin texture, wearing casual clothing | Home | 600×800 | Image |
| `hero-after.jpg` | Same person as hero-before but as a polished professional headshot — studio-quality lighting with soft key light and fill, clean neutral background (subtle gray gradient), sharp focus on eyes, professional attire, retouched skin with preserved texture, corporate portrait style | Home | 600×800 | Image |
| `sample-headshot-1.jpg` | Professional headshot of a woman — soft studio lighting, neutral gray background, confident warm smile, business casual attire, sharp eyes, polished skin | Home/Gallery | 600×800 | Image |
| `sample-headshot-2.jpg` | Professional headshot of a man — dramatic side lighting, dark background, strong jawline, executive suit, powerful confident expression | Home/Gallery | 600×800 | Image |
| `sample-headshot-3.jpg` | Professional headshot of a woman — natural window light aesthetic, light background, friendly approachable expression, smart casual attire | Home/Gallery | 600×800 | Image |
| `sample-headshot-4.jpg` | Professional headshot of a man — classic corporate portrait, three-point lighting, medium gray background, warm approachable smile | Home/Gallery | 600×800 | Image |
| `sample-headshot-5.jpg` | Professional headshot of a woman — modern creative portrait, colored gel lighting accent (subtle blue), dark background, contemporary creative professional | Home/Gallery | 600×800 | Image |
| `sample-headshot-6.jpg` | Professional headshot of a man — outdoor-indoor hybrid with blurred office background, natural light feel, approachable tech executive style | Home/Gallery | 600×800 | Image |
| `upload-example.jpg` | Grid collage showing example selfie uploads — various angles, good lighting, clear face visibility, demonstrating ideal upload photos, 2×3 grid of casual photos | Upload | 800×600 | Image |
| `avatar-user.jpg` | Small avatar of a young professional for UI elements — friendly, casual, circular crop suitable | Shared | 200×200 | Image |

### Videos

| Filename | Description | Page | Duration | Type |
|----------|-------------|------|----------|------|
| `hero-video.mp4` | Slow-motion abstract flowing particles — luminous bokeh spheres floating in dark space, gentle parallax movement, cool blue and violet tones with occasional teal highlights, seamless loop, ethereal and premium feel suggesting AI neural networks or light particles | Home | 8s loop | Video |
| `process-video.mp4` | Stylized animation showing photo transformation — casual selfie morphing through AI processing stages to professional headshot, particle dissolve and reassemble effect, blue and white accent flashes, clean and futuristic | Generate | 5s loop | Video |

### SVGs

| Filename | Description | Page | Type |
|----------|-------------|------|------|
| `logo.svg` | Minimalist camera aperture icon combined with an "AI" lettermark — geometric, clean lines, single color (adapts to context: white on dark, navy on light) | Shared | SVG |
| `pattern-grid.svg` | Subtle dot grid pattern — 2px dots at 20px spacing, ultra-light opacity (3%), used as decorative background texture | Shared | SVG |
| `wave-divider.svg` | Gentle undulating wave shape — transitions between dark and light sections, soft organic curve | Home | SVG |

---

## Page List

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Full landing page — hero, features, how it works, pricing preview, testimonials, CTA |
| **Upload** | `/upload` | Photo upload interface — drag & drop, style selection, guidelines |
| **Generate** | `/generate` | AI processing visualization — progress steps, live preview of generated headshots |
| **Gallery** | `/gallery` | User's generated headshots — grid layout, filtering, download management |
| **Pricing** | `/pricing` | Detailed pricing plans — feature comparison, FAQ, plan selection |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout Adjustments |
|------------|-------|-------------------|
| Mobile | < 640px | Single column, stacked sections, hamburger nav, full-width cards |
| Tablet | 640–1024px | 2-column grids, side-by-side where appropriate, condensed padding |
| Desktop | > 1024px | Full multi-column layouts, all features visible, maximum spacing |
