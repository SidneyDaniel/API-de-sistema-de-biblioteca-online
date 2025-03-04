<script lang="ts">
import { onMounted, computed, watch, reactive, defineComponent, ref} from "vue";
import { useUserStore } from '@/stores/usersStore';
import type { InputUser, OutputUser } from '@/types/booksTypes';

export default defineComponent({
    name:'usersTable',
    setup() {
    const userStore = useUserStore()

    const editingRows = ref([]);

    const deleteUserDialog = ref(false)

    const usersData = computed<Array<InputUser>>(() => userStore.listOfUsers || []);
    const loading = computed(() => userStore.loading);
    const error = computed(() => userStore.error);
      
    const users = reactive<OutputUser[]>([])

    onMounted(async () => {
      const mappedArray: OutputUser[] = usersData.value.map(user => ({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        status: isActive(user.lastSignInTime)
      }))  
      users.splice(0, users.length, ...mappedArray); 
    })

    function isActive(date: Date) {
        const today = new Date()
        const twoMontAgo = new Date()
        const lastSignIn = new Date(date)
        twoMontAgo.setMonth(today.getMonth() - 2)

        return lastSignIn >= twoMontAgo
    }

      const statuses = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ]

    const onRowEditSave = (event: { newData: OutputUser; index: number; }) => {
      let { newData, index } = event;


      console.log('%%NewData');
      
      console.log(newData);
      console.log(index);
      

      users[index] = newData;
      
      console.log('%%Users');
      console.log(users);
      
    };

    return {
        users, editingRows, loading, error, onRowEditSave, statuses, deleteUserDialog
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
    },
    deleteUser(value: object){
        console.log(value);
    }
  }
})
</script>

<template>
  <div class="w-full">
    <DataTable v-model:editingRows="editingRows" :value="users" editMode="row" dataKey="uid" datatable.header.color="var(--p-primary-500)"
      @row-edit-save="onRowEditSave" :pt="{
        table: { style: 'width: 100%' },header:{},
        column: {
          // @ts-ignore: Unreachable code error
          bodycell: ({ state }) => ({
            style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
          })
        }
      }">

      <Column field="name" header="Name" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="email" header="Email" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="uid" header="Uid" style="width: 20%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="status" header="Status" style="width: 20%">
        <template #editor="{ data, field }">
          <Select v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value"
            placeholder="Select a Status" fluid>
            <template #option="slotProps">
              <Tag :value="slotProps.option.label" :severity="getSeverity(slotProps.option.value)" />
            </template>
          </Select>
        </template>
        <template #body="slotProps">
          <Tag :value="slotProps.data.status ? 'Active' : 'Inactive'" :severity="getSeverity(slotProps.data.status)" />
        </template>
      </Column>

      <Column :rowEditor="true" header="Edit" style="width: 10%; min-width: 8rem"></Column>

      <Column header="Delete" style="width: 10%; min-width: 8rem">
        <template #body="{data}">
          <Button icon="pi pi-trash" outlined rounded class="mr-2" @click="deleteUser(data)" />
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

.p-datatable-column-title{
    color: var(--p-primary-500);
}
</style>