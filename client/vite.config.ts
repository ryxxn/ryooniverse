import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 요청 수신
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true,
    //   },
    // },
  },
})