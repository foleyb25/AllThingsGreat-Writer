<template>
	<div
		class="flex flex-col items-center justify-center"
		v-html="getArticle().bodyHTML"
	></div>
	<div class="flex mt-8 flex-row justify-start items-center">
		<button
			:isdisabled="isDisabled"
			v-if="!getArticle().isReviewed"
			@click="approveArticle"
			class="p-1 m-2 flex items-center justify-center bg-green-500"
		>
			Approve
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="getArticle().isReviewed"
			@click="unApproveArticle"
			class="p-1 m-2 flex items-center justify-center bg-green-300"
		>
			Un-Approve
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="!getArticle().isArchived"
			@click="archiveArticle"
			class="p-1 m-2 flex items-center justify-center bg-yellow-500"
		>
			Archive
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="getArticle().isArchived"
			@click="unArchiveArticle"
			class="p-1 m-2 flex items-center justify-center bg-yellow-300"
		>
			Un-Archive
		</button>
	</div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";

const { getArticle } = storeToRefs(useArticleStore());

const isDisabled = false;

const props = defineProps(["id"]);
console.log("PROP", props.id);

onMounted(async () => {
	twttr.widgets.load();
});

const approveArticle = async () => {
	isdisabled = true;
	await useArticleStore().approveArticle(props.id);
	isdisabled = false;
};

const unApproveArticle = async () => {
	isdisabled = true;
	await useArticleStore().unApproveArticle(props.id);
	isdisabled = false;
};

const archiveArticle = async () => {
	isdisabled = true;
	await useArticleStore().archiveArticle(props.id);
	isdisabled = false;
};

const unArchiveArticle = async () => {
	isdisabled = true;
	await useArticleStore().unArchiveArticle(props.id);
	isdisabled = false;
};
</script>
