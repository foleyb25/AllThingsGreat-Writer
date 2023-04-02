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
				<button
					type="submit"
					@click="saveProfile"
					class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
				>
					Save
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { useWriterStore } from "../stores/writer.store";

const { error, loading, writer } = storeToRefs(useWriterStore());
const { updateWriterInfo } = useWriterStore();

const saveProfile = async () => {
	console.log(writer);
	await updateWriterInfo(writer);
};
</script>
