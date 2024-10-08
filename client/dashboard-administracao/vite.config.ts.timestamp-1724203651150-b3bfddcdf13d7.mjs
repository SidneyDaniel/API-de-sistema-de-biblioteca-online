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
  // define: {
  //   __VUE_PROD_DEVTOOLS__: true
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxBbHVyYVxcXFxBUEkgZGUgc2lzdGVtYSBkZSBiaWJsaW90ZWNhIG9ubGluZVxcXFxjbGllbnRcXFxcZGFzaGJvYXJkLWFkbWluaXN0cmFjYW9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXEFsdXJhXFxcXEFQSSBkZSBzaXN0ZW1hIGRlIGJpYmxpb3RlY2Egb25saW5lXFxcXGNsaWVudFxcXFxkYXNoYm9hcmQtYWRtaW5pc3RyYWNhb1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQWx1cmEvQVBJJTIwZGUlMjBzaXN0ZW1hJTIwZGUlMjBiaWJsaW90ZWNhJTIwb25saW5lL2NsaWVudC9kYXNoYm9hcmQtYWRtaW5pc3RyYWNhby92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbmltcG9ydCB7IFByaW1lVnVlUmVzb2x2ZXIgfSBmcm9tICdAcHJpbWV2dWUvYXV0by1pbXBvcnQtcmVzb2x2ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBQcmltZVZ1ZVJlc29sdmVyKClcbiAgICAgIF1cbiAgICB9KVxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBzZXJ2ZXI6e1xuICAgIHByb3h5OiB7XG4gICAgICAnL3NlcnZlcicgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMFwiXG4gICAgfVxuICB9LFxuICAvLyBkZWZpbmU6IHtcbiAgLy8gICBfX1ZVRV9QUk9EX0RFVlRPT0xTX186IHRydWVcbiAgLy8gfVxufSlcblxuLy9MZW1icmUtc2UgZGUgdGlyYXIgZXNzYSBkZWZpbmlcdTAwRTdcdTAwRTNvIFxuLy8gZGVmaW5lOiB7XG4vLyAgIF9fVlVFX1BST0RfREVWVE9PTFNfXzogdHJ1ZVxuLy8gSXNzbyBhcXVpIFx1MDBFOSBzXHUwMEYzIHByYSBhdGl2YXIgbyB2dWUgZGV2dG9vbHMgbm8gbW9kbyBkZSBwcm9kdVx1MDBFN1x1MDBFM28sIGRlaXhhciBlbGUgYXF1aSBwcm92YXZlbG1lbnRlIHZhaSBkYXIgcHJvYmxlbWEuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVhLFNBQVMsZUFBZSxXQUFXO0FBRTFjLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHdCQUF3QjtBQU5zTyxJQUFNLDJDQUEyQztBQVN4VCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxpQkFBaUI7QUFBQSxNQUNuQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDTCxXQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFJRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
