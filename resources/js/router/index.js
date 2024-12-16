import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/components/MenuView.vue";
import LoginView from "@/components/LoginView.vue";
import RegisterView from "@/components/RegisterView.vue";
import PegawaiView from "@/components/PegawaiView.vue";
import BarangView from "@/components/BarangView.vue";
import BukuView from "@/components/BukuView.vue";
import FormBukuView from "@/components/FormBukuView.vue";
import NotFoundPage from "@/components/NotFoundPage.vue";

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "login",
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            component: RegisterView,
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
            path: "/buku",
            name: "buku",
            component: BukuView,
        },
        {
            path: "/bukuview/:theisbn",
            name: "bukuview",
            component: FormBukuView,
        },
        {
            path: "/bukuview/:theisbn?",
            name: "bukuview",
            component: FormBukuView,
            props: true,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFoundPage,
        },
    ],
    base: "/",
});

export default router;
