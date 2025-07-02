<template>
  <div class="container mx-auto max-w-xl py-8">
    <h1 class="text-3xl font-bold mb-4 text-primary-700 text-center">
      Calculadora de Días entre Fechas
    </h1>
    <div class="bg-white rounded shadow p-4 mb-6">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Calendar from "primevue/calendar";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import {
  businessDaysColombia,
  calendarDays,
  days360,
} from "@/utils/colombiaBusinessDays";

const from = ref<Date | null>(null);
const to = ref<Date | null>(null);
const includeStart = ref(false);

function dateClass(date: Date) {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return "weekend-cell";
  }
  return "";
}

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
