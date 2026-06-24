import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 重要：把 'fortune-timeline' 換成你的 GitHub repo 名稱
export default defineConfig({
  plugins: [react()],
  base: '/fortune-timeline/',
})
