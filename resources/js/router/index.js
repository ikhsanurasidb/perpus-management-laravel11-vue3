import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import AboutPage from "../components/AboutPage.vue";
import NotFoundPage from "../components/NotFoundPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/about",
            name: "about",
            component: AboutPage,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage,
        }
    ],
});

export default router;
