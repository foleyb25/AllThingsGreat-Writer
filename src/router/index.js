import HomeView from "../views/HomeView.vue";
import {createRouter, createWebHistory, useRoute} from 'vue-router'
import AddArticleView from "../views/Article/AddArticleView.vue";
import EditArticleView from "../views/Article/EditArticleView.vue";
import ArticlesView from "../views/Article/ArticlesView.vue";
import SearchScreenplayView from "../views/Screenplay/SearchScreenplayView.vue";
import ScreenplayDetailsView from "../views/Screenplay/ScreenplayDetailsView.vue";
import ImageManagerView from "../views/ImageManager/ImageManagerView.vue";
import CallbackView from "../views/Splash/Callback.vue";
import MetricsView from "../views/MetricsView.vue";
import DraftView from "../views/Article/DraftView.vue";
import TweetsView from "../views/TweetsView.vue";
import AccountsView from "../views/AccountsView.vue";
import { authGuard } from "@auth0/auth0-vue";
import {useWriterStore} from '../stores/writer.store.js'



//Check for writer in conjunction with auth0's auth guard. This will let the application
//know whether it needs to bring back the writer state (from mongoDB) and persist it through
// all the routes in the Pinia writer store. This function has to go above the route definitions.
const checkForWriter = () => {
    const {checkWriter} = useWriterStore()
    checkWriter()
}

const setDraft = () => {
    console.log("SET DRAFT")
}

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
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/editArticle/:id",
            name: "EditArticleView",
            component: EditArticleView,
            props: true,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/articles",
            name: "ArticlesView",
            component: ArticlesView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/draft/:id",
            name: "DraftView",
            component: DraftView,
            beforeEnter: [authGuard, checkForWriter],
            beforeRouteUpdate: [setDraft]
        },
        {
            path: "/metrics",
            name: "MetricsView",
            component: MetricsView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/tweets",
            name: "TweetsView",
            component: TweetsView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/account",
            name: "AccountView",
            component: AccountsView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/searchscreenplay",
            name: "SearchScreenplayView",
            component: SearchScreenplayView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/searchscreenplay/:id",
            name: "ScreenplayDetailsView",
            component: ScreenplayDetailsView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: "/imagemanager",
            name: "ImageManagerView",
            component: ImageManagerView,
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: '/callback',
            name: "Callback",
            component: CallbackView,
        }
    ]
})
  
export default router