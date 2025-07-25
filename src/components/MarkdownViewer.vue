<script setup lang="ts">
import { ref, watch } from "vue";
import { marked } from "marked";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  BookOpen,
  Eye,
  Edit3,
  Settings,
  FileText,
  Download,
} from "lucide-vue-next";
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
      const converted = asciidoctor.convert(markdownText.value);
      htmlOutput.value =
        typeof converted === "string" ? converted : converted.toString();
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
    <BreadcrumbNav />

    <main class="w-full px-4 pb-4 mb-16">
      <div class="w-full bg-white rounded-xl shadow-2xl p-4 md:p-6">
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-3"
        >
          <div class="flex items-center gap-2">
            <BookOpen class="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
            <h1 class="text-xl md:text-3xl font-bold text-indigo-700">
              Vista en tiempo real
            </h1>
            <Eye class="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
          </div>
          <div class="w-full sm:w-auto sm:ml-auto">
            <InputGroup>
              <InputGroupAddon>
                <Settings class="w-4 h-4 text-indigo-400" />
              </InputGroupAddon>
              <Select
                v-model="selectedFormat"
                :options="formats"
                optionLabel="name"
                optionValue="value"
                class="w-full sm:w-48"
                @change="convertToHtml"
              />
            </InputGroup>
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          <!-- Entrada -->
          <div class="w-full md:w-1/2 flex flex-col">
            <label
              for="input-area"
              class="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-700 mb-2"
            >
              <Edit3 class="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              Escribe tu texto
            </label>
            <InputGroup class="flex-1">
              <InputGroupAddon>
                <FileText class="w-4 h-4 text-indigo-400" />
              </InputGroupAddon>
              <Textarea
                id="input-area"
                v-model="markdownText"
                @input="convertToHtml"
                class="flex-1 resize-none h-64 md:h-72 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-400 p-4 text-gray-800 bg-indigo-50 shadow-inner transition text-sm md:text-base"
                :placeholder="
                  selectedFormat === 'markdown'
                    ? '## Escribe aquí tu *Markdown*...'
                    : 'Escribe aquí tu AsciiDoc...'
                "
              />
            </InputGroup>

            <Button
              @click="downloadSource"
              class="mt-4 w-full sm:w-fit"
              severity="info"
              label="Descargar archivo fuente"
            >
              <template #icon>
                <Download class="w-4 h-4 mr-2" />
              </template>
            </Button>
          </div>

          <!-- Vista previa -->
          <div class="w-full md:w-1/2 flex flex-col">
            <label
              class="flex items-center gap-2 text-base md:text-lg font-semibold text-gray-700 mb-2"
            >
              <Eye class="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
              Vista previa
            </label>
            <div
              class="prose prose-sm md:prose-base prose-indigo bg-indigo-50 h-64 md:h-72 overflow-y-auto p-4 rounded-lg shadow-inner border border-indigo-100 transition"
              v-html="htmlOutput"
            ></div>

            <Button
              @click="downloadPDF"
              class="mt-4 w-full sm:w-fit"
              severity="info"
              label="Descargar PDF"
            >
              <template #icon>
                <Download class="w-4 h-4 mr-2" />
              </template>
            </Button>
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

:deep(.p-inputtext) {
  width: 100%;
}

/* Ajustes para el contenido de markdown en móvil */
.prose-sm {
  font-size: 0.875rem;
}

.prose-sm img {
  max-width: 100%;
  height: auto;
}

/* Ajustes para el Select de PrimeVue */
:deep(.p-dropdown) {
  width: 100%;
}

@media (min-width: 640px) {
  :deep(.p-dropdown) {
    width: 12rem;
  }
}

/* Ajustes para los botones en móvil */
:deep(.p-button) {
  white-space: nowrap;
}

@media (max-width: 640px) {
  :deep(.p-button) {
    width: 100%;
  }

  :deep(.p-button-label) {
    width: 100%;
    text-align: center;
  }
}
</style>
