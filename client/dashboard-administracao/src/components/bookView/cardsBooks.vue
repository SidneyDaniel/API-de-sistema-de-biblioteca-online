<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import BatchDeleteOperation from '@/services/deleteMultiples';
import EditPopover from './editPopover.vue';
import type { Book } from '@/types/booksTypes';

export default defineComponent({
    name: "CardBook",
    data(){
        return{     
            marked: ref()
        }
    },
    props: {
        book: {
            type: Array as PropType<Book[]>,
            required: true
        },
        visibleCheckBox: { 
            type: Boolean, 
            required: false 
        }
    },
    emits: ['toFalse'],
    methods: {
        async deleteMultipleBooks(list: Array<string>){
            const loading = ref(false)
            try { 
                loading.value = true
                await new BatchDeleteOperation(list).deleteOperation()
            } catch (error) {
                console.log(error);
                loading.value = false
                return error
            }finally {  
                loading.value = false
            } 
        }
    },
    components:{
        EditPopover
    },
    watch: {
        marked(newValue, oldValue){ 
            console.log('Marked changed from', oldValue, 'to', newValue); 
        }
    }
});
</script>
<template>
    <div class="custom_grid_for_books_list">
        <Card class="w-full min-w-40 max-w-72 overflow-hidden relative" v-for="books in book" :key="books.name">
            <template #header>
                <Checkbox v-if="visibleCheckBox" v-model="marked" name="marked" :value="books.name" class="m-3 !absolute" />
                <!-- <h1>{{  visibleCheckBox }}</h1> -->
                <img :alt="books.name" :src="books.cover" class="w-full h-[456px] object-cover" />
            </template>
            <template #title>
                <h1 class="text-base text-ellipsis overflow-hidden whitespace-nowrap">{{ books.name }}</h1>
            </template>
            <template #subtitle>
                <h2 class="text-xs">{{ books.author }}</h2>
            </template>
            <template #content>
                <p class="m-0">
                    Editora: {{ books.publisher }}<br>
                    Páginas: {{ books.pages }}
                </p>
            </template>
            <template #footer>
                    <EditPopover :dataOfBooks="books"/>
            </template>
        </Card>
    </div>
    <div class="absolute flex gap-3 bottom-0 m-3" v-if="visibleCheckBox">
        <Button label="Cancel" severity="warn" v-on:click="$emit('toFalse')"/>
        <Button label="Delete All" icon="pi pi-trash" severity="danger" iconPos="right" @click="deleteMultipleBooks(marked)" />
    </div>
</template>

<style scoped>
.custom_grid_for_books_list{
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    gap: 1.75rem;
    /* grid-gap: 1rem; */
    grid-auto-rows: max-content;
    justify-content: center;
    width: 100%;
}
</style>
