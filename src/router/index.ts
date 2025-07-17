import {
  createRouter,
  createWebHashHistory, // No cambiar a createWebHistory porque se rompe la navegación
  type RouteRecordRaw,
} from "vue-router";
import { toolsMenu } from "@/data/toolsMenu";

// Función para resolver componentes dinámicamente
const resolveComponent = (componentName: string) => {
  return () => import(`../components/${componentName}.vue`);
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Index.vue"),
  },
  // Generar rutas dinámicamente desde toolsMenu
  ...toolsMenu.map((tool) => ({
    path: tool.route,
    name: tool.route.replace("/", "").replace(/-/g, "_"),
    component: resolveComponent(tool.component),
  })),
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
