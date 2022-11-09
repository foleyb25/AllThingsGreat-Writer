import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import 'flowbite'
import App from './App.vue'
import NavComponent from "./components/global/NavComponent.vue"
import SideNavComponent from "./components/global/SideNavComponent.vue"
import SideNavDrawerComponent from "./components/global/SideNavDrawerComponent.vue"
import AddBlogView from "./views/Blog/AddBlogView.vue";
import EditBlogView from "./views/Blog/EditBlogView.vue";
import BlogsView from "./views/Blog/BlogsView.vue";
import SearchScreenplayView from "./views/Screenplay/SearchScreenplayView.vue";
import ScreenplayDetailsView from "./views/Screenplay/ScreenplayDetailsView.vue";
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
            component: BlogsView,
        },
        {
            path: "/addBlog",
            name: "AddBlogView",
            component: AddBlogView,
        },
        {
            path: "/editBlog/:id",
            name: "EditBlogView",
            component: EditBlogView,
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
        {
            path: "/searchscreenplay",
            name: "SearchScreenplayView",
            component: SearchScreenplayView,
        },
        {
            path: "/searchscreenplay/:id",
            name: "ScreenplayDetailsView",
            component: ScreenplayDetailsView,
        },
    ]
})

createApp(App).use(router).use(CKEditor).component('NavComponent', NavComponent).component("SideNavComponent", SideNavComponent).component("SideNavDrawerComponent", SideNavDrawerComponent).mount('#app')
