<template>
    <ArticleEditorComponent v-if=article :article="article"></ArticleEditorComponent>
</template>

<script>
import ArticleEditorComponent from '../../components/ArticleEditorComponent.vue'
import Axios from 'axios'
export default {
    name: 'EditArticleView',
    components: {ArticleEditorComponent},
    data() {
        return {
            article: undefined
        }
    },

    async created() {
        this.article = await Axios.get("http://localhost:8080/api/articles/"+this.$route.params.id).then((respone) => {
            console.log("Article returned from API")
            return respone.data
            
        })
    }

}

            


</script>




