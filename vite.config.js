import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = process.env.VITE_REACT_PORT
// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [react()],
})
  */

//for server purposes
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: PORT
  }
})
