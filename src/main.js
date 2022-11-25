import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import './style.css'
import 'flowbite'
import App from './App.vue'
import NavComponent from "./components/global/NavComponent.vue"
import SideNavComponent from "./components/global/SideNavComponent.vue"
import SideNavDrawerComponent from "./components/global/SideNavDrawerComponent.vue"
import AddArticleView from "./views/Article/AddArticleView.vue";
import EditArticleView from "./views/Article/EditArticleView.vue";
import ArticlesView from "./views/Article/ArticlesView.vue";
import SearchScreenplayView from "./views/Screenplay/SearchScreenplayView.vue";
import ScreenplayDetailsView from "./views/Screenplay/ScreenplayDetailsView.vue";
import HomeView from "./views/HomeView.vue";
import ImageManagerView from "./views/ImageManager/ImageManagerView.vue";
import CallbackView from "./views/Splash/Callback.vue";
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
            component: HomeView,
        },
        {
            path: "/addArticle",
            name: "AddArticleView",
            component: AddArticleView,
            beforeEnter: authGuard
        },
        {
            path: "/editArticle/:id",
            name: "EditArticleView",
            component: EditArticleView,
            beforeEnter: authGuard
        },
        {
            path: "/articles",
            name: "ArticlesView",
            component: ArticlesView,
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
            path: '/callback',
            name: "Callback",
            component: CallbackView,
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