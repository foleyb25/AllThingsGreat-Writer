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
				{{ showModal }}
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
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useWriterStore } from "../stores/writer.store";
import { useArticleStore } from "../stores/article.store";
import ImagePickerModalComponent from "../components/article/ImagePickerModalComponent.vue";

const { error, loading, writer, getProfileImageUrls } = storeToRefs(
	useWriterStore()
);
const { updateWriterInfo } = useWriterStore();

const showModal = ref(false);

const selectImage = async (url) => {
	writer.value.profileImageUrl = url;
};

const saveProfile = async () => {
	await updateWriterInfo(writer);
};

const uploadProfileImage = async () => {
	if (img.profileSrc == "") return;
	if (circlestencil.value) {
		const { canvas } = circlestencil.value.getResult();
		await canvas.toBlob(async (blob) => {
			await pinia_uploadProfileImage(
				blob,
				img.profileSrc,
				writer.value._id
			);
		}, "image/jpeg");
	}
};
</script>
