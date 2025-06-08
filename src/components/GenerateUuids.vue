<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 class="text-3xl font-extrabold mb-6 text-center text-gray-800">
          🔑 Generador de UUIDs
        </h1>

        <label class="block text-sm font-semibold text-gray-700 mb-2"
          >¿Cuántos UUIDs deseas generar?</label
        >
        <InputNumber
          v-model="count"
          :min="1"
          :max="10000"
          :step="1"
          class="w-full mb-6"
          inputClass="text-center text-lg"
        />

        <Button
          @click="generateAndDownload"
          icon="pi pi-file-excel"
          label="Generar y descargar en Excel"
          class="w-full p-button-primary"
          :loading="isGenerating"
        />

        <p v-if="status" class="text-sm text-gray-500 mt-4 text-center">
          {{ status }}
        </p>

        <div
          class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800"
        >
          <p><strong>¿Qué es un UUID versión 4?</strong></p>
          <p class="mt-1">
            Un UUID versión 4 (UUIDv4) es un identificador universalmente único
            generado mediante números aleatorios. Los UUIDv4 generados por esta
            herramienta utilizan un generador de números aleatorios
            criptográficamente seguro, lo que garantiza una altísima
            improbabilidad de colisión incluso en grandes cantidades.
          </p>
        </div>
      </div>
    </div>

    <footer
      class="mt-10 text-center text-sm text-gray-500 italic flex flex-col items-center gap-2 p-4"
    >
      <i class="pi pi-star text-yellow-400 text-2xl"></i>
      <div>
        <p>"Esta no es una simple herramienta…</p>
        <p>
          es el grito silencioso de un desarrollador que venció la oscuridad del
          mal diseño."
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import * as ExcelJS from "exceljs";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

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
