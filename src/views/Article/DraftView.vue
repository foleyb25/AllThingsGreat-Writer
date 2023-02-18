<template>
    <ArticleEditorComponent v-if="writer" :draft="getDraftById(route.params.id)" :key="route.params.id">
    </ArticleEditorComponent>
</template>

<script setup>
import ArticleEditorComponent from '../../components/ArticleEditorComponent.vue'
import { useWriterStore } from '../../stores/writer.store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const {error, loading, writer, getDraftById } = storeToRefs(useWriterStore())
const route = useRoute()


</script>