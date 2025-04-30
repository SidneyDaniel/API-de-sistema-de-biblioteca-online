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


        <!-- <template #submenulabel="{ item }">
          <span class="text-primary font-bold">{{ item.label }}</span>
        </template> -->

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
              <Avatar :label="userInfo.name.trim().charAt(0)" size="xlarge"
                shape="circle" />
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
}
</style>