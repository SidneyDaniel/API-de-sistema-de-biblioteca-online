<script lang="ts">
import { defineComponent, ref, type PropType } from 'vue';
import { useBooksStore } from '@/stores/books';
import CreateReadUpdateDelete from '@/services/CRUD';
import { useToastService } from '@/composables/useToastService';

import type { Book } from '@/types/booksTypes';

export default defineComponent({
    name: "editPopover",
    data(){
        return{     
            name: '',
            publisher:'',
            author: '', 
            pages: '',
            cover: '' ,
            link: '' ,
        }
    },
    props: {
        dataOfBooks: {
            type: Object as PropType<Book>,
            required: true
        },
    },
    setup(){
        const op = ref();
        const toggle = (event: any) => {
            op.value.toggle(event);
        }
        const toastService = useToastService();

        const visible = ref(false);    
        return{ op ,toggle, visible, toastService}
    },
    methods: {
        isValidURL(url: string | URL) {
            try {
                const parsedUrl = new URL(url);
                const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
                return (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") &&
                    validExtensions.some(ext => parsedUrl.pathname.endsWith(ext));
            } catch (e) {
                return false;
            }
        },
        async updateBook(tit: string, pub: string, aut: string, pag: string, cov: string, read: string, currTi: string){
            const bookStore = useBooksStore()
            try { 
                await new CreateReadUpdateDelete({
                    title: tit,
                    publisher: pub,
                    author: aut,
                    pages: pag,
                    cover: cov,
                    readLink: read,
                    currentTitle: currTi
                }).editBook()
                console.log(tit, pub, aut, pag, cov, read, currTi);
            } catch (error) {
                console.log(error);
                return error
            }finally {  
                await bookStore.fetchBooks();
                this.toastService.add({ severity: 'success', summary: 'Sucesso', detail: 'Book Updated Sucefully!', life: 3000 });
                this.visible = false
            }
        },
        async deletebook(curTitle: string){
            const bookStore = useBooksStore()
            try { 
                await new CreateReadUpdateDelete({
                    currentTitle: curTitle
                }).deleteBook()
            } catch (error) {
                console.log(error);
                return error
            }finally {  
                bookStore.fetchBooks();
                this.toastService.add({ severity: 'success', summary: 'Sucesso', detail: 'Book Deleted Sucesfully!', life: 3000 });
                this.visible = false
            }            
        }
        
    },
   
});
</script>

<template>
    <div class="flex gap-4 mt-1">
        <Button label="Delete" severity="primary" icon="pi pi-trash" size="small" outlined class="w-full" @click="deletebook(dataOfBooks.name)"/>
        <Button label="Edit" icon="pi pi-pencil" class="w-full" size="small"  @click="visible = true" />

        <Dialog v-model:visible="visible" modal class="!max-h-fit h-screen overflow-auto" >        
            <template #header>
                <div class="inline-flex items-center justify-center gap-1">
                    <span class="font-bold whitespace-nowrap text-primary text-xl">Edit book</span>
                </div>
            </template>

            <section class="flex flex-col gap-4 items-end w-[85vw] max-w-[35rem]">
                    <div class="flex flex-col gap-4 w-full">
        
                        <DynamicPhotoFrame  :imageUrl="cover" />
    
                        <div class="flex flex-col gap-2 w-full">
                            <div class="flex flex-col gap-2">
                                <label for="username">Title</label>
                                <InputText id="username" v-model="name" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.name" />
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <label for="username">Author</label>
                                <InputText id="username" v-model="author" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.author" />
                            </div>
            
                            <div class="flex flex-col gap-2">
                                <label for="username">Publisher</label>
                                <InputText id="username" v-model="publisher" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.publisher" />
                            </div>
            
                            <div class="flex flex-col gap-2">
                                <label for="username">Pages</label>
                                <InputText id="username" v-model="pages" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.pages"/>
                            </div>
    
                            <div class="flex flex-col gap-2">
                                <label for="username">Cover</label>
                                <InputText id="username" v-model="cover" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.cover"/>
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <label for="username">Read link</label>
                                <InputText id="username" v-model="link" aria-describedby="username-help" size="small" :placeholder="dataOfBooks.cover"/>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <Button label="Cancel" text severity="secondary" @click="visible = false"  autofocus />
                        <Button label="Save" outlined severity="secondary" 
                        @click="updateBook(
                            name || dataOfBooks.name, 
                            publisher || dataOfBooks.publisher, 
                            author || dataOfBooks.author, 
                            pages || dataOfBooks.pages, 
                            cover || dataOfBooks.cover, 
                            link || dataOfBooks.readLink, 
                            dataOfBooks.name 
                        )"  autofocus />
                    </div>
            </section>
        </Dialog>
    </div>
</template>