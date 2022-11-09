<template>
    <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="blog in state.blogs" class="h-full w-full flex justify-center items-center">
            <a :href="'editBlog/'+blog._id"><BlogComponent :title="blog.title" :numcomments="blog.numComments" :category="blog.category" :imageUrl="blog.imageUrl" class="font-sans aspect-[14/15] w-full mt-2 mb-2 shadow-2xl"></BlogComponent></a>
        </div>
    </div>
    
</template>

<script>
import BlogComponent from "../../components/BlogComponent.vue"

export default {
    name: "BlogsView",
    components: {BlogComponent}
}
</script>

<script setup>
import { reactive, onMounted } from "vue"
import Axios from 'axios'

const state = reactive({
    blogs: {}
})


onMounted(async () => {
    state.blogs = await Axios.get("http://localhost:5002/api/blogs").then((respone) => {
        return respone.data
    })
})
</script>