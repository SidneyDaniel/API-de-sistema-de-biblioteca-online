<script lang="ts">
export default {
  name: "searchBar",
  setup() {
    // const bookStore = useBooksStore();

    // const books = computed<Array<Book>>(() => bookStore.books || []);
    // const loadingBooks = computed(() => bookStore.loading);
    // const errorBooks = computed(() => bookStore.error);
      
    // onMounted(async () => {
    //     await bookStore.fetchBooks();
    //     console.log(bookStore.loading);
    // });

    // const lenghtBooks = () => {
    //     const numberOfBooks = books
    //     console.log(numberOfBooks);
        
    //     return numberOfBooks.value.length
    // }

    // return {
       
    // };
  },
};

</script>

<template>
  <div class="w-1/2">
    <InputGroup>
        <InputText placeholder="Keyword" size="small" />
        <Button icon="pi pi-search" severity="primary" size="small" />
    </InputGroup>
  </div>
</template>

<style>

</style>
  

 