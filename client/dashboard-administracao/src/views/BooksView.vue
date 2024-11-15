<script lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useBooksStore } from "@/stores/books";
import CardsBooks from "@/components/bookView/cardsBooks.vue";
import SpeedDialMenu from "@/components/bookView/speedDialMenu.vue";
import SearchBar from "@/components/bookView/searchBar.vue";

type Book = {
  author: string;
  bookDataCreation: {
    _seconds: number;
    _nanoseconds: number;
  };
  bookUpdateDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  cover: string;
  name: string;
  pages: string;
  publisher: string;
  readLink: string;
};

export default {
  name: "cards",
  components:{
    CardsBooks, SpeedDialMenu, SearchBar
  },
  setup() {
    const bookStore = useBooksStore();

    const books = computed<Array<Book>>(() => bookStore.books || []);
    //   const books: Array<Book> = [
    // {
    //   "name": "Teste de edicão aqui ",
    //   "author": "Jorge",
    //   "publisher": "sou eu ",
    //   "pages": "892",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1643670072,
    //     "_nanoseconds": 869000000
    //   },
    //   "bookUpdateDate": {
    //     "_seconds": 0,
    //     "_nanoseconds": 0
    //   }
    // },
    // {
    //   "name": "Testado testadinho",
    //   "author": " sdfasdf    ",
    //   "publisher": " igreja ",
    //   "pages": " 500 ",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1721084663,
    //     "_nanoseconds": 609000000
    //   },
    //   "bookUpdateDate": {
    //     "_seconds": 0,
    //     "_nanoseconds": 0
    //   }
    // },
    // {
    //   "name": "Teste De Edição SÉRIO",
    //   "author": "sdfasdf",
    //   "publisher": "igreja",
    //   "pages": "500",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1721084656,
    //     "_nanoseconds": 837000000
    //   },
    //   "bookUpdateDate": {
    //     "_seconds": 0,
    //     "_nanoseconds": 0
    //   }
    // },
    // {
    //   "name": "Teste De Edição SÉRIO",
    //   "author": "sdfasdf",
    //   "publisher": "igreja",
    //   "pages": "500",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1721084669,
    //     "_nanoseconds": 978000000
    //   },
    //   "bookUpdateDate": {
    //     "_seconds": 0,
    //     "_nanoseconds": 0
    //   }
    // },
    // {
    //   "name": "Daara",
    //   "author": "Usuário comum",
    //   "publisher": " IOEJH ",
    //   "pages": " 23 ",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1711474545,
    //     "_nanoseconds": 517000000
    //   },
    //   "bookUpdateDate": {
    //     "_seconds": 0,
    //     "_nanoseconds": 0
    //   }
    // },
    // {
    //     "name": "O colecionador de ossos",
    //     "author": "Jeffrey Deaver",
    //     "publisher": "Best Seller",
    //     "pages": "462",
    //     "cover": "https://m.media-amazon.com/images/I/81qQOWp81oL._SY342_.jpg",
    //     "readLink": "https://www.amazon.com.br/colecionador-ossos-edi%C3%A7%C3%A3o-bolso/dp/8577990664",
    //     "bookDataCreation": {
    //         "_seconds": 1712844272,
    //         "_nanoseconds": 185000000
    //     },
    //     "bookUpdateDate": {
    //         "_seconds": 1726330502,
    //         "_nanoseconds": 895000000
    //     }
    // },
    // {
    //     "name": "O Senhor dos Anéis: A Sociedade do Anel",
    //     "author": "J.R.R. Tolkien ",
    //     "publisher": "Harper Collins Brasil",
    //     "pages": "576",
    //     "cover": "https://m.media-amazon.com/images/I/81SWBRKfExL._SY342_.jpg",
    //     "readLink": "https://www.amazon.com.br/Senhor-dos-An%C3%A9is-Sociedade-Anel/dp/8595084750/ref=sr_1_2?adgrpid=1139094704688530&dib=eyJ2IjoiMSJ9.dkIm0tv7Ww2JHze9ADKXyWJuUXTXe6VAJwgp4BZZ_WhhwfdwcNZc6dW5xw1lE5aG_jy82rKwYkdchP40EyOAGkoLBuYA7J97JwIYb2gktxYAa-KVylAZBOFb7HyFZYRw0Tgv7L3gshXa5OAx71u81qB2i7pZOoJVD1EgDbgWZAsJ0rMeUxRgzCaeDrDlJgPtB5tGtgho7EQpQyvQkBgRUmB5zNeWWc4NrkF8ZwQYFer2xIf3R7qi_nJzaXlyhY2ke4qH_rN4s4sJiN3KDKGWJmcX91CyqU3BVLl3mC4dLM4.xVLza2riHWhQLlZ4_Lc8Fg1DogpFKSUaseHC1tqCd0o&dib_tag=se&hvadid=71193584752479&hvbmt=be&hvdev=c&hvlocphy=147859&hvnetw=o&hvqmt=e&hvtargid=kwd-71193934142309%3Aloc-20&hydadcr=5653_13210302&keywords=livro+senhor+dos+aneis&qid=1726021645&sr=8-2",
    //     "bookDataCreation": {
    //         "_seconds": 1721144175,
    //         "_nanoseconds": 679000000
    //     },
    //     "bookUpdateDate": {
    //         "_seconds": 1726249074,
    //         "_nanoseconds": 343000000
    //     }
    // },
    // {
    //   "name": "Aquele que condiz",
    //   "author": "sdfasdf",
    //   "publisher": "igreja",
    //   "pages": "500",
    //   "cover": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "readLink": "https://marketplace.canva.com/EAE4oJOnMh0/1/0/1003w/canva-capa-de-livro-de-suspense-O7z4yw4a5k8.jpg",
    //   "bookDataCreation": {
    //     "_seconds": 1689521768,
    //     "_nanoseconds": 16000000
    //   },
    //   bookUpdateDate: {
    //     _seconds: 0,
    //     _nanoseconds: 0
    //   }
    // }
    // ]
    const loadingBooks = computed(() => bookStore.loading);
    const errorBooks = computed(() => bookStore.error);
      
    onMounted(async () => {
        await bookStore.fetchBooks();
        console.log(bookStore.loading);
    });

    return {
      books,
      loadingBooks,
      errorBooks
    };
  },
};
</script>

<template>
    <header>
      <h1 class="text-primary text-xs">This is an Books page</h1>
    </header>
    <main>
      <div class="flex justify-end w-full my-5">
        <SearchBar/>
      </div>
      <div class="flex flex-row gap-3 overflow-auto flex-wrap h-[89vh]">
        <CardsBooks v-for="book in books" :key="book.name" :book="book"/>
        <SpeedDialMenu/>
      </div>
    </main>
</template>
  
<style>
@media (min-width: 1024px) {
  .about {
    /* min-height: 100vh; */
    display: flex;
    align-items: center;
  }
}
</style>