import {createRouter, createWebHistory} from 'vue-router'
import CallbackView from "../views/Splash/Callback.vue";
import { authGuard } from "@auth0/auth0-vue";
import {useWriterStore} from '../stores/writer.store.js'
import {useArticleStore} from '../stores/article.store.js'

//Check for writer in conjunction with auth0's auth guard. This will let the application
//know whether it needs to bring back the writer state (from mongoDB) and persist it through
// all the routes in the Pinia writer store. This function has to go above the route definitions.
const checkForWriter = async () => {
    const {checkWriter} = useWriterStore()
    const loggedIn = await checkWriter()
    return loggedIn
}

const getArticlesByWriterId = async () => {
    const { retrieveArticlesByWriterId } = useArticleStore();
    retrieveArticlesByWriterId();
    return true
}

const getAllArticles = async () => {
    const { retrieveAllArticles} = useArticleStore();
    retrieveAllArticles();
    return true
}

const getSingleArticle = async (to, from) => {
    const id = to.params.id;
    const { retrieveSingleArticle} = useArticleStore();
    retrieveSingleArticle(id)
    return true
}

const getArticleImageUrls = async (to, from) => {
    const {writer} = useWriterStore();
    const { retrieveArticleImageUrls} = useArticleStore();
    retrieveArticleImageUrls(writer._id)
    return true
}

const getProfileImageUrls = async (to, from) => {
    const {writer, retrieveProfileImageUrls} = useWriterStore();
    retrieveProfileImageUrls(writer._id)
    return true
}

const router = createRouter({

    // history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "home",
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: "/addArticle",
            name: "AddArticleView",
            component: () => import('../views/Article/AddArticleView.vue'),
            beforeEnter: [authGuard, checkForWriter, getArticleImageUrls]
        },
        {
            path: "/editArticle/:id",
            name: "EditArticleView",
            component: () => import('../views/Article/EditArticleView.vue'),
            props: true,
            beforeEnter: [authGuard, checkForWriter, getSingleArticle]
        },
        {
            path: "/articles",
            name: "ArticlesView",
            component: () => import('../views/Article/ArticlesView.vue'),
            beforeEnter: [authGuard, checkForWriter, getArticlesByWriterId]
        },
        {
            path: "/draft/:id",
            name: "DraftView",
            component: () => import('../views/Article/DraftView.vue'),
            beforeEnter: [authGuard, checkForWriter],
        },
        // {
        //     path: "/metrics",
        //     name: "MetricsView",
        //     component: () => import('../views/MetricsView.vue'),
        //     beforeEnter: [authGuard, checkForWriter]
        // },
        // {
        //     path: "/tweets",
        //     name: "TweetsView",
        //     component: () => import('../views/TweetsView.vue'),
        //     beforeEnter: [authGuard, checkForWriter]
        // },
        {
            path: "/account",
            name: "AccountView",
            component: () => import('../views/AccountView.vue'),
            beforeEnter: [authGuard, checkForWriter, getProfileImageUrls]
        },
        // {
        //     path: "/searchscreenplay",
        //     name: "SearchScreenplayView",
        //     component: () => import('../views/Screenplay/SearchScreenplayView.vue'),
        //     beforeEnter: [authGuard, checkForWriter]
        // },
        // {
        //     path: "/searchscreenplay/:id",
        //     name: "ScreenplayDetailsView",
        //     component: () => import('../views/Screenplay/ScreenplayDetailsView.vue'),
        //     beforeEnter: [authGuard, checkForWriter]
        // },
        {
            path: "/imagemanager",
            name: "ImageManagerView",
            component: () => import('../views/ImageManager/ImageManagerView.vue'),
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: '/reviewArticles',
            name: 'ReviewArticlesView',
            component: () => import('../views/Article/ReviewArticlesView.vue'),
            beforeEnter: [authGuard, checkForWriter, getAllArticles]
        },
        {
            path: '/reviewArticle/:id',
            name: 'ReviewArticleView',
            props: true,
            component: () => import('../views/Article/ReviewArticleView.vue'),
            beforeEnter: [authGuard, checkForWriter, getSingleArticle]
        },
        {
            path: '/matchupAnalysis',
            name: 'MatchupAnalysis',
            component: () => import('../views/MatchupAnalysisView.vue'),
            beforeEnter: [authGuard, checkForWriter]
        },
        {
            path: '/callback',
            name: "Callback",
            component: CallbackView,
        },
    ]
})
  
export default router