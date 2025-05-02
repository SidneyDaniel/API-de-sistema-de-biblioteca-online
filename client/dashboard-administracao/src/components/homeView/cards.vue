<script lang="ts">
import { ref, onMounted, computed, watch, defineComponent } from "vue";
import { useBooksStore } from "@/stores/books";
import { useUserStore } from "@/stores/usersStore";

import type { Book, InputUser } from "@/types/booksTypes";
import Book_Info from "../ui/custom/book_Info.vue";
import Number_of from "../ui/custom/number_of.vue";

export default defineComponent({
  name: "homeCards",
  setup() {
    const bookStore = useBooksStore();
    const userStore = useUserStore();

    const BooksLenght = ref();
    const UsersLenght = ref();
    let MostRecentBook = ref<Book | null>(null);
    let MostRecentUpdatedBook = ref<Book | null>(null)

    const books = computed<Array<Book>>(() => bookStore.books || []);
    const loadingBooks = computed(() => bookStore.loading);
    const errorBooks = computed(() => bookStore.error);

    const usersData = computed<Array<InputUser>>(() => userStore.listOfUsers || []);
    const loadingUsers = computed(() => userStore.loading);
    const errorUsers = computed(() => userStore.error);
      
    onMounted(async () => {
        await bookStore.fetchBooks();
        BooksLenght.value = books.value.length
        UsersLenght.value = usersData.value.length
        console.log(bookStore.loading);
    });

    watch(books, (newBooks) => {
        if (newBooks && newBooks.length > 0) {
            MostRecentBook.value = newBooks.reduce((latest, book) => {
                return (latest.bookDataCreation._seconds > book.bookDataCreation._seconds) ? latest : book;
            });
        }
    }, { immediate: true });

    watch(books, (newBooksUp) => {
        if (newBooksUp && newBooksUp.length > 0) {
        const validBooks = newBooksUp.filter(book => book.bookUpdateDate && book.bookUpdateDate._seconds !== undefined);
        if (validBooks.length > 0) {
            MostRecentUpdatedBook.value = validBooks.reduce((latest, book) => {
                return (latest.bookUpdateDate._seconds > book.bookUpdateDate._seconds) ? latest : book;
            });
        }
    }
    }, { immediate: true });

    return {
        books,
        BooksLenght,
        UsersLenght,
        MostRecentBook,
        MostRecentUpdatedBook,
        loadingBooks,
        loadingUsers
    };
  },
  components:{
    Book_Info , Number_of
  }
});
</script>

<template>
    <div class="flex flex-row gap-4 max-[1380px]:flex-col">
        <section class="flex flex-col gap-4">
            <div class="flex flex-row justify-between gap-4">
                <Number_of 
                :_cardTitle="'N° of registered books'"
                :_cardSubtitle="'Total number of books registered in the system'"
                :_numberOfloading="loadingBooks"
                :_numberOfLenght="BooksLenght"
                />

                <Number_of 
                :_cardTitle="'N° of users'"
                :_cardSubtitle="'Total number of users in the system'"
                :_numberOfloading="loadingUsers"
                :_numberOfLenght="UsersLenght"
                />
            </div>
            
            <Tables />
        </section>

        <section class="flex flex-flow gap-4 w-full max-[1660px]:flex-col max-[1380px]:flex-row">
        <Book_Info 
            :_cardTitle="'Last Book added'"
            :_cardSubtitle= "'Newest Addition to the Collection'"
            :_loadingInfo="loadingBooks"
            :_bookInfoCover="MostRecentBook?.cover"
            :_bookInfoTitle="MostRecentBook?.name"
            :_bookInfoAuthor="MostRecentBook?.author"
            :_bookInfoPages="MostRecentBook?.pages"
            :_bookInfoPublisher="MostRecentBook?.publisher"
            :_bookInfoDataCreation="MostRecentBook?.bookDataCreation" 
        />

        <Book_Info 
            :_cardTitle="'Last Book Updated'"
            :_cardSubtitle= "'Most Recently Updated Book'"
            :_loadingInfo="loadingBooks"
            :_bookInfoCover="MostRecentUpdatedBook?.cover"
            :_bookInfoTitle="MostRecentUpdatedBook?.name"
            :_bookInfoAuthor="MostRecentUpdatedBook?.author"
            :_bookInfoPages="MostRecentUpdatedBook?.pages"
            :_bookInfoPublisher="MostRecentUpdatedBook?.publisher"
            :_bookInfoDataCreation="MostRecentUpdatedBook?.bookUpdateDate" 
        />
    </section>

    </div>
</template>

<style>
.p-card{ border: 1px solid var(--p-content-border-color); }

.p-card-title { color: var(--p-primary-color); }
</style>
  

 