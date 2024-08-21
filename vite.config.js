import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 8080, // Vite 서버의 포트를 8080으로 설정
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // API 요청을 프록시할 서버
        changeOrigin: true,
      },
    },
  },
})
