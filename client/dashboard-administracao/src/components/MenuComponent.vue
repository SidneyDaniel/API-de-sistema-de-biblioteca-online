<script lang="ts">
import { useRouter } from 'vue-router';
import { computed, defineComponent, onMounted, ref } from 'vue';
import AuthService from '@/services/authService';
import { useToastService } from '@/composables/useToastService';
import { useCurrentUserStore } from '@/stores/currentUser';
import SideBarMenu from './menu/sideBarMenu.vue';
import TopBarMenu from './menu/topBarMenu.vue';
import type { MenuItems } from '@/types/menuTypes';

export default defineComponent({
  name: 'MenuComponent',
  setup(){
    const checked = ref(false)
    const router = useRouter()
    const toastService = useToastService();
    const confirm = ref(false)
    const currentUser = useCurrentUserStore()
    const userInfo = ref({email: '', name:''})
    
    const items: MenuItems[] = [
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
            path: '/about'
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
  },
  components:{
    SideBarMenu, TopBarMenu
  }

})

</script>

<template>
  <header class="max-[1030px]:!p-0">
    <nav class="menu max-[1030px]:!w-full">
      <SideBarMenu :MenuItems="items" :userInfo="userInfo"/>
      <TopBarMenu :MenuItems="items" :userInfo="userInfo"/>
      
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