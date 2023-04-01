<template>
	<Transition name="article">
		<ArticleEditorComponent
			v-if="writer"
			:draft="getDraftById(route.params.id)"
			:key="route.params.id"
			@removeDraft="deleteDraft(route.params.id)"
		/>
	</Transition>
</template>

<script setup>
import ArticleEditorComponent from "../../components/ArticleEditorComponent.vue";
import { useWriterStore } from "../../stores/writer.store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { provide, ref } from "vue";
import gsap from "gsap";

const { error, loading, writer } = storeToRefs(useWriterStore());
const { deleteDraft } = useWriterStore();
const route = useRoute();

const getDraftById = (id) => {
	return writer.value.drafts.find((draft) => draft._id === id);
};

const removeDraft = () => {
	deleteDraft(getDraftById(route.params.id));
};

const removeDraftRef = ref(removeDraft);

provide("removeDraft", removeDraftRef);
</script>

<style scoped>
.article-move, /* apply transition to moving elements */
.article-enter-active,
.article-leave-active {
	transition: all 0.5s ease-in-out;
}

.article-enter-from,
.article-leave-to {
	transform: translateX(120%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.article-leave-active {
	position: absolute;
}
</style>
