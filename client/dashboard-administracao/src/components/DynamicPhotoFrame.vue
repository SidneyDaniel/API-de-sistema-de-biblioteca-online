<script lang="ts">
export default {
    name: 'PictureFrameWithTitle',
    props: {
        imageUrl: {
            type: String,
            required: true
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
    }
}
</script>

<template>
    <!-- <div class="mb-4 pt-12 flex flex-row justify-between">
        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 flex items-end justify-center">
            <img alt="book cover" :src="imageUrl" class="w-36 rounded-2xl" />
        </div>
    </div> -->
    <div class="flex flex-row pt-12 mb-4 justify-between">
        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 flex items-end justify-center">
            <div v-if="!imageUrl || !isValidURL(imageUrl) " class="flex flex-col justify-around items-center font-extralight w-36 h-56 border border-primary bg-primary-contrast rounded-2xl">
                <h1>Publisher</h1>
                <h2>Title</h2>
                <h3>Author</h3>
            </div>
            <img v-else  :src="imageUrl" alt="image" class="w-36 rounded-2xl" />
        </div> 
    </div>
</template>



  
