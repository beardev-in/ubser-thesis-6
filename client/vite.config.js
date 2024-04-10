import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server : {
    port : 3000,
    proxy : {
      "/api" : {
        target : "http://localhost:8080",
        changeOrigin : true,
        secure : false
      } 
    }
  },
  plugins: [react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Uber Clone',
        short_name: 'Uber Clone',
        theme_color: '#ffffff',
        icons: [
          {
              src: 'pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png'
          },
          {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
          },
          {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
          },
          {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
          }
      ],
      }, 
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
