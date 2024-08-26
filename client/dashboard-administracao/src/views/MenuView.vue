<script setup lang="ts">
import Menu from 'primevue/menu';
import { PrimeIcons } from '@primevue/core/api';
import { RouterLink, RouterView } from 'vue-router';

import { ref } from 'vue';

const checked = ref(false);

const toggleColorScheme = (): void => {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark');
}

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     // Dark mode is enabled
//     console.log('User prefers dark mode');
// } else {
//     // Light mode is enabled
//     console.log('User prefers light mode');
// }

const items = [
                {
                    separator: true
                },
                {
                    label: 'Documents',
                    items: [
                        {
                            label: 'Home',
                            icon: 'pi pi-home',
                            shortcut: '⌘+N',
                            path: '/'
                        },
                        {
                            label: 'Search',
                            icon: 'pi pi-search',
                            shortcut: '⌘+S',
                            path: '/search'
                        },
                        {
                            label: 'Users',
                            icon: 'pi pi-user-edit',
                            shortcut: '⌘+S',
                            path: '/users'
                        },
                        {
                            label: 'Books',
                            icon: 'pi pi-book',
                            shortcut: '⌘+S',
                            path: '/books'
                        }
                    ]
                },
                {
                    label: 'Profile',
                    items: [
                        {
                            label: 'Settings',
                            icon: 'pi pi-cog',
                            shortcut: '⌘+O',
                            path: '/settings'
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-sign-out',
                            shortcut: '⌘+Q',
                            path: ''
                        }
                    ]
                },
                {
                    separator: true
                }
            ]
</script>

<template>
  <header>
    <nav class="menu">
      <!-- <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink> -->
      <Menu :model="items" class="w-full h-[99vh] md:w-60 flex flex-col">

        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-2">
            <span class="text-xl font-semibold">Admin DashBoard</span>
          </span>
        </template>


        <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template>

        <template #item="{ item, props }">
          <RouterLink v-riple :to="item.path" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
              }}</span>
          </RouterLink>
          <!-- <a v-ripple class="flex items-center" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
              }}</span>
          </a> -->

        </template>

        <template #end>   
          <div class="flex flex-col gap-7 p-1">
            <div class="flex flex-col items-center">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" size="xlarge" shape="circle" />
              <span class="inline-flex flex-col items-start">
                  <span class="font-bold">Amy Elsner</span>  
                  <!-- <Tag icon="pi pi-user" value="emailAleatorio12@gmail.com" class="text-xs"></Tag>  -->
              </span>
            </div>
  
            <div class="flex flex-row justify-center">
              <Tag icon="pi pi-user" value="Admin" />
              <Divider layout="vertical" />
              <ToggleButton v-model="checked" onLabel="Light" offLabel="Dark" onIcon="pi pi-sun" offIcon="pi pi-moon"
                class="w-20 text-sm" aria-label="Do you confirm" @click="toggleColorScheme()" />
            </div>
          </div>
        </template>

      </Menu>
    </nav>
  </header>

</template>

<style scoped>
.menu{
    display: flex;
    flex-direction: column;
}

</style>

<style >
@layer{
  .p-menu-end{
   @apply !flex-1 grid items-end pb-2
  }
}
</style>


