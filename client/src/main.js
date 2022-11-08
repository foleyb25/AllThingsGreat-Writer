import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import 'flowbite'
import App from './App.vue'
import NavComponent from "./components/global/NavComponent.vue"
import SideNavComponent from "./components/global/SideNavComponent.vue"
import SideNavDrawerComponent from "./components/global/SideNavDrawerComponent.vue"
import AddBlogView from "./views/AddBlogView.vue";
import BlogsView from "./views/BlogsView.vue";
import MetricsView from "./views/MetricsView.vue";
import TweetsView from "./views/TweetsView.vue";
import AccountsView from "./views/AccountsView.vue";
import CKEditor from '@mayasabha/ckeditor4-vue3'

const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "home",
            component: AddBlogView,
        },
        {
            path: "/addBlog",
            name: "AddBlogView",
            component: AddBlogView,
        },
        {
            path: "/blogs",
            name: "BlogsView",
            component: BlogsView,
        },
        {
            path: "/metrics",
            name: "MetricsView",
            component: MetricsView,
        },
        {
            path: "/tweets",
            name: "TweetsView",
            component: TweetsView,
        },
        {
            path: "/account",
            name: "AccountView",
            component: AccountsView,
        },
    ]
})

createApp(App).use(router).use(CKEditor).component('NavComponent', NavComponent).component("SideNavComponent", SideNavComponent).component("SideNavDrawerComponent", SideNavDrawerComponent).mount('#app')
