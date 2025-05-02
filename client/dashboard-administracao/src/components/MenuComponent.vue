<script lang="ts">
import { useRouter } from 'vue-router';
import { computed, defineComponent, onMounted, ref } from 'vue';
import AuthService from '@/services/authService';
import { useToastService } from '@/composables/useToastService';
import { useCurrentUserStore } from '@/stores/currentUser';

export default defineComponent({
  name: 'MenuComponent',
  setup(){
    const checked = ref(false)
    const router = useRouter()
    const toastService = useToastService();
    const confirm = ref(false)
    const currentUser = useCurrentUserStore()
    const userInfo = ref({email: '', name:''})
    
    const items = [
      {
        separator: true
      },
      {
        label: 'Resources',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            path: '/'
          },
          {
            label: 'Users',
            icon: 'pi pi-user-edit',
            path: '/users'
          },
          {
            label: 'Books',
            icon: 'pi pi-book',
            path: '/books'
          }
        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'About',
            icon: 'pi pi-question-circle',
            path: '/search'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            path: '/',
            command: () => {
               confirm.value = true
            }
          }
        ]
      },
      {
        separator: true
      }
    ]
    const authService = new AuthService({ email: '', password: '' })
     
    onMounted(async () => {
      const currentUserLogged: {name: string, email: string} = await authService.currentUser()
      // const { name, email } = await currentUser();
      console.log(currentUserLogged);
      
      currentUser.setUserData( currentUserLogged.name, currentUserLogged.email)
      
      const currentUserInfo = computed(() => currentUser.currentUser)

      userInfo.value.name = currentUserInfo.value.displayName || ''
      userInfo.value.email = currentUserInfo.value.email || ''
    })

    return { checked, router, items, confirm, toastService, userInfo}
  },
  methods:{
    toggleColorScheme() {
      const element = document.querySelector('html');
      element?.classList.toggle('my-app-dark');
    }, 
    async logOut(){
      try {
        const authService = new AuthService({ email: '', password: '' })
        const response = await authService.logOut() as Response

        if (!response.ok) { throw new Error('Failed to logOut'); }

        this.toastService.add({
          severity: 'info',
          summary: 'Success',
          detail: `See you Later 😊`,
          life: 3000
        });
        

      } catch (error) {
        this.toastService.add({
          severity: 'error',
          summary: 'Success',
          detail: `Something went wrong ☹️`,
          life: 3000
        });
        console.log(error)
      }
    }
  }

})

</script>

<template>
  <header class="max-[1030px]:!p-0">
    <nav class="menu max-[1030px]:!w-full">
      <Menu :model="items" class="w-full h-[99vh] md:w-60 flex flex-col max-[1030px]:hidden">

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

      <Menubar :model="items" class="w-full min-[1030px]:!hidden mb-2">
        <template #start>
          <svg class="max-md:hidden h-8 fill-primary" width="35" height="32" viewBox="0 0 35 32" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z" />
          </svg>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
          <a v-ripple class="flex items-center" v-bind="props.action">
              <RouterLink v-riple :to="item.path" v-bind="props.action">
                <span>{{ item.label }}</span>
              </RouterLink>
              <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
              <span v-if="item.shortcut"
                class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut
                }}</span>
              <i v-if="hasSubmenu"
                :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
            </a>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <ToggleButton v-model="checked" onLabel="Light" offLabel="Dark" onIcon="pi pi-sun" offIcon="pi pi-moon"
              class="w-fit text-sm" size="small" aria-label="Do you confirm" @click="toggleColorScheme()" />
            <Avatar :label="userInfo.name.trim().charAt(0)" shape="circle" />
          </div>
        </template>
      </Menubar>

      <Dialog v-model:visible="confirm" :style="{ width: '450px' }" :modal="true">
        <template #header>
          <div class="inline-flex items-center justify-center gap-2">
            <span class="text-primary font-bold text-2xl">So, Soon?</span>
          </div>
        </template>

        <div class="flex items-center gap-4">
          <i class="pi pi-sign-out !text-3xl" />
          <span>Are you sure you want to logout?</span>
        </div>

        <template #footer>
          <Button label="No" icon="pi pi-times" text @click="confirm = false" />
          <Button label="Yes" icon="pi pi-check" @click="logOut" />
        </template>
      </Dialog>
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