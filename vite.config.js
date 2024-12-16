import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
            manifest: true,
            buildDirectory: "build",
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // Konfigurasi ini membantu Vite memproses URL dalam template Vue
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
    build: {
        // Direktori output relatif terhadap root project
        outDir: "public/build",
        // Membersihkan direktori output sebelum build baru
        emptyOutDir: true,
        // Menghasilkan sourcemaps untuk debugging
        sourcemap: false,
        // Konfigurasi untuk manifest
        manifest: true,
        base: "/",
        rollupOptions: {
            // Konfigurasi output
            output: {
                manualChunks: {
                    // Memisahkan vendor code
                    vendor: ["vue"],
                },
            },
        },
    },
});
