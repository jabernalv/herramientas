<script setup lang="ts">
import { ref, watch } from "vue";
import { marked } from "marked";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import { BookOpen, Eye, Edit3 } from "lucide-vue-next";
import Asciidoctor from "@asciidoctor/core";
import html2pdf from "html2pdf.js";

const markdownText = ref("");
const htmlOutput = ref("");
const selectedFormat = ref("markdown");
const asciidoctor = Asciidoctor();
const printableRef = ref<HTMLElement | null>(null);

const formats = [
  { name: "Markdown", value: "markdown" },
  { name: "AsciiDoc", value: "asciidoc" },
];

const convertToHtml = async () => {
  if (selectedFormat.value === "markdown") {
    htmlOutput.value = await marked(markdownText.value);
  } else if (selectedFormat.value === "asciidoc") {
    try {
      htmlOutput.value = asciidoctor.convert(markdownText.value);
    } catch (error) {
      htmlOutput.value =
        '<p class="text-red-500">Error al convertir AsciiDoc.</p>';
    }
  }
};

// Convierte automáticamente cuando el texto cambia
watch(
  [markdownText, selectedFormat],
  () => {
    convertToHtml();
  },
  { immediate: true }
);

const downloadSource = () => {
  const text = markdownText.value;
  const format = selectedFormat.value;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = format === "markdown" ? "document.md" : "document.adoc";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadPDF = async () => {
  if (!printableRef.value) return;

  // Copiar contenido visible al contenedor sin scroll
  printableRef.value.innerHTML = htmlOutput.value;

  // Mostrar temporalmente para permitir el renderizado
  printableRef.value.classList.remove("hidden");

  const opt = {
    margin: 0.5,
    filename: "documento.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  try {
    await html2pdf().set(opt).from(printableRef.value).save();
  } finally {
    // Ocultar nuevamente después de generar el PDF
    printableRef.value.classList.add("hidden");
  }
};
</script>

<template>
  <div>
    <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
      <nav class="text-sm" aria-label="Miga de pan">
        <ol class="list-none p-0 inline-flex space-x-2">
          <li class="flex items-center">
            <router-link to="/" class="text-blue-500 hover:text-blue-700">
              <i class="inline-block w-4 h-4 mr-1 align-text-bottom"></i>
              Herramientas
            </router-link>
          </li>
          <li>
            <i class="inline-block w-4 h-4 text-gray-400 align-text-bottom"></i>
          </li>
          <li class="text-gray-700">Visor de Markdown y AsciiDoc</li>
        </ol>
      </nav>
    </div>

    <main class="w-full flex flex-col items-center justify-center">
      <div
        class="w-full sm:w-[95vw] lg:w-[90vw] max-w-none bg-white rounded-xl shadow-2xl p-6"
      >
        <div class="flex items-center mb-6 gap-3">
          <BookOpen class="w-8 h-8 text-indigo-600" />
          <h1
            class="text-3xl font-bold text-indigo-700 flex items-center gap-2"
          >
            Vista en tiempo real
            <Eye class="w-6 h-6 text-indigo-500" />
          </h1>
          <div class="ml-auto flex items-center gap-2">
            <Select
              v-model="selectedFormat"
              :options="formats"
              optionLabel="name"
              optionValue="value"
              class="w-48"
              @change="convertToHtml"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Entrada -->
          <div class="w-full md:w-1/2 flex flex-col">
            <label
              for="input-area"
              class="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2"
            >
              <Edit3 class="w-5 h-5 text-indigo-400" />
              Escribe tu texto
            </label>
            <Textarea
              v-model="markdownText"
              @input="convertToHtml"
              class="resize-none h-72 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 p-4 text-gray-800 bg-indigo-50 shadow-inner transition"
              :placeholder="
                selectedFormat === 'markdown'
                  ? '## Escribe aquí tu *Markdown*...'
                  : 'Escribe aquí tu AsciiDoc...'
              "
            />

            <Button
              @click="downloadSource"
              icon="pi pi-download"
              class="mt-4 w-fit"
              severity="info"
              label="Descargar archivo fuente"
            />
          </div>

          <!-- Vista previa -->
          <div class="w-full md:w-1/2 flex flex-col">
            <label
              class="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2"
            >
              <Eye class="w-5 h-5 text-indigo-400" />
              Vista previa
            </label>
            <div
              class="prose prose-indigo bg-indigo-50 h-72 overflow-y-auto p-4 rounded-lg shadow-inner border border-indigo-100 transition"
              v-html="htmlOutput"
            ></div>

            <Button
              @click="downloadPDF"
              icon="pi pi-download"
              class="mt-4 w-fit"
              severity="info"
              label="Descargar PDF"
            />
          </div>
        </div>
      </div>
    </main>

    <!-- Div oculto para generar PDF -->
    <div
      ref="printableRef"
      class="prose prose-indigo p-6 bg-white hidden"
    ></div>
  </div>
</template>

<style>
.prose {
  max-width: none;
}
</style>
