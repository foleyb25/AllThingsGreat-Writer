import Vue from "vue";
import HomeView from "../views/HomeView.vue";
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    }
]

const router = new VueRouter({
    routes
  })
  
export default router