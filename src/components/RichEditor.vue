<template>
  <div class="min-h-screen flex flex-col">
    <BreadcrumbNav />
    <div class="flex-grow flex justify-center w-full md:w-4/5 mx-auto">
      <Card class="bg-white p-8 rounded-2xl shadow-2xl w-full">
        <template #title>
          <h1
            class="mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl"
          >
            📝 Editor Rico de Texto
          </h1>
        </template>
        <template #content>
          <div class="space-y-6">
            <!-- Barra de herramientas superior -->
            <div class="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border">
              <Button
                @click="formatDocument('bold')"
                severity="secondary"
                size="small"
                icon="pi pi-bold"
                v-tooltip="'Negrita (Ctrl+B)'"
              />
              <Button
                @click="formatDocument('italic')"
                severity="secondary"
                size="small"
                icon="pi pi-italic"
                v-tooltip="'Cursiva (Ctrl+I)'"
              />
              <Button
                @click="formatDocument('underline')"
                severity="secondary"
                size="small"
                icon="pi pi-underline"
                v-tooltip="'Subrayado (Ctrl+U)'"
              />
              <Divider layout="vertical" />

              <Button
                @click="formatDocument('insertOrderedList')"
                severity="secondary"
                size="small"
                icon="pi pi-list"
                v-tooltip="'Lista numerada'"
              />
              <Button
                @click="formatDocument('insertUnorderedList')"
                severity="secondary"
                size="small"
                icon="pi pi-circle"
                v-tooltip="'Lista con viñetas'"
              />
              <Divider layout="vertical" />

              <Button
                @click="insertLink"
                severity="secondary"
                size="small"
                icon="pi pi-link"
                v-tooltip="'Insertar enlace'"
              />
              <Button
                @click="insertImage"
                severity="secondary"
                size="small"
                icon="pi pi-image"
                v-tooltip="'Insertar imagen'"
              />
              <Divider layout="vertical" />

              <Button
                @click="clearContent"
                severity="danger"
                size="small"
                icon="pi pi-trash"
                label="Limpiar"
                v-tooltip="'Limpiar todo el contenido'"
              />
              <Button
                @click="exportToPDF"
                severity="success"
                size="small"
                icon="pi pi-download"
                label="Descargar PDF"
                v-tooltip="'Exportar como PDF'"
                :loading="exportingPDF"
              />
            </div>

            <!-- Editor de texto rico -->
            <div class="border rounded-lg">
              <Editor
                v-model="content"
                ref="editorRef"
                :modules="editorModules"
                style="height: 500px"
                placeholder="Escribe tu documento aquí..."
                @text-change="updateWordCount"
              />
            </div>

            <!-- Información del documento -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-lg font-bold text-blue-600">
                  {{ wordCount }}
                </div>
                <div class="text-sm text-blue-500">Palabras</div>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="text-lg font-bold text-green-600">
                  {{ charCount }}
                </div>
                <div class="text-sm text-green-500">Caracteres</div>
              </div>
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="text-lg font-bold text-purple-600">
                  {{ charCountNoSpaces }}
                </div>
                <div class="text-sm text-purple-500">Sin espacios</div>
              </div>
            </div>

            <!-- Vista previa del contenido -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-700">
                  Vista Previa del Documento
                </h3>
                <Button
                  @click="togglePreview"
                  :label="
                    showPreview
                      ? 'Ocultar Vista Previa'
                      : 'Mostrar Vista Previa'
                  "
                  severity="secondary"
                  size="small"
                  :icon="showPreview ? 'pi pi-eye-slash' : 'pi pi-eye'"
                />
              </div>

              <div
                v-if="showPreview"
                class="border rounded-lg p-6 bg-white"
                ref="previewRef"
              >
                <div class="prose max-w-none" v-html="content"></div>
              </div>
            </div>

            <!-- Información sobre la herramienta -->
            <Message severity="info">
              <p><strong>💡 Sobre esta herramienta:</strong></p>
              <p class="mt-1">
                Editor de texto rico con formato completo, similar a Microsoft
                Word. Incluye herramientas de formato, inserción de enlaces e
                imágenes, y capacidad de exportar directamente a PDF. Perfecto
                para crear documentos rápidos y profesionales.
              </p>
            </Message>
          </div>
        </template>
      </Card>
    </div>

    <!-- Diálogo para insertar enlace -->
    <Dialog
      v-model:visible="showLinkDialog"
      modal
      header="Insertar Enlace"
      style="width: 450px"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Texto del enlace</label
          >
          <InputText
            v-model="linkText"
            placeholder="Texto a mostrar"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >URL</label
          >
          <InputText
            v-model="linkUrl"
            placeholder="https://..."
            class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          severity="secondary"
          @click="showLinkDialog = false"
        />
        <Button
          label="Insertar"
          @click="confirmInsertLink"
          :disabled="!linkText || !linkUrl"
        />
      </template>
    </Dialog>

    <!-- Diálogo para insertar imagen -->
    <Dialog
      v-model:visible="showImageDialog"
      modal
      header="Insertar Imagen"
      style="width: 450px"
    >
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >URL de la imagen</label
          >
          <InputText
            v-model="imageUrl"
            placeholder="https://..."
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Texto alternativo</label
          >
          <InputText
            v-model="imageAlt"
            placeholder="Descripción de la imagen"
            class="w-full"
          />
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">O</p>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
          />
          <Button
            label="Subir imagen desde archivo"
            severity="secondary"
            @click="fileInput.click()"
            icon="pi pi-upload"
          />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          severity="secondary"
          @click="showImageDialog = false"
        />
        <Button
          label="Insertar"
          @click="confirmInsertImage"
          :disabled="!imageUrl"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Editor from "primevue/editor";
import Message from "primevue/message";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import { useToast } from "primevue/usetoast";
// @ts-ignore
import html2pdf from "html2pdf.js";

const toast = useToast();
const editorRef = ref();
const previewRef = ref();
const fileInput = ref();

// Estado del editor
const content = ref("");
const showPreview = ref(false);
const exportingPDF = ref(false);

// Diálogos
const showLinkDialog = ref(false);
const showImageDialog = ref(false);
const linkText = ref("");
const linkUrl = ref("");
const imageUrl = ref("");
const imageAlt = ref("");

// Configuración del editor Quill
const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

// Estadísticas del texto
const wordCount = computed(() => {
  if (!content.value) return 0;
  const text = content.value.replace(/<[^>]*>/g, "").trim();
  return text ? text.split(/\s+/).length : 0;
});

const charCount = computed(() => {
  if (!content.value) return 0;
  return content.value.replace(/<[^>]*>/g, "").length;
});

const charCountNoSpaces = computed(() => {
  if (!content.value) return 0;
  return content.value.replace(/<[^>]*>/g, "").replace(/\s/g, "").length;
});

// Funciones del editor
const formatDocument = (command: string) => {
  if (editorRef.value) {
    const quill = editorRef.value.getQuill();
    const selection = quill.getSelection();

    if (selection) {
      if (command === "bold") {
        quill.format("bold", !quill.getFormat().bold);
      } else if (command === "italic") {
        quill.format("italic", !quill.getFormat().italic);
      } else if (command === "underline") {
        quill.format("underline", !quill.getFormat().underline);
      } else if (command === "insertOrderedList") {
        quill.format("list", "ordered");
      } else if (command === "insertUnorderedList") {
        quill.format("list", "bullet");
      }
    }
  }
};

const insertLink = () => {
  linkText.value = "";
  linkUrl.value = "";
  showLinkDialog.value = true;
};

const confirmInsertLink = () => {
  if (editorRef.value && linkText.value && linkUrl.value) {
    const quill = editorRef.value.getQuill();
    const selection = quill.getSelection();

    if (selection) {
      quill.insertText(selection.index, linkText.value, "link", linkUrl.value);
    }
  }
  showLinkDialog.value = false;
};

const insertImage = () => {
  imageUrl.value = "";
  imageAlt.value = "";
  showImageDialog.value = true;
};

const confirmInsertImage = () => {
  if (editorRef.value && imageUrl.value) {
    const quill = editorRef.value.getQuill();
    const selection = quill.getSelection();

    if (selection) {
      quill.insertEmbed(selection.index, "image", imageUrl.value);
    }
  }
  showImageDialog.value = false;
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};

const clearContent = () => {
  content.value = "";
  toast.add({
    severity: "success",
    summary: "Limpieza exitosa",
    detail: "Contenido limpiado correctamente",
    life: 2000,
  });
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

const updateWordCount = () => {
  // Esta función se ejecuta cuando cambia el contenido del editor
  // Las propiedades computadas se actualizan automáticamente
};

const exportToPDF = async () => {
  if (!content.value.trim()) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: "Por favor escribe algún contenido antes de exportar",
      life: 3000,
    });
    return;
  }

  exportingPDF.value = true;

  try {
    // Crear un elemento temporal para el PDF con solo el contenido del usuario
    const element = document.createElement("div");
    element.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333; font-size: 16px;">
        ${content.value}
      </div>
    `;

    const options = {
      margin: 0.5,
      filename: `documento_${new Date().toISOString().split("T")[0]}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: {
        unit: "in",
        format: "letter",
        orientation: "portrait",
      },
    };

    await html2pdf().set(options).from(element).save();

    toast.add({
      severity: "success",
      summary: "PDF generado",
      detail: "El documento se ha descargado correctamente",
      life: 3000,
    });
  } catch (error) {
    console.error("Error al generar PDF:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo generar el PDF",
      life: 3000,
    });
  } finally {
    exportingPDF.value = false;
  }
};

// Atajos de teclado
onMounted(() => {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          formatDocument("bold");
          break;
        case "i":
          e.preventDefault();
          formatDocument("italic");
          break;
        case "u":
          e.preventDefault();
          formatDocument("underline");
          break;
        case "s":
          e.preventDefault();
          exportToPDF();
          break;
      }
    }
  });
});
</script>

<style scoped>
/* Personalización del editor */
:deep(.p-editor .ql-toolbar) {
  border-top: 1px solid #d1d5db;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
}

:deep(.p-editor .ql-container) {
  border-bottom: 1px solid #d1d5db;
  border-left: 1px solid #d1d5db;
  border-right: 1px solid #d1d5db;
}

:deep(.ql-editor) {
  font-size: 16px;
  line-height: 1.6;
}

:deep(.ql-editor.ql-blank::before) {
  font-style: italic;
  color: #9ca3af;
}

/* Estilos para la vista previa */
.prose {
  max-width: none;
}

.prose h1 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.prose h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.prose h3 {
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.prose p {
  margin-bottom: 1em;
}

.prose ul,
.prose ol {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.25em;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}

.prose img {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
}

.prose blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: #6b7280;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125em 0.25em;
  border-radius: 0.25em;
  font-family: monospace;
}

.prose pre {
  background-color: #f3f4f6;
  padding: 1em;
  border-radius: 0.5em;
  overflow-x: auto;
  margin: 1em 0;
}

.prose pre code {
  background: none;
  padding: 0;
}
</style>
