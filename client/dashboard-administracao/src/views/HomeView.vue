<script setup lang="ts">
import Cards from "@/components/homeView/cards.vue";
import Charts from "@/components/homeView/charts.vue";
</script>

<template>
  <div class="flex flex-col gap-3 overflow-auto h-[95.1vh]">
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
