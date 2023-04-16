<template>
	<div
		class="flex flex-col items-center justify-center"
		v-html="getArticle.bodyHTML"
	></div>
	<div class="flex mt-8 flex-row justify-start items-center">
		<button
			:isdisabled="isDisabled"
			v-if="!getArticle.isReviewed"
			@click="approveArticle"
			class="p-1 m-2 flex items-center justify-center bg-green-500"
		>
			Approve
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="getArticle.isReviewed"
			@click="unApproveArticle"
			class="p-1 m-2 flex items-center justify-center bg-green-300"
		>
			Un-Approve
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="!getArticle.isArchived"
			@click="archiveArticle"
			class="p-1 m-2 flex items-center justify-center bg-yellow-500"
		>
			Archive
		</button>
		<button
			:isdisabled="isDisabled"
			v-if="getArticle.isArchived"
			@click="unArchiveArticle"
			class="p-1 m-2 flex items-center justify-center bg-yellow-300"
		>
			Un-Archive
		</button>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";

const { getArticle } = storeToRefs(useArticleStore());

const isDisabled = ref(false);

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
});

onMounted(async () => {
	twttr.widgets.load();
});

const approveArticle = async () => {
	isDisabled = true;
	await useArticleStore().approveArticle(props.id);
	isDisabled = false;
};

const unApproveArticle = async () => {
	isDisabled = true;
	await useArticleStore().unApproveArticle(props.id);
	isDisabled = false;
};

const archiveArticle = async () => {
	isDisabled = true;
	await useArticleStore().archiveArticle(props.id);
	isDisabled = false;
};

const unArchiveArticle = async () => {
	isDisabled = true;
	await useArticleStore().unArchiveArticle(props.id);
	isDisabled = false;
};
</script>
