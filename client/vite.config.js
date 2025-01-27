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
          rewrite: (path) => path.replace(/^\/api/, ''), //This will just allow it such that the 'api' part will be removed when querying the backend
        },
        '/spotify': {
          target: 'https://api.spotify.com',
          rewrite: (path) => path.replace(/^\/spotify/, ''), //This will just allow it such that the 'api' part will be removed when querying the backend
        }
      }
    },
  }
})