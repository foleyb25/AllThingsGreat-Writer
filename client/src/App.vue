<template>
  <div>
    <header class="mt-[72px]">
      <NavComponent></NavComponent>
    </header>
    <div class="flex flex-row">
      <SideNavComponent class="w-1/4"></SideNavComponent>
      <main class="w-3/4 max-h-screen h-screen bg-gray-50 overflow-scroll shadow-2xl">
        <router-view></router-view>
      </main>
    </div>
    
  </div>
</template>

<script>

export default {
    name: "App",
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
