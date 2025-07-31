<template>
  <div class="min-h-screen mb-16">
    <BreadcrumbNav />
    <div class="container mx-auto max-w-xl py-8">
      <h1 class="text-3xl font-bold mb-4 text-primary-700 text-center">
        Cálculo de días
      </h1>
      <Tabs
        :value="activeTab"
        @update:value="activeTab = String($event)"
        class="bg-white rounded shadow"
      >
        <TabList>
          <Tab value="diff" class="flex items-center gap-2">
            <CalendarRange class="w-4 h-4" />
            Días entre fechas
          </Tab>
          <Tab value="final" class="flex items-center gap-2">
            <CalendarPlus class="w-4 h-4" />
            Calcular fecha final
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="diff">
            <div class="p-4">
              <div
                class="flex flex-col sm:flex-row gap-4 items-center justify-center mb-4"
              >
                <div class="flex flex-col items-center w-full sm:flex-1">
                  <label class="font-medium mb-1">Fecha inicial</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Calendar class="w-4 h-4" />
                    </InputGroupAddon>
                    <DatePicker
                      v-model="from"
                      name="from"
                      id="from"
                      inputClass="w-full"
                      :pt="{ input: { lang: 'es' } }"
                    />
                  </InputGroup>
                  <Message severity="info" variant="simple" size="small">
                    Ingrese la fecha inicial
                  </Message>
                </div>
                <div class="flex flex-col items-center w-full sm:flex-1">
                  <label class="font-medium mb-1">Fecha final</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Calendar class="w-4 h-4" />
                    </InputGroupAddon>
                    <DatePicker
                      v-model="to"
                      name="to"
                      id="to"
                      inputClass="w-full"
                      :pt="{ input: { lang: 'es' } }"
                    />
                  </InputGroup>
                  <Message severity="info" variant="simple" size="small">
                    Ingrese la fecha final
                  </Message>
                </div>
              </div>
              <div class="flex items-center justify-center gap-2 mb-4">
                <Checkbox
                  v-model="includeStart"
                  inputId="includeStart"
                  binary
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
          <TabPanel value="final">
            <div class="p-4 flex flex-col items-center">
              <div
                class="flex flex-col sm:flex-row gap-6 items-end justify-center mb-4 w-full max-w-lg"
              >
                <div class="flex flex-col items-center w-full sm:flex-1">
                  <label class="font-medium mb-1">Fecha inicial</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Calendar class="w-4 h-4" />
                    </InputGroupAddon>
                    <DatePicker
                      v-model="fromFinal"
                      name="fromFinal"
                      id="fromFinal"
                      inputClass="w-full"
                      :pt="{ input: { lang: 'es' } }"
                      class="w-full"
                    />
                  </InputGroup>
                  <Message severity="info" variant="simple" size="small">
                    Ingrese la fecha inicial
                  </Message>
                </div>
                <div class="flex flex-col items-center w-full sm:flex-1">
                  <label class="font-medium mb-1"># de días</label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Minus class="w-4 h-4" />
                    </InputGroupAddon>
                    <InputNumber
                      v-model="daysToAdd"
                      name="daysToAdd"
                      id="daysToAdd"
                      class="w-full text-right"
                      :minFractionDigits="0"
                      :maxFractionDigits="0"
                      placeholder="0"
                      :step="1"
                      show-buttons
                      :inputStyle="{
                        paddingRight: '2.5rem',
                        textAlign: 'right',
                      }"
                    />
                  </InputGroup>
                  <Message severity="info" variant="simple" size="small">
                    Puede ser positivo o negativo
                  </Message>
                </div>
              </div>
              <div class="flex flex-col items-center w-full max-w-lg mb-4">
                <label class="font-medium mb-1">Tipo de días</label>
                <InputGroup>
                  <InputGroupAddon>
                    <CalendarDays class="w-4 h-4" />
                  </InputGroupAddon>
                  <Select
                    v-model="dayType"
                    :options="dayTypeOptions"
                    optionLabel="label"
                    optionValue="value"
                    class="w-full"
                    placeholder="Seleccionar tipo"
                  />
                </InputGroup>
                <Message severity="info" variant="simple" size="small">
                  {{ getDayTypeDescription() }}
                </Message>
              </div>
              <div class="flex items-center justify-center gap-2 mb-4">
                <Checkbox
                  v-model="includeStartFinal"
                  inputId="includeStartFinal"
                  binary
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
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import DatePicker from "primevue/datepicker";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import {
  CalendarCheck,
  Calendar,
  Minus,
  CalendarDays,
  CalendarRange,
  CalendarPlus,
} from "lucide-vue-next";
import Message from "primevue/message";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
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
const activeTab = ref("diff");

// Cargar tab desde localStorage al montar el componente
onMounted(() => {
  const savedTab = localStorage.getItem("dateCalculator-activeTab");
  if (savedTab && (savedTab === "diff" || savedTab === "final")) {
    activeTab.value = savedTab;
  }
});

// Guardar tab en localStorage cuando cambie
watch(activeTab, (newTab) => {
  localStorage.setItem("dateCalculator-activeTab", newTab);
});

// Opciones para el tipo de días
const dayTypeOptions = [
  { label: "Días hábiles colombianos", value: "business" },
  { label: "Días calendario", value: "calendar" },
  { label: "Días 360", value: "d360" },
];

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
</style>
