import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';


import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth';
import { definePreset } from '@primevue/themes';

const app = createApp(App)

app.use(createPinia())

// useAuthStore().setAuthToken()

const MyPreset = definePreset(Aura, {
  semantic: {
      colorScheme: {
        light: {
          root: {
              background: '{surface.0}',
              color: '{surface.700}'
          },
          subtitle: {
              color: '{surface.500}'
          }
      },
      dark: {
          root: {
              background: '{surface.900}',
              color: '{surface.0}'
          },
          subtitle: {
              color: '{surface.400}'
          }
      }
      }
  }
});

// app.use(router)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: MyPreset,
        options: {
            prefix: 'p',
            darkModeSelector: '.my-app-dark',
            cssLayer: false,
        }
    }
 });


// app.mount('#app')

async function verifyToken() {
    try {
      const authStore = useAuthStore();
      await authStore.verifyAuthToken(); // Verifica se o cookie existe
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      // Trate o erro conforme necessário
    }
  }
  
  // Verifique o token antes de criar a instância da aplicação
  verifyToken().then(() => {
    app.use(router).mount('#app');
  });
