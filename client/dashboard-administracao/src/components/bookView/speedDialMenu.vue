<script lang="ts">
import { useBooksStore } from '@/stores/books';
import CreateReadUpdateDelete from '@/services/CRUD';
import toast from 'primevue/toast';
import { useToastService } from '@/composables/useToastService';
import { ref } from 'vue';
const bookStore = useBooksStore();

export default {
    name: "speedDialMenu",
    data(){
        return{     
            title: '',
            publisher:'',
            author: '', 
            pages: '',
            cover: '' ,
            readLink: ''
        }
    },
    emits: ['visibleCheckBox']
    ,
    setup(_, {emit}){
        const toastService = useToastService();
        const showToast = () => { toastService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem de sucesso exibida!', life: 3000 }); };
        const value = ref()
        const visible = ref(false)
        const isLoading = ref(false)
        // const emit = defineEmits(['visibleCheckBox'])
        const items = ref([
            {
                label: 'Add',
                icon: 'pi pi-pencil',
                command: () => {
                    toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
                }
            },
            {
                label: 'Update',
                icon: 'pi pi-plus',
                command: () => {
                    visible.value = true
                }
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {
                    // toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    emit('visibleCheckBox', true)
                }
            },
            {
                label: 'Refresh',
                icon: 'pi pi-refresh',
                command: () => {
                    // toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                    toastService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem de sucesso exibida!', life: 3000 });
                }
            },
        ])
        return{
            items,
            visible,
            isLoading,
            value,
            showToast,
            toastService
        }
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
        async addBook(){
            try {
                this.isLoading = true
                await new CreateReadUpdateDelete({
                    title: this.title,
                    publisher: this.publisher,
                    author: this.author, 
                    pages: this.pages,
                    cover: this.cover ,
                    readLink: this.readLink
                }).createBook()
                
                await bookStore.fetchBooks()
            } catch (error) {
                console.log(error);
                this.isLoading = false
                return error
            } finally {
                // this.showToast()
                this.toastService.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem de sucesso exibida!', life: 3000 });
                this.isLoading = false
                this.visible = false
            }
            console.log(this.title);   
        },
        emitDeleteEvent() { this.$emit('visibleCheckBox', true); }
    } 
};
</script>

<template>
    <div class="relative h-96 ">
        <SpeedDial :model="items" :radius="120" type="quarter-circle" direction="up-left"
            :style="{ position: 'fixed', right: 0, bottom: 0 }" class="m-3" />

        <Toast />

        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '50vw' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-1">
                    <span class="font-bold whitespace-nowrap text-primary text-xl">Add book</span>
                </div>
            </template>
            <span class="text-surface-500 dark:text-surface-400 block mb-5">Add a new book in the collection</span>
            <section class="flex flex-row gap-4">
                <div class="flex flex-col gap-3 justify-evenly">
                    <div class="w-fit min-h-full rounded-lg bg-primary-emphasis p-2">
                        <!-- <Image v-model:src="cover" alt="Image" width="200" preview /> -->
                        <div v-if="!cover || !isValidURL(cover) " class="flex flex-col justify-around items-center font-extralight w-60 min-h-full bg-primary-contrast rounded-lg">
                            <h1>Publisher</h1>
                            <h2>Title</h2>
                            <h3>Author</h3>
                        </div>
                        <img v-else  :src="cover" alt="image" class="rounded-lg w-60 min-w-60 contain-size min-h-full" />
                    </div> 
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <div class="flex flex-col gap-2">
                        <label for="username">Title</label>
                        <InputText id="username" v-model="title" aria-describedby="username-help" />
                    </div>
                    
                    <div class="flex flex-col gap-2">
                        <label for="username">Author</label>
                        <InputText id="username" v-model="author" aria-describedby="username-help" />
                    </div>
    
                    <div class="flex flex-col gap-2">
                        <label for="username">Publisher</label>
                        <InputText id="username" v-model="publisher" aria-describedby="username-help" />
                    </div>
    
                    <div class="flex flex-col gap-2">
                        <label for="username">Pages</label>
                        <InputText id="username" v-model="pages" aria-describedby="username-help" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="username">Cover</label>
                        <InputText id="username" v-model="cover" aria-describedby="username-help" />
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="username">Read link</label>
                        <InputText id="username" v-model="readLink" aria-describedby="username-help" />
                    </div>
                </div>
            </section>

            <template #footer>
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button :label="isLoading ? 'Sending ' : 'Save'" type="submit" outlined severity="secondary" @click="addBook" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>

</style>
