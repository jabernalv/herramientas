import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
    base: "/herramientas/",
    plugins: [vue(), tailwindcss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    optimizeDeps: {
        exclude: ["argon2-browser"],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    "vue-vendor": ["vue", "vue-router"],
                    primevue: ["primevue"],
                    xlsx: ["xlsx"],
                },
            },
        },
        target: "esnext",
    },
    server: {
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "require-corp",
        },
    },
});
