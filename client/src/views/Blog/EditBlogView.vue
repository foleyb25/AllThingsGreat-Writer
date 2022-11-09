<template>
    <BlogEditorComponent v-if=blog :blog="blog"></BlogEditorComponent>
</template>

<script>
import BlogEditorComponent from '../../components/BlogEditorComponent.vue'
import Axios from 'axios'
export default {
    name: 'EditBlogView',
    components: {BlogEditorComponent},
    data() {
        return {
            blog: undefined
        }
    },

    async created() {
        this.blog = await Axios.get("http://localhost:5002/api/blogs/"+this.$route.params.id).then((respone) => {
            console.log("Blog returned from API")
            return respone.data
            
        })
    }

}

            


</script>




