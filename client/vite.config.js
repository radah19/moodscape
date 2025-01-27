import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Modify config to be a function that receives { mode }
export default defineConfig(({ mode }) => {
  // Load env files from external directory
  const env = loadEnv(mode, path.resolve('.'), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.BACKEND_URL), //Defines the VITE_BACKEND_URL environment variable from the .env outside the root directory
      'import.meta.env.VITE_FRONTEND_URL': JSON.stringify(env.FRONTEND_URL),
      'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(env.SPOTIFY_CLIENT_ID),
      'import.meta.env.VITE_SPOTIFY_CLIENT_SECRET': JSON.stringify(env.SPOTIFY_CLIENT_SECRET),
      'import.meta.env.VITE_PORT': JSON.stringify(env.PORT)
    },
    server: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL.toString(),
          changeOrigin: true,
          secure: false,      
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          }
        },
        '/spotify': {
          target: 'https://api.spotify.com',
          changeOrigin: true,
          secure: false,      
          ws: true,
          rewrite: (path) => path.replace(/^\/spotify/, ''),
        }
      }
    },
  }
})