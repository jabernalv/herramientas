<script setup lang="ts">
import { ref } from "vue";
import { marked } from "marked";
import { read, utils } from "xlsx";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { useToast } from "primevue/usetoast";
import {
  Table,
  FileSpreadsheet,
  FileEdit,
  FileText,
  ArrowRight,
  Copy,
} from "lucide-vue-next";

const toast = useToast();
const pasteData = ref("");
const markdownOutput = ref("");
const htmlOutput = ref("");

const processData = (data: string[][]) => {
  if (!data || data.length === 0) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se detectaron datos válidos",
      life: 3000,
    });
    return;
  }

  // Generar Markdown
  const markdownRows = data.map((row) => `| ${row.join(" | ")} |`);
  const headerSeparator = `| ${data[0].map(() => "---").join(" | ")} |`;
  markdownOutput.value = [
    markdownRows[0],
    headerSeparator,
    ...markdownRows.slice(1),
  ].join("\n");

  // Generar HTML
  const htmlRows = data.map((row, index) => {
    const cells = row
      .map((cell) => (index === 0 ? `<th>${cell}</th>` : `<td>${cell}</td>`))
      .join("");
    return `  <tr>\n    ${cells}\n  </tr>`;
  });
  htmlOutput.value = `<table>\n  <thead>\n${
    htmlRows[0]
  }\n  </thead>\n  <tbody>\n${htmlRows
    .slice(1)
    .join("\n")}\n  </tbody>\n</table>`;
};

const handleFileUpload = async (event: any) => {
  const file = event.files[0];
  if (!file) return;

  try {
    const buffer = await file.arrayBuffer();
    const workbook = read(buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
    processData(data);
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Archivo procesado correctamente",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al procesar el archivo",
      life: 3000,
    });
  }
};

const handlePasteData = () => {
  const rows = pasteData.value
    .trim()
    .split("\n")
    .map((row) => row.split("\t"));
  processData(rows);
};

const copyToClipboard = async (text: string, type: "markdown" | "html") => {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: `${
        type === "markdown" ? "Markdown" : "HTML"
      } copiado al portapapeles`,
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al copiar al portapapeles",
      life: 3000,
    });
  }
};
</script>

<template>
  <div>
    <BreadcrumbNav />

    <div class="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-6">
        <h1
          class="text-3xl font-extrabold text-blue-700 mb-2 flex items-center justify-center"
        >
          <Table class="w-8 h-8 mr-2" />
          Convertidor de Excel a Markdown y HTML
        </h1>
        <p class="text-lg text-gray-600">
          Convierte datos desde archivos Excel o pegado directo a formato
          Markdown y Tabla HTML.
        </p>
      </header>

      <main class="grid grid-cols-1 gap-6 mb-16">
        <!-- Panel de entrada -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FileSpreadsheet class="w-5 h-5 mr-2" />
            Datos de Entrada
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            <!-- Carga de archivo -->
            <div class="md:col-span-1">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                Cargar archivo Excel
              </h3>
              <FileUpload
                mode="basic"
                :auto="true"
                accept=".xlsx,.xls"
                :maxFileSize="5000000"
                @select="handleFileUpload"
                :customUpload="true"
                chooseLabel="Subir archivo Excel"
              />
            </div>

            <!-- Pegado de datos -->
            <div class="md:col-span-4">
              <h3 class="text-lg font-semibold text-gray-700 mb-3">
                Pegar datos desde Excel/CSV
              </h3>
              <InputGroup>
                <InputGroupAddon>
                  <FileText class="w-4 h-4 text-gray-500" />
                </InputGroupAddon>
                <Textarea
                  v-model="pasteData"
                  rows="10"
                  class="w-full"
                  placeholder="Pega los datos aquí (separados por tabulaciones para Excel o comas para CSV)"
                />
              </InputGroup>
            </div>
          </div>
          <Button
            @click="handlePasteData"
            class="mt-4"
            severity="success"
            label="Convertir"
          >
            <template #icon>
              <ArrowRight class="w-4 h-4" />
            </template>
          </Button>
        </div>

        <!-- Panel de resultados -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center"
          >
            <FileEdit class="w-5 h-5 mr-2" />
            Resultados Markdown y HTML
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Salida Markdown -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-gray-700 text-sm font-bold">
                  Texto Markdown (para copiar y pegar):
                </label>
                <Button
                  @click="copyToClipboard(markdownOutput, 'markdown')"
                  text
                  size="small"
                  label="Copiar"
                >
                  <template #icon>
                    <Copy class="w-4 h-4" />
                  </template>
                </Button>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <FileText class="w-4 h-4 text-gray-500" />
                </InputGroupAddon>
                <Textarea
                  v-model="markdownOutput"
                  rows="10"
                  class="w-full"
                  readonly
                  placeholder="El Markdown generado aparecerá aquí"
                />
              </InputGroup>
            </div>

            <!-- Vista previa Markdown -->
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Vista Previa Markdown:
              </label>
              <div
                class="prose shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight h-[242px] overflow-auto"
                v-html="marked(markdownOutput)"
              ></div>
            </div>
          </div>

          <!-- Salida HTML -->
          <div class="mt-4">
            <div class="flex justify-between items-center mb-2">
              <label class="block text-gray-700 text-sm font-bold">
                Tabla HTML (para copiar y pegar):
              </label>
              <Button
                @click="copyToClipboard(htmlOutput, 'html')"
                text
                size="small"
                label="Copiar"
              >
                <template #icon>
                  <Copy class="w-4 h-4" />
                </template>
              </Button>
            </div>
            <InputGroup>
              <InputGroupAddon>
                <FileText class="w-4 h-4 text-gray-500" />
              </InputGroupAddon>
              <Textarea
                v-model="htmlOutput"
                rows="10"
                class="w-full"
                readonly
                placeholder="El HTML de la tabla generado aparecerá aquí"
              />
            </InputGroup>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.prose th,
.prose td {
  border: 1px solid #e2e8f0;
  padding: 0.75rem;
  text-align: left;
}

.prose th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #4a5568;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.prose tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.prose tbody tr:nth-child(even) {
  background-color: #f7fafc;
}

:deep(.p-fileupload-choose) {
  width: 100%;
}
</style>
