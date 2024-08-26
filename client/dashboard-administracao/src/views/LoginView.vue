<script setup lang="ts">
import Login from '../components/Login.vue';

</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center gap-5">
      <h1>Login</h1>
      <Login/>
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