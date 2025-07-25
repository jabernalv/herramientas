<template>
  <div class="min-h-screen mb-16">
    <BreadcrumbNav />
    <div class="container mx-auto max-w-2xl py-8">
      <h1 class="text-3xl font-bold mb-4 text-primary-700 text-center">
        Ofuscador/Minificador de Código
      </h1>
      <div class="bg-white rounded shadow p-4 mb-6">
        <InputGroup>
          <InputGroupAddon>
            <Code class="w-4 h-4" />
          </InputGroupAddon>
          <Textarea
            v-model="inputCode"
            rows="8"
            autoResize
            placeholder="Pega aquí tu código JS o CSS"
            class="w-full mb-2"
          />
        </InputGroup>
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
          class="mb-4 w-full"
          @click="processCode"
        >
          <template #icon>
            <Settings class="w-4 h-4 mr-2" />
          </template>
        </Button>
        <div v-if="outputCode" class="flex flex-col gap-2">
          <InputGroup>
            <InputGroupAddon>
              <FileText class="w-4 h-4" />
            </InputGroupAddon>
            <Textarea
              v-model="outputCode"
              rows="8"
              autoResize
              readonly
              class="w-full"
            />
          </InputGroup>
          <div class="flex gap-2">
            <Button label="Copiar" @click="copyOutput" severity="info" outlined>
              <template #icon>
                <Copy class="w-4 h-4 mr-2" />
              </template>
            </Button>
            <Button
              label="Descargar"
              @click="downloadOutput"
              severity="success"
              outlined
            >
              <template #icon>
                <Download class="w-4 h-4 mr-2" />
              </template>
            </Button>
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
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Button from "primevue/button";
import Tag from "primevue/tag";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { Code, FileText, Settings, Copy, Download } from "lucide-vue-next";
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
