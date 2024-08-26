<script lang="ts">
import { ref, onMounted, computed } from "vue";
import { useBooksStore } from "@/stores/books";


export default {
  name: "table",
  setup() {

    const users = [
      { name: 'Alice', email: 'alice@example.com', uuid: 'a1b2c3d4', status: 'active' },
      { name: 'Bob', email: 'bob@example.com', uuid: 'e5f6g7h8', status: 'inactive' },
      { name: 'Carlos', email: 'carlos@example.com', uuid: 'i9j0k1l2', status: 'active' },
      { name: 'Daniela', email: 'daniela@example.com', uuid: 'm3n4o5p6', status: 'inactive' },
      { name: 'Eduardo', email: 'eduardo@example.com', uuid: 'q7r8s9t0', status: 'active' },
      { name: 'Fernanda', email: 'fernanda@example.com', uuid: 'u2v3w4x5', status: 'inactive' },
      { name: 'Gabriel', email: 'gabriel@example.com', uuid: 'y6z7a8b9', status: 'active' },
      { name: 'Helena', email: 'helena@example.com', uuid: 'c1d2e3f4', status: 'inactive' },
      { name: 'Isabela', email: 'isabela@example.com', uuid: 'g5h6i7j8', status: 'active' },
      { name: 'João', email: 'joao@example.com', uuid: 'k9l0m1n2', status: 'inactive' }
    ];

    onMounted(async () => {
         
    });

    return {
        users
    };
  },
};
</script>

<template>
    <div class="flex flex-row gap-6 w-full max-w-fit">
      <DataTable :value="users" paginator :rows="3" tableStyle="min-width: 50rem">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl font-bold">Users</span>
                </div>
            </template>
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="email" header="Email" style="width: 25%"></Column>
            <Column field="uuid" header="Id°" style="width: 25%"></Column>
            <Column field="status" header="Status" style="width: 25%"></Column>
      </DataTable>
    </div>
</template>

<style>
.p-datatable-column-title {
    color: var(--p-primary-color);
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
