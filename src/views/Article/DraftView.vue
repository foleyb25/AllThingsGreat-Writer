<template>
    <ArticleEditorComponent v-if="draft" 
        :bodyHTML="draft.bodyHTML"
        :imageUrl="draft.imageUrl"
        :tags="draft.tags"
        :moods="draft.moods"
        :title="draft.title"
        :category="draft.category"
        >
    
    </ArticleEditorComponent>
</template>

<script setup>
import ArticleEditorComponent from '../../components/ArticleEditorComponent.vue'
import { useWriterStore } from '../../stores/writer.store'

const {error, loading } = storeToRefs(useWriterStore())
const writerStore = useWriterStore()
const draft = writerStore.getDrafts()

</script>