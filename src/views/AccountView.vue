<template>
	<div class="w-full">
		<div class="bg-gray-100 w-full">
			<div class="bg-white p-8 rounded-md shadow-lg">
				<h1 class="text-2xl font-bold mb-4">Edit Profile</h1>
				<div class="flex flex-col">
					<label for="fullname" class="font-medium mb-1"
						>Full Name</label
					>
					<input
						id="fullname"
						type="text"
						class="border rounded-md py-2 px-3"
						v-model="writer.fullName"
					/>
				</div>
				<div class="flex flex-col">
					<label for="nickname" class="font-medium mb-1"
						>Nickname</label
					>
					<input
						id="nickname"
						type="text"
						class="border rounded-md py-2 px-3"
						v-model="writer.nickName"
					/>
				</div>
				<div class="flex flex-col">
					<label for="bio" class="font-medium mb-1">Bio</label>
					<textarea
						id="bio"
						rows="3"
						class="border rounded-md py-2 px-3"
						:placeholder="writer.bio"
						v-model="writer.bio"
					></textarea>
				</div>
				<div class="mb-4">
					<div
						class="w-[15%] mt-2 rounded-full border-2 border-gray-300 mb-2 overflow-hidden"
					>
						<div class="relative aspect-square">
							<img
								class="bg-cover w-full h-full object-cover"
								:src="writer.profileImageUrl"
								alt=""
							/>
						</div>
					</div>

					<input type="file" @click.prevent="showModal = true" />
				</div>
				<button
					type="submit"
					@click="saveProfile"
					class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
				>
					Save
				</button>
			</div>
			<Transition name="fade" appear>
				<ImagePickerModalComponent
					v-if="showModal"
					v-model:imageUrls="getProfileImageUrls"
					@close-modal="showModal = false"
					@select-image="selectImage"
				/>
			</Transition>
			<div class="flex flex-col justify-center items-center mt-6">
				<div
					id="profile-cropper-container"
					class="flex justify-center items-center aspect-square h-[500px] mr-2"
				>
					<cropper
						ref="circleCropper"
						:src="img.profileSrc"
						@change="onChangeProfile"
						:stencil-component="$options.components.CircleStencil"
						:stencil-props="{
							aspectRatio: 1 / 1,
						}"
						:resize-image="{ adjustStencil: false }"
						class="h-full w-full"
					/>
				</div>
				<DropFile
					@file-selected="setProfileImage"
					class="mt-8"
				></DropFile>
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
	</div>
</template>

<script>
import ImagePickerModalComponent from "../components/article/ImagePickerModalComponent.vue";
import { Cropper, CircleStencil, Preview } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import { defineComponent, ref, reactive } from "vue";
import DropFile from "../components/ImageManager/DropFile.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/article.store";
import { useWriterStore } from "../stores/writer.store";
import articleSrcImport from "@/assets/images/aspect_missing_img.jpeg";
import profileSrcImport from "@/assets/images/missing_img.jpeg";

export default defineComponent({
	components: {
		Cropper,
		CircleStencil,
		Preview,
		DropFile,
		ImagePickerModalComponent,
	},
	setup() {
		const { error, loading, writer, getProfileImageUrls } = storeToRefs(
			useWriterStore()
		);

		const { updateWriterInfo } = useWriterStore();

		const { pinia_uploadProfileImage } = useArticleStore();

		const showModal = ref(false);

		const selectImage = async (url) => {
			writer.value.profileImageUrl = url;
			showModal.value = false;
		};

		const saveProfile = async () => {
			await updateWriterInfo(writer);
		};

		const cropper = ref();
		const circleCropper = ref();

		var img = reactive({
			articleSrc: articleSrcImport,
			profileSrc: profileSrcImport,
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

		const setProfileImage = (path) => {
			img.profileSrc = path.path;
			img.profile = path.name;
		};

		const onChangeProfile = ({ coordinates, image }) => {
			state.result = {
				coordinates,
				image,
			};
		};

		const uploadProfileImage = async () => {
			if (img.profileSrc == "") return;
			if (circleCropper.value) {
				const { canvas } = circleCropper.value.getResult();
				await canvas.toBlob(async (blob) => {
					const result = await pinia_uploadProfileImage(
						blob,
						img.profileSrc,
						writer.value._id
					);
				}, "image/jpeg");
			}
		};

		return {
			uploadProfileImage,
			setProfileImage,
			selectImage,
			onChangeProfile,
			saveProfile,
			showModal,
			writer,
			loading,
			error,
			getProfileImageUrls,
			state,
			cropper,
			circleCropper,
			img,
		};
	},
});
</script>
