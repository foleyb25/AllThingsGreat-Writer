<template>
	<div class="w-full">
		<div class="flex flex-col justify-center items-center">
			<div
				id="cropper-container"
				class="flex justify-center items-center w-[45%] h-[500px] mr-2"
			>
				<cropper
					ref="cropper"
					:src="img.articleSrc"
					@change="onChangeArticle"
					:stencil-props="{
						handlers: {},
						moveable: false,
						scaleable: false,
						aspectRatio: 3 / 2,
					}"
					:resize-image="{
						adjustStencil: false,
					}"
					image-restriction="stencil"
					class="h-full w-full"
				/>
			</div>
			<DropFile @file-selected="setArticleImage" class="mt-8"></DropFile>
			<div
				v-if="img.success"
				class="flex justify-center items-center w-full bg-green-300 mt-4 border border-black border-solid rounded"
			>
				Successfully uploaded image
			</div>
			<div
				v-if="img.failure"
				class="flex justify-center items-center w-full bg-red-300 mt-4 border border-black border-solid rounded"
			>
				Failed: {{ img.failure_Message }}
			</div>
			<button
				class="w-24 h-12 bg-blue-300 border-solid border-black border rounded mt-4"
				@click="uploadArticleImage"
			>
				Upload
			</button>
		</div>
	</div>
</template>

<script>
import { Cropper, CircleStencil, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { defineComponent, ref, reactive } from "vue";
import DropFile from "../../components/ImageManager/DropFile.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../../stores/article.store";
import { useWriterStore } from "../../stores/writer.store";
import articleSrcImport from "@/assets/images/aspect_missing_img.jpeg";

const { writer } = storeToRefs(useWriterStore());

const { pinia_uploadArticleImage } = useArticleStore();

export default defineComponent({
	components: {
		Cropper,
		CircleStencil,
		Preview,
		DropFile,
	},
	setup() {
		const cropper = ref();
		const circleCropper = ref();

		var img = reactive({
			articleSrc: articleSrcImport,
			article: "",
			profile: "",
			success: false,
			failure: false,
			failure_Message: "",
		});

		var state = reactive({
			result: {
				coordinates: null,
				image: null,
			},
		});

		//This function is called from an emitter in the child, DropFile
		const setArticleImage = (path) => {
			img.articleSrc = path.path;
			img.article = path.name;
		};

		const onChangeArticle = ({ coordinates, image }) => {
			state.result = {
				coordinates,
				image,
			};
		};

		const uploadArticleImage = async () => {
			if (img.articleSrc == "") return;
			if (cropper.value) {
				const { canvas } = cropper.value.getResult();
				canvas.toBlob(async (blob) => {
					await pinia_uploadArticleImage(
						blob,
						img.articleSrc,
						writer.value._id
					);
				}, "image/jpeg");
			}
		};

		return {
			uploadArticleImage,
			setArticleImage,
			onChangeArticle,
			state,
			cropper,
			circleCropper,
			img,
		};
	},
});
</script>
