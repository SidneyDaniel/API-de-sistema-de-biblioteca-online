<script setup lang="ts">
import UsersTable from '@/components/usersView/usersTable.vue';


</script>

<template>
    <header>
      <h1 class="text-primary text-xs">This is an Users page</h1>
    </header>
    <main>
      <div class="flex flex-row gap-3 overflow-auto flex-wrap h-[88vh]">
        <UsersTable/>
      </div>
    </main>
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