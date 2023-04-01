<template>
	<div class="fixed z-50 inset-0 overflow-y-auto">
		<div class="flex items-center justify-center min-h-screen">
			<div class="bg-white rounded-lg shadow-lg p-8">
				<h2 class="text-lg font-bold mb-4">{{ title }}</h2>
				<p class="mb-6">{{ message }}</p>
				<div class="flex justify-end">
					<button
						class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
						@click="onCancel"
					>
						Cancel
					</button>
					<button
						class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
						@click="onConfirm"
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(["hideDeleteConfirmation, confirmDelete"]);

const onCancel = () => {
	emit("hideDeleteConfirmation");
};

const onConfirm = () => {
	emit("confirmDelete");
};
</script>
