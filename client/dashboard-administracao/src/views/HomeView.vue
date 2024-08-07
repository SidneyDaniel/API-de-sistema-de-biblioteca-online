<script setup lang="ts">
import Cards from "@/components/homeView/cards.vue";
import Charts from "@/components/homeView/charts.vue";
import Tables from "@/components/homeView/tables.vue";
</script>


<template>
  <header>
    <h1>This is an Home page</h1>
  </header>
  <div class="flex flex-col gap-3">
    <Charts/>
    <Cards/>
    <div>
      <Tables/>
    </div>
  </div>
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
