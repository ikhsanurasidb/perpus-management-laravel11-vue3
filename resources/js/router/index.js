import { createRouter, createWebHistory } from "vue-router";
import MenuView from "../components/MenuView.vue";
import LoginView from "@/components/LoginView.vue";
import PegawaiView from "../components/PegawaiView.vue";
import BarangView from "../components/BarangView.vue";
import NotFoundPage from "../components/NotFoundPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: LoginView,
        },
        {
            path: "/menu",
            name: "menu",
            component: MenuView,
        },
        {
            path: "/pegawai",
            name: "pegawai",
            component: PegawaiView,
        },
        {
            path: "/barang",
            name: "barang",
            component: BarangView,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundPage,
        },
    ],
});

export default router;
