<script setup lang="ts">
import { ref, watch } from "vue";
import { Text, Image, Copy } from "lucide-vue-next";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Card from "primevue/card";
import { useToast } from "primevue/usetoast";
import Checkbox from "primevue/checkbox";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { Type, FileText, Shield } from "lucide-vue-next";

const toast = useToast();
const textInput = ref("");
const base64Text = ref("");
const imageOutput = ref("");
const previewSrc = ref("");
const showPreview = ref(false);
const isUrlSafe = ref(false);
const isValidBase64 = ref(false);

const validateBase64 = (text: string): boolean => {
  if (!text) return false;
  try {
    if (isUrlSafe.value) {
      // Para URL safe, verificamos que solo contenga caracteres válidos
      return /^[A-Za-z0-9_-]*={0,2}$/.test(text);
    } else {
      // Para Base64 normal, verificamos que solo contenga caracteres válidos
      return /^[A-Za-z0-9+/]*={0,2}$/.test(text);
    }
  } catch {
    return false;
  }
};

const encodeText = () => {
  try {
    if (!textInput.value) return;
    base64Text.value = isUrlSafe.value
      ? urlSafeEncode(textInput.value).trim()
      : window.btoa(textInput.value).trim();
    isValidBase64.value = true;
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
    if (!base64Text.value) return;
    textInput.value = isUrlSafe.value
      ? urlSafeDecode(base64Text.value).trim()
      : window.atob(base64Text.value).trim();
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
  isValidBase64.value = validateBase64(base64Text.value);
});

// Observar cambios en el texto base64 para validar
watch(base64Text, (newValue) => {
  isValidBase64.value = validateBase64(newValue);
});
</script>

<template>
  <div>
    <BreadcrumbNav />
    <main class="w-full lg:w-4/5 lg:mx-auto mb-16">
      <h1 class="text-lg font-bold text-surface-900">Codificador Base64</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Texto -->
        <Card class="bg-surface-card rounded-xl shadow-md overflow-hidden">
          <template #title>
            <h2>
              <Text class="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
              Texto claro
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
                >Ingresa el texto claro:</label
              >
              <InputGroup>
                <InputGroupAddon>
                  <Type class="w-4 h-4" />
                </InputGroupAddon>
                <Textarea
                  v-model="textInput"
                  rows="4"
                  placeholder="Texto a codificar"
                  class="w-full"
                />
              </InputGroup>
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
                :disabled="!isValidBase64"
              />
            </div>

            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-surface-700 text-sm"
                  >Texto Base64:</label
                >
                <Button
                  v-if="base64Text"
                  @click="copyToClipboard(base64Text)"
                  text
                >
                  <Copy class="w-4 h-4" />
                </Button>
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <Shield class="w-4 h-4" />
                </InputGroupAddon>
                <Textarea
                  v-model="base64Text"
                  rows="4"
                  class="w-full"
                  placeholder="Texto en formato Base64"
                />
              </InputGroup>
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
                <InputGroup>
                  <InputGroupAddon>
                    <FileText class="w-4 h-4" />
                  </InputGroupAddon>
                  <Textarea
                    v-model="imageOutput"
                    rows="4"
                    readonly
                    placeholder="La representación Base64 de la imagen aparecerá aquí"
                    class="w-full"
                  />
                </InputGroup>
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
