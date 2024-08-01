import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura';


import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth';

const app = createApp(App)

app.use(createPinia())

// useAuthStore().setAuthToken()

// app.use(router)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
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
