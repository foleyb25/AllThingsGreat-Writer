<template>
  <div>
    <header class="mt-[55px]">
      <NavComponent></NavComponent>
    </header>
    <div class="flex flex-row">
      <SideNavComponent v-show="isAuthenticated" class="w-1/4 hidden md:block"></SideNavComponent>
      <SideNavDrawerComponent v-show="isAuthenticated" class="md:hidden"></SideNavDrawerComponent>
      <main class="w-full max-h-screen h-screen bg-gray-50 overflow-scroll shadow-2xl">
        <div v-if="isLoading">Loading</div>
        <router-view v-else class="p-4"></router-view>
      </main>
    </div>
  </div>
</template>


<script >
  import { useAuth0 } from '@auth0/auth0-vue';
  import SideNavDrawerComponent from './components/global/SideNavDrawerComponent.vue';
  
  export default {
      name: "App",
      components: { SideNavDrawerComponent },
      setup() {
      const auth0 = useAuth0();
      
      return {
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading,
        user: auth0.user,
      }
    }
  }
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
</style>
