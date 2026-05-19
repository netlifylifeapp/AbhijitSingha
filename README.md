# Abhijit Singha — A Quiet Existence
### An immersive emotional web experience

> "A soul quietly walking through life, feeling invisible to everyone around him."

A cinematic, award-worthy emotional archive built as an interactive psychological film.  
Not a website. An experience.

---

## ✦ Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | React 18 + Vite 5                   |
| Styling      | Tailwind CSS (custom design system) |
| Animation    | Framer Motion 11                    |
| Scroll       | GSAP + ScrollTrigger + Lenis        |
| 3D / WebGL   | Three.js (custom rain particle system) |
| Typography   | Cormorant Garamond + DM Sans + EB Garamond + JetBrains Mono |

---

## ✦ Installation

### 1. Prerequisites
```bash
node >= 18.0.0
npm  >= 9.0.0
```

### 2. Install dependencies
```bash
cd abhijit-singha
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open `http://localhost:5173`

### 4. Build for production
```bash
npm run build
npm run preview  # preview production build locally
```

---

## ✦ Project Structure

```
abhijit-singha/
├── index.html                        # Entry point — fonts, cursor: none
├── vite.config.js                    # Vite + GLSL plugin
├── tailwind.config.js                # Custom tokens: colors, animations, fonts
├── postcss.config.js
│
└── src/
    ├── main.jsx                      # React root
    ├── App.jsx                       # Orchestrator — scenes, cursor, scroll
    │
    ├── styles/
    │   └── globals.css               # Grain, VHS, cursor, glass, glitch effects
    │
    ├── data/
    │   └── storyData.js              # ★ All emotional content lives here
    │
    ├── hooks/
    │   ├── useCursor.js              # Physics cursor with inertia ring
    │   ├── useSmoothScroll.js        # Lenis + GSAP ticker sync
    │   └── useMouseParallax.js       # Normalized mouse (-1 to 1) with lerp
    │
    ├── components/
    │   ├── canvas/
    │   │   └── RainCanvas.jsx        # Three.js rain + dust particles
    │   │
    │   ├── scenes/                   # Each scene = one emotional chapter
    │   │   ├── SceneIntro.jsx        # Scene 1: The lonely opening
    │   │   ├── SceneFriends.jsx      # Scene 2: Fading friendships
    │   │   ├── SceneMessages.jsx     # Scene 3: Unread conversations
    │   │   ├── SceneLove.jsx         # Scene 4: The love story
    │   │   ├── SceneFamily.jsx       # Scene 5: Emotional distance
    │   │   ├── SceneDiary.jsx        # Scene 6: Private diary pages
    │   │   └── SceneEnding.jsx       # Scene 7: Quiet resolution
    │   │
    │   ├── ui/
    │   │   ├── LoadingScreen.jsx     # Emotional boot sequence
    │   │   ├── TypewriterText.jsx    # Variable-speed typewriter
    │   │   └── SceneNavigator.jsx    # Right-side chapter dots
    │   │
    │   └── effects/
    │       └── GhostNotifications.jsx  # Floating ghost notification UI
```

---

## ✦ Customization Guide

### Changing emotional content
All quotes, diary entries, chat conversations, and notifications live in:
```
src/data/storyData.js
```
Edit freely — no code changes needed elsewhere.

### Changing colors
All colors are CSS variables in `src/styles/globals.css` and `tailwind.config.js`:
```js
// tailwind.config.js → theme.extend.colors
void:   '#020408'   // deepest background
neon:   '#1a6bff'   // cold blue accent
soul:   '#c8a8e0'   // emotional purple
ember:  '#ff6b6b'   // heartbreak red
```

### Adjusting scroll smoothness
```js
// src/hooks/useSmoothScroll.js
const lenis = new Lenis({
  duration: 1.6,        // higher = slower, more cinematic
  wheelMultiplier: 0.8, // lower = slower scroll speed
})
```

### Adjusting rain particles
```js
// src/components/canvas/RainCanvas.jsx
const RAIN_COUNT = 4000  // lower for performance, higher for density
```

### Cursor inertia
```js
// src/hooks/useCursor.js
ringX += (mouseX - ringX) * 0.12  // lower = more lag/inertia
```

---

## ✦ Performance Notes

- Rain canvas capped at `devicePixelRatio: 2` for GPU efficiency
- All scenes use Intersection Observer for lazy animation triggers
- GSAP ticker lag smoothing disabled for consistent 60fps
- Framer Motion uses `layout` animations with GPU-composited transforms
- All blur effects use `backdrop-filter` (hardware accelerated)

---

## ✦ Deployment

### Vercel (recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the /dist folder
```

### GitHub Pages
```bash
# Add to vite.config.js:  base: '/your-repo-name/'
npm run build
```

---

## ✦ Adding Optional Audio

To add ambient rain/piano audio:
1. Place audio files in `/public/audio/`
2. Add to `App.jsx`:
```jsx
const audio = new Audio('/audio/rain-ambient.mp3')
audio.loop = true
audio.volume = 0.15
// Play after user interaction (browser policy)
document.addEventListener('click', () => audio.play(), { once: true })
```

---

*Built with precision. Designed with intention. Written with feeling.*
