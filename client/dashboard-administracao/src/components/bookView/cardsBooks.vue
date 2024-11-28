<script lang="ts">
import { ref, type PropType } from 'vue';
import { useBooksStore } from '@/stores/books';
import CreateReadUpdateDelete from '@/services/CRUD';
import DynamicPhotoFrame from '../DynamicPhotoFrame.vue';

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
    name: "CardBook",
    data(){
        return{     
            name: '',
            publisher:'',
            author: '', 
            pages: '',
            cover: '' ,
            link: '' 
        }
    },
    props: {
        book: {
            type: Object as PropType<Book>,
            required: true
        }
    },
    setup(){
        const op = ref();
        const selectedMember = ref()
        const members = ref([
            { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
        ]);

        const toggle = (event: any) => {
            op.value.toggle(event);
        }

        const selectMember = (member:any) => {
            selectedMember.value = member;
            op.value.hide();
        }
        return{ op, members, selectedMember, toggle, selectMember}
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
    } 
};
</script>

<template>
    <Card class="w-full min-w-40 max-w-72 overflow-hidden">
        <template #header>
            <img :alt="book.name" :src="book.cover" class="w-full h-[456px] object-cover" />
        </template>
        <template #title>
            <h1 class="text-base text-ellipsis overflow-hidden whitespace-nowrap">{{ book.name }}</h1>
        </template>
        <template #subtitle>
            <h2 class="text-xs">{{ book.author }}</h2>
        </template>
        <template #content>
            <p class="m-0">
                Editora: {{ book.publisher }}<br>
                Páginas: {{ book.pages }}
            </p>
        </template>
        <template #footer>
            <div class="flex gap-4 mt-1">
                <Button label="Delete" severity="primary" icon="pi pi-trash" size="small" outlined class="w-full" @click="deletebook(book.name)"/>
                <Button label="Edit" icon="pi pi-pencil" class="w-full" size="small"  @click="toggle" />

                <Popover ref="op">
                    <section class="flex flex-col gap-4 items-end w-[35rem]">
                            <!-- <span class="font-medium block mb-2">{{ selectedMember ? selectedMember.name : 'Select Member'}}</span> -->
                            <!-- <img class="rounded w-44 sm:w-64" :src="book.name" :alt="book.name" /> -->
                            <!-- <h1>{{ book }}</h1> -->
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
                                        <InputText id="username" v-model="name" aria-describedby="username-help" size="small" :placeholder="book.name" />
                                    </div>
                                    
                                    <div class="flex flex-col gap-2">
                                        <label for="username">Author</label>
                                        <InputText id="username" v-model="author" aria-describedby="username-help" size="small" :placeholder="book.author" />
                                    </div>
                    
                                    <div class="flex flex-col gap-2">
                                        <label for="username">Publisher</label>
                                        <InputText id="username" v-model="publisher" aria-describedby="username-help" size="small" :placeholder="book.publisher" />
                                    </div>
                    
                                    <div class="flex flex-col gap-2">
                                        <label for="username">Pages</label>
                                        <InputText id="username" v-model="pages" aria-describedby="username-help" size="small" :placeholder="book.pages"/>
                                    </div>
    
                                    <div class="flex flex-col gap-2">
                                        <label for="username">Cover</label>
                                        <InputText id="username" v-model="cover" aria-describedby="username-help" size="small" :placeholder="book.cover"/>
                                    </div>
                                    
                                    <div class="flex flex-col gap-2">
                                        <label for="username">Read link</label>
                                        <InputText id="username" v-model="link" aria-describedby="username-help" size="small" :placeholder="book.cover"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button label="Cancel" text severity="secondary" @click="toggle"  autofocus />
                                <Button label="Save" outlined severity="secondary" 
                                @click="updateBook(
                                    name || book.name, 
                                    publisher || book.publisher, 
                                    author || book.author, 
                                    pages || book.pages, 
                                    cover || book.cover, 
                                    link || book.readLink, 
                                    book.name 
                                )"  autofocus />
                            </div>
                    </section>
                </Popover>
            </div>
        </template>
    </Card>
</template>

<style scoped>

</style>
