<script setup lang="ts">
import Cards from "@/components/homeView/cards.vue";
import Charts from "@/components/homeView/charts.vue";
</script>

<template>
  <header>
    <h1>This is an Home page</h1>
  </header>
  <div class="flex flex-col gap-3 overflow-auto h-[97vh]">
    <Charts/>
    <Cards/>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
