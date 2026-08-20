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
      pwaAssets: {
        disabled: false,
        config: true
      },
      manifest: {
        name: "Game Tools: Battlefield Stats, Bots, Server management",
        short_name: "Gametools",
        description: "See your Battlefield 1, V, 4, 3, 2, HL, 2042, 6 stats! Watch live game statistics, get our Battlefield APIs, Discord Bots, BF1 Server administration and protection tools.",
        display: "standalone",
        start_url: "/", // ensure PWA starts at correct path
        scope: "/",
        theme_color: "#313443",
        background_color: "#0E0F14",
        shortcuts: [
          {
            "name": "Battlefield servers",
            "short_name": "Servers",
            "description": "Search battlefield servers",
            "url": "/servers",
            "icons": [
              {
                "src": "/logo.svg",
                "sizes": "any"
              }
            ]
          },
          {
            "name": "Battlefield stats",
            "short_name": "Stats",
            "description": "Show your or someone elses stats",
            "url": "/stats",
            "icons": [
              {
                "src": "/logo.svg",
                "sizes": "any"
              }
            ]
          },
          {
            "name": "Battlefield platoons",
            "short_name": "Platoons",
            "description": "Get info about a Battlefield platoon",
            "url": "/platoons",
            "icons": [
              {
                "src": "/logo.svg",
                "sizes": "any"
              }
            ]
          },
          {
            "name": "Battlefield playgrounds",
            "short_name": "playgrounds",
            "description": "Get more information about a specific playground",
            "url": "/playgrounds",
            "icons": [
              {
                "src": "/logo.svg",
                "sizes": "any"
              }
            ]
          }
        ],
        screenshots: [
          {
            "src": "/screenshots/image-1.webp",
            "type": "image/webp",
            "sizes": "1976x1394",
            "form_factor": "wide"
          },
          {
            "src": "/screenshots/image-2.webp",
            "type": "image/webp",
            "sizes": "1976x1394",
            "form_factor": "wide"
          },
          {
            "src": "/screenshots/image-3.webp",
            "type": "image/webp",
            "sizes": "1976x1394",
            "form_factor": "wide"
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        navigateFallback: "/index.html",
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
  ],
})
