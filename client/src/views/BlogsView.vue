<template>
    <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="item in items" class="h-full w-full flex justify-center items-center">
            <BlogComponent class="font-sans aspect-[14/15] mt-2 mb-2 w-[90%] shadow-2xl"></BlogComponent>
        </div>
    </div>
    
</template>

<script>
import BlogComponent from "../components/BlogComponent.vue"
export default {
    name: "ContentComponent",
    components: {BlogComponent},
    data() {
        return {
            items: [1,2,3,4,5,6,7]
        }
    }
}
</script>