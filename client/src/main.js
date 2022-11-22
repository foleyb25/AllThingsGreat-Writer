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
import LoggedOutView from "./views/LoggedOutView.vue";
import ImageManagerView from "./views/ImageManager/ImageManagerView.vue";
import LoadingView from "./views/Splash/LoadingView.vue";
import MetricsView from "./views/MetricsView.vue";
import TweetsView from "./views/TweetsView.vue";
import AccountsView from "./views/AccountsView.vue";
import CKEditor from '@mayasabha/ckeditor4-vue3'
import { createAuth0 } from '@auth0/auth0-vue'
import { authGuard } from "@auth0/auth0-vue";

const router = createRouter({

    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "home",
            component: BlogsView,
            beforeEnter: authGuard
        },
        {
            path: "/addBlog",
            name: "AddBlogView",
            component: AddBlogView,
            beforeEnter: authGuard
        },
        {
            path: "/editBlog/:id",
            name: "EditBlogView",
            component: EditBlogView,
            beforeEnter: authGuard
        },
        {
            path: "/blogs",
            name: "BlogsView",
            component: BlogsView,
            beforeEnter: authGuard
        },
        {
            path: "/metrics",
            name: "MetricsView",
            component: MetricsView,
            beforeEnter: authGuard
        },
        {
            path: "/tweets",
            name: "TweetsView",
            component: TweetsView,
            beforeEnter: authGuard
        },
        {
            path: "/account",
            name: "AccountView",
            component: AccountsView,
            beforeEnter: authGuard
        },
        {
            path: "/searchscreenplay",
            name: "SearchScreenplayView",
            component: SearchScreenplayView,
            beforeEnter: authGuard
        },
        {
            path: "/searchscreenplay/:id",
            name: "ScreenplayDetailsView",
            component: ScreenplayDetailsView,
            beforeEnter: authGuard
        },
        {
            path: "/imagemanager",
            name: "ImageManagerView",
            component: ImageManagerView,
            beforeEnter: authGuard
        },
        {
            path: "/loggedout",
            name: "LoggedOutView",
            component: LoggedOutView,
        },
        {
            path: '/loading',
            name: "LoadingView",
            component: LoadingView,
        }
    ]
})
createApp(App)
    .use(router)
    .use(CKEditor)
    .use(
        createAuth0({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
            redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
        })
    )
    .component('NavComponent', NavComponent)
    .component("SideNavComponent", SideNavComponent)
    .component("SideNavDrawerComponent", SideNavDrawerComponent)
    .mount('#app')
