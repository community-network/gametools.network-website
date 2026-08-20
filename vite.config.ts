import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    ViteImageOptimizer({}),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        navigateFallback: "/index.html",
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
  ],
})
