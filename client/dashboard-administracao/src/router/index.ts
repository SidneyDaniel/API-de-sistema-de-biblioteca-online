import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';
// import Login from '../components/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SeachView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/users',
      name: 'user',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})


// async function obterTokenDeCookies(): Promise<boolean> {
//     // const sessionCookie = document.cookie.includes('session');
//   return await fetch('/verifySession').then( response => {
//     const isAuthorized = response ? true : false;
//     return isAuthorized;
//     // if (response) {
//     //   // O usuário não está autenticado e foi redirecionado para a página de login;
//     //   return true
//     // } else{
//     //   return false
//     // }
//   }
//   )
// }

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const tokenDeSessao = await obterTokenDeCookies();
//     console.log(tokenDeSessao);
//     const token = tokenDeSessao;
//     if (token) {
//       // User is authenticated, proceed to the route
//       next({name: 'home'});
//     } else {
//       // User is not authenticated, redirect to login
//       // next('../components/Login.vue');
//       next({ name: 'login' });
//     }
//   } else {
//     // Non-protected route, allow access
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const authStore = useAuthStore();
      console.log(authStore);
      
      // await authStore.verifyAuthToken(); // Verifica se o cookie existe
      const isAuthenticated = authStore.isAuthenticated;
      // const authStore = useAuthStore()
      // const isAuthenticated = authStore.isAuthenticated;
      // const tokenDeSessao = await obterTokenDeCookies();
      console.log(isAuthenticated);
      if (isAuthenticated) {
        // Usuário autenticado, prosseguir para a rota
        console.log("2 " + isAuthenticated);
        
        next();
      } else {
        // Usuário não autenticado, redirecionar para a página de login
        next({ name: 'login' });
        console.log("3 " + isAuthenticated);
        
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
      // Trate o erro conforme necessário (por exemplo, redirecione para uma página de erro)
      next({ name: 'error' });
    }
  } else {
    // Rota não protegida, permitir acesso
    next();
  }
});

export default router
