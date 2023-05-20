import { createApp } from 'vue'
import './style.css'
import 'flowbite'
import App from './App.vue'
import NavComponent from "./components/global/NavComponent.vue"
import SideNavComponent from "./components/global/SideNavComponent.vue"
import SideNavDrawerComponent from "./components/global/SideNavDrawerComponent.vue"
import CKEditor from '@mayasabha/ckeditor4-vue3'
// import  CKEditor from '@ckeditor/ckeditor5-vue'
import {auth0} from './auth0'
import router from './router/index.js'

import { createPinia } from 'pinia'




createApp(App)
    .use(createPinia())
    .use(router)
    .use(auth0)
    .use(CKEditor)
    .component('NavComponent', NavComponent)
    .component("SideNavComponent", SideNavComponent)
    .component("SideNavDrawerComponent", SideNavDrawerComponent)
    .mount('#app')
