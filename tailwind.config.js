/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#03030a',
        abyss: '#060612',
        deep: '#0a0a1c',
        dim: '#0f1225',
        glow: {
          blue: '#1a6fff',
          cyan: '#00d4ff',
          soft: '#4db8ff',
          amber: '#ffb347',
          rose: '#ff6b9d',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'flicker': 'flicker 8s infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'glitch': 'glitch 0.3s steps(2) infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.02)', opacity: '1' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.8' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.6' },
          '97%': { opacity: '1' },
        },
        glitch: {
          '0%': { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-2px, -2px)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)', transform: 'translate(1px, 2px)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)', transform: 'translate(-1px, 1px)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(2px, -2px)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)', transform: 'translate(-2px, 1px)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(1px, -1px)' },
        }
      }
    }
  },
  plugins: []
}
