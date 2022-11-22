<template>
<nav class="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
  <a href="https://flowbite.com/" class="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo">
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ATGU</span>
  </a>
  <div class="flex justify-center items-center md:order-2">
    <div>
      <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="w-8 h-8 bg-gray-300 rounded-full overflow-hidden" type="button">
        <img  class="z-[-1]" :src="user.picture" alt="">
      </button>
    </div>
    <!-- Dropdown menu -->
    <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
          <li v-if="isAuthenticated">
            <LogoutButtonComponent class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"></LogoutButtonComponent>
          </li>
          <li v-if="!isAuthenticated">
            <LoginButtonComponent class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"></LoginButtonComponent>
          </li>
        </ul>
    </div>
    <!-- drawer init and show -->
    <button data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden md:flex md:w-auto md:order-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button> 
  </div>
  <div v-if="user.given_name !== undefined">
    Welcome, {{user.given_name}}
  </div>
  </div>
</nav>
</template>

<script >
  import LoginButtonComponent from '../buttons/LoginButtonComponent.vue';
  import LogoutButtonComponent from '../buttons/LogoutButtonComponent.vue'
  import { useAuth0 } from '@auth0/auth0-vue';

  export default {
      name: "NavComponent",
      components: {LoginButtonComponent, LogoutButtonComponent},
      setup() {
      const {isAuthenticated} = useAuth0();
      const {isLoading} = useAuth0();
      const {user} = useAuth0();
      
      return {
        isAuthenticated: isAuthenticated,
        isLoading: isLoading,
        user: user,
      }
    }
  }
  </script>