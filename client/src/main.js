import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import 'flowbite'
import App from './App.vue'
import HomeView from "./views/HomeView.vue";
import NavComponent from "./components/global/NavComponent.vue"
import FooterCompoent from "./components/global/FooterComponent.vue"

const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        }
    ]
})

createApp(App).use(router).component('NavComponent', NavComponent).component('FooterComponent',FooterCompoent).mount('#app')
