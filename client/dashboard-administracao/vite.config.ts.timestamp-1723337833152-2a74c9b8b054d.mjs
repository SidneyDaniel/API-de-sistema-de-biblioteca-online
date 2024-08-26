// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import Components from "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/node_modules/unplugin-vue-components/dist/vite.js";
import { PrimeVueResolver } from "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/node_modules/@primevue/auto-import-resolver/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Alura/API%20de%20sistema%20de%20biblioteca%20online/client/dashboard-administracao/vite.config.ts";
var vite_config_default = defineConfig({
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
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/server": "http://localhost:3000"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBbHVyYVxcXFxBUEkgZGUgc2lzdGVtYSBkZSBiaWJsaW90ZWNhIG9ubGluZVxcXFxjbGllbnRcXFxcZGFzaGJvYXJkLWFkbWluaXN0cmFjYW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFsdXJhXFxcXEFQSSBkZSBzaXN0ZW1hIGRlIGJpYmxpb3RlY2Egb25saW5lXFxcXGNsaWVudFxcXFxkYXNoYm9hcmQtYWRtaW5pc3RyYWNhb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQWx1cmEvQVBJJTIwZGUlMjBzaXN0ZW1hJTIwZGUlMjBiaWJsaW90ZWNhJTIwb25saW5lL2NsaWVudC9kYXNoYm9hcmQtYWRtaW5pc3RyYWNhby92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFByaW1lVnVlUmVzb2x2ZXIgfSBmcm9tICdAcHJpbWV2dWUvYXV0by1pbXBvcnQtcmVzb2x2ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBQcmltZVZ1ZVJlc29sdmVyKClcbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6e1xuICAgIHByb3h5OiB7XG4gICAgICAnL3NlcnZlcicgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1YSxTQUFTLGVBQWUsV0FBVztBQUUxYyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyx3QkFBd0I7QUFOc08sSUFBTSwyQ0FBMkM7QUFTeFQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsV0FBVztBQUFBLFFBQ1QsaUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsV0FBWTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
