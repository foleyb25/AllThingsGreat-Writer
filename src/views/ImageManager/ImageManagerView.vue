<template>
	<div class="w-full">
		<div class="flex flex-col justify-center items-center">
			<h1>Article Images</h1>
			<div
				id="cropper-container"
				class="flex justify-center items-center w-[45%] h-[500px] mr-2"
			>
				<cropper
					ref="cropper"
					:src="img.articleSrc"
					@change="onChange"
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
			<h1>Profile Images</h1>
			<div
				id="profile-cropper-container"
				class="flex justify-center items-center aspect-square h-[500px] mr-2"
			>
				<cropper
					ref="circleCropper"
					:src="img.profileSrc"
					@change="onChange"
					:stencil-component="$options.components.CircleStencil"
					:stencil-props="{
						aspectRatio: 1 / 1,
					}"
					:resize-image="{ adjustStencil: false }"
					class="h-full w-full"
				/>
			</div>
			<DropFile @file-selected="setProfileImage" class="mt-8"></DropFile>
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
				@click="uploadProfileImage"
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

const { writer } = storeToRefs(useWriterStore());

const { pinia_uploadArticleImage, pinia_uploadProfileImage } =
	useArticleStore();

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
			articleSrc:
				"../../assets/images/1669432796163-181228722+missing_img.jpeg",
			profileSrc:
				"../../assets/images/1669432796163-181228722+missing_img.jpeg",
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

		const setProfileImage = (path) => {
			img.profileSrc = path.path;
			img.profile = path.name;
		};

		function onChange({ coordinates, image }) {
			state.result = {
				coordinates,
				image,
			};
		}

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

		const uploadProfileImage = async () => {
			if (img.profileSrc == "") return;
			if (circleCropper.value) {
				const { canvas } = circleCropper.value.getResult();
				await canvas.toBlob(async (blob) => {
					await pinia_uploadProfileImage(
						blob,
						img.profileSrc,
						writer.value._id
					);
				}, "image/jpeg");
			}
		};

		return {
			uploadArticleImage,
			uploadProfileImage,
			onChange,
			setProfileImage,
			setArticleImage,
			state,
			cropper,
			circleCropper,
			img,
		};
	},
});
</script>
