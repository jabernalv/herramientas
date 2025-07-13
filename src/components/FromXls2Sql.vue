<template>
  <div>
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
          <li class="text-gray-700">Convertidor Excel a SQL</li>
        </ol>
      </nav>
    </div>
    <div
      class="w-full max-w-[90%] bg-white shadow-lg rounded-2xl p-4 md:p-6 space-y-6 mb-16"
    >
      <div class="space-y-4">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-center text-blue-600">
            🧩 Convertidor de Excel a SQL
          </h1>
        </div>
        <div class="text-sm text-gray-600 text-center">
          Sube un archivo <strong>.csv</strong>, <strong>.xls</strong> o
          <strong>.xlsx</strong> que contenga los datos.<br />
          Asegúrate de que:
        </div>
        <div>
          <ul class="text-sm text-gray-600 list-disc list-inside">
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
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500">*</span> Selecciona un archivo
            </label>
            <div class="flex flex-col sm:flex-row gap-3">
              <FileUpload
                mode="basic"
                :auto="false"
                accept=".csv,.xls,.xlsx"
                @select="onFileSelect"
                chooseLabel="Elegir archivo"
                class="flex-1"
              />
              <Button
                :disabled="!selectedFile || !isTableNameValid"
                @click="processSelectedFile"
                icon="pi pi-file-edit"
                label="Procesar"
                :class="[
                  'w-full sm:w-36',
                  !selectedFile || !isTableNameValid
                    ? 'p-button-secondary opacity-60'
                    : 'p-button-primary',
                ]"
              />
            </div>
            <Message v-if="selectedFileName" severity="info" size="small">
              <i class="pi pi-check"></i> {{ selectedFileName }}
            </Message>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              <span class="text-red-500">*</span> Nombre de tabla
            </label>
            <div class="relative">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-database"></i>
                </InputGroupAddon>
                <InputText
                  v-model="tableName"
                  class="w-full"
                  placeholder="ej: usuarios"
                  @input="validateTableName"
                />
              </InputGroup>
            </div>
            <div
              v-if="tableNameFeedback"
              :class="tableNameFeedbackClass"
              class="text-sm mt-1"
            >
              {{ tableNameFeedback }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Formato SQL
            </label>
            <div class="relative">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-database"></i>
                </InputGroupAddon>
                <Select
                  v-model="selectedDialect"
                  :options="dialects"
                  optionLabel="name"
                  optionValue="value"
                  class="w-full"
                >
                  <template #option="slotProps">
                    <div class="flex items-center gap-2">
                      <img
                        :src="`icons/${slotProps.option.icon}`"
                        :alt="slotProps.option.name"
                        class="w-5 h-5"
                      />
                      <span>{{ slotProps.option.name }}</span>
                    </div>
                  </template>
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center gap-2">
                      <img
                        :src="`icons/${
                          dialects.find((d) => d.value === slotProps.value)
                            ?.icon
                        }`"
                        :alt="
                          dialects.find((d) => d.value === slotProps.value)
                            ?.name
                        "
                        class="w-5 h-5"
                      />
                      <span>{{
                        dialects.find((d) => d.value === slotProps.value)?.name
                      }}</span>
                    </div>
                  </template>
                </Select>
              </InputGroup>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ¿Incluir bloque CREATE TABLE?
            </label>
            <div class="relative">
              <Select
                v-model="includeCreate"
                :options="createTableOptions"
                optionLabel="name"
                optionValue="value"
                class="w-full"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ¿Generar una migración Yii2?
            </label>
            <div class="relative">
              <Select
                v-model="includeMigration"
                :options="migrationOptions"
                optionLabel="name"
                optionValue="value"
                class="w-full"
              />
            </div>
          </div>
        </div>
        <div
          v-if="fileAlert"
          class="text-sm text-red-600 bg-red-100 border border-red-300 p-2 rounded-md mt-1"
        >
          {{ fileAlert }}
        </div>
        <div v-if="sqlOutput" class="space-y-2">
          <label class="block text-sm font-medium text-gray-700"
            >Resultado SQL</label
          >
          <Textarea
            v-model="sqlOutput"
            readonly
            class="w-full h-64 p-3 text-sm font-mono"
          />
          <div class="flex flex-col sm:flex-row justify-end gap-3">
            <Button
              @click="copySql"
              icon="pi pi-copy"
              label="Copiar SQL"
              class="w-full sm:w-auto p-button-primary"
            />
            <Button
              @click="downloadSql"
              icon="pi pi-download"
              label="Descargar .sql"
              class="w-full sm:w-auto p-button-success"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Message from "primevue/message";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import * as XLSX from "xlsx";

const toast = useToast();
const tableName = ref("");
const selectedDialect = ref("mysql");
const includeCreate = ref("yes");
const includeMigration = ref("no");
const fileAlert = ref("");
const sqlOutput = ref("");
const tableNameFeedback = ref("");
const tableNameFeedbackClass = ref("");
const selectedFile = ref<File | null>(null);
const selectedFileName = ref("");

const dialects = [
  { name: "MySQL / MariaDB", value: "mysql", icon: "mysql.svg" },
  { name: "PostgreSQL", value: "postgresql", icon: "postgresql.svg" },
  { name: "SQL Server", value: "sqlserver", icon: "sql-server.svg" },
  { name: "Oracle", value: "oracle", icon: "oracle.svg" },
];

const createTableOptions = [
  { name: "Sí, generar CREATE TABLE", value: "yes" },
  { name: "No, solo INSERT INTO", value: "no" },
];

const migrationOptions = [
  { name: "Sí, generar migración", value: "yes" },
  { name: "No", value: "no" },
];

const isTableNameValid = computed(() => {
  const val = tableName.value.trim();
  return /^[a-z][a-z0-9_]*$/.test(val);
});

const validateTableName = () => {
  const val = tableName.value.trim().toLowerCase();
  tableName.value = val;

  const valid = /^[a-z][a-z0-9_]*$/.test(val);
  if (val === "") {
    tableNameFeedback.value = "";
  } else if (!valid) {
    tableNameFeedback.value = "❌ Nombre inválido";
    tableNameFeedbackClass.value = "text-red-600";
  } else {
    tableNameFeedback.value = "✅ Nombre válido";
    tableNameFeedbackClass.value = "text-green-600";
  }
};

const inferColumnTypes = (rows: any[]) => {
  const types = [];
  const maxSamples = 1000;
  const isInt = (val: string) => /^-?\d+$/.test(val);
  const isFloat = (val: string) => /^-?\d+\.\d+$/.test(val);
  const isDate = (val: string) => /^\d{4}-\d{2}-\d{2}$/.test(val);

  const columnCount = rows[0].length;
  for (let col = 0; col < columnCount; col++) {
    const values = [];
    for (let i = 1; i < rows.length && values.length < maxSamples; i++) {
      const cell = rows[i][col];
      if (cell !== undefined && cell !== null && String(cell).trim() !== "") {
        values.push(String(cell));
      }
    }

    let allInt = true,
      allFloat = true,
      allDate = true,
      maxLength = 0;

    for (const val of values) {
      if (!isInt(val)) allInt = false;
      if (!isFloat(val) && !isInt(val)) allFloat = false;
      if (!isDate(val)) allDate = false;
      maxLength = Math.max(maxLength, val.length);
    }
    maxLength = maxLength * 10;

    if (allInt) {
      types.push("INT");
    } else if (allFloat) {
      types.push("FLOAT");
    } else if (allDate) {
      types.push("DATE");
    } else {
      types.push(`VARCHAR(${Math.min(maxLength, 255)})`);
    }
  }

  return types;
};

const generateCreateTableSQL = (
  tableName: string,
  headers: string[],
  types: string[]
) => {
  let wrapStart = "`",
    wrapEnd = "`",
    tableWrap = "`" + tableName + "`";

  if (
    selectedDialect.value === "postgresql" ||
    selectedDialect.value === "oracle"
  ) {
    wrapStart = wrapEnd = '"';
    tableWrap = `"${tableName}"`;
  } else if (selectedDialect.value === "sqlserver") {
    wrapStart = "[";
    wrapEnd = "]";
    tableWrap = `[${tableName}]`;
  }

  const cols = headers.map((name, i) => {
    let type = types[i];
    const isId = name === "id" && type === "INT";

    if (isId) {
      if (selectedDialect.value === "mysql")
        type = "INT AUTO_INCREMENT PRIMARY KEY";
      else if (selectedDialect.value === "postgresql")
        type = "SERIAL PRIMARY KEY";
      else if (selectedDialect.value === "sqlserver")
        type = "INT IDENTITY(1,1) PRIMARY KEY";
      else if (selectedDialect.value === "oracle")
        type = "NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY PRIMARY KEY";
    }

    return `${wrapStart}${name}${wrapEnd} ${type}`;
  });

  return `CREATE TABLE ${tableWrap} (\n  ${cols.join(",\n  ")}\n);`;
};

const generateInsertStatements = (
  tableName: string,
  headers: string[],
  rows: any[]
) => {
  let wrapStart = "`",
    wrapEnd = "`",
    tableWrap = "`" + tableName + "`";

  if (
    selectedDialect.value === "postgresql" ||
    selectedDialect.value === "oracle"
  ) {
    wrapStart = wrapEnd = '"';
    tableWrap = `"${tableName}"`;
  } else if (selectedDialect.value === "sqlserver") {
    wrapStart = "[";
    wrapEnd = "]";
    tableWrap = `[${tableName}]`;
  }

  const columns = headers.map((h) => `${wrapStart}${h}${wrapEnd}`).join(", ");
  const inserts = [];

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i].map((val: any) => {
      if (val === null || val === undefined) return "NULL";
      return typeof val === "string" ? `'${val.replace(/'/g, "''")}'` : val;
    });
    inserts.push(`(${values.join(", ")})`);
  }

  if (inserts.length === 0) return "";
  return `INSERT INTO ${tableWrap} (${columns})\nVALUES\n${inserts.join(
    ",\n"
  )};`;
};

const generateYiiMigration = (
  tableName: string,
  headers: string[],
  types: string[],
  rows: any[]
) => {
  const className = `m${Date.now()}_${tableName}`;
  const columns = headers.map((name, i) => {
    let type = types[i].toLowerCase();
    if (type.startsWith("varchar")) {
      const size = type.match(/\((\d+)\)/)?.[1] || "255";
      type = `$this->string(${size})`;
    } else if (type === "int") {
      type = "$this->integer()";
    } else if (type === "float") {
      type = "$this->float()";
    } else if (type === "date") {
      type = "$this->date()";
    }

    if (name === "id" && type === "$this->integer()") {
      type += "->primaryKey()";
    }

    return `            '${name}' => ${type},`;
  });

  const data = rows.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i];
    });
    return obj;
  });

  return `<?php

use yii\\db\\Migration;

class ${className} extends Migration
{
    public function safeUp()
    {
        $this->createTable('{{%${tableName}}}', [
${columns.join("\n")}
        ]);

        $this->batchInsert('{{%${tableName}}}', 
            ['${headers.join("', '")}'],
            ${JSON.stringify(data, null, 4)}
        );
    }

    public function safeDown()
    {
        $this->dropTable('{{%${tableName}}}');
    }
}`;
};

const processFile = async (file: File) => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    if (workbook.SheetNames.length !== 1) {
      fileAlert.value = "El archivo debe contener exactamente una hoja.";
      return;
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

    if (rows.length === 0 || rows[0].length === 0) {
      fileAlert.value = "No se detectaron encabezados en la primera fila.";
      return;
    }

    const headers = rows[0].map((h: string) => h.toLowerCase());
    const fieldPattern = /^[a-z][a-z0-9_]*$/;
    const invalid = headers.filter((h: string) => !fieldPattern.test(h));

    if (invalid.length > 0) {
      fileAlert.value = "Nombres de columnas inválidos: " + invalid.join(", ");
      return;
    }

    const columnTypes = inferColumnTypes(rows);
    const name = tableName.value.trim();

    let sql = "";
    if (includeCreate.value === "yes") {
      sql += generateCreateTableSQL(name, headers, columnTypes) + "\n\n";
    }
    sql += generateInsertStatements(name, headers, rows);

    if (includeMigration.value === "yes") {
      sql +=
        "\n\n/* === Yii2 Migration === */\n\n" +
        generateYiiMigration(name, headers, columnTypes, rows);
    }

    sqlOutput.value = sql;
    fileAlert.value = "";
  } catch (err: any) {
    fileAlert.value = "Error al procesar el archivo: " + err.message;
  }
};

const onFileSelect = (event: any) => {
  selectedFile.value = event.files[0];
  selectedFileName.value = event.files[0].name;
};

const processSelectedFile = () => {
  if (selectedFile.value) {
    processFile(selectedFile.value);
  }
};

const copySql = async () => {
  try {
    await navigator.clipboard.writeText(sqlOutput.value);
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

const downloadSql = () => {
  const blob = new Blob([sqlOutput.value], { type: "text/plain" });
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

<style scoped>
:deep(.p-fileupload-buttonbar) {
  display: none;
}
:deep(.p-fileupload-content) {
  padding: 0;
  border: none;
}
:deep(.p-fileupload) {
  width: 100%;
}
:deep(.p-button) {
  width: 100%;
}
@media (min-width: 640px) {
  :deep(.p-button) {
    width: auto;
  }
}
</style>
