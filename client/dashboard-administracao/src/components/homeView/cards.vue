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
    let MostRecentBook = ref<Book | null>(null)

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


    return {
        books,
        BooksLenght,
        UsersLenght,
        MostRecentBook,
        formatDate
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
            <template #subtitle><span>{{ MostRecentBook?.name }}</span><br><span class="text-xs">{{ MostRecentBook?.author }}</span></template>
            <template #content>
                <div class="mb-4 flex flex-row justify-between">
                    <div class="relative">
                        <Image :src="MostRecentBook?.cover" alt="Image" width="260" />
                        <Tag :value="formatDate(MostRecentBook?.bookDataCreation)"  severity="secondary" class="absolute" style="left:5px; right: 5px; bottom: 5px;" />
                    </div>
                    <span class="flex flex-col items-center gap-3">
                        <Button icon="pi pi-eye" :href="MostRecentBook?.readLink" target="_blank" severity="secondary" outlined />
                        <Badge :value="MostRecentBook?.pages" size="xlarge" severity="secondary"></Badge>
                    </span>
                </div>
                <div>
                    <span class="text-xs">Publisher: {{ MostRecentBook?.publisher }}</span>
                </div>
            </template>
        </Card>

        <Card class="w-full min-w-40 max-w-96  overflow-hidden">
            <template #title>Last updated book</template>
            <template #subtitle>Name of the book</template>
            <template #content>
                <p class="m-0">
                    1
                </p>
            </template>
        </Card>
    </div>
</template>

<style>
.p-card{ border: 1px solid var(--p-content-border-color); }

.p-card-title { color: var(--p-primary-color); }
</style>
  

 