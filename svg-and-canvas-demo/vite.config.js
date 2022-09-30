import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/comps": path.resolve(__dirname, "src/comps"),
      "@/pages": path.resolve(__dirname, "src/pages"),
      "@/utils": path.resolve(__dirname, "src/utils"),
    },
  },
  plugins: [vue()]
})
