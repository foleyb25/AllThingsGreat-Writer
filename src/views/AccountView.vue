<template>
	<div class="w-full">
		<div class="bg-gray-100 w-full">
			<div class="bg-white p-8 rounded-md shadow-lg">
				<h1 class="text-2xl font-bold mb-4">Edit Profile</h1>
				<form class="space-y-4">
					<div class="flex flex-col">
						<label for="fullname" class="font-medium mb-1"
							>Full Name</label
						>
						<input
							id="fullname"
							type="text"
							class="border rounded-md py-2 px-3"
							v-model="fullname"
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
							v-model="nickname"
						/>
					</div>
					<div class="flex flex-col">
						<label for="bio" class="font-medium mb-1">Bio</label>
						<textarea
							id="bio"
							rows="3"
							class="border rounded-md py-2 px-3"
							v-model="bio"
						></textarea>
					</div>
					<button
						type="submit"
						class="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const fullName = ref("");
const nickname = ref("");
const bio = ref("");

const saveProfile = () => {
	// save profile logic here
};
</script>
