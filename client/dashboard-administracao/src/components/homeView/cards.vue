<script lang="ts">
import { ref, onMounted, computed } from "vue";
import { useBooksStore } from "@/stores/books";


export default {
  name: "cards",
  setup() {
    const bookStore = useBooksStore();
    const BooksLenght = ref();

    const books = computed<Array<object>>(() => bookStore.books || []);
    const filter = computed<Array<object>>(() => bookStore.filteredBooks || [])
    const loading = computed(() => bookStore.loading);
    const error = computed(() => bookStore.error);
    
    onMounted(async () => {
        await bookStore.fetchBooks();
        BooksLenght.value = lenghtBooks()
        console.log(bookStore.loading);       
    });

    const lenghtBooks = () => {
        const numberOfBooks = books
        console.log(numberOfBooks);
        
        return numberOfBooks.value.length
    }

    return {
        books,
        loading,
        error,
        BooksLenght
    };
  },
};
</script>

<template>
    <div class="flex flex-row gap-6 ">
        <Card class="w-full min-w-40 max-w-96 overflow-hidden">
            <template #title>Last Book</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p class="m-0">
                    1
                </p>
            </template>
        </Card>

        <Card class="w-full min-w-40 max-w-96  overflow-hidden">
            <template #title>Books registered</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p class="m-0">
                    {{ BooksLenght }}
                </p>
            </template>
        </Card>

        <Card class="w-full min-w-40 max-w-96  overflow-hidden">
            <template #title>Number of users</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p class="m-0">
                    1
                </p>
            </template>
        </Card>

        <Card class="w-full min-w-40 max-w-96  overflow-hidden">
            <template #title>Number of users</template>
            <template #subtitle>Card subtitle</template>
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
  

 