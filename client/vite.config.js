import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Modify config to be a function that receives { mode }
export default defineConfig(({ mode }) => {
  // Load env files from external directory
  const env = loadEnv(mode, path.resolve('..'), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(env.BACKEND_URL) //Defines the VITE_BACKEND_URL environment variable from the .env outside the root directory
    },
    server: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL,
          rewrite: (path) => path.replace(/^\/api/, ''), //This will just allow it such that the 'api' part will be removed when querying the backend
        }
      }
    }
  }
})