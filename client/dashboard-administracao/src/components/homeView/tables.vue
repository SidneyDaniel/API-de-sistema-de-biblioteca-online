<script lang="ts">
import { onMounted, computed, watch, reactive, defineComponent} from "vue";
import { useUserStore } from "@/stores/usersStore";
import type { InputUser, OutputUser } from "@/types/booksTypes";

export default defineComponent({
  name: "homeTable",
  setup() {
    const userStore = useUserStore()
    const usersData = computed<Array<InputUser>>(() => userStore.listOfUsers || []);
    const loading = computed(() => userStore.loading);
    const error = computed(() => userStore.error);
      
    const users: Array<object> = reactive([] as OutputUser[])

    onMounted(async () => {
         await userStore.fetchUsersData()
    });
    
    watch(usersData, (value) => {
      const arrayUsers = value 
      const mappedArray: OutputUser[] = arrayUsers.map(user => ({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        status: isActive(user.lastSignInTime)
      }))  

      console.log('Array Mapeada', mappedArray);
      const limitedArray = mappedArray.slice(0, 4);
      users.splice(0, users.length, ...limitedArray); 
    })

    function isActive(date: Date) {
        const today = new Date()
        const twoMontAgo = new Date()
        const lastSignIn = new Date(date)
        twoMontAgo.setMonth(today.getMonth() - 2)

        return lastSignIn >= twoMontAgo
    }

    return {
        users, loading, error,
    };
  },
  methods:{
    getSeverity(status: boolean){
      switch (status) {
          case true:
              return 'sucess';

          case false:
              return 'warn';
      }
    }
  }
});
</script>

<template>
    <div class="flex flex-row gap-6 w-full max-w-fit">
      <DataTable :value="users" :rows="4" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Users</span>
                </div>
            </template>
            <Column field="name" header="Name" style="width: 25%">
              <template #body="{ data }">
                    <span>{{ data.name ? data.name : 'User'  }}</span>
              </template>
            </Column>
            <Column field="email" header="Email" style="width: 25%"></Column>
            <Column field="uid" header="Uid°" style="width: 25%">
              <template #body="{ data }">
                    <Tag :value="data.uid" severity="info" style="width: 100%;"/>
              </template>
            </Column>
            <Column field="status" header="Status" style="width: 25%" dataType="boolean">
              <template #body="{ data }">
                    <Tag :value="data.status ? 'Active' : 'Inactive'" :severity="getSeverity(data.status)"  />
              </template>
            </Column>
      </DataTable>
    </div>
</template>

<style>
.p-datatable-header {
    color: var(--p-primary-color) !important;
}

.p-datatable {
  border: 1px solid var(--p-content-border-color);
  border-radius: var(--p-border-radius-xl);
  padding: 0.3rem;
}

.p-paginator{
  padding: 0.3rem 1rem !important;
}
</style>
