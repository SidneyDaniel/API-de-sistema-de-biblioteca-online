import {defineStore } from "pinia";

interface Book{
     name: string;
    author: string;
    publisher: string;
    pages: number;
    cover: string;
    readLink: string;
    bookDataCreation: Date;
    bookUpdateDate: Date;
}

export const useBooksStore = defineStore('books', {
    state: () => ({
      books: null,
      filteredBooks: [] as Book[],
      loading: false,
      error: '' as string
    }),
    actions: {
      async fetchBooks() {
        if (this.books !== null) return

        this.loading = true
        this.error = '' as string
        try {
            const response: Response = await fetch('/readBook')
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados')
            }

            const data = await response.json()
            this.books = data.ALLBOOKS
            this.filteredBooks = data.ALLBOOKS
            console.log(data)     

            return this.books
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
      orderByNameAsc() {
        this.filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
      },
      orderByNameDesc() {
        this.filteredBooks.sort((a, b) => b.name.localeCompare(a.name));
      },
      orderByDateAsc(){
        this.filteredBooks.sort((a, b) => new Date(b.bookDataCreation).getTime() - new Date(a.bookDataCreation).getTime());
      },
      orderbyDateDsc(){
        this.filteredBooks.sort((a, b) => new Date(a.bookDataCreation).getTime() - new Date(b.bookDataCreation).getTime());
      },
      newestBook(){
        this.filteredBooks.reduce((acc, curr) => {
            return curr.bookDataCreation > acc.bookDataCreation ? curr : acc;
        },  
            this.filteredBooks[0]
        );
      }

    }
  })
