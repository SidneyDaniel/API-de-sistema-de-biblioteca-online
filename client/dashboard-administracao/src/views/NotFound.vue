<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'notFound'
})

</script>

<template>
    <div class="h-full flex justify-center flex-col items-center ">
      <h1 class="text-primary text-9xl">404</h1>
      <h1 class="text-primary text-xl">Page not Found</h1>
      <p class="text-primary mb-4">Sorry, but that page doesn't exist.</p>
      <div class="h-14">
        <router-link class="button" to="/">Back to the homepage</router-link>
      </div>
    </div>
</template>

<style scoped>
.button{
    display: flex;
    background-color: var(--p-primary-500);
    border: 1px solid var(--p-primary-500);
    padding: 0.34rem 0.7rem;
    border-radius: 1rem;
    color: var(--p-primary-50);
    font-size: medium;
    font-variant: all-petite-caps;
}

.button:hover{
  background-color: var(--p-primary-50);
  color: var(--p-primary-900);
  border: 1px solid var(--p-primary-500);
  padding: 0.35rem 0.8rem;
  font-size: 17px;
  letter-spacing: 1px;
}

</style>