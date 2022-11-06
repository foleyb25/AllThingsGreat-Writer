<template>
  <div>
    <header class="mt-28">
      <NavComponent></NavComponent>
    </header>
    <main class="mt-28">
      <router-view></router-view>
    </main>
    <FooterComponent class="mt-28"></FooterComponent>
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
