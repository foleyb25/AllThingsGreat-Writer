<template>
	<div class="w-full">
		<div>
			<label
				for="title"
				class="block m-2 text-sm font-medium text-primary-light"
				>Title</label
			>
			<input
				autocomplete="off"
				type="text"
				id="title"
				v-model="state.title"
				class="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="Title..."
				required
			/>
		</div>
		<div>
			<label
				for="title"
				class="block m-2 text-sm font-medium text-primary-light dark:text-gray-300"
				>Body</label
			>
			<ckeditor
				v-model="state.editorData"
				:config="state.editorConfig"
			></ckeditor>
		</div>
		<button
				class="ml-8 bg-blue-600 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-400 rounded disabled:opacity-25"
				@click="handleEvaluate"
			>
				Evaluate Article
			</button>
		<div>
			<div>Evaluation:</div>
			{{ articleEvaluation }}
		</div>
		<div class="flex flex-col mt-4">
			<label
				for="category"
				class="block m-2 text-sm font-medium text-primary-light dark:text-gray-300"
				>Category</label
			>
			<select
				name="category"
				v-model="state.category"
				class="bg-gray-50 border border-gray-300 text-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				required
			>
				<option value="AllThingsGreat">AllThingsGreat</option>
				<option value="Cryptocurrency">Cryptocurrency</option>
				<option value="A.I. & Technology">A.I. & Technology</option>
				<option value="Health & Fitness">Health & Fitness</option>
				<option value="Extraordinary">Extraordinary</option>
				<option value="Sports">Sports</option>
			</select>
			<label
				for="moods"
				class="block m-2 text-sm font-medium text-primary-light dark:text-gray-300"
				>Moods</label
			>
			<div
				v-for="mood in state.moodsOptions"
				class="m-2 text-primary-light"
			>
				<input
					v-model="state.moods"
					type="checkbox"
					:name="mood"
					:value="mood"
					class="mr-1"
				/>
				<label :for="mood" class="p-1 rounded"> {{ mood }}</label
				><br />
			</div>
			<div>
				<div
					v-for="mood in state.moods"
					:class="
						'm-2 inline-block p-1 border border-black rounded ' +
						getMoodColor(mood)
					"
				>
					<div :class="' ' + getMoodColor(mood)">
						{{ mood }}
					</div>
				</div>
			</div>

			<div>
				<label
					for="tags"
					class="block m-2 text-sm font-medium text-primary-light dark:text-gray-300"
					>Tags (meaningful tags will enhance your google page
					rank)</label
				>
				<input
					autocomplete="off"
					type="text"
					id="tags"
					v-on:keydown.enter="pushTag"
					v-on:keydown.,="pushTag"
					v-on:keyup.enter="clearInputField"
					v-on:keyup.,="clearInputField"
					class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Enter tags separated by commas or enter..."
					required
				/>
			</div>
			<div class="m-4">
				<div
					v-for="tag in state.tags"
					class="m-2 inline-block p-2 border border-black bg-white text-black border-lg rounded-lg"
				>
					<span class="p-1">{{ tag }} </span>
					<span
						class="p-1 cursor-pointer font-bold border bg-gray-300 rounded-full"
						@click="removeTag(tag)"
						>X</span
					>
				</div>
			</div>
		</div>
		<div>
			<label
				for="img"
				class="block m-2 text-sm font-medium text-primary-light dark:text-gray-300"
				>Article Thumbnail Preview</label
			>
			<div
				class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
			>
				<ArticleComponent
					:title="state.title"
					:category="state.category"
					:imageUrl="state.imagePath"
					:isPinned="state.isPinned"
					:isArchived="state.isArchived"
					:isReviewed="state.isReviewed"
					:rating="state.rating"
					:numberOfRatings="state.numberOfRatings"
					:moods="state.moods"
					:author="
						article ? article?.writer?.nickName : writer?.nickName
					"
					:authorProfileImage="
						article
							? article?.writer?.profileImageUrl
							: writer?.profileImageUrl
					"
				></ArticleComponent>
			</div>
		</div>
		<div class="mt-4">
			<input
				:v-on="state.imagePath"
				@click.prevent="state.showModal = true"
				type="file"
				@change="onFileChange"
			/>
		</div>
		<div v-if="error">Error: {{ error }}</div>
		<div v-if="!loading" class="mt-4 flex flex-row">
			<button
				v-if="!props.article"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25"
				:disabled="state.isDisabled"
				@click="handleSubmit()"
			>
				Create
			</button>
			<button
				v-if="props.article"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25"
				:disabled="state.isDisabled"
				@click="handleUpdate()"
			>
				Update
			</button>
			<button
				class="ml-8 bg-yellow-200 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-400 rounded disabled:opacity-25"
				@click="handleSaveDraft"
			>
				Save Draft
			</button>
			<button
				v-if="props.draft"
				class="ml-8 bg-red-800 hover:bg-red-600 text-black font-bold py-2 px-4 border border-red-900 rounded disabled:opacity-25"
				@click="this.state.showDeleteModal = true"
			>
				Delete Draft
			</button>
		</div>

		<label
			for="img"
			class="block m-2 mt-20 text-sm font-medium text-primary-light dark:text-gray-300"
			>Article Preview (Click anywhere to load your embedded
			tweets)</label
		>
		<div class="bg-white">
			<span v-html="state.editorData"></span>
		</div>

		<!-- Modal component -->
		<Transition name="fade" appear>
			<ImagePickerModalComponent
				v-if="state.showModal"
				v-model:imageUrls="getImageUrls"
				@close-modal="state.showModal = false"
				@select-image="selectImage"
			/>
		</Transition>
		<Transition name="fade" appear>
			<DeleteConfirmationModalComponent
				v-if="state.showDeleteModal"
				v-model:imageUrls="state.awsImageUrls"
				@hideDeleteConfirmation="state.showDeleteModal = false"
				@confirmDelete="handleDeleteDraft"
				@select-image="selectImage"
			/>
		</Transition>
	</div>
</template>

<script setup>
import ArticleComponent from "../components/ArticleComponent.vue";
import ImagePickerModalComponent from "./article/ImagePickerModalComponent.vue";
import DeleteConfirmationModalComponent from "./article/DeleteConfirmationModalComponent.vue";
import { useAuth0 } from "@auth0/auth0-vue";
import { reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useWriterStore } from "../stores/writer.store";
import { useArticleStore } from "../stores/article.store";
import router from "../router/index.js";
import { renderMoodColor } from "../utils/colors.util";

const emit = defineEmits(["removeDraft"]);
const { error, loading, writer } = storeToRefs(useWriterStore());
const { getImageUrls, evauatedArticle } = storeToRefs(useArticleStore());
const { saveDraft } = useWriterStore();

const { submitArticle, updateArticle, evaluateArticle } = useArticleStore();

const props = defineProps(["article", "draft"]);

const state = reactive({
	editorConfig: {
		toolbar: [
			{ name: "utils", items: ["Source", "Scayt"] },
			{
				name: "styling",
				items: ["Bold", "Italic", "Underline", "Strike"],
			},
			{
				name: "formatting",
				items: ["NumberedList", "BulletedList", "Blockquote"],
			},
			{
				name: "linking",
				items: ["Link", "Unlink", "Image", "Iframe"],
			},
		],
		height: "400px",
		allowedContent: true,
	},
	editorData: props.article
		? props.article.bodyHTML
		: props.draft
		? props.draft.bodyHTML
		: "<p>Write your masterpiece...</p>",
	title: props.article
		? props.article.title
		: props.draft
		? props.draft.title
		: "",
	moods: props.article
		? props.article.moods
		: props.draft
		? props.draft.moods
		: [],
	moodsOptions: [
		"Satire",
		// "Sarcastic",
		// "Mind-blowing",
		// "Inspirational",
		// "Informative",
		// "Humorous",
		// "Analytical",
		// "Creative",
		// "Provocative",
		// "Introspective",
		// "Nostalgic",
	],
	tags: props.article
		? props.article.tags
		: props.draft
		? props.draft.tags
		: [],
	category: props.article
		? props.article.category
		: props.draft
		? props.draft.category
		: "AllThingsGreat",
	isDisabled: props.article ? false : true,
	isPinned: props.article ? props.article.isPinned : false,
	isArchived: props.article ? props.article.isArchived : false,
	rating: props.article ? props.article.rating : 0,
	isReviewed: props.article ? props.article.isReviewed : false,
	numberOfRatings: props.article ? props.article.numberOfRatings : 0,
	btnText: props.article ? "Update" : "Create",
	imagePath: props.article
		? props.article.imageUrl
		: "/src/assets/images/1669432796163-181228722+missing_img.jpeg",
	awsImageUrls: [],
	showModal: false,
	showDeleteModal: false,
	user: useAuth0().user,
	evaluating: false,
});

const selectImage = (url) => {
	state.imagePath = url;
	state.isDisabled = false;
};

const pushTag = (e) => {
	if (!e.target.value) return;
	if (e.key === "Enter" || e.key === ",") {
		var tag = e.target.value.replace(/,/g, "");
		tag = tag.trim();
		state.tags.push(e.target.value);
		e.target.value = "";
	}
};

const removeTag = (index) => {
	state.tags = state.tags.filter((item) => item !== index);
};

const clearInputField = (e) => {
	e.target.value = "";
};

const getMoodColor = (mood) => {
	return renderMoodColor(mood);
};

const handleSubmit = async () => {
	const formData = {
		title: state.title,
		bodyHTML: state.editorData,
		imageUrl: state.imagePath,
		writer: state.user.mongoId,
		moods: state.moods,
		tags: state.tags,
	};
	await submitArticle(formData);
	//article submitted, check to see if it was a draft and delete it
	if (props.draft) {
		emit("removeDraft");
	}
	router.push("/articles");
};

const handleDeleteDraft = () => {
	emit("removeDraft");
	router.push("/articles");
};

const handleSaveDraft = async (e) => {
	//Patch request
	const draftState = {
		title: state.title,
		bodyHTML: state.editorData,
		imageUrl: state.imagePath,
		category: state.category,
		tags: state.tags,
		moods: state.moods,
	};
	await saveDraft(draftState);
};

const handleUpdate = async (e) => {
	const formData = {
		title: state.title,
		bodyHTML: state.editorData,
		imageUrl: state.imagePath,
		writer: state.user.mongoId,
		moods: state.moods,
		tags: state.tags,
	};
	await updateArticle(props.article._id, formData);
	router.push("/articles");
};

onMounted(() => {
	twttr.widgets.load();
	document.addEventListener("click", onClick);
});

const onClick = (event) => {
	twttr.widgets.load();
};

const handleEvaluate = async () => {
	console.log("EVALUATING...")
	state.evaluating = true
	await evaluateArticle(state.editorData)
	state.evaluating = false
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
