<script lang="ts">
export default {
    name: 'PictureFrameWithTitle',
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    }
}
</script>

<template>
    <div class="mb-4 pt-12 flex flex-row justify-between">
        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 flex items-end justify-center">
            <img alt="book cover" :src="imageUrl" class="w-36 rounded-2xl" />
        </div>
    </div>
</template>



  
