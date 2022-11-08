<template>
  <div>
    <header class="mt-[55px]">
      <NavComponent></NavComponent>
    </header>
    <div class="flex flex-row">
      <SideNavComponent class="w-1/4 hidden md:block"></SideNavComponent>
      <SideNavDrawerComponent class="md:hidden"></SideNavDrawerComponent>
      <main class="w-full max-h-screen h-screen bg-gray-50 overflow-scroll shadow-2xl">
        <router-view class="p-4"></router-view>
      </main>
    </div>
    
  </div>
</template>

<script >
import SideNavDrawerComponent from './components/global/SideNavDrawerComponent.vue';


export default {
    name: "App",
    components: { SideNavDrawerComponent }
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
