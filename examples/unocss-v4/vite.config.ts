import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    unocss(),
    vue()
  ],
})
