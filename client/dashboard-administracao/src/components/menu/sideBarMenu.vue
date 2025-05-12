<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import type { MenuItems, UserInfo } from '@/types/menuTypes';

export default defineComponent({
  name: 'SideBarMenu',
  props:{
    userInfo: {
        type: Object as PropType<UserInfo>,
        required: true
    },
    MenuItems: {
        type: Array as PropType<MenuItems[]>,
        required: true
    }
  },
  setup(){
    const checked = ref(false)
    return { checked }
  },
  methods:{
    toggleColorScheme() {
      const element = document.querySelector('html');
      element?.classList.toggle('my-app-dark');
    }
  }

})

</script>

<template>
  <header class="max-[1030px]:!p-0">
    <nav class="menu max-[1030px]:!w-full">
      <Menu :model="MenuItems" class="w-full h-[99vh] md:w-60 flex flex-col max-[1030px]:hidden">

        <template #start>
          <span class="inline-flex items-center gap-1 px-2 py-2">
            <svg class="max-md:hidden h-8 fill-primary" width="35" height="32" viewBox="0 0 35 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z" />
          </svg>
            <span class="text-xl font-semibold">Admin DashBoard</span>
          </span>
        </template>

        <template #item="{ item, props }">
          <RouterLink :to="item.path" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span v-if="item.shortcut"
              class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
              }}</span>
          </RouterLink>
        </template>

        <template #end>
          <div class="flex flex-col gap-7 p-1">
            <div class="flex flex-col items-center">
              <Avatar :label="userInfo.name.trim().charAt(0)" size="xlarge" shape="circle" />
              <span class="inline-flex flex-col items-start">
                <span class="font-bold">{{userInfo.name}}</span>
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

<style>
@layer{
  .p-menu-end{
   @apply !flex-1 grid items-end pb-2
  }
  
  .p-menu-submenu-label{
    color: var(--p-primary-color) !important;
    font-weight: 700 !important;
  }
}
</style>