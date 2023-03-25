<template>
	<div class="w-full h-12" aria-label="Sidebar">
		<div
			:class="
				color +
				' overflow-y-auto py-4 px-3 rounded flex justify-center items-center'
			"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(["color"]);
</script>
