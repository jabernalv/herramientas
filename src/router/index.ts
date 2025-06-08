import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Index from "../components/Index.vue";
import Base64 from "../components/Base64.vue";
import Calendario from "../components/Calendario.vue";
import GenerateSecureStrings from "../components/GenerateSecureStrings.vue";
import FromXls2Sql from "../components/FromXls2Sql.vue";
import GenerateUuids from "../components/GenerateUuids.vue";
import LatexOnline from "../components/LatexOnline.vue";
import QRCode from "@/components/QRCode.vue";

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
  {
    path: "/from-xls-to-sql",
    name: "from-xls-to-sql",
    component: FromXls2Sql,
  },
  {
    path: "/generate-uuids",
    name: "generate-uuids",
    component: GenerateUuids,
  },
  {
    path: "/latex-online",
    name: "latex-online",
    component: LatexOnline,
  },
  {
    path: "/qr",
    name: "qr",
    component: QRCode,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
