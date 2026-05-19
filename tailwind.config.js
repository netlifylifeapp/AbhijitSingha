/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // ─── Custom Color Palette ─────────────────────────────────────────────
      colors: {
        void:    '#020408',       // deepest black-blue
        abyss:   '#040d1a',       // dark navy background
        deep:    '#071428',       // section backgrounds
        ink:     '#0a1f3d',       // card backgrounds
        neon:    '#1a6bff',       // cold blue accent
        ghost:   '#4a7ab5',       // muted blue
        mist:    '#8badd4',       // soft blue-grey text
        ash:     '#4a5568',       // dim text
        rain:    '#b8d4f0',       // rain droplet color
        soul:    '#c8a8e0',       // emotional purple accent
        ember:   '#ff6b6b',       // heartbreak red (rare use)
        dim:     '#1e2d40',       // dividers
      },
      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],   // cinematic headings
        body:    ['"DM Sans"', 'sans-serif'],           // readable body
        mono:    ['"JetBrains Mono"', 'monospace'],    // chat/code UI
        serif:   ['"EB Garamond"', 'serif'],            // diary passages
      },
      // ─── Animation Timing ─────────────────────────────────────────────────
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'inertia':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'snap':      'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      // ─── Custom Animations ────────────────────────────────────────────────
      animation: {
        'breathe':    'breathe 4s ease-in-out infinite',
        'heartbeat':  'heartbeat 1.5s ease-in-out infinite',
        'flicker':    'flicker 3s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'glitch':     'glitch 0.3s ease infinite',
        'scanline':   'scanline 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        breathe: {
          '0%,100%': { transform: 'scale(1)',    opacity: '0.7' },
          '50%':     { transform: 'scale(1.04)', opacity: '1'   },
        },
        heartbeat: {
          '0%,100%': { transform: 'scale(1)'    },
          '14%':     { transform: 'scale(1.15)' },
          '28%':     { transform: 'scale(1)'    },
          '42%':     { transform: 'scale(1.1)'  },
          '70%':     { transform: 'scale(1)'    },
        },
        flicker: {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1'   },
          '20%,24%,55%':                      { opacity: '0.4' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)'   },
          '50%':     { transform: 'translateY(-20px)'  },
        },
        glitch: {
          '0%':   { transform: 'translate(0)'        },
          '20%':  { transform: 'translate(-2px, 2px)' },
          '40%':  { transform: 'translate(-2px,-2px)' },
          '60%':  { transform: 'translate(2px, 2px)'  },
          '80%':  { transform: 'translate(2px,-2px)'  },
          '100%': { transform: 'translate(0)'         },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      // ─── Blur ─────────────────────────────────────────────────────────────
      blur: {
        'xs': '2px',
        '4xl': '72px',
      },
    },
  },
  plugins: [],
}
