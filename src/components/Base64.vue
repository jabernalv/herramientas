<script setup lang="ts">
import { ref } from "vue";
import { Text, Image, Copy } from "lucide-vue-next";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";

const textInput = ref("");
const textOutput = ref("");
const imageOutput = ref("");
const previewSrc = ref("");
const showPreview = ref(false);

const encodeText = () => {
  textOutput.value = btoa(textInput.value);
};

const decodeText = () => {
  try {
    textOutput.value = atob(textInput.value);
  } catch (error) {
    textOutput.value = "⚠️ Base64 inválido";
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
  } catch (err) {
    console.error("Error al copiar:", err);
  }
};
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <main class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Texto -->
        <div class="bg-surface-card rounded-xl shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <Text class="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">Texto</h2>
            </div>

            <div class="space-y-4">
              <div>
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
                />
                <Button
                  @click="decodeText"
                  severity="primary"
                  class="flex-1 justify-center"
                  icon="pi pi-arrow-left"
                  label="Decodificar"
                />
              </div>

              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-surface-700 text-sm"
                    >Resultado:</label
                  >
                  <Button
                    v-if="textOutput"
                    @click="copyToClipboard(textOutput)"
                    text
                  >
                    <Copy class="w-4 h-4" />
                  </Button>
                </div>
                <Textarea
                  v-model="textOutput"
                  rows="4"
                  readonly
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Imagen -->
        <div class="bg-surface-card rounded-xl shadow-md overflow-hidden">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <Image class="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" />
              <h2 class="text-xl font-semibold text-surface-900">Imagen</h2>
            </div>

            <div class="space-y-4">
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
                  <template #content="{ chooseCallback }">
                    <Button
                      @click="chooseCallback"
                      severity="success"
                      class="w-full justify-center"
                      icon="pi pi-upload"
                      label="Seleccione"
                    />
                  </template>
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
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-fileupload-content) {
  display: none;
}
</style>
