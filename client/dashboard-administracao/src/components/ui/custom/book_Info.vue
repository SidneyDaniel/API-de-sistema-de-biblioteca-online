<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'book_Info',
    props: {
        _cardTitle: String,
        _cardSubtitle: String,
        _loadingInfo: Boolean,
        _bookInfoCover: String,
        _bookInfoTitle: String,
        _bookInfoAuthor: String,
        _bookInfoPages: String,
        _bookInfoPublisher: String,
        _bookInfoDataCreation:  Object as () => { _seconds: number; _nanoseconds: number }
    },
    methods:{
        formatDate(date: {_seconds: number, _nanoseconds: number} | undefined){
            if (!date) { return 'Invalid date' }

            const newDate = new Date(date._seconds * 1000)
            const newTime = new Date(date._nanoseconds).getTime()
            
            return `${newDate.toUTCString()}`
        }
    }
})
</script>

<template>
    <Card class="w-full min-w-40 max-w-96  overflow-hidden max-[1660px]:max-w-full">
            <template #title>{{ _cardTitle }}</template>
            <template #subtitle><h2 class="max-sm:hidden">{{ _cardSubtitle }}</h2></template>
            <template #content>
                <section class="flex flex-col gap-8">
                    <div class="mb-4 pt-12 flex flex-row justify-between">
                        <div class="relative m-auto bg-primary p-10 rounded-full h-56 w-56 max-sm:size-44 flex items-end justify-center">
                            <Skeleton v-if="_loadingInfo" width="36rem" height="219px" class="!rounded-xl"/>
                            <img v-if="!_loadingInfo" alt="book cover" :src="_bookInfoCover" class="w-36 rounded-2xl"/>
                        </div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span >Title: {{ _bookInfoTitle }}</span>
                        <span class="text-xs">Author: {{ _bookInfoAuthor }}</span>
                        <span class="text-xs">Pages: {{ _bookInfoPages }}</span>
                        <span class="text-xs">Publisher: {{ _bookInfoPublisher }}</span>    
                    </div>
                    <Tag :value="formatDate(_bookInfoDataCreation)" class="w-full"></Tag>
                </section>
            </template>
        </Card>
</template>