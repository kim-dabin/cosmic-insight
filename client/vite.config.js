import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',    // 빌드 결과물을 public 폴더에 출력
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'public/popup.html')
        // 필요하면 여기서 background나 content 스크립트도 추가 가능
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    // base 경로 설정 (확장앱 환경에서 상대 경로 사용을 위해 빈 문자열)
    base: '',
    assetsDir: ''
  }
})
