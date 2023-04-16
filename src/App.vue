<template>
	<div>
		<header class="mt-[55px]">
			<NavComponent />
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
				class="w-full max-h-screen h-screen overflow-scroll shadow-2xl"
			>
				<router-view
					class="p-4 bg-gradient-to-r from-primary-dark to-primary-teal"
					v-slot="{ Component }"
				>
					<NotificationBannerComponent
						class="fixed z-50 w-[90%]"
						v-if="notification"
						:color="notification.color"
					>
						{{ notification.message }}</NotificationBannerComponent
					>
					<Transition name="route">
						<component :is="Component" />
					</Transition>
				</router-view>
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
import { useGlobalNotificationStore } from "./stores/globalNotification.store";
import { onMounted, ref } from "vue";

const { notification } = storeToRefs(useGlobalNotificationStore());

const { isAuthenticated, isLoading, user } = useAuth0();
const isAuthenticatedRef = ref(isAuthenticated);
const isLoadingRef = ref(isLoading);

onMounted(() => {
	// perform any necessary setup logic here
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

.route-move, /* apply transition to moving elements */
.route-enter-active,
.route-leave-active {
	transition: all 0.5s ease-in-out;
}

.route-enter-from,
.route-leave-to {
	/* opacity: 0; */
	transform: translateX(100%);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.route-leave-active {
	position: absolute;
}
</style>
