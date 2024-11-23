import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    server: {
        https: true,
    },
    base:
        process.env.NODE_ENV === "production"
            ? "https://perpus-management-laravel11-vue3-ikhsanurasids-projects.vercel.app/"
            : "/",
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        vue(),
    ],
});
