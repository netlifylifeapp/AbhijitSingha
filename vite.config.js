import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // fileURLToPath ensures correct resolution on Linux (Netlify) + Windows
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    target: 'es2020',

    // Three.js is ~450kb gzipped — suppress the warning, it's expected
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // ── Function-based chunking ──────────────────────────────────────
        // Using a function (not an object) prevents the "empty chunk" bug
        // that occurs when Rollup can't statically resolve named entries.
        // GSAP in particular fails with object-based manualChunks because
        // its ScrollTrigger plugin uses dynamic internal requires.
        manualChunks(id) {
          // Three.js — isolated for long CDN cache TTL
          if (id.includes('node_modules/three')) {
            return 'vendor-three'
          }
          // React — changes rarely
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          // Framer Motion + Lenis — animation runtime (NOT gsap — let Rollup handle it)
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/lenis')) {
            return 'vendor-motion'
          }
          // Everything else (including gsap + ScrollTrigger) stays in the main chunk
          // GSAP must NOT be split — ScrollTrigger registers via side effects on the
          // same gsap instance, and splitting breaks that registration.
        },
      },
    },

    minify: 'esbuild',
    sourcemap: false,
  },

  server: {
    port: 5173,
    open: false,
  },

  // Pre-bundle these for fast dev HMR
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'gsap', 'three', 'lenis'],
  },
})
