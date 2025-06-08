<script setup lang="ts">
import { Wrench, Code, Calendar, ShieldCheck, Table } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-8">
        <h1
          class="text-4xl font-extrabold text-primary-700 mb-2 flex items-center justify-center"
        >
          <Wrench class="w-8 h-8 mr-2" />
          🛠️ Caja de Herramientas Web
        </h1>
        <p class="text-xl text-surface-600">
          Un conjunto de utilidades web para facilitar tus tareas diarias.
        </p>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Base64 Card -->
        <div
          class="bg-surface-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <a href="#" class="block p-6" @click.prevent="router.push('/base64')">
            <div class="flex items-center mb-4">
              <Code class="w-6 h-6 text-teal-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">
                Codificador/Decodificador Base64
              </h2>
            </div>
            <p class="text-surface-700 text-sm">
              Codifica y decodifica texto y archivos (imágenes) a/desde Base64.
            </p>
            <div
              class="mt-4 text-teal-600 hover:text-teal-800 font-medium flex items-center"
            >
              Ir a la herramienta
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </a>
        </div>

        <!-- Secure Strings Card -->
        <div
          class="bg-surface-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <a
            href="#"
            class="block p-6"
            @click.prevent="router.push('/generate-secure-strings')"
          >
            <div class="flex items-center mb-4">
              <ShieldCheck class="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">
                Generador de cadenas criptográficas
              </h2>
            </div>
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
          </a>
        </div>

        <!-- Excel to SQL Card -->
        <div
          class="bg-surface-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <a
            href="#"
            class="block p-6"
            @click.prevent="router.push('/from-xls-to-sql')"
          >
            <div class="flex items-center mb-4">
              <Table class="w-6 h-6 text-purple-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">
                Generador de SQL desde Excel
              </h2>
            </div>
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
          </a>
        </div>

        <!-- Calendar Card -->
        <div
          class="bg-surface-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <a
            href="#"
            class="block p-6"
            @click.prevent="router.push('/calendario')"
          >
            <div class="flex items-center mb-4">
              <Calendar class="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">
                Calendario de Colombia con festivos
              </h2>
            </div>
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
          </a>
        </div>

        <!-- LaTeX Online Card -->
        <div
          class="bg-surface-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <RouterLink to="/latex-online" class="block p-6">
            <div class="flex items-center mb-4">
              <i
                class="pi pi-file-edit w-6 h-6 text-orange-500 mr-3 flex-shrink-0"
              ></i>
              <h2 class="text-xl font-semibold text-surface-900">
                Generador de ecuaciones LaTeX
              </h2>
            </div>
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
        </div>

        <!-- UUID Card -->
        <div
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <RouterLink to="/generate-uuids" class="block p-6">
            <div class="flex items-center mb-4">
              <i class="pi pi-key w-6 h-6 text-blue-500 mr-3 flex-shrink-0"></i>
              <h2 class="text-xl font-semibold text-gray-800">
                Generador de UUIDs
              </h2>
            </div>
            <p class="text-gray-700 text-sm">
              Crea identificadores únicos universales (UUIDs) versión 4 de forma
              rápida y sencilla.
            </p>
            <div class="mt-4 text-blue-600 hover:text-blue-800 font-medium">
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </div>

        <!-- QR Code Card -->
        <div
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <RouterLink to="/qr" class="block p-6">
            <div class="flex items-center mb-4">
              <i class="pi pi-key w-6 h-6 text-blue-500 mr-3 flex-shrink-0"></i>
              <h2 class="text-xl font-semibold text-gray-800">
                Generador de códigos QR
              </h2>
            </div>
            <p class="text-gray-700 text-sm">
              Crea códigos QR para compartir enlaces, texto, contactos, etc.
            </p>
            <div class="mt-4 text-blue-600 hover:text-blue-800 font-medium">
              Ir al generador
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </div>

        <!-- Markdown Viewer Card -->
        <div
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
        >
          <RouterLink to="/visor-markdown" class="block p-6">
            <div class="flex items-center mb-4">
              <i
                class="pi pi-file-edit w-6 h-6 text-indigo-500 mr-3 flex-shrink-0"
              ></i>
              <h2 class="text-xl font-semibold text-gray-800">
                Visor de Markdown
              </h2>
            </div>
            <p class="text-gray-700 text-sm">
              Visualiza y edita texto en formato Markdown con vista previa en
              tiempo real.
            </p>
            <div class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
              Ir al visor
              <i class="pi pi-arrow-right inline-block w-4 h-4 ml-1"></i>
            </div>
          </RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>
