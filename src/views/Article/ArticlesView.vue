<template>
    <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <!-- <div v-for="article in state.articles" class="h-full w-full flex justify-center items-center">
            <a :href="'editArticle/'+article._id"><ArticleComponent :title="article.title" :numcomments="article.numComments" :category="article.category" :imageUrl="article.imageUrl" class="font-sans aspect-[14/15] w-full mt-2 mb-2 shadow-2xl"></ArticleComponent></a>
        </div> -->
        Test
        
    </div>
</template>

<script >
  import { useAuth0 } from '@auth0/auth0-vue';
  import ArticleComponent from "../../components/ArticleComponent.vue"
  
  export default {
     name: "ArticlesView",
     components: {ArticleComponent},
      setup() {
      const {isAuthenticated} = useAuth0();
      const {user} = useAuth0();
      const {isLoading} = useAuth0();
      
      return {
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        user: user,
      }
    }
  }
  </script>


<!-- <script setup>
import { reactive, onMounted } from "vue"
import Axios from 'axios'

const state = reactive({
    articles: {}
})


onMounted(async () => {
    state.articles = await Axios.get("http://localhost:8080/api/articles").then((respone) => {
        return respone.data
    })
})
</script> -->