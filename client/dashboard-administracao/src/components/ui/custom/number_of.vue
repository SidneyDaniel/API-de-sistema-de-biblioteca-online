<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: 'number_of',
    props: {
        _cardTitle: String,
        _cardSubtitle: String,
        _numberOfloading: Boolean,
        _numberOfLenght: Number
    },
    setup(props){
        const localNumberOfLength = ref(props._numberOfLenght)
            watch(() => props._numberOfLenght, (newVal) => {
        localNumberOfLength.value = newVal;
        });
      
        return {localNumberOfLength}
    }
})
</script>

<template>
    <Card class="w-full min-w-40 max-w-md  overflow-hidden max-[1380px]:max-w-full">
        <template #title>{{ _cardTitle }}</template>
        <template #subtitle>{{ _cardSubtitle }}</template>
        <template #content>
            <p class="m-0">
                <Skeleton v-if="_numberOfloading" shape="circle" width="100px" height="100px"></Skeleton>
                <Knob v-if="!_numberOfloading" v-model="localNumberOfLength" :strokeWidth="5" />
            </p>
        </template>
    </Card>
</template>