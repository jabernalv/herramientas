<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import FileUpload from "primevue/fileupload";
import { exportToExcel, readExcel, type ExcelColumn } from "../utils/excel";
import { latex2svg } from "../utils/math";

const latexExample = ref(
  "\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}"
);
const mathResult = ref("");

const renderLatex = () => {
  try {
    mathResult.value = latex2svg(latexExample.value);
  } catch (error) {
    console.error("Error rendering LaTeX:", error);
  }
};

// Excel example data
const excelData = [
  { name: "John Doe", age: 30, city: "New York" },
  { name: "Jane Smith", age: 25, city: "Los Angeles" },
  { name: "Bob Johnson", age: 35, city: "Chicago" },
];

const excelColumns: ExcelColumn[] = [
  { header: "Name", key: "name", width: 20 },
  { header: "Age", key: "age", width: 10 },
  { header: "City", key: "city", width: 20 },
];

const handleExcelUpload = async (event: any) => {
  try {
    const file = event.files[0];
    const data = await readExcel(file);
    console.log("Excel data:", data);
  } catch (error) {
    console.error("Error reading Excel file:", error);
  }
};
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- MathJax Demo -->
    <div class="bg-surface-card p-4 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">MathJax Demo</h2>
      <div class="space-y-4">
        <input
          v-model="latexExample"
          type="text"
          class="w-full p-2 border rounded"
          placeholder="Enter LaTeX"
        />
        <Button @click="renderLatex">Render LaTeX</Button>
        <div
          v-html="mathResult"
          class="mt-4 p-4 bg-surface-ground rounded"
        ></div>
      </div>
    </div>

    <!-- Excel Demo -->
    <div class="bg-surface-card p-4 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Excel Demo</h2>
      <div class="space-y-4">
        <Button
          @click="() => exportToExcel(excelData, excelColumns, 'demo-export')"
        >
          Export Example Data
        </Button>

        <div class="mt-4">
          <h3 class="text-lg font-semibold mb-2">Import Excel</h3>
          <FileUpload
            mode="basic"
            :auto="true"
            accept=".xlsx"
            :maxFileSize="1000000"
            @upload="handleExcelUpload"
          />
        </div>
      </div>
    </div>
  </div>
</template>
