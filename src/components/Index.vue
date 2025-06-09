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
} from "lucide-vue-next";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import Fieldset from "primevue/fieldset";

const router = useRouter();
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

      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Fieldset>
          <template #legend>
            <Code class="w-6 h-6 text-teal-500 mr-3 flex-shrink-0" />
            Codificador/Decodificador Base64
          </template>
          <RouterLink to="/base64" class="block p-6">
            <p class="text-surface-700 text-sm">
              Codifica y decodifica texto y archivos (imágenes) a/desde Base64.
            </p>
            <div
              class="mt-4 text-teal-600 hover:text-teal-800 font-medium flex items-center"
            >
              Ir a la herramienta
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <ShieldCheck class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
            Generador de cadenas criptográficas
          </template>
          <RouterLink to="/secure-string-generator" class="block p-6">
            <p class="text-surface-700 text-sm">
              Genera cadenas de texto seguras y aleatorias para contraseñas,
              tokens y más.
            </p>
            <div
              class="mt-4 text-green-600 hover:text-green-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Table class="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
            Generador de SQL desde Excel
          </template>
          <RouterLink to="/from-xls-to-sql" class="block p-6">
            @click.prevent="router.push('/from-xls-to-sql')" >
            <p class="text-surface-700 text-sm">
              Convierte datos de hojas de cálculo de Excel a consultas SQL de
              manera eficiente.
            </p>
            <div
              class="mt-4 text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              Ir al convertidor
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Calendar class="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
            Calendario de Colombia con festivos
          </template>
          <RouterLink to="/calendar" class="block p-6">
            <p class="text-surface-700 text-sm">
              Visualiza un calendario completo con los días festivos de Colombia
              incorporados y la opción de descargar los eventos a un archivo
              Excel.
            </p>
            <div
              class="mt-4 text-yellow-600 hover:text-yellow-800 font-medium flex items-center"
            >
              Ir al calendario
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <FileEdit class="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" />
            Generador de ecuaciones LaTeX
          </template>
          <RouterLink to="/latex-equation-generator" class="block p-6">
            <p class="text-surface-700 text-sm">
              Introduce una expresión matemática en LaTeX y obtén una imagen
              renderizada.
            </p>
            <div
              class="mt-4 text-orange-600 hover:text-orange-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Key class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
            Generador de UUIDs
          </template>
          <RouterLink to="/uuids-generator" class="block p-6">
            <p class="text-gray-700 text-sm">
              Crea identificadores únicos universales (UUIDs) versión 4 de forma
              rápida y sencilla.
            </p>
            <div
              class="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <QrCode class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
            Generador de códigos QR
          </template>
          <RouterLink to="/qr-code-generator" class="block p-6">
            <p class="text-gray-700 text-sm">
              Crea códigos QR para compartir enlaces, texto, contactos, etc.
            </p>
            <div
              class="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Palette class="w-6 h-6 text-pink-500 mr-3 flex-shrink-0" />
            Generador de Paletas de Color
          </template>
          <RouterLink to="/color-palette-generator" class="block p-6">
            <p class="text-gray-700 text-sm">
              Crea y personaliza paletas de colores para tus proyectos de
              diseño.
            </p>
            <div
              class="mt-4 text-pink-600 hover:text-pink-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Lock class="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
            Generador de Hashes
          </template>
          <RouterLink to="/hash-generator" class="block p-6">
            <p class="text-gray-700 text-sm">
              Genera hashes MD5, SHA-1 y SHA-256 de manera rápida y sencilla.
            </p>
            <div
              class="mt-4 text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <FileEdit class="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0" />
            Visor de Markdown
          </template>
          <RouterLink to="/markdown-generator" class="block p-6">
            <p class="text-gray-700 text-sm">
              Visualiza y edita texto en formato Markdown con vista previa en
              tiempo real.
            </p>
            <div
              class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            >
              Ir al visor
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Table class="w-6 h-6 text-emerald-500 mr-3 flex-shrink-0" />
            Excel a Markdown y HTML
          </template>
          <RouterLink to="/xls2md" class="block p-6">
            <p class="text-gray-700 text-sm">
              Convierte tablas de Excel a formato Markdown y HTML de forma
              rápida y sencilla.
            </p>
            <div
              class="mt-4 text-emerald-600 hover:text-emerald-800 font-medium flex items-center"
            >
              Ir al convertidor
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
        <Fieldset>
          <template #legend>
            <Search class="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
            Probador de expresiones regulares
          </template>
          <RouterLink to="/regex-tester" class="block p-6">
            <p class="text-gray-700 text-sm">
              Prueba y valida expresiones regulares en tiempo real. Resalta
              coincidencias, muestra grupos de captura y soporta flags comunes.
            </p>
            <div
              class="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Ir a la herramienta
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
      </main>
    </div>
  </div>
</template>
