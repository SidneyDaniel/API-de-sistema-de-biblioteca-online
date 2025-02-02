<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
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
});

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
  

 