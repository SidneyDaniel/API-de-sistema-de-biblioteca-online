<script setup lang="ts">
import UsersTable from '@/components/usersView/usersTable.vue';


</script>

<template>
      <div class="flex flex-row gap-3 overflow-auto flex-wrap h-[88vh]">
        <UsersTable/>
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