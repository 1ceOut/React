import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      '/ocr': {
        target: 'https://xnawjp24sv.apigw.ntruss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ocr/, ''),
      },
      // 추가적으로 다른 프록시 설정이 필요한 경우 여기에 추가
    },
  }
});
