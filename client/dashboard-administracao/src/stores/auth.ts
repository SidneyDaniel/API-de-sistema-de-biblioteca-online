import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async verifyAuthToken(){
        try {
            const response = await fetch('/verifySession');
            console.log(response);
            if (response.ok!) {
              this.isAuthenticated = true; // Usuário autenticado
            } else {
              this.isAuthenticated = false; // Usuário não autenticado
            }
          } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            // Trate o erro conforme necessário (por exemplo, redirecione para uma página de erro)
          }
    },
    async setAuthToken() {
      try {
        const response = await fetch('/verifySession');
        console.log(response);
        if (response.ok!) {
          this.isAuthenticated = true; // Usuário autenticado
        } else {
          this.isAuthenticated = false; // Usuário não autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        // Trate o erro conforme necessário (por exemplo, redirecione para uma página de erro)
      }
    },
    clearAuthToken() {
        this.isAuthenticated = false;
    },
  },
});
