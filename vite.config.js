import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// Ajusta este valor si tu repositorio se llama diferente
var repoName = "herramientas-trading";
export default defineConfig({
    base: "/".concat(repoName, "/"),
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
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
    },
});
