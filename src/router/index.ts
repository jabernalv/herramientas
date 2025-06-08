import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Index from "../components/Index.vue";
import Base64 from "../components/Base64.vue";
import Calendario from "../components/Calendario.vue";
import GenerateSecureStrings from "../components/GenerateSecureStrings.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Index,
  },
  {
    path: "/base64",
    name: "base64",
    component: Base64,
  },
  {
    path: "/calendario",
    name: "calendario",
    component: Calendario,
  },
  {
    path: "/generate-secure-strings",
    name: "generate-secure-strings",
    component: GenerateSecureStrings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
