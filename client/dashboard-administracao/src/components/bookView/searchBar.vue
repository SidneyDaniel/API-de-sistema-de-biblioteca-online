<script lang="ts">
import { ref } from 'vue';


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
  name: "searchBar",
  props: {
    listOfBooksToSearch:{
      type: Array,
      required: true
    }
  },
  setup() {
    const visible = ref(false);  
    
    return {visible}
  },
};

</script>

<template>
   <Dialog v-model:visible="visible" modal header="Edit Profile" 
   :style="{ width: '50vw' }" 
   :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">

   <div class="w-1/2">
     <InputGroup>
         <InputText placeholder="Keyword" size="small" />
         <Button icon="pi pi-search" severity="primary" size="small" />
     </InputGroup>
   </div>
  </Dialog>
</template>

<style>

</style>
  

 