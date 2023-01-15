<template>
    <ArticleEditorComponent v-if="state.article" :article="state.article"></ArticleEditorComponent>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import ArticleEditorComponent from '../../components/ArticleEditorComponent.vue'
import { getSingleArticle } from '../../services/apiRequest.service';

const props = defineProps(['id'])

const state = reactive({
    article: null
})


onMounted(async () => {
    console.log(props.id)
    const response = await getSingleArticle(props.id)
    state.article = response.data
    console.log(state.article)
})
</script>




