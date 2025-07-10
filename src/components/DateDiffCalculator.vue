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
          <li class="text-gray-700">Calculadora de Días entre Fechas</li>
        </ol>
      </nav>
    </div>
    <div class="container mx-auto max-w-xl py-8">
      <h1 class="text-3xl font-bold mb-4 text-primary-700 text-center">
        Calculadora de días entre fechas
      </h1>

      <TabView v-model:activeIndex="activeTab" class="bg-white rounded shadow">
        <!-- Tab 1: Diferencia entre fechas -->
        <TabPanel header="Diferencia entre fechas" value="diff">
          <div class="p-4">
            <div
              class="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4"
            >
              <div class="flex flex-col items-center">
                <label class="font-medium mb-1">Fecha inicial</label>
                <Calendar
                  v-model="from"
                  name="from"
                  id="from"
                  showIcon
                  dateFormat="yy-mm-dd"
                  class="w-40"
                  iconDisplay="input"
                  :dateClass="dateClass"
                  lang="es"
                >
                  <template #inputicon>
                    <CalendarIcon class="w-5 h-5 text-blue-500" />
                  </template>
                </Calendar>
              </div>
              <div class="flex flex-col items-center">
                <label class="font-medium mb-1">Fecha final</label>
                <Calendar
                  v-model="to"
                  name="to"
                  id="to"
                  showIcon
                  dateFormat="yy-mm-dd"
                  class="w-40"
                  iconDisplay="input"
                  :dateClass="dateClass"
                  :showOtherMonths="true"
                  :selectOtherMonths="true"
                  :touchUI="true"
                >
                  <template #inputicon>
                    <CalendarIcon class="w-5 h-5 text-blue-500" />
                  </template>
                </Calendar>
              </div>
            </div>
            <div class="flex items-center justify-center gap-2 mb-4">
              <input
                type="checkbox"
                v-model="includeStart"
                id="includeStart"
                class="form-checkbox"
              />
              <label for="includeStart" class="select-none"
                >Incluir día inicial en el cálculo</label
              >
            </div>
            <div v-if="from && to" class="space-y-2">
              <div class="flex justify-between border-b pb-1">
                <span>Días calendario</span>
                <span class="font-bold">{{ calendar }}</span>
              </div>
              <div class="flex justify-between border-b pb-1">
                <span>Días hábiles colombianos</span>
                <span class="font-bold">{{ business }}</span>
              </div>
              <div class="flex justify-between">
                <span>Días 360 (30 días por mes)</span>
                <span class="font-bold">{{ d360 }}</span>
              </div>
            </div>
            <div v-else class="text-center text-gray-500 mt-4">
              Selecciona ambas fechas para calcular.
            </div>
          </div>
        </TabPanel>

        <!-- Tab 2: Calcular fecha final -->
        <TabPanel header="Calcular fecha final" value="final">
          <div class="p-4 flex flex-col items-center">
            <div
              class="flex flex-row gap-6 items-end justify-center mb-4 w-full max-w-lg"
            >
              <div class="flex flex-col items-center flex-1">
                <label class="font-medium mb-1">Fecha inicial</label>
                <Calendar
                  v-model="fromFinal"
                  name="fromFinal"
                  id="fromFinal"
                  showIcon
                  dateFormat="yy-mm-dd"
                  class="w-full"
                  iconDisplay="input"
                  :dateClass="dateClass"
                  lang="es"
                >
                  <template #inputicon>
                    <CalendarIcon class="w-5 h-5 text-blue-500" />
                  </template>
                </Calendar>
                <small class="text-gray-500 mt-1"
                  >Ingrese la fecha inicial</small
                >
              </div>
              <div class="flex flex-col items-center flex-1">
                <label class="font-medium mb-1"># de días</label>
                <InputNumber
                  v-model="daysToAdd"
                  name="daysToAdd"
                  id="daysToAdd"
                  class="w-full text-right"
                  :minFractionDigits="0"
                  :maxFractionDigits="0"
                  placeholder="0"
                  :step="1"
                  showButtons
                />
                <small class="text-gray-500 mt-1"
                  >Puede ser positivo o negativo</small
                >
              </div>
            </div>

            <div class="flex flex-col items-center w-full max-w-lg mb-4">
              <label class="font-medium mb-1">Tipo de días</label>
              <Select
                v-model="dayType"
                :options="dayTypeOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                placeholder="Seleccionar tipo"
              />
              <small class="text-gray-500 mt-1">{{
                getDayTypeDescription()
              }}</small>
            </div>

            <div class="flex items-center justify-center gap-2 mb-4">
              <input
                type="checkbox"
                v-model="includeStartFinal"
                id="includeStartFinal"
                class="form-checkbox"
              />
              <label for="includeStartFinal" class="select-none"
                >Incluir día inicial en el cálculo</label
              >
            </div>

            <div class="flex justify-center mb-4 w-full max-w-lg">
              <Button
                @click="calculateFinalDate"
                :disabled="!fromFinal || daysToAdd === null"
                class="px-6 py-2 w-full flex items-center justify-center gap-2"
              >
                <CalendarCheck class="w-5 h-5" />
                Calcular fecha final
              </Button>
            </div>

            <div v-if="calculatedFinalDate" class="text-center">
              <div class="text-lg font-medium mb-2">Fecha final:</div>
              <div class="text-2xl font-bold text-primary-700">
                {{ calculatedFinalDate }}
              </div>
            </div>
            <div v-else class="text-center text-gray-500 mt-4">
              Selecciona una fecha inicial y número de días, luego haz clic en
              calcular.
            </div>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Calendar from "primevue/calendar";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { Calendar as CalendarIcon, CalendarCheck } from "lucide-vue-next";
import {
  businessDaysColombia,
  calendarDays,
  days360,
  addCalendarDays,
  addBusinessDaysColombia,
  addDays360,
} from "@/utils/colombiaBusinessDays";

// Variables para el primer tab (diferencia entre fechas)
const from = ref<Date | null>(null);
const to = ref<Date | null>(null);
const includeStart = ref(false);

// Variables para el segundo tab (calcular fecha final)
const fromFinal = ref<Date | null>(null);
const daysToAdd = ref<number | null>(null);
const dayType = ref<string>("business");
const includeStartFinal = ref(false);
const calculatedFinalDate = ref<string>("");
const activeTab = ref(0);

// Opciones para el tipo de días
const dayTypeOptions = [
  { label: "Días hábiles colombianos", value: "business" },
  { label: "Días calendario", value: "calendar" },
  { label: "Días 360", value: "d360" },
];

function dateClass(date: Date) {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return "weekend-cell";
  }
  return "";
}

function getDayTypeDescription(): string {
  switch (dayType.value) {
    case "business":
      return "Excluye fines de semana y festivos colombianos";
    case "calendar":
      return "Incluye todos los días del calendario";
    case "d360":
      return "Método 30/360 (30 días por mes)";
    default:
      return "";
  }
}

function calculateFinalDate() {
  if (!fromFinal.value || daysToAdd.value === null) return;

  let result: Date;

  switch (dayType.value) {
    case "business":
      result = addBusinessDaysColombia(
        fromFinal.value,
        daysToAdd.value,
        includeStartFinal.value
      );
      break;
    case "calendar":
      result = addCalendarDays(
        fromFinal.value,
        daysToAdd.value,
        includeStartFinal.value
      );
      break;
    case "d360":
      result = addDays360(
        fromFinal.value,
        daysToAdd.value,
        includeStartFinal.value
      );
      break;
    default:
      return;
  }

  // Formatear como YYYY-MM-DD
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");
  calculatedFinalDate.value = `${year}-${month}-${day}`;
}

// Computed properties para el primer tab
const calendar = computed(() => {
  if (!from.value || !to.value) return "";
  return calendarDays(from.value, to.value, includeStart.value);
});

const business = computed(() => {
  if (!from.value || !to.value) return "";
  return businessDaysColombia(from.value, to.value, includeStart.value);
});

const d360 = computed(() => {
  if (!from.value || !to.value) return "";
  return days360(from.value, to.value, includeStart.value);
});
</script>

<style scoped>
.container {
  min-height: 60vh;
}
.weekend-cell {
  background-color: #f3f4f6 !important; /* gris claro */
  color: #6b7280 !important; /* texto gris */
  border-radius: 6px;
}
</style>
