<template>
	<div>Loading...</div>
</template>

<script>
import { onMounted } from "vue";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
	name: "Callback",
	setup() {
		const { handleRedirectCallback } = useAuth0();

		onMounted(async () => {
			await handleRedirectCallback();
			// Navigate the user to another route after authentication is complete
			this.$router.push("/");
		});
	},
};
</script>
