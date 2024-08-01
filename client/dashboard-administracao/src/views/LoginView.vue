<script setup lang="ts">
import Login from '../components/Login.vue';

</script>

<template>
    <div class="about">
      <h1>This is an Login page</h1>
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