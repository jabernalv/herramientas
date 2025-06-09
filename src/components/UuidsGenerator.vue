<template>
  <div class="min-h-screen flex flex-col">
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
          <li class="text-gray-700">Generador de UUIDs</li>
        </ol>
      </nav>
    </div>
    <div class="flex-grow flex justify-center w-full md:w-4/5 mx-auto">
      <Card class="bg-white p-8 rounded-2xl shadow-2xl w-full">
        <template #title>
          <h1
            class="mb-3 text-center text-gray-800 text-[0.65rem] sm:text-sm md:text-xl"
          >
            🔑 Generador de UUIDs
          </h1>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-hashtag"></i>
              </InputGroupAddon>
              <InputNumber
                id="count"
                v-model="count"
                :min="1"
                :max="10000"
                :step="1"
                class="w-full mb-6"
                inputClass="text-center text-lg"
                locale="es-CO"
                fluid
                showButtons
              />
            </InputGroup>

            <Button
              @click="generateAndDownload"
              icon="pi pi-file-excel"
              label="Generar a Excel"
              class="w-full p-button-primary"
              :loading="isGenerating"
            />
          </div>

          <p v-if="status" class="text-sm text-gray-500 mt-4 text-center">
            {{ status }}
          </p>

          <Message severity="info" class="mt-4">
            <p><strong>¿Qué es un UUID versión 4?</strong></p>
            <p class="mt-1">
              Un UUID versión 4 (UUIDv4) es un identificador universalmente
              único generado mediante números aleatorios. Los UUIDv4 generados
              por esta herramienta utilizan un generador de números aleatorios
              criptográficamente seguro, lo que garantiza una altísima
              improbabilidad de colisión incluso en grandes cantidades.
            </p>
          </Message>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import * as ExcelJS from "exceljs";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Message from "primevue/message";

const count = ref(10);
const status = ref("");
const isGenerating = ref(false);

const generateAndDownload = async () => {
  if (!count.value || count.value <= 0) {
    status.value = "⚠️ Por favor, ingresa un número válido.";
    return;
  }

  isGenerating.value = true;
  status.value = "⏳ Generando UUIDs y creando archivo Excel...";

  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("UUIDs");
    sheet.columns = [{ header: "UUID", key: "uuid", width: 40 }];

    for (let i = 0; i < count.value; i++) {
      sheet.addRow({ uuid: uuidv4() });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids_${Date.now()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    status.value = "✅ Archivo descargado exitosamente.";
  } catch (error) {
    status.value = "❌ Error al generar el archivo.";
    console.error(error);
  } finally {
    isGenerating.value = false;
  }
};
</script>

<style scoped>
:deep(.p-inputnumber) {
  width: 100%;
}
:deep(.p-inputnumber-input) {
  width: 100%;
  text-align: center;
  font-size: 1.125rem;
}
</style>
