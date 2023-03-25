<template>
	<div
		class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
	>
		<div
			v-for="(article, index) in getArticles"
			v-bind:key="index"
			class="flex flex-col items-center justify-center"
		>
			<a :href="'editArticle/' + article._id"
				><ArticleComponent
					:title="article.title"
					:numcomments="article.numComments"
					:category="article.category"
					:imageUrl="article.imageUrl"
					:isPinned="article.isPinned"
					:isArchived="article.isArchived"
					:isReviewed="article.isReviewed"
					:rating="article.rating"
					:numberOfRatings="article.numberOfRatings"
					:moods="article.moods"
			/></a>
		</div>
	</div>
</template>

<script setup>
import ArticleComponent from "../../components/ArticleComponent.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";

const { getArticles } = storeToRefs(useArticleStore());
</script>
