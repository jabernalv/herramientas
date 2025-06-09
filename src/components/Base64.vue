<script setup lang="ts">
import { ref, watch } from "vue";
import { Text, Image, Copy } from "lucide-vue-next";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import Checkbox from "primevue/checkbox";

const toast = useToast();
const textInput = ref("");
const textOutput = ref("");
const imageOutput = ref("");
const previewSrc = ref("");
const showPreview = ref(false);
const isUrlSafe = ref(false);

const encodeText = () => {
  try {
    if (!textInput.value) return;
    textOutput.value = isUrlSafe.value
      ? urlSafeEncode(textInput.value)
      : window.btoa(textInput.value);
  } catch (error) {
    console.error("Error codificando:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al codificar el texto",
      life: 3000,
    });
  }
};

const decodeText = () => {
  try {
    if (!textOutput.value) return;
    textOutput.value = isUrlSafe.value
      ? urlSafeDecode(textOutput.value)
      : window.atob(textOutput.value);
  } catch (error) {
    console.error("Error decodificando:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al decodificar el texto",
      life: 3000,
    });
  }
};

const handleImageUpload = (event: any) => {
  const file = event.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      imageOutput.value = result;
      previewSrc.value = result;
      showPreview.value = true;
    };
    reader.readAsDataURL(file);
  }
};

const onSelect = (event: any) => {
  handleImageUpload(event);
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Texto copiado al portapapeles",
      life: 3000,
    });
  } catch (error) {
    console.error("Error copiando al portapapeles:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al copiar al portapapeles",
      life: 3000,
    });
  }
};

// Función para codificar en URL-safe Base64
const urlSafeEncode = (str: string): string => {
  return window
    .btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Función para decodificar URL-safe Base64
const urlSafeDecode = (str: string): string => {
  try {
    str = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), "=");
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    return window.atob(str);
  } catch (error) {
    console.error("Error decodificando URL-safe Base64:", error);
    return "";
  }
};

// Observar cambios en isUrlSafe para recodificar si hay texto
watch(isUrlSafe, () => {
  if (textInput.value) encodeText();
  else if (textOutput.value) decodeText();
});
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
          <li class="text-gray-700">Codificador Base64</li>
        </ol>
      </nav>
    </div>
    <main class="w-full lg:w-4/5 lg:mx-auto mb-16">
      <h1 class="text-lg font-bold text-surface-900">Codificador Base64</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Texto -->
        <Card class="bg-surface-card rounded-xl shadow-md overflow-hidden">
          <template #title>
            <h2>
              <Text class="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />Texto
            </h2>
          </template>
          <template #content>
            <div class="mb-4">
              <div class="flex align-items-center gap-2">
                <Checkbox
                  v-model="isUrlSafe"
                  :binary="true"
                  inputId="urlSafe"
                />
                <label for="urlSafe"
                  >URL Safe (reemplaza + por - y / por _)</label
                >
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-surface-700 text-sm mb-2"
                >Ingresa el texto:</label
              >
              <Textarea
                v-model="textInput"
                rows="4"
                placeholder="Texto a codificar o decodificar"
                class="w-full"
              />
            </div>

            <div class="flex gap-2">
              <Button
                @click="encodeText"
                severity="success"
                class="flex-1 justify-center"
                icon="pi pi-arrow-right"
                label="Codificar"
                :disabled="!textInput"
              />
              <Button
                @click="decodeText"
                severity="primary"
                class="flex-1 justify-center"
                icon="pi pi-arrow-left"
                label="Decodificar"
                :disabled="!textOutput"
              />
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-surface-700 text-sm">Resultado:</label>
                <Button
                  v-if="textOutput"
                  @click="copyToClipboard(textOutput)"
                  text
                >
                  <Copy class="w-4 h-4" />
                </Button>
              </div>
              <Textarea v-model="textOutput" rows="4" readonly class="w-full" />
            </div>
          </template>
        </Card>

        <!-- Imagen -->
        <Card class="bg-surface-card rounded-xl shadow-md overflow-hidden">
          <template #title>
            <h2>
              <Image
                class="w-6 h-6 text-primary-500 mr-3 flex-shrink-0"
              />Imagen
            </h2>
          </template>
          <template #content>
            <div class="p-6">
              <div>
                <label class="block text-surface-700 text-sm mb-2"
                  >Selecciona una imagen:</label
                >
                <FileUpload
                  mode="basic"
                  :auto="true"
                  accept="image/*"
                  :maxFileSize="5000000"
                  @select="onSelect"
                  :customUpload="true"
                >
                </FileUpload>
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-surface-700 text-sm"
                    >Resultado Base64 (Data URL):</label
                  >
                  <Button
                    v-if="imageOutput"
                    @click="copyToClipboard(imageOutput)"
                    text
                  >
                    <Copy class="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  v-model="imageOutput"
                  rows="4"
                  readonly
                  placeholder="La representación Base64 de la imagen aparecerá aquí"
                  class="w-full"
                />
              </div>

              <div v-if="showPreview" class="mt-4">
                <h3 class="text-lg font-semibold text-surface-900 mb-2">
                  Vista previa de la imagen (si es válida):
                </h3>
                <img
                  :src="previewSrc"
                  alt="Vista previa"
                  class="max-w-full h-auto rounded border"
                />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<style scoped>
:deep(.p-fileupload-content) {
  display: none;
}
</style>
