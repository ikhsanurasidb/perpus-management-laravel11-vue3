import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    server: {
        https: true,
    },
    base:
        process.env.NODE_ENV === "production"
            ? "/build/"
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
