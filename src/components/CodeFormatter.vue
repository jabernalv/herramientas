<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { Code, Copy, Trash2 } from "lucide-vue-next";
import BreadcrumbNav from "./BreadcrumbNav.vue";

const toast = useToast();
const inputText = ref("");
const formattedOutput = ref("");
const isXml = ref(false);
const isJson = ref(false);

const detectFormat = (text: string) => {
  // Limpiar el texto de espacios en blanco al inicio y final
  const trimmedText = text.trim();

  // Detectar si es XML
  if (trimmedText.startsWith("<") && trimmedText.endsWith(">")) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(trimmedText, "text/xml");
      if (xmlDoc.getElementsByTagName("parsererror").length === 0) {
        isXml.value = true;
        isJson.value = false;
        return true;
      }
    } catch (e) {
      // No es XML válido
    }
  }

  // Detectar si es JSON
  if (trimmedText.startsWith("{") || trimmedText.startsWith("[")) {
    try {
      JSON.parse(trimmedText);
      isJson.value = true;
      isXml.value = false;
      return true;
    } catch (e) {
      // No es JSON válido
    }
  }

  isXml.value = false;
  isJson.value = false;
  return false;
};

const formatText = () => {
  if (!inputText.value.trim()) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: "Por favor, ingrese algún texto",
      life: 3000,
    });
    return;
  }

  if (!detectFormat(inputText.value)) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "El texto no es un XML o JSON válido",
      life: 3000,
    });
    return;
  }

  try {
    if (isXml.value) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputText.value, "text/xml");
      const serializer = new XMLSerializer();
      formattedOutput.value = serializer
        .serializeToString(xmlDoc)
        .replace(/></g, ">\n<")
        .replace(/(<[^>]+>)/g, (match) => {
          return match.replace(/\s+/g, " ").trim();
        });
    } else if (isJson.value) {
      const parsed = JSON.parse(inputText.value);
      formattedOutput.value = JSON.stringify(parsed, null, 2);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al formatear el texto",
      life: 3000,
    });
  }
};

const copyToClipboard = () => {
  if (formattedOutput.value) {
    navigator.clipboard.writeText(formattedOutput.value);
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Texto copiado al portapapeles",
      life: 3000,
    });
  }
};

const clearAll = () => {
  inputText.value = "";
  formattedOutput.value = "";
  isXml.value = false;
  isJson.value = false;
};
</script>

<template>
  <div class="min-h-screen mb-16">
    <BreadcrumbNav />
    <Card>
      <template #title>Formateador de Código</template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="input" class="font-semibold">Ingrese XML o JSON:</label>
            <InputGroup>
              <InputGroupAddon>
                <Code class="w-4 h-4" />
              </InputGroupAddon>
              <Textarea
                id="input"
                v-model="inputText"
                type="text"
                class="w-full"
                placeholder="Pegue su XML o JSON aquí"
              />
            </InputGroup>
          </div>

          <div class="flex gap-2">
            <Button label="Formatear" @click="formatText" severity="primary">
              <template #icon>
                <Code class="w-4 h-4 mr-2" />
              </template>
            </Button>
            <Button
              label="Copiar"
              @click="copyToClipboard"
              :disabled="!formattedOutput"
              severity="secondary"
            >
              <template #icon>
                <Copy class="w-4 h-4 mr-2" />
              </template>
            </Button>
            <Button label="Limpiar" @click="clearAll" severity="danger">
              <template #icon>
                <Trash2 class="w-4 h-4 mr-2" />
              </template>
            </Button>
          </div>

          <div v-if="formattedOutput" class="mt-4">
            <h3 class="font-semibold mb-2">Resultado formateado:</h3>
            <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto">{{
              formattedOutput
            }}</pre>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
