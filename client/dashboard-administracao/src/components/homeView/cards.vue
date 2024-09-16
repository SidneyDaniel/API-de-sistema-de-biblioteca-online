<script lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useBooksStore } from "@/stores/books";
import { useUserStore } from "@/stores/usersStore";
import Tables from "./tables.vue";
import { useRegisterStore } from "@/stores/registeredBooks";

interface InputUser extends Object {
    creationTime: Date;
    disabled: boolean;
    displayName: string;
    email: string;
    emailVerified: boolean;
    lastSignInTime: Date;
    tokensValidAfterTime: Date;
    uid: string;
}

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
  setup() {
    const bookStore = useBooksStore();
    const userStore = useUserStore();
    const registerStore = useRegisterStore();

    const BooksLenght = ref();
    const UsersLenght = ref();
    let MostRecentBook = ref<Book | null>(null);
    let MostRecentUpdatedBook = ref<Book | null>(null)

    const books = computed<Array<Book>>(() => bookStore.books || []);
    const loadingBooks = computed(() => bookStore.loading);
    const errorBooks = computed(() => bookStore.error);

    const register = computed<Object>(() => registerStore.listOfBooks || {});
    const loadingRegister = computed(() => registerStore.loading);
    const errorRegister = computed(() => registerStore.error);

    const usersData = computed<Array<InputUser>>(() => userStore.listOfUsers || []);
    const loadingUsers = computed(() => userStore.loading);
    const errorUsers = computed(() => userStore.error);
      
    onMounted(async () => {
        await bookStore.fetchBooks();
        BooksLenght.value = lenghtBooks()
        UsersLenght.value = numberOfUsers()
        console.log(bookStore.loading);
    });

    const lenghtBooks = () => {
        const numberOfBooks = books
        console.log(numberOfBooks);
        
        return numberOfBooks.value.length
    }

    const numberOfUsers = () => {
        const usersInTheSystem = usersData

        return usersInTheSystem.value.length
    }

    const formatDate = (date: {_seconds: number, _nanoseconds: number} | undefined) => {
        if (!date) { return 'Invalid date' }

        const newDate = new Date(date._seconds * 1000)
        const newTime = new Date(date._nanoseconds).getTime()
        
        return `${newDate.toUTCString()}`
    }

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
        formatDate,
    };
  },
};
</script>

<template>
    <div class="flex flex-row gap-4 ">
        <section class="flex flex-col gap-4">
            <div class="flex flex-row justify-between gap-4">
                <Card class="w-full min-w-40 max-w-md  overflow-hidden">
                    <template #title>N° of registered books</template>
                    <template #subtitle>Total number of books registered in the system</template>
                    <template #content>
                        <p class="m-0">
                            <Knob v-model="BooksLenght" :strokeWidth="5" />

                        </p>
                    </template>
                </Card>

                <Card class="w-full min-w-40 max-w-md  overflow-hidden">
                    <template #title>N° of users</template>
                    <template #subtitle>Total number of users in the system</template>
                    <template #content>
                        <p class="m-0">
                            <Knob v-model="UsersLenght" :strokeWidth="5" />

                        </p>
                    </template>
                </Card>
            </div>
            <Tables />
        </section>

        <Card class="w-full min-w-40 max-w-96 overflow-hidden">
            <template #title>Last Book added</template>
            <template #subtitle>Newest Addition to the Collection</template>
            <template #content>
                <section class="flex flex-col gap-8">
                    <div class="mb-4 pt-12 flex flex-row justify-between">
                        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 flex items-end justify-center">
                            <img alt="book cover" :src="MostRecentBook?.cover" class="w-36 rounded-2xl"/>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span >Title: {{ MostRecentBook?.name }}</span>
                        <span class="text-xs">Author: {{ MostRecentBook?.author }}</span>
                        <span class="text-xs">Pages: {{ MostRecentBook?.pages }}</span>
                        <span class="text-xs">Publisher: {{ MostRecentBook?.publisher }}</span>    
                    </div>
                    <Tag :value="formatDate(MostRecentBook?.bookDataCreation)" class="w-full"></Tag>
                </section>
            </template>
        </Card>

        <Card class="w-full min-w-40 max-w-96  overflow-hidden">
            <template #title>Last Book Updated</template>
            <template #subtitle>Most Recently Updated Book</template>
            <template #content>
                <section class="flex flex-col gap-8">
                    <div class="mb-4 pt-12 flex flex-row justify-between">
                        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 flex items-end justify-center">
                            <img alt="book cover" :src="MostRecentUpdatedBook?.cover" class="w-36 rounded-2xl"/>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span >Title: {{ MostRecentUpdatedBook?.name }}</span>
                        <span class="text-xs">Author: {{ MostRecentUpdatedBook?.author }}</span>
                        <span class="text-xs">Pages: {{ MostRecentUpdatedBook?.pages }}</span>
                        <span class="text-xs">Publisher: {{ MostRecentUpdatedBook?.publisher }}</span>    
                    </div>
                    <Tag :value="formatDate(MostRecentUpdatedBook?.bookUpdateDate)" class="w-full"></Tag>
                </section>
            </template>
        </Card>
    </div>
</template>

<style>
.p-card{ border: 1px solid var(--p-content-border-color); }

.p-card-title { color: var(--p-primary-color); }
</style>
  

 