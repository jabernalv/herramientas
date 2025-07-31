<template>
  <div class="min-h-screen flex flex-col">
    <BreadcrumbNav />
    <div class="flex-grow flex justify-center w-full md:w-4/5 mx-auto">
      <Card class="bg-white p-8 rounded-2xl shadow-2xl w-full">
        <template #title>
          <h1
            class="mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl flex items-center justify-center font-bold tracking-tight gap-2"
          >
            <IconText class="inline-block mr-2 w-16 h-16" /> Procesador de texto
          </h1>
        </template>
        <template #content>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Entrada de texto -->
            <div class="space-y-4">
              <div
                class="flex items-center gap-2 text-lg font-semibold text-gray-700"
              >
                <Type class="w-5 h-5 text-blue-600" />
                Texto de entrada
              </div>
              <InputGroup>
                <InputGroupAddon>
                  <Edit3 class="w-4 h-4 text-gray-500" />
                </InputGroupAddon>
                <Textarea
                  v-model="inputText"
                  placeholder="Escribe o pega tu texto aquí..."
                  rows="12"
                  class="w-full"
                  @input="updateStats"
                />
              </InputGroup>

              <!-- Estadísticas del texto -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <div
                  class="flex items-center gap-2 text-md font-medium text-gray-700 mb-2"
                >
                  <Hash class="w-4 h-4 text-purple-600" />
                  📊 Estadísticas
                </div>
                <div class="grid grid-cols-3 gap-4 text-sm">
                  <div class="text-center">
                    <div class="font-bold text-blue-600 text-xl">
                      {{ stats.characters }}
                    </div>
                    <div class="text-gray-500">Caracteres</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-green-600 text-xl">
                      {{ stats.words }}
                    </div>
                    <div class="text-gray-500">Palabras</div>
                  </div>
                  <div class="text-center">
                    <div class="font-bold text-purple-600 text-xl">
                      {{ stats.lines }}
                    </div>
                    <div class="text-gray-500">Líneas</div>
                  </div>
                </div>
              </div>

              <!-- Botones de transformación -->
              <div class="space-y-3">
                <div
                  class="flex items-center gap-2 text-lg font-semibold text-gray-700"
                >
                  <RotateCcw class="w-5 h-5 text-green-600" />
                  🔄 Transformaciones
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <Button
                    @click="transformText('uppercase')"
                    label="MAYÚSCULAS"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('lowercase')"
                    label="minúsculas"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('capitalize')"
                    label="Primera Mayúscula"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('title')"
                    label="Título"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('camel')"
                    label="camelCase"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('pascal')"
                    label="PascalCase"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('snake')"
                    label="snake_case"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('kebab')"
                    label="kebab-case"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="transformText('reverse')"
                    label="osreveR"
                    size="small"
                    severity="secondary"
                    class="w-full"
                  />
                  <Button
                    @click="clearText"
                    label="Limpiar"
                    severity="danger"
                    size="small"
                    class="w-full"
                  />
                </div>
              </div>
            </div>

            <!-- Salida de texto -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <div
                  class="flex items-center gap-2 text-lg font-semibold text-gray-700"
                >
                  <FileText class="w-5 h-5 text-orange-600" />
                  Texto transformado
                </div>
                <Button
                  v-if="outputText"
                  @click="copyToClipboard"
                  :label="copyButtonText"
                  size="small"
                  :severity="
                    copyButtonText === 'Copiado!' ? 'success' : 'secondary'
                  "
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
                  v-model="outputText"
                  placeholder="Aquí aparecerá el texto transformado..."
                  rows="12"
                  class="w-full"
                  readonly
                />
              </InputGroup>

              <!-- Información adicional -->
              <div class="bg-blue-50 p-4 rounded-lg">
                <div class="text-md font-medium text-blue-700 mb-2">
                  ℹ️ Información
                </div>
                <div class="text-sm text-blue-600">
                  <div v-if="lastTransformation">
                    <strong>Última transformación:</strong>
                    {{ lastTransformation }}
                  </div>
                  <div v-if="stats.charactersNoSpaces > 0" class="mt-1">
                    <strong>Caracteres sin espacios:</strong>
                    {{ stats.charactersNoSpaces }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Información sobre la herramienta -->
          <Message severity="info" class="mt-6">
            <p><strong>💡 Sobre esta herramienta:</strong></p>
            <p class="mt-1">
              Combina un contador de texto en tiempo real con múltiples
              transformaciones de formato. El texto se procesa instantáneamente
              mientras escribes, y puedes aplicar diferentes transformaciones
              con un solo clic.
            </p>
          </Message>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Textarea from "primevue/textarea";
import Message from "primevue/message";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { useToast } from "primevue/usetoast";
import { Type, FileText, Edit3, Copy, RotateCcw, Hash } from "lucide-vue-next";
import IconText from "@/components/icons/IconText.vue";

const toast = useToast();
const inputText = ref("");
const outputText = ref("");
const copyButtonText = ref("Copiar");
const lastTransformation = ref("");

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
}

const stats = ref<TextStats>({
  characters: 0,
  charactersNoSpaces: 0,
  words: 0,
  lines: 0,
});

// Actualizar estadísticas automáticamente
const updateStats = () => {
  const text = inputText.value;

  stats.value.characters = text.length;
  stats.value.charactersNoSpaces = text.replace(/\s/g, "").length;
  stats.value.words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  stats.value.lines = text === "" ? 0 : text.split("\n").length;

  // Si no hay transformación aplicada, mostrar el texto original
  if (!lastTransformation.value) {
    outputText.value = text;
  }
};

// Watch para actualizar stats cuando cambia el texto
watch(inputText, updateStats, { immediate: true });

// Funciones de transformación de texto
const transformText = (type: string) => {
  const text = inputText.value;
  if (!text.trim()) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: "Por favor ingresa algún texto primero",
      life: 3000,
    });
    return;
  }

  let transformed = "";

  switch (type) {
    case "uppercase":
      transformed = text.toUpperCase();
      lastTransformation.value = "MAYÚSCULAS";
      break;
    case "lowercase":
      transformed = text.toLowerCase();
      lastTransformation.value = "minúsculas";
      break;
    case "capitalize":
      transformed = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      lastTransformation.value = "Primera Mayúscula";
      break;
    case "title":
      transformed = text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
      lastTransformation.value = "Formato Título";
      break;
    case "camel":
      transformed = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[A-Z]/, (char) => char.toLowerCase());
      lastTransformation.value = "camelCase";
      break;
    case "pascal":
      transformed = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^[a-z]/, (char) => char.toUpperCase());
      lastTransformation.value = "PascalCase";
      break;
    case "snake":
      transformed = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
      lastTransformation.value = "snake_case";
      break;
    case "kebab":
      transformed = text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      lastTransformation.value = "kebab-case";
      break;
    case "reverse":
      transformed = text.split("").reverse().join("");
      lastTransformation.value = "Texto Invertido";
      break;
    default:
      transformed = text;
      lastTransformation.value = "";
  }

  outputText.value = transformed;
};

const clearText = () => {
  inputText.value = "";
  outputText.value = "";
  lastTransformation.value = "";
  toast.add({
    severity: "success",
    summary: "Limpieza exitosa",
    detail: "Texto limpiado correctamente",
    life: 2000,
  });
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(outputText.value);
    copyButtonText.value = "Copiado!";
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Texto copiado al portapapeles",
      life: 2000,
    });

    setTimeout(() => {
      copyButtonText.value = "Copiar";
    }, 2000);
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar al portapapeles",
      life: 3000,
    });
  }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
