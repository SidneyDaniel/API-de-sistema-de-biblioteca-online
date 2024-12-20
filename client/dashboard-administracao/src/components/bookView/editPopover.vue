<script lang="ts">
import { ref, type PropType } from 'vue';
import { useBooksStore } from '@/stores/books';
import CreateReadUpdateDelete from '@/services/CRUD';

type Book = {
  author: string;
  bookDataCreation: {
    _seconds: number;
    _nanoseconds: number;
  };
  bookUpdateDate: {
    _seconds: number;
    _nanoseconds: number;
  };
  cover: string;
  name: string;
  pages: string;
  publisher: string;
  readLink: string;
};

export default {
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
                
        return{ op ,toggle}
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
            }            
        }
        
    },
   
};
</script>

<template>
    <div class="flex gap-4 mt-1">
        <Button label="Delete" severity="primary" icon="pi pi-trash" size="small" outlined class="w-full" @click="deletebook(dataOfBooks.name)"/>
        <Button label="Edit" icon="pi pi-pencil" class="w-full" size="small"  @click="toggle" />

        <Popover ref="op">
            <section class="flex flex-col gap-4 items-end w-[35rem]">
                    <div class="flex flex-row gap-4 w-full">
                        <div class="flex flex-col gap-3 justify-evenly">
                            <div class="w-fit min-h-full rounded-lg bg-primary-emphasis p-2">
                                <div v-if="!cover || !isValidURL(cover) " class="flex flex-col justify-around items-center font-extralight w-60 min-h-full bg-primary-contrast rounded-lg">
                                    <h1>Publisher</h1>
                                    <h2>Title</h2>
                                    <h3>Author</h3>
                                </div>
                                <!-- <DynamicPhotoFrame  :imageUrl="cover" /> -->
                                <img v-else  :src="cover" alt="image" class="rounded-lg w-60 min-w-60 contain-size min-h-full" />
                            </div> 
                        </div>

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
                    <div>
                        <Button label="Cancel" text severity="secondary" @click="toggle"  autofocus />
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
        </Popover>
    </div>
</template>