<template>
	<div class="mt-6 w-full flex flex-col items-center justify-center">
		<div class="w-[90%] bg-white flex flex-col justify-center items-center">
			<h1>{{ getArticle.title }}</h1>
			<div v-html="getArticle.bodyHTML"></div>
		</div>
	</div>
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

var isDisabled = ref(false);

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
	isDisabled.value = true;
	await useArticleStore().approveArticle(props.id);
	isDisabled.value = false;
};

const unApproveArticle = async () => {
	isDisabled.value = true;
	await useArticleStore().unApproveArticle(props.id);
	isDisabled.value = false;
};

const archiveArticle = async () => {
	isDisabled.value = true;
	await useArticleStore().archiveArticle(props.id);
	isDisabled.value = false;
};

const unArchiveArticle = async () => {
	isDisabled.value = true;
	await useArticleStore().unArchiveArticle(props.id);
	isDisabled.value = false;
};
</script>
