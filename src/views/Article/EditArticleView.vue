<template>
	<ArticleEditorComponent
		v-if="getArticle()"
		:article="getArticle()"
	></ArticleEditorComponent>
</template>

<script setup>
import ArticleEditorComponent from "../../components/ArticleEditorComponent.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";

const { getArticle } = storeToRefs(useArticleStore());

const props = defineProps(["id"]);
</script>
