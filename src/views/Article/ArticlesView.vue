<template>
    <div class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <div v-for="(article, index) in state.articles" v-bind:key="index" class="flex flex-col items-center justify-center">
            <a  :href="'editArticle/'+article._id"><ArticleComponent :title="article.title" :numcomments="article.numComments" :category="article.category" :imageUrl="article.imageUrl"/></a>
        </div>  
    </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import ArticleComponent from "../../components/ArticleComponent.vue"
import { reactive, onMounted } from 'vue';
import { getArticlesByUserId } from '../../services/apiRequest.service';
  
const state = reactive({
  articles: [],
  getAccessTokenSilently: useAuth0().getAccessTokenSilently,
  user: useAuth0().user
})

onMounted(async () => {
    const response = await getArticlesByUserId(state.getAccessTokenSilently, state.user.mongoId)
    console.log(response)
    state.articles = response.data
})
</script>