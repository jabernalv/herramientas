<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  FileSpreadsheet,
  Calendar as CalendarIcon,
  List,
  CalendarDays,
} from "lucide-vue-next";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Select from "primevue/select";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { getFestivosColombia } from "@/utils/colombiaBusinessDays";

const selectedYear = ref(new Date().getFullYear());
const years = ref<number[]>([]);
const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

// Llenar años (10 años antes y después del actual)
onMounted(() => {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 10; y <= currentYear + 10; y++) {
    years.value.push(y);
  }
});

function diaSemana(fechaStr: string) {
  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const [year, month, day] = fechaStr.split("-").map(Number);
  return dias[new Date(year, month - 1, day).getDay()];
}

const festivos = ref(getFestivosColombia(selectedYear.value));

function updateFestivos() {
  festivos.value = getFestivosColombia(selectedYear.value);
}

// Generar datos para el calendario visual
const meses = ref<any[]>([]);

function updateCalendario() {
  meses.value = [];
  const festivoMap: { [key: string]: string } = {};
  festivos.value.forEach((f) => (festivoMap[f.date] = f.label));

  for (let mes = 0; mes < 12; mes++) {
    const primerDia = new Date(selectedYear.value, mes, 1);
    const ultimoDia = new Date(selectedYear.value, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicio = primerDia.getDay();

    const mesData = {
      nombre: primerDia
        .toLocaleString("es-CO", { month: "long" })
        .toUpperCase(),
      dias: [] as any[],
    };

    // Espacios vacíos antes del 1
    for (let i = 0; i < diaInicio; i++) {
      mesData.dias.push({ dia: "", tipo: "vacio" });
    }

    for (let d = 1; d <= diasEnMes; d++) {
      const fecha = new Date(selectedYear.value, mes, d);
      const fechaStr = fecha.toISOString().split("T")[0];
      const dow = fecha.getDay();
      const festivo = festivoMap[fechaStr];

      mesData.dias.push({
        dia: d,
        tipo: festivo
          ? "festivo"
          : dow === 0
          ? "domingo"
          : dow === 6
          ? "sabado"
          : "normal",
        titulo: festivo || "",
      });
    }

    meses.value.push(mesData);
  }
}

// Exportar a Excel
async function exportarExcel() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("CALENDARIO");

  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const colWidth = 4;

  ws.properties.defaultRowHeight = 16;

  // Set ancho global de columnas (suficiente para 3x4 meses)
  for (let i = 1; i <= 24; i++) {
    ws.getColumn(i).width = colWidth;
  }

  let festivoRow = 2; // empezamos en fila 2
  const colFestivo = 25; // columna Y
  const colFecha = 26; // columna Z
  const colDia = 27; // columna AA

  // Encabezados de la tabla
  const headers = [
    { col: colFestivo, label: "Festivo" },
    { col: colFecha, label: "Fecha" },
    { col: colDia, label: "Día" },
  ];

  headers.forEach(({ col, label }) => {
    const cell = ws.getCell(1, col);
    cell.value = label;
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE5E7EB" },
    };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
  });

  const festivoMap: { [key: string]: string } = {};
  festivos.value.forEach((f) => (festivoMap[f.date] = f.label));

  let lastRow = 0;
  let rowStart = 1;
  for (let m = 0; m < 12; m++) {
    const primerDia = new Date(selectedYear.value, m, 1);
    const ultimoDia = new Date(selectedYear.value, m + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const offset = primerDia.getDay();

    const colStart = (m % 3) * 8 + 1; // ExcelJS base 1
    if (m % 3 === 0 && m > 0) {
      rowStart = lastRow + 2;
    }

    const nombreMes = primerDia
      .toLocaleString("es-CO", { month: "long" })
      .toUpperCase();

    // Título del mes (merged)
    const titleCell = ws.getCell(rowStart, colStart);
    titleCell.value = `${nombreMes} ${selectedYear.value}`;
    titleCell.font = {
      bold: true,
      size: 14,
      color: { argb: "FF0F172A" },
    };
    ws.mergeCells(rowStart, colStart, rowStart, colStart + 6);

    // Días de la semana
    daysOfWeek.forEach((d, i) => {
      const cell = ws.getCell(rowStart + 1, colStart + i);
      cell.value = d;
      cell.font = { bold: true, color: { argb: "FF1E293B" } };
      cell.alignment = { horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE2E8F0" },
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFCBD5E1" } },
        bottom: { style: "thin", color: { argb: "FFCBD5E1" } },
      };
    });

    let day = 1;
    for (let r = 0; day <= diasEnMes; r++) {
      for (let c = 0; c < 7; c++) {
        const row = rowStart + 2 + r;
        const col = colStart + c;
        lastRow = Math.max(lastRow, row);

        if (r === 0 && c < offset) continue;
        if (day > diasEnMes) break;

        const fecha = new Date(selectedYear.value, m, day);
        const fechaStr = fecha.toISOString().split("T")[0];
        const festivo = festivoMap[fechaStr];

        const cell = ws.getCell(row, col);
        cell.value = day;
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin", color: { argb: "FFE5E7EB" } },
          bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
          left: { style: "thin", color: { argb: "FFE5E7EB" } },
          right: { style: "thin", color: { argb: "FFE5E7EB" } },
        };

        if (festivo) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFEE2E2" },
          };
          cell.font = { bold: true, color: { argb: "FFB91C1C" } };
          cell.note = festivo;
          // Insertar fila en tabla de festivos
          ws.getCell(festivoRow, colFestivo).value = festivo;
          ws.getCell(festivoRow, colFecha).value = fechaStr;
          ws.getCell(festivoRow, colDia).value = diaSemana(fechaStr);

          // Estilo por celda
          [colFestivo, colFecha, colDia].forEach((col) => {
            const cell = ws.getCell(festivoRow, col);
            cell.border = {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            };
            cell.alignment = { vertical: "middle" };
          });

          festivoRow++;
        } else if (fecha.getDay() === 0) {
          cell.font = { bold: true, color: { argb: "FFDC2626" } };
        } else if (fecha.getDay() === 6) {
          cell.font = { color: { argb: "FF2563EB" } };
        } else {
          cell.font = { color: { argb: "FF374151" } };
        }

        day++;
      }
    }
  }

  ws.getColumn(colFestivo).width = 30;
  ws.getColumn(colFecha).width = 14;
  ws.getColumn(colDia).width = 12;

  const buffer = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `calendario_festivos_${selectedYear.value}.xlsx`);
}

// Watch para actualizar datos cuando cambie el año
watch(selectedYear, () => {
  updateFestivos();
  updateCalendario();
});

// Inicializar datos
onMounted(() => {
  updateFestivos();
  updateCalendario();
});
</script>

<template>
  <div class="min-h-screen mb-16">
    <BreadcrumbNav />
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
          Calendario colombiano
        </h1>
      </header>

      <!-- Controles -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6">
        <div class="flex items-center gap-2 mb-2 sm:mb-0">
          <label for="anio" class="text-surface-700 font-medium">Año:</label>
          <InputGroup>
            <InputGroupAddon>
              <CalendarDays class="w-4 h-4" />
            </InputGroupAddon>
            <Select
              id="anio"
              name="anio"
              v-model="selectedYear"
              :options="years"
              class="w-32"
              @change="
                updateFestivos();
                updateCalendario();
              "
            />
          </InputGroup>
        </div>
        <Button
          @click="exportarExcel"
          severity="warning"
          class="flex items-center gap-2"
        >
          <FileSpreadsheet class="w-4 h-4" />
          Exportar a Excel
        </Button>
      </div>

      <!-- Tabs -->
      <Tabs value="calendar">
        <TabList>
          <Tab value="calendar" class="flex items-center gap-2">
            <CalendarIcon class="w-4 h-4" />
            Calendario
          </Tab>
          <Tab value="festivos" class="flex items-center gap-2">
            <List class="w-4 h-4" />
            Festivos
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="calendar">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="mes in meses"
                :key="mes.nombre"
                class="rounded border p-3 shadow-sm bg-surface-card"
              >
                <div class="font-bold text-center mb-2">
                  {{ mes.nombre }}
                </div>
                <div
                  class="grid grid-cols-7 text-center text-xs font-semibold text-surface-600 mb-1"
                >
                  <div v-for="day in daysOfWeek" :key="day">
                    {{ day }}
                  </div>
                </div>
                <div class="grid grid-cols-7 text-center text-sm gap-y-1">
                  <div
                    v-for="(dia, index) in mes.dias"
                    :key="index"
                    :class="[
                      'rounded px-1 py-0.5',
                      {
                        'bg-red-100 text-red-700 font-semibold cursor-help':
                          dia.tipo === 'festivo',
                        'text-red-500 font-semibold': dia.tipo === 'domingo',
                        'text-blue-500': dia.tipo === 'sabado',
                        'text-surface-700': dia.tipo === 'normal',
                      },
                    ]"
                    :title="dia.titulo"
                  >
                    {{ dia.dia }}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="festivos">
            <DataTable
              :value="festivos"
              class="p-datatable-sm"
              stripedRows
              showGridlines
              tableStyle="min-width: 50rem"
            >
              <Column field="label" header="Festivo"></Column>
              <Column field="date" header="Fecha"></Column>
              <Column header="Día">
                <template #body="{ data }">
                  {{ diaSemana(data.date) }}
                </template>
              </Column>
            </DataTable>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-select) {
  background: var(--surface-card);
}

:deep(.p-tab) {
  border: none !important;
}

:deep(.p-tabview-nav-link) {
  border: none !important;
  background: transparent !important;
}

:deep(.p-tab-active) {
  border: none !important;
}

:deep(.p-tabview-panels) {
  padding: 0;
}
</style>
