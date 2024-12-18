<script lang="ts">
import { ref, watch, type Prop, type PropType } from 'vue';
import { useBooksStore } from '@/stores/books';
import CreateReadUpdateDelete from '@/services/CRUD';
import DynamicPhotoFrame from '../DynamicPhotoFrame.vue';
import BatchDeleteOperation from '@/services/deleteMultiples';

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
            link: '' ,
            marked: ref(),
            // isClicked: ref(false)
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
    setup(){
        const op = ref();
        const selectedMember = ref()
        const members = ref([
            { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
        ]);
        // const marked = ref()

        // watch(marked, (newValue, oldValue) => { 
        //     console.log('Marked changed from', oldValue, 'to', newValue); 
        // })

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
        },
        addCount(){
            let one = 1 
            return `book${one++}`
        },
        async deleteMultipleBooks(list: Array<string>){
            let loading = false
            try { 
                loading = true
                await new BatchDeleteOperation(list).deleteOperation()
            } catch (error) {
                console.log(error);
                loading = false
                return error
            }finally {  
                loading = false
            } 
        }
    },
    watch: {
        marked(newValue, oldValue){ 
            console.log('Marked changed from', oldValue, 'to', newValue); 
        }
    }
};
</script>
<!-- Já sei como resolver essa bagunça, get rid of all of that Sidney, tira a responsabilidad do v-for de cima do bookView e passa para o componente filho no caso esse   -->
<template>
    <div class="custom_grid_for_books_list">
        <Card class="w-full min-w-40 max-w-72 overflow-hidden relative" v-for="books in book" :key="books.name">
            <template #header>
                <Checkbox v-if="visibleCheckBox" v-model="marked" :inputId="addCount()" name="marked" :value="books.name" class="m-3 !absolute" />
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
                <div class="flex gap-4 mt-1">
                    <Button label="Delete" severity="primary" icon="pi pi-trash" size="small" outlined class="w-full" @click="deletebook(books.name)"/>
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
                                            <InputText id="username" v-model="name" aria-describedby="username-help" size="small" :placeholder="books.name" />
                                        </div>
                                        
                                        <div class="flex flex-col gap-2">
                                            <label for="username">Author</label>
                                            <InputText id="username" v-model="author" aria-describedby="username-help" size="small" :placeholder="books.author" />
                                        </div>
                        
                                        <div class="flex flex-col gap-2">
                                            <label for="username">Publisher</label>
                                            <InputText id="username" v-model="publisher" aria-describedby="username-help" size="small" :placeholder="books.publisher" />
                                        </div>
                        
                                        <div class="flex flex-col gap-2">
                                            <label for="username">Pages</label>
                                            <InputText id="username" v-model="pages" aria-describedby="username-help" size="small" :placeholder="books.pages"/>
                                        </div>
        
                                        <div class="flex flex-col gap-2">
                                            <label for="username">Cover</label>
                                            <InputText id="username" v-model="cover" aria-describedby="username-help" size="small" :placeholder="books.cover"/>
                                        </div>
                                        
                                        <div class="flex flex-col gap-2">
                                            <label for="username">Read link</label>
                                            <InputText id="username" v-model="link" aria-describedby="username-help" size="small" :placeholder="books.cover"/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button label="Cancel" text severity="secondary" @click="toggle"  autofocus />
                                    <Button label="Save" outlined severity="secondary" 
                                    @click="updateBook(
                                        name || books.name, 
                                        publisher || books.publisher, 
                                        author || books.author, 
                                        pages || books.pages, 
                                        cover || books.cover, 
                                        link || books.readLink, 
                                        books.name 
                                    )"  autofocus />
                                </div>
                        </section>
                    </Popover>
                </div>
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
