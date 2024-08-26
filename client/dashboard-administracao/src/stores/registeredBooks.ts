import {defineStore } from "pinia";

// interface Book{
//     name: string;
//     author: string;
//     publisher: string;
//     pages: number;
//     cover: string;
//     readLink: string;
//     bookDataCreation: Date;
// }

export const useRegisterStore = defineStore('registeredBooks', {
    state: () => ({
      listOfBooks: null,
      months: [] as Array<number>,
      listOfYears: {} as object,
      loading: false,
      error: '' as string
    }),
    actions: {
      async fetchRegisBooks() {
        if (this.listOfBooks !== null) return

        this.loading = true
        this.error = '' as string
        try {
            const hoje = new Date();
            const dia = String(hoje.getDate()).padStart(2, '0');
            const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
            const ano = hoje.getFullYear();

            const dataFormatada = mes + '-' + dia + '-' + ano;


            const response: Response = await fetch('/registeredBooks',{ 
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ date: dataFormatada }), 
            })
            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados')
            }

            const data = await response.json()
            console.log('Dates: ' , data.dates);
            console.log('Day: ', data.booksByDay);
            console.debug(data)

            const monthArray: Array<number> = Array(12).fill(0)
            
            for(const date in data.booksByDay){
              const [day, month, year] = date.split('-');
              console.log(day, month, year);
              
              const monthIndex = parseInt(month, 10) - 1;
              monthArray[monthIndex] += data.booksByDay[date]
            }
            console.log(monthArray);
            
            const booksByYear: { [year: string]: number[] } = {};

          for (const date in data.booksByDay) {
            const [day, month, year] = date.split('-');
            const monthIndex = parseInt(month, 10) - 1;
            console.log(day);
            
            // Inicialize o array do ano se ainda não existir
            if (!booksByYear[year]) {
              booksByYear[year] = Array(12).fill(0);
            }

            // Adicione a contagem de livros ao mês correspondente
            booksByYear[year][monthIndex] += data.booksByDay[date];
          }

          // Agora 'booksByYear' contém os dados organizados por ano
          console.log('Books by year: ', booksByYear);
          console.log('O', booksByYear['2023']);
          
            
            this.listOfBooks = data
            this.months = monthArray
            this.listOfYears = booksByYear
            console.log('Data:' , data)     
            console.log('List of Books:' , this.listOfBooks);
            
            return this.listOfBooks
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
