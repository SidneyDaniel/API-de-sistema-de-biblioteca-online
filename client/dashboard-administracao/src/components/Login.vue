<template>
  <Toast />
  <form v-on:submit.prevent="login" class="flex flex-col gap-6 p-6 w-96 border border-surface shadow rounded-border ">
    <ProgressBar v-if="loading" mode="indeterminate" style="height: 6px"></ProgressBar>
    <div class="text-center">
        <svg class="mb-4 mx-auto fill-primary h-16" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z"
            />
        </svg>
        <div class="text-primary text-3xl font-medium mb-4">Welcome Back</div>
    </div>
        
    <FloatLabel>
            <InputText id="username" v-model="email" class="w-full" size="small" />
            <label for="username">Username</label>
    </FloatLabel>
    
    <FloatLabel class="w-full">
            <Password v-model="password" :feedback="false" input-class="w-full h-[35px]" class="block w-full"  toggleMask />
            <label for="password">Password</label>
    </FloatLabel>
    <Button type="submit" label="Sign In" icon="pi pi-user" size="small"/>
  </form>
</template>

<script lang="ts">
import { useToastService } from '@/composables/useToastService';
import AuthService from '@/services/authService';

import { ref } from 'vue';

export default {
  name:'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  setup(){
    const toastService = useToastService();
    const loading = ref(false)
    return {toastService, loading}
  },
  methods: {
    async login() {
      try {
        this.loading = true
        
        const authService = new AuthService({
          email: this.email, 
          password: this.password
        })

        const response = await authService.login() as Response
      
        if (typeof response === 'string' || response instanceof Error) { 
          throw new Error(response instanceof Error ? response.message : response); 
        }

        if(!response.ok) {
          const responseBody = await response.json()
          throw new Error(responseBody.message)
        }
        
        this.toastService.add({ 
          severity: 'success', 
          summary: 'Success', 
          detail: `Hello there!`, 
          life: 3000 
        });

        this.$router.push('/');        
      } catch (error) {      
        this.toastService.add({ 
          severity: 'error', 
          summary: 'Fail', 
          detail: `${error}`, 
          life: 6000 
        });

      } finally {
        this.loading = false
      }

    }
  }
};
</script>