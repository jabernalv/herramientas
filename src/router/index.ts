import {
  createRouter,
  createWebHashHistory, // No cambiar a createWebHistory porque se rompe la navegación
  type RouteRecordRaw,
} from "vue-router";
import Index from "@/components/Index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Index,
  },
  {
    path: "/code-formatter",
    name: "code-formatter",
    component: () => import("@/components/CodeFormatter.vue"),
  },
  {
    path: "/base64",
    name: "base64",
    component: () => import("@/components/Base64.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("@/components/Calendar.vue"),
  },
  {
    path: "/secure-string-generator",
    name: "secure-string-generator",
    component: () => import("@/components/SecureStringsGenerator.vue"),
  },
  {
    path: "/from-xls-to-sql",
    name: "from-xls-to-sql",
    component: () => import("@/components/FromXls2Sql.vue"),
  },
  {
    path: "/uuids-generator",
    name: "uuids-generator",
    component: () => import("@/components/UuidsGenerator.vue"),
  },
  {
    path: "/latex-equation-generator",
    name: "latex-equation-generator",
    component: () => import("@/components/LatexEquationGenerator.vue"),
  },
  {
    path: "/qr-code-generator",
    name: "qr-code-generator",
    component: () => import("@/components/QRCodeGenerator.vue"),
  },
  {
    path: "/markdown-generator",
    name: "markdown-generator",
    component: () => import("@/components/MarkdownViewer.vue"),
  },
  {
    path: "/xls2md",
    name: "xls2md",
    component: () => import("@/components/Xls2md.vue"),
  },
  {
    path: "/color-palette-generator",
    name: "color-palette-generator",
    component: () => import("@/components/ColorPaletteGenerator.vue"),
  },
  {
    path: "/hash-generator",
    name: "hash-generator",
    component: () => import("@/components/HashGenerator.vue"),
  },
  {
    path: "/regex-tester",
    name: "regex-tester",
    component: () => import("@/components/RegExTester.vue"),
  },
  {
    path: "/drm-tools",
    name: "drm-tools",
    component: () => import("../components/DrmTools.vue"),
  },
  {
    path: "/xml-json-to-excel",
    name: "xml-json-to-excel",
    component: () => import("@/components/XMLJson2Xlsx.vue"),
  },
  {
    path: "/gradient-generator",
    name: "gradient-generator",
    component: () => import("@/components/GradientGenerator.vue"),
  },
  {
    path: "/unit-converter",
    name: "unit-converter",
    component: () => import("@/components/UnitConverter.vue"),
  },
  {
    path: "/lorem-ipsum-generator",
    name: "lorem-ipsum-generator",
    component: () => import("@/components/LoremIpsumGenerator.vue"),
  },
  {
    path: "/date-time-converter",
    name: "date-time-converter",
    component: () => import("@/components/DateTimeConverter.vue"),
  },
  {
    path: "/email-signature-generator",
    name: "email-signature-generator",
    component: () => import("@/components/EmailSignatureGenerator.vue"),
  },
  {
    path: "/color-converter",
    name: "color-converter",
    component: () => import("@/components/ColorConverter.vue"),
  },
  {
    path: "/date-diff-calculator",
    name: "date-diff-calculator",
    component: () => import("@/components/DateDiffCalculator.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
