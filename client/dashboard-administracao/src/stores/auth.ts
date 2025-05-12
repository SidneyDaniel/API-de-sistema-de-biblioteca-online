import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async verifyAuthToken(){
        try {
            const response = await fetch('/verify-session');
            console.log(response);
            if (response.ok!) {
              this.isAuthenticated = true; 
            } else {
              this.isAuthenticated = false; 
            }
          } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
          }
    },
    async setAuthToken() {
      try {
        const response = await fetch('/verify-session');
        console.log(response);
        if (response.ok!) {
          this.isAuthenticated = true;
        } else {
          this.isAuthenticated = false; 
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      }
    },
    clearAuthToken() {
        this.isAuthenticated = false;
    },
  },
});
