<template>
	<div>
		<!-- Modal trigger button -->
		<button @click="showModal = true">Select an image</button>

		<!-- Modal component -->
		<div
			class="fixed z-50 inset-0 bg-black bg-opacity-60 flex items-center justify-center"
			style="backdrop-filter: blur(5px)"
		>
			<div
				class="modal-content shadow-2xl bg-gradient-to-r from-[#000] to-[#555] rounded w-4/5 max-w-[500px] p-[20px]"
			>
				<div
					class="text-white mb-8 flex flex-row items-between justify-between w-100"
				>
					<h2>Select an image</h2>
					<span
						class="close-button cursor-pointer"
						@click="$emit('closeModal')"
						>&times;</span
					>
				</div>
				<div class="max-h-[500px] overflow-y-auto">
					<ul
						class="grid gap-4 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
					>
						<!-- Image list -->
						<li
							v-for="(url, index) in props.imageUrls"
							:key="index"
						>
							<img
								class="cursor-pointer w-[20vw]"
								:src="url"
								@click="selectImage(url)"
							/>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(["imageUrls"]);
const emit = defineEmits(["selectImage"]);

const selectImage = (url) => {
	// Handle image selection
	const extension = url.slice(url.lastIndexOf(".") + 1);

	if (
		extension.toLowerCase() == "jpg" ||
		extension.toLowerCase() == "png" ||
		extension.toLowerCase() == "gif" ||
		extension.toLowerCase() == "jpeg"
	) {
		emit("selectImage", url);
	} else {
		return false;
	}
};
</script>
