<template>
	<div>
		<header class="mt-[55px]">
			<NavComponent></NavComponent>
			<TransitionGroup>
				<NotificationBannerComponent
					color="bg-yellow-300"
					v-if="user && !user.email_verified && isAuthenticated"
				>
					Please verify your email</NotificationBannerComponent
				>
				<NotificationBannerComponent
					v-if="articleCreateSuccess"
					color="bg-green-300"
				>
					Article Created Successfully</NotificationBannerComponent
				>
				<NotificationBannerComponent
					v-if="articleUpdateSuccess"
					color="bg-green-300"
				>
					Article Updated Successfully</NotificationBannerComponent
				>
			</TransitionGroup>
		</header>

		<div class="flex flex-row">
			<SideNavComponent
				v-show="isAuthenticated"
				class="w-1/4 hidden md:block"
			></SideNavComponent>
			<SideNavDrawerComponent
				v-show="isAuthenticated"
				class="md:hidden"
			></SideNavDrawerComponent>

			<main
				class="w-full max-h-screen h-screen bg-gray-100 overflow-scroll shadow-2xl"
			>
				<div v-if="isLoading && isAuthenticated">
					Loading {{ isLoading }}
				</div>
				<router-view v-else class="p-4"></router-view>
			</main>
		</div>
	</div>
</template>

<script setup>
import { useAuth0 } from "@auth0/auth0-vue";
import SideNavDrawerComponent from "./components/global/SideNavDrawerComponent.vue";
import NotificationBannerComponent from "./components/global/NotificationBannerComponent.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "./stores/article.store";
import { onMounted } from "vue";
const { articleCreateSuccess, articleUpdateSuccess } = storeToRefs(
	useArticleStore()
);
const auth0 = useAuth0();
const isAuthenticated = auth0.isAuthenticated;
const isLoading = auth0.isLoading;
const user = auth0.user;

onMounted(() => {
	twttr.widgets.load();
});
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
