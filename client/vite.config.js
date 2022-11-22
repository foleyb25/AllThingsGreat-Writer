import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig( ({command, mode}) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [vue()],
    server: {
      port: env.VITE_PORT,
      // proxy: "http://localhost:3001"
    }
  }
  
})
