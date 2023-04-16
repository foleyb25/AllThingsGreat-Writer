<template>
	<div
		class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
	>
		<transition-group :css="false" @enter="onEnter">
			<div
				v-for="(article, index) in getAllArticles"
				v-bind:key="article._id"
				:data-index="index"
				class="flex flex-col items-center justify-center"
			>
				<a :href="'reviewArticle/' + article._id"
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
						:author="article.writer.nickName"
				/></a>
			</div>
		</transition-group>
	</div>
</template>

<script setup>
import ArticleComponent from "../../components/ArticleComponent.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";
import gsap from "gsap";
const { getAllArticles } = storeToRefs(useArticleStore());

function onEnter(el, done) {
	gsap.fromTo(
		el,
		{
			opacity: 0.01,
			scale: 0.01,
		},
		{
			scale: 1,
			opacity: 1,
			delay: el.dataset.index * 0.15,
			onComplete: done,
		}
	);
}
</script>
