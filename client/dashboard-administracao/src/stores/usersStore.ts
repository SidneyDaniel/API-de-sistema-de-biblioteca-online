import {defineStore } from "pinia";

export const useUserStore = defineStore('usersDataStore', {
    state: () => ({
      listOfUsers: null,
      loading: false,
      error: '' as string
    }),
    actions: {
      async fetchUsersData() {
        if (this.listOfUsers !== null) return

        this.loading = true
        this.error = '' as string
        try {

            const response: Response = await fetch('/listarUsuarios',{ method: 'GET' })
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados')
            }

            const data = await response.json()
            console.log("data",data);
            
            data.users.forEach((userList: unknown) => {
                console.log(userList);
            });
            
            const numberOfUsers = data.users.length;
            

            console.debug(numberOfUsers)

            
            this.listOfUsers = data.users
            console.log('List of Books:' , this.listOfUsers);
            
            return this.listOfUsers
        } catch (erro) {
            if (erro instanceof Error) {
                this.error = erro.message
            }else{
                console.log(erro);    
            }
        } finally {
          this.loading = false
        }
      },
    }
  })
