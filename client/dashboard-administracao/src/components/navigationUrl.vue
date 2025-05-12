<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'navigationUrl',
    setup(){
        const currentPath = ref()

        const route = useRoute()

        function treatPath(path: string) {
            switch (path) {
                case '/':
                    return { icon: 'pi pi-home', text: 'Home' };
                case '/users':
                    return { icon: 'pi pi-user', text: 'Users' };
                case '/books':
                    return { icon: 'pi pi-book', text: 'Books' };
                case '/settings':
                    return { icon: 'pi pi-cog', text: 'Settings' };
            }
        }

        onMounted(() => {
            currentPath.value = treatPath(route.path);
        });

        watch(route, (newRoute) => {
            const treatedPath = treatPath(newRoute.path) 
            currentPath.value = treatedPath
        })

        return {currentPath}
    }
})
</script>

<template>
        <div class="flex justify-center text-primary font-semibold px-1 py-1 border border-surface rounded-lg mb-2">
            <h1 class="inline-flex items-baseline gap-2"><i :class="currentPath?.icon"></i>  {{ currentPath?.text}}</h1>
        </div>
</template>