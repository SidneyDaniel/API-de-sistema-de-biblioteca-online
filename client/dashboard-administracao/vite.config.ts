import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    proxy: {
      '/server' : "http://localhost:3000"
    }
  },
  // define: {
  //   __VUE_PROD_DEVTOOLS__: true
  // }
})

//Lembre-se de tirar essa definição 
// define: {
//   __VUE_PROD_DEVTOOLS__: true
// Isso aqui é só pra ativar o vue devtools no modo de produção, deixar ele aqui provavelmente vai dar problema.
