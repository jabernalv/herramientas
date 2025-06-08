import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Index from "../components/Index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Index,
  },
  {
    path: "/base64",
    name: "base64",
    component: () => import("../components/Base64.vue"),
  },
  {
    path: "/calendario",
    name: "calendario",
    component: () => import("../components/Calendario.vue"),
  },
  {
    path: "/generate-secure-strings",
    name: "generate-secure-strings",
    component: () => import("../components/GenerateSecureStrings.vue"),
  },
  {
    path: "/from-xls-to-sql",
    name: "from-xls-to-sql",
    component: () => import("../components/FromXls2Sql.vue"),
  },
  {
    path: "/generate-uuids",
    name: "generate-uuids",
    component: () => import("../components/GenerateUuids.vue"),
  },
  {
    path: "/latex-online",
    name: "latex-online",
    component: () => import("../components/LatexOnline.vue"),
  },
  {
    path: "/qr",
    name: "qr",
    component: () => import("@/components/QRCode.vue"),
  },
  {
    path: "/visor-markdown",
    name: "visor-markdown",
    component: () => import("../components/VisorMarkdown.vue"),
  },
  {
    path: "/xls2md",
    name: "xls2md",
    component: () => import("../components/Xls2md.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
