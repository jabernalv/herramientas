<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { FileText, FileSpreadsheet } from "lucide-vue-next";
import * as XLSX from "xlsx";

const toast = useToast();
const inputText = ref("");
const inputType = ref<"json" | "xml">("json");
const isProcessing = ref(false);

const validateInput = (text: string, type: "json" | "xml"): boolean => {
  if (!text.trim()) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Por favor, ingresa algún contenido para convertir",
      life: 3000,
    });
    return false;
  }

  try {
    if (type === "json") {
      JSON.parse(text);
    } else {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");
      if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        throw new Error("XML inválido");
      }
    }
    return true;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error de formato",
      detail: `El ${type.toUpperCase()} ingresado no es válido`,
      life: 3000,
    });
    return false;
  }
};

// Función para aplanar un objeto anidado
const flattenObject = (obj: any, prefix = ""): any => {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + "." : "";
    if (
      typeof obj[k] === "object" &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else if (Array.isArray(obj[k])) {
      acc[pre + k] = JSON.stringify(obj[k]);
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

const convertToExcel = async () => {
  if (!validateInput(inputText.value, inputType.value)) return;

  isProcessing.value = true;
  try {
    let data;
    if (inputType.value === "json") {
      const parsedData = JSON.parse(inputText.value);
      // Aplanar el objeto y convertirlo en array
      data = [flattenObject(parsedData)];
    } else {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(inputText.value, "text/xml");
      const jsonData = xmlToJson(xmlDoc);
      // Aplanar el objeto XML convertido y ponerlo en un array
      data = [flattenObject(jsonData)];
    }

    // Crear libro de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    // Generar archivo y descargar
    XLSX.writeFile(workbook, `conversion_${Date.now()}.xlsx`);

    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Archivo Excel generado correctamente",
      life: 3000,
    });
  } catch (error) {
    console.error("Error en la conversión:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al generar el archivo Excel",
      life: 3000,
    });
  } finally {
    isProcessing.value = false;
  }
};

// Función auxiliar para convertir XML a JSON
const xmlToJson = (node: Node): any => {
  const obj: any = {};

  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element;
    if (element.hasAttributes()) {
      obj["@attributes"] = {};
      for (let j = 0; j < element.attributes.length; j++) {
        const attribute = element.attributes[j];
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue;
  }

  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const item = node.childNodes[i];
      const nodeName = item.nodeName;

      if (nodeName !== "#text") {
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            const old = obj[nodeName];
            obj[nodeName] = [old];
          }
          obj[nodeName].push(xmlToJson(item));
        }
      } else if (item.nodeValue?.trim()) {
        return item.nodeValue;
      }
    }
  }

  return obj;
};
</script>

<template>
  <div>
    <BreadcrumbNav />

    <main class="w-full lg:w-4/5 mx-auto mb-16">
      <Card>
        <template #title> Convertidor XML/JSON a Excel </template>
        <template #content>
          <div class="flex gap-4 mb-4 justify-center">
            <div class="flex items-center">
              <RadioButton
                v-model="inputType"
                inputId="json"
                name="type"
                value="json"
              />
              <label for="json" class="ml-2 cursor-pointer">JSON</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                v-model="inputType"
                inputId="xml"
                name="type"
                value="xml"
              />
              <label for="xml" class="ml-2 cursor-pointer">XML</label>
            </div>
          </div>

          <div class="mb-4">
            <InputGroup>
              <InputGroupAddon>
                <FileText class="text-gray-500" />
              </InputGroupAddon>
              <Textarea
                v-model="inputText"
                :placeholder="
                  inputType === 'json'
                    ? '{\n  &quot;ejemplo&quot;: &quot;Pega tu JSON aquí&quot;\n}'
                    : '<?xml version=&quot;1.0&quot;?>\n<root>\n  <ejemplo>Pega tu XML aquí</ejemplo>\n</root>'
                "
                rows="12"
                class="w-full font-mono"
              />
            </InputGroup>
          </div>

          <Button
            @click="convertToExcel"
            label="Convertir a Excel"
            severity="success"
            :loading="isProcessing"
            class="w-full"
          >
            <template #icon>
              <FileSpreadsheet class="w-4 h-4 mr-2" />
            </template>
          </Button>
        </template>
      </Card>
    </main>
  </div>
</template>

<style scoped>
:deep(.p-button) {
  white-space: nowrap;
}

:deep(.p-inputtextarea) {
  font-family: monospace;
}
</style>
