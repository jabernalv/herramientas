<template>
  <div class="min-h-screen mb-16">
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
          <li class="text-gray-700">Ofuscador/Minificador de Código</li>
        </ol>
      </nav>
    </div>
    <div class="container mx-auto max-w-2xl py-8">
      <h1 class="text-3xl font-bold mb-4 text-primary-700 text-center">
        Ofuscador/Minificador de Código
      </h1>
      <div class="bg-white rounded shadow p-4 mb-6">
        <Textarea
          v-model="inputCode"
          rows="8"
          autoResize
          placeholder="Pega aquí tu código JS o CSS"
          class="w-full mb-2"
        />
        <div class="flex items-center gap-2 mb-4">
          <Tag
            :value="detectedTypeLabel"
            :severity="
              detectedType === 'js'
                ? 'info'
                : detectedType === 'css'
                ? 'success'
                : 'warning'
            "
          />
          <span v-if="detectedType === 'unknown'" class="text-gray-500 text-sm"
            >No se reconoce el tipo de código</span
          >
        </div>
        <Button
          :label="actionLabel"
          :disabled="!canProcess"
          icon="pi pi-cog"
          class="mb-4 w-full"
          @click="processCode"
        />
        <div v-if="outputCode" class="flex flex-col gap-2">
          <Textarea
            v-model="outputCode"
            rows="8"
            autoResize
            readonly
            class="w-full"
          />
          <div class="flex gap-2">
            <Button
              label="Copiar"
              icon="pi pi-copy"
              @click="copyOutput"
              severity="info"
              outlined
            />
            <Button
              label="Descargar"
              icon="pi pi-download"
              @click="downloadOutput"
              severity="success"
              outlined
            />
          </div>
          <div v-if="copied" class="text-green-600 text-sm mt-1">
            ¡Copiado al portapapeles!
          </div>
        </div>
        <div v-else class="text-center text-gray-500 mt-4">
          El resultado aparecerá aquí.
        </div>
        <div class="text-xs text-yellow-700 mt-4 bg-yellow-50 rounded p-2">
          ⚠️ Esto solo dificulta la lectura del código, no lo protege realmente.
          No uses para código sensible.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Tag from "primevue/tag";
import { minify } from "terser";
// @ts-expect-error: csso no tiene tipos
import * as csso from "csso";

const inputCode = ref("");
const outputCode = ref("");
const copied = ref(false);

const detectedType = computed(() => {
  const code = inputCode.value.trim();
  if (!code) return "unknown";
  // Detección simple
  if (
    /function |const |let |var |=>|\breturn\b|console\.|window\.|document\./.test(
      code
    )
  )
    return "js";
  if (
    /\{|\}|:|;|@media|color|font|margin|padding|\bbody\b|\bhtml\b/.test(code) &&
    !/function |const |let |var /.test(code)
  )
    return "css";
  return "unknown";
});

const detectedTypeLabel = computed(() => {
  if (detectedType.value === "js") return "JavaScript";
  if (detectedType.value === "css") return "CSS";
  return "Desconocido";
});

const actionLabel = computed(() => {
  if (detectedType.value === "js") return "Ofuscar JavaScript";
  if (detectedType.value === "css") return "Minificar CSS";
  return "Procesar";
});

const canProcess = computed(
  () => detectedType.value === "js" || detectedType.value === "css"
);

async function processCode() {
  copied.value = false;
  if (detectedType.value === "js") {
    const result = await minify(inputCode.value);
    outputCode.value = result.code || "";
  } else if (detectedType.value === "css") {
    outputCode.value = csso.minify(inputCode.value).css;
  } else {
    outputCode.value = "";
  }
}

function copyOutput() {
  if (!outputCode.value) return;
  navigator.clipboard.writeText(outputCode.value);
  copied.value = true;
  setTimeout(() => (copied.value = false), 1500);
}

function downloadOutput() {
  if (!outputCode.value) return;
  const type = detectedType.value === "js" ? "js" : "css";
  const blob = new Blob([outputCode.value], {
    type: type === "js" ? "application/javascript" : "text/css",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `codigo-ofuscado.${type}`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<style scoped>
.container {
  min-height: 60vh;
}
</style>
