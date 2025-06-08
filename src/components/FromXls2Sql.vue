<template>
  <div>
    <header class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
        🧩 SQLizer Lite
      </h1>
    </header>

    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="text-sm text-gray-600 text-center mb-4">
        Sube un archivo <strong>.csv</strong>, <strong>.xls</strong> o
        <strong>.xlsx</strong> que contenga los datos.<br />
        Asegúrate de que:
      </div>
      <ul class="text-sm text-gray-600 list-disc list-inside text-left mb-6">
        <li>La primera fila tenga los nombres de las columnas</li>
        <li>Solo haya una hoja (en archivos Excel)</li>
        <li>
          Los nombres de columna sean válidos (letras, números, guion bajo,
          comienzan con letra)
        </li>
        <li>
          Debes elegir si deseas generar también el bloque
          <code>CREATE TABLE</code>
        </li>
        <li>Debes proporcionar el nombre de la tabla</li>
      </ul>

      <div class="space-y-4">
        <div>
          <span class="p-float-label">
            <FileUpload
              mode="basic"
              :maxFileSize="10000000"
              accept=".csv,.xls,.xlsx"
              :auto="true"
              chooseLabel="Elegir archivo"
              class="w-full"
              @select="onFileSelect"
              @uploader="onFileUpload"
            />
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span class="p-float-label">
              <InputText
                v-model="tableName"
                id="tableName"
                class="w-full"
                :class="{ 'p-invalid': tableNameError }"
              />
              <label for="tableName">Nombre de la tabla *</label>
            </span>
            <small v-if="tableNameError" class="p-error">{{
              tableNameError
            }}</small>
          </div>

          <div>
            <span class="p-float-label">
              <Dropdown
                v-model="sqlDialect"
                :options="sqlDialects"
                optionLabel="name"
                optionValue="value"
                class="w-full"
                inputId="sqlDialect"
              />
              <label for="sqlDialect">Formato SQL</label>
            </span>
          </div>

          <div>
            <span class="p-float-label">
              <Dropdown
                v-model="includeCreate"
                :options="createOptions"
                optionLabel="name"
                optionValue="value"
                class="w-full"
                inputId="includeCreate"
              />
              <label for="includeCreate">¿Incluir CREATE TABLE?</label>
            </span>
          </div>

          <div>
            <span class="p-float-label">
              <Dropdown
                v-model="includeMigration"
                :options="migrationOptions"
                optionLabel="name"
                optionValue="value"
                class="w-full"
                inputId="includeMigration"
              />
              <label for="includeMigration">¿Generar migración Yii2?</label>
            </span>
          </div>
        </div>

        <div v-if="fileError" class="p-message p-message-error">
          {{ fileError }}
        </div>

        <div v-if="showResult" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700"
            >Resultado SQL</label
          >
          <Textarea
            v-model="output"
            readonly
            rows="10"
            class="w-full font-mono text-sm"
          />
          <div class="flex justify-end gap-2">
            <Button
              label="Copiar"
              icon="pi pi-copy"
              @click="copyToClipboard"
              severity="secondary"
            />
            <Button
              label="Descargar SQL"
              icon="pi pi-download"
              @click="downloadSQL"
              severity="info"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const tableName = ref("");
const tableNameError = ref("");
const sqlDialect = ref("mysql");
const includeCreate = ref("yes");
const includeMigration = ref("no");
const fileError = ref("");
const output = ref("");
const showResult = ref(false);

const sqlDialects = [
  { name: "MySQL / MariaDB", value: "mysql" },
  { name: "PostgreSQL", value: "postgresql" },
  { name: "SQL Server", value: "sqlserver" },
  { name: "Oracle", value: "oracle" },
];

const createOptions = [
  { name: "Sí, generar CREATE TABLE", value: "yes" },
  { name: "No, solo INSERT INTO", value: "no" },
];

const migrationOptions = [
  { name: "Sí, generar migración", value: "yes" },
  { name: "No", value: "no" },
];

const onFileSelect = (event: any) => {
  const file = event.files[0];
  if (!file) {
    fileError.value = "Por favor selecciona un archivo";
    return;
  }

  const validExtensions = [".csv", ".xls", ".xlsx"];
  const fileExtension = file.name
    .substring(file.name.lastIndexOf("."))
    .toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    fileError.value =
      "Formato de archivo no válido. Por favor sube un archivo .csv, .xls o .xlsx";
    return;
  }

  fileError.value = "";
  // TODO: Implement file processing logic
  processFile(file);
};

const processFile = async (file: File) => {
  if (!tableName.value) {
    tableNameError.value = "El nombre de la tabla es requerido";
    return;
  }

  // TODO: Implement actual file processing
  // For now, just show a mock result
  output.value = `-- Mock SQL output for ${file.name}\n`;
  output.value += `-- Table: ${tableName.value}\n`;
  output.value += `-- Dialect: ${sqlDialect.value}\n`;
  output.value += `-- Include CREATE: ${includeCreate.value}\n`;
  output.value += `-- Include Migration: ${includeMigration.value}\n`;

  showResult.value = true;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "SQL copiado al portapapeles",
      life: 3000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar al portapapeles",
      life: 3000,
    });
  }
};

const downloadSQL = () => {
  const blob = new Blob([output.value], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${tableName.value}_${
    new Date().toISOString().split("T")[0]
  }.sql`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
</script>
