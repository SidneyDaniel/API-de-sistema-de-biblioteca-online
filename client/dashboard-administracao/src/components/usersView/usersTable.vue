<script lang="ts">
import { onMounted, computed, watch, reactive, defineComponent, ref} from "vue";
import { useUserStore } from '@/stores/usersStore';
import type { InputUser, OutputUser } from '@/types/booksTypes';
import usersService from "@/services/userServices";
import { useToastService } from "@/composables/useToastService";
import remapArray from "@/utils/remapArray";

export default defineComponent({
    name:'usersTable',
    setup() {
    const userStore = useUserStore()

    const toastService = useToastService();

    const editingRows = ref([]);
    const loadingState = ref(false)

    const deleteUserDialog = ref(false)

    const usersData = computed<Array<InputUser>>(() => userStore.listOfUsers || []);
    const loading = computed(() => userStore.loading);
    const error = computed(() => userStore.error);
      
    const users = reactive<OutputUser[]>([])

    onMounted(async () => {
      users.splice(0, users.length, ...remapArray(usersData.value)); 
    })

    watch(usersData, (value) => {
      users.splice(0, users.length, ...remapArray(value)); 
    })

    const statuses = [
      { label: 'Active', value: true },
      { label: 'Inactive', value: false },
    ]

    return {
        users, editingRows, loading, error, toastService, statuses, deleteUserDialog, loadingState
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
    async deleteUser(identifier: OutputUser){
      this.loadingState = true
        try {
          const usersServiceDelete = new usersService(({
            userIdentifier: identifier.uid,
            newUserName: identifier.name,
            newUserEmail: identifier.email,
          }))

          const response = await usersServiceDelete.deleteUser() as Response

          if (!response.ok) {
            const responseBody = await response.json()
            throw new Error(responseBody.message)
          }

          this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${response.text()}`,
          life: 3000
        });
        this.loadingState = false

        } catch (error) {
          this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${error}`,
          life: 3000
        });
        this.loadingState = false
        }
    },
    async onRowEditSave(event: { newData: OutputUser; index: number; }){
      let { newData, index } = event;
      this.loadingState = true
      try {
        const userService = new usersService({
          userIdentifier: newData.uid,
          newUserName: newData.name,
          newUserEmail: newData.email,
        })

        const response = await userService.EditUsers() as Response

        if (typeof response === 'string' || response instanceof Error) {
          throw new Error(response instanceof Error ? response.message : response);
        }

        if (!response.ok) {
          const responseBody = await response.json()
          throw new Error(responseBody.message)
        }

        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User Updated`,
          life: 3000
        });

        this.loadingState = false
      } catch (error) {
        this.toastService.add({
          severity: 'error',
          summary: 'Fail',
          detail: `${error instanceof Error}`,
          life: 3000
        });
        this.loadingState = false
      }
     
      this.users[index] = newData;
    }
  }
})
</script>

<template>
  <Toast/>
  <Dialog v-model:visible="loadingState" modal pt:root:class="!border-0 !bg-transparent !shadow-none z-10">
    <template #container>
      <i class="pi pi-spin pi-spinner text-primary-400 z-20" style="font-size: 3rem"></i>
    </template>
  </Dialog>
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
          <InputText disabled  v-model="data[field]" fluid />
        </template>
      </Column>

      <Column field="status" header="Status" style="width: 20%">
        <template #editor="{ data, field }">
          <Select  disabled  v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value"
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