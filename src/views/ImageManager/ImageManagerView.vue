<template>
	<div>
		<div class="flex flex-col justify-center items-center">
			<div
				id="cropper-container"
				class="flex justify-center items-center w-[45%] h-[500px] mr-2"
			>
				<cropper
					ref="cropper"
					:src="img.src"
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
			<DropFile @file-selected="setImage" class="mt-8"></DropFile>
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
				@click="uploadImage"
			>
				Upload
			</button>
		</div>
	</div>
</template>

<script>
import { Cropper, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { useAuth0 } from "@auth0/auth0-vue";
import { defineComponent, ref, reactive } from "vue";
import DropFile from "../../components/ImageManager/DropFile.vue";
import { imageUploader } from "../../services/apiRequest.service";

export default defineComponent({
	components: {
		Cropper,
		Preview,
		DropFile,
	},
	setup() {
		const cropper = ref();
		const { getAccessTokenSilently } = useAuth0();

		var img = reactive({
			src: "/src/assets/images/1669432796163-181228722+missing_img.jpeg",
			name: "",
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
		const setImage = (path) => {
			img.src = path.path;
			img.name = path.name;
		};

		function onChange({ coordinates, image }) {
			state.result = {
				coordinates,
				image,
			};
		}

		const uploadImage = async () => {
			try {
				if (img.name == "") return;
				if (cropper.value) {
					const { canvas } = cropper.value.getResult();
					canvas.toBlob((blob) => {
						imageUploader(getAccessTokenSilently, blob, img.name)
							.then((result) => {
								if (result.status >= 200 && result.status < 300)
									img.success = true;
								img.failure = false;
							})
							.catch((err) => {
								img.failure = true;
								img.success = false;
								img.failure_Message = err.message;
							});
					}, "image/jpeg");
				}
			} catch (error) {
				console.log(error);
			}
		};

		return {
			uploadImage,
			onChange,
			setImage,
			state,
			cropper,
			img,
			useAuth0,
		};
	},
});
</script>
