<script setup lang="ts">
import {
  Code,
  Calendar,
  ShieldCheck,
  Table,
  FileEdit,
  Key,
  QrCode,
  Palette,
  Lock,
  Search,
  Shield,
} from "lucide-vue-next";
import { RouterLink } from "vue-router";
import Fieldset from "primevue/fieldset";

const tools = [
  {
    icon: Code,
    iconColor: "text-teal-500",
    title: "Codificador/Decodificador Base64",
    route: "/base64",
    description:
      "Codifica y decodifica texto y archivos (imágenes) a/desde Base64.",
    linkText: "Ir a la herramienta",
    linkColor: "text-teal-600 hover:text-teal-800",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-green-500",
    title: "Generador de cadenas criptográficas",
    route: "/secure-string-generator",
    description:
      "Genera cadenas de texto seguras y aleatorias para contraseñas, tokens y más.",
    linkText: "Ir al generador",
    linkColor: "text-green-600 hover:text-green-800",
  },
  {
    icon: Table,
    iconColor: "text-purple-500",
    title: "Generador de SQL desde Excel",
    route: "/from-xls-to-sql",
    description:
      "Convierte datos de hojas de cálculo de Excel a consultas SQL de manera eficiente.",
    linkText: "Ir al convertidor",
    linkColor: "text-purple-600 hover:text-purple-800",
  },
  {
    icon: Calendar,
    iconColor: "text-yellow-500",
    title: "Calendario de Colombia con festivos",
    route: "/calendar",
    description:
      "Visualiza un calendario completo con los días festivos de Colombia incorporados y la opción de descargar los eventos a un archivo Excel.",
    linkText: "Ir al calendario",
    linkColor: "text-yellow-600 hover:text-yellow-800",
  },
  {
    icon: FileEdit,
    iconColor: "text-orange-500",
    title: "Generador de ecuaciones LaTeX",
    route: "/latex-equation-generator",
    description:
      "Introduce una expresión matemática en LaTeX y obtén una imagen renderizada.",
    linkText: "Ir al generador",
    linkColor: "text-orange-600 hover:text-orange-800",
  },
  {
    icon: Key,
    iconColor: "text-blue-500",
    title: "Generador de UUIDs",
    route: "/uuids-generator",
    description:
      "Crea identificadores únicos universales (UUIDs) versión 4 de forma rápida y sencilla.",
    linkText: "Ir al generador",
    linkColor: "text-blue-600 hover:text-blue-800",
  },
  {
    icon: QrCode,
    iconColor: "text-blue-500",
    title: "Generador de códigos QR",
    route: "/qr-code-generator",
    description:
      "Crea códigos QR para compartir enlaces, texto, contactos, etc.",
    linkText: "Ir al generador",
    linkColor: "text-blue-600 hover:text-blue-800",
  },
  {
    icon: Palette,
    iconColor: "text-pink-500",
    title: "Generador de Paletas de Color",
    route: "/color-palette-generator",
    description:
      "Crea y personaliza paletas de colores para tus proyectos de diseño.",
    linkText: "Ir al generador",
    linkColor: "text-pink-600 hover:text-pink-800",
  },
  {
    icon: Lock,
    iconColor: "text-purple-500",
    title: "Generador de Hashes",
    route: "/hash-generator",
    description:
      "Genera hashes MD5, SHA-1 y SHA-256 de manera rápida y sencilla.",
    linkText: "Ir al generador",
    linkColor: "text-purple-600 hover:text-purple-800",
  },
  {
    icon: FileEdit,
    iconColor: "text-indigo-500",
    title: "Visor de Markdown",
    route: "/markdown-generator",
    description:
      "Visualiza y edita texto en formato Markdown con vista previa en tiempo real.",
    linkText: "Ir al visor",
    linkColor: "text-indigo-600 hover:text-indigo-800",
  },
  {
    icon: Table,
    iconColor: "text-emerald-500",
    title: "Excel a Markdown y HTML",
    route: "/xls2md",
    description:
      "Convierte tablas de Excel a formato Markdown y HTML de forma rápida y sencilla.",
    linkText: "Ir al convertidor",
    linkColor: "text-emerald-600 hover:text-emerald-800",
  },
  {
    icon: Search,
    iconColor: "text-blue-500",
    title: "Probador de expresiones regulares",
    route: "/regex-tester",
    description:
      "Prueba y valida expresiones regulares en tiempo real. Resalta coincidencias, muestra grupos de captura y soporta flags comunes.",
    linkText: "Ir a la herramienta",
    linkColor: "text-blue-600 hover:text-blue-800",
  },
  {
    icon: Shield,
    iconColor: "text-red-500",
    title: "DRM Tools",
    route: "/drm-tools",
    description:
      "Herramientas para trabajar con DRM, incluyendo decodificador de PSSH para Widevine, PlayReady y FairPlay.",
    linkText: "Ir a la herramienta",
    linkColor: "text-red-600 hover:text-red-800",
  },
];
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-8">
        <h1
          class="text-4xl font-extrabold text-primary-700 mb-2 flex items-center justify-center"
        >
          🛠️ Caja de herramientas Web
        </h1>
        <p class="text-xl text-surface-600">
          Un conjunto de utilidades web para facilitar tus tareas diarias.
        </p>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Fieldset v-for="tool in tools" :key="tool.route">
          <template #legend>
            <component
              :is="tool.icon"
              :class="['w-6 h-6 mr-3 flex-shrink-0', tool.iconColor]"
            />
            {{ tool.title }}
          </template>
          <RouterLink :to="tool.route" class="block p-6">
            <p class="text-surface-700 text-sm">
              {{ tool.description }}
            </p>
            <div
              :class="['mt-4 font-medium flex items-center', tool.linkColor]"
            >
              {{ tool.linkText }}
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
      </main>
    </div>
  </div>
</template>
