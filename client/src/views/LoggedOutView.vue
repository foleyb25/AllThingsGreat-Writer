<template>
    <div>
      <header class="mt-[55px]">
        <NavComponent></NavComponent>
      </header>
      <div class="flex flex-row">
        <button class="bg-blue-500" @click="login">Log in</button>
      </div>
      
    </div>
  </template>
  
  <script >
  import { useAuth0 } from '@auth0/auth0-vue';
  
  export default {
      name: "LoggedOut",
      setup() {
      const auth0 = useAuth0();
      
      return {
        isAuthenticated: auth0.isAuthenticated,
        isLoading: auth0.isLoading,
        user: auth0.user,
        login() {
          auth0.loginWithRedirect({
            appState: {
              target: "/"
            }
          });
        },
        logout() {
          auth0.logout({
            returnTo: import.meta.env.VITE_AUTH0_CALLBACK_URL+"/loggedout"
          });
        }
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