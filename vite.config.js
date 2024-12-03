import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const BASE_URL = process.env.VITE_REACT_BASE_URL; // Ensure this is defined in your .env file
const PORT = process.env.VITE_REACT_PORT || 3000;

// Export Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables access over your local network
    strictPort: true, // Ensures the specified port is used
    port: PORT, // Development server port
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true, // Ensures Host header matches target
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix when forwarding
      },
    },
  },
});
