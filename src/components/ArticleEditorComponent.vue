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
			<!-- <ckeditor
				:editor="state.editor"
				v-model="state.editorData"
				:config="state.editorConfig"
			></ckeditor> -->
		</div>
		<button
			class="m-8 bg-purple-600 hover:bg-green-400 text-cyan-300 hover:text-black font-bold py-2 px-4 border border-cyan-300 rounded disabled:opacity-25"
			@click="handleEvaluate"
			:disabled="
				state.isEvaluating || state.isCreating || state.isUpdating
			"
		>
			{{ state.isEvaluating ? "Evaluating..." : "Evaluate Article" }}
		</button>
		<div
			v-if="state.evaluation"
			id="evaluation-container"
			class="text-primary-light"
		>
			<div>Evaluation:</div>
			<div>
				<p>Structure: {{ state.evaluation.structure }}</p>
				<p>{{ state.evaluation.structure_tip }}</p>
				<p>Organization: {{ state.evaluation.organization }}</p>
				<p>{{ state.evaluation.organization_tip }}</p>
				<p>Content: {{ state.evaluation.content }}</p>
				<p>{{ state.evaluation.content_tip }}</p>
				<p>
					Search Engine Optimization:
					{{ state.evaluation.seo }}
				</p>
				<p>{{ state.evaluation.seo_tip }}</p>
				<p>Smut: {{ state.evaluation.smut }}</p>
				<p>{{ state.evaluation.smut_tip }}</p>
				<br />
				<p>Fixes:</p>
				<div v-for="fix in state.evaluation.fixes">
					<p>Original: {{ fix.original }}</p>
					<p>Suggestion: {{ fix.suggestion }}</p>
				</div>
				<p>Tags:</p>
				{{ state.evaluation.tags }}
			</div>
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
				<option value="Combat Sports">Combat Sports</option>
				<option value="Cryptocurrency">Cryptocurrency</option>
				<option value="A.I. & Technology">A.I. & Technology</option>
				<option value="Health & Fitness">Health & Fitness</option>
				<option value="Extraordinary">Extraordinary</option>
				<option value="Matchup Analysis">Matchup Analysis</option>
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
		<div v-if="!loading" class="mt-4 flex flex-row">
			<button
				v-if="!props.article"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25"
				:disabled="state.isCreating || state.isEvaluating"
				@click="handleSubmit()"
			>
				Create
			</button>
			<button
				v-if="props.article"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded disabled:opacity-25"
				:disabled="state.isUpdating || state.isEvaluating"
				@click="handleUpdate()"
			>
				Update
			</button>
			<button
				class="ml-8 bg-yellow-200 hover:bg-yellow-400 text-black font-bold py-2 px-4 border border-yellow-400 rounded disabled:opacity-25"
				@click="handleSaveDraft"
				:disabled="
					state.isUpdating || state.isCreating || state.isEvaluating
				"
			>
				Save Draft
			</button>
			<button
				v-if="props.draft"
				class="ml-8 bg-red-800 hover:bg-red-600 text-black font-bold py-2 px-4 border border-red-900 rounded disabled:opacity-25"
				@click="this.state.showDeleteModal = true"
				:disabled="
					state.isUpdating || state.isCreating || state.isEvaluating
				"
			>
				Delete Draft
			</button>
		</div>
		<div
			class="text-white mt-2"
			v-if="state.isUpdating || state.isCreating || state.isEvaluating"
		>
			Wait here for a bit, this may take a minute or so. AI is evaluating
			your content.
		</div>

		<label
			class="block m-2 mt-20 text-sm font-medium text-primary-light dark:text-gray-300"
			>Article Preview (Click anywhere to load your embedded
			tweets)</label
		>
		<div class="relative bg-white p-4 rounded">
			<header class="grid grid-cols-2 gap-5 border-b border-black">
				<div class="flex items-center">
					<img
						:src="writer.profileImageUrl"
						alt="Author's Avatar"
						class="w-12 h-12 rounded-full mr-2"
					/>
					<h4 class="font-bold">{{ writer.nickName }}</h4>
				</div>

				<div class="flex justify-between">
					<p>Published: 2 days ago | Last Updated: 5 days ago</p>
					<p>Estimated reading time: {{ 4 }} minutes</p>
				</div>

				<div class="flex justify-start">
					<!-- Replace with actual social share buttons -->
					<button class="text-white rounded">
						<font-awesome-icon
							icon="fa-brands fa-twitter-square"
							size="2x"
							class="text-[#1DA1F2]"
						/>
					</button>
				</div>

				<div class="flex justify-end">
					<p>Likes: {{ 11 }}</p>
					<p>Dislikes: {{ 2 }}</p>
				</div>
			</header>
			<header class="grid grid-cols-3 gap-5 border-b border-black">
				<div>Content: {{ state.evaluation?.content }}</div>
				<div>Structure: {{ state.evaluation?.structure }}</div>
				<div>Organization: {{ state.evaluation?.organization }}</div>
			</header>
			<header class="flex flex-row justify-center">
				<div>Smut:</div>
			</header>
			<div class="relative">
				<img
					:src="state.imagePath"
					alt="Blog image"
					class="w-full aspect-[3/2] object-cover"
				/>
				<div class="absolute inset-0 bg-black bg-opacity-60"></div>
				<h1
					class="absolute inset-0 flex items-center justify-center text-white text-2xl p-5"
				>
					<div
						id="typedtext"
						class="bg-black bg-opacity-40 text-white"
						style="font-family: 'vcr'"
						v-html="state.title"
					></div>
				</h1>
			</div>
			<div
				v-html="state.editorData"
				class="flex flex-col justify-center items-center"
			></div>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
const { loading, writer } = storeToRefs(useWriterStore());
const { getImageUrls, articleEvaluation } = storeToRefs(useArticleStore());
const { saveDraft } = useWriterStore();

const { submitArticle, updateArticle, evaluateArticle } = useArticleStore();

const props = defineProps(["article", "draft"]);

const state = reactive({
	// editor: ClassicEditor,
	// editorData: "<p>Hello world!</p>",
	// editorConfig: {},
	editorConfig: {
		// basePath: "/ckeditor/",
		// ckeditorPath: "/ckeditor/ckeditor.js",
		// extraPlugins: "testPlugin",
		toolbar: [
			{ name: "utils", items: ["Source", "Scayt"] },
			{
				name: "styling",
				items: ["Bold", "Italic", "Underline", "Strike", "Format"],
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
	evaluation: props.article ? props.article.evaluation : "",
	isDisabled: props.article ? false : true,
	isPinned: props.article ? props.article.isPinned : false,
	isArchived: props.article ? props.article.isArchived : false,
	rating: props.article ? props.article.rating : 0,
	isReviewed: props.article ? props.article.isReviewed : false,
	numberOfRatings: props.article ? props.article.numberOfRatings : 0,
	btnText: props.article ? "Update" : "Create",
	imagePath: props.article
		? props.article.imageUrl
		: "../assets/images/1669432796163-181228722+missing_img.jpeg",
	awsImageUrls: [],
	showModal: false,
	showDeleteModal: false,
	user: useAuth0().user,
	isEvaluating: false,
	isCreating: false,
	isUpdating: false,
});
//
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
	var dom = document.createElement("DIV");
	dom.innerHTML = state.editorData;
	const formData = {
		title: state.title,
		bodyHTML: state.editorData,
		imageUrl: state.imagePath,
		writer: state.user.mongoId,
		moods: state.moods,
		tags: state.tags,
	};
	state.isCreating = true;
	await submitArticle(formData, dom.innerText);
	state.isCreating = false;
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
	var dom = document.createElement("DIV");
	dom.innerHTML = state.editorData;
	const formData = {
		title: state.title,
		bodyHTML: state.editorData,
		imageUrl: state.imagePath,
		writer: state.user.mongoId,
		moods: state.moods,
		tags: state.tags,
	};
	state.isUpdating = true;
	await updateArticle(props.article._id, formData, dom.innerText);
	state.isUpdating = false;
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
	//convert to text
	var dom = document.createElement("DIV");
	dom.innerHTML = state.editorData;
	state.isEvaluating = true;
	await evaluateArticle(dom.innerText);
	state.isEvaluating = false;
	state.evaluation = articleEvaluation;
};
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
