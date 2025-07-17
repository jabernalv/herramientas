<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import RadioButton from "primevue/radiobutton";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  Copy,
  Clock,
  Calendar as CalendarIcon,
  Type,
  Globe,
  Settings,
} from "lucide-vue-next";
import Toast from "primevue/toast";

interface TimeZone {
  label: string;
  value: string;
  offset: string;
}

interface DateFormat {
  label: string;
  value: string;
  example: string;
}

const timeZones: TimeZone[] = [
  { label: "UTC", value: "UTC", offset: "+00:00" },
  { label: "GMT", value: "GMT", offset: "+00:00" },
  { label: "EST (UTC-5)", value: "America/New_York", offset: "-05:00" },
  { label: "CST (UTC-6)", value: "America/Chicago", offset: "-06:00" },
  { label: "MST (UTC-7)", value: "America/Denver", offset: "-07:00" },
  { label: "PST (UTC-8)", value: "America/Los_Angeles", offset: "-08:00" },
  { label: "Bogotá (UTC-5)", value: "America/Bogota", offset: "-05:00" },
  { label: "Madrid (UTC+1)", value: "Europe/Madrid", offset: "+01:00" },
  { label: "Londres (UTC+0)", value: "Europe/London", offset: "+00:00" },
  { label: "París (UTC+1)", value: "Europe/Paris", offset: "+01:00" },
  { label: "Berlín (UTC+1)", value: "Europe/Berlin", offset: "+01:00" },
  { label: "Roma (UTC+1)", value: "Europe/Rome", offset: "+01:00" },
  { label: "Moscú (UTC+3)", value: "Europe/Moscow", offset: "+03:00" },
  { label: "Tokio (UTC+9)", value: "Asia/Tokyo", offset: "+09:00" },
  { label: "Pekín (UTC+8)", value: "Asia/Shanghai", offset: "+08:00" },
  { label: "Singapur (UTC+8)", value: "Asia/Singapore", offset: "+08:00" },
  { label: "Sídney (UTC+10)", value: "Australia/Sydney", offset: "+10:00" },
];

const dateFormats: DateFormat[] = [
  { label: "ISO 8601", value: "iso", example: "2024-01-15T10:30:00.000Z" },
  {
    label: "Fecha completa",
    value: "full",
    example: "15 de enero de 2024, 10:30:00",
  },
  { label: "Fecha corta", value: "short", example: "15/01/2024 10:30" },
  { label: "Solo fecha", value: "date", example: "15/01/2024" },
  { label: "Solo hora", value: "time", example: "10:30:00" },
  { label: "Unix timestamp", value: "unix", example: "1705312200" },
  {
    label: "RFC 2822",
    value: "rfc2822",
    example: "Mon, 15 Jan 2024 10:30:00 GMT",
  },
  { label: "RFC 3339", value: "rfc3339", example: "2024-01-15T10:30:00Z" },
];

const inputDate = ref<Date | null>(new Date());
const inputText = ref<string>("");
const selectedTimeZone = ref<TimeZone>(timeZones[0]);
const selectedFormat = ref<DateFormat>(dateFormats[0]);
const inputType = ref<string>("date");
const copied = ref<boolean>(false);

// Cargar configuraciones guardadas
const loadSavedSettings = () => {
  const savedTimeZone = localStorage.getItem("datetime-timezone");
  if (savedTimeZone) {
    const found = timeZones.find((tz) => tz.value === savedTimeZone);
    if (found) selectedTimeZone.value = found;
  }

  const savedFormat = localStorage.getItem("datetime-format");
  if (savedFormat) {
    const found = dateFormats.find((format) => format.value === savedFormat);
    if (found) selectedFormat.value = found;
  }

  const savedInputType = localStorage.getItem("datetime-input-type");
  if (savedInputType) inputType.value = savedInputType;

  const savedInputText = localStorage.getItem("datetime-input-text");
  if (savedInputText) inputText.value = savedInputText;
};

// Guardar configuraciones en localStorage
const saveSettings = () => {
  localStorage.setItem("datetime-timezone", selectedTimeZone.value.value);
  localStorage.setItem("datetime-format", selectedFormat.value.value);
  localStorage.setItem("datetime-input-type", inputType.value);
  localStorage.setItem("datetime-input-text", inputText.value);
};

const convertedDate = computed(() => {
  if (!inputDate.value) return "";

  try {
    const date = new Date(inputDate.value);

    switch (selectedFormat.value.value) {
      case "iso":
        return date.toISOString();
      case "full":
        return date.toLocaleString("es-ES", {
          timeZone: selectedTimeZone.value.value,
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      case "short":
        return date.toLocaleString("es-ES", {
          timeZone: selectedTimeZone.value.value,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      case "date":
        return date.toLocaleDateString("es-ES", {
          timeZone: selectedTimeZone.value.value,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      case "time":
        return date.toLocaleTimeString("es-ES", {
          timeZone: selectedTimeZone.value.value,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      case "unix":
        return Math.floor(date.getTime() / 1000).toString();
      case "rfc2822":
        return date.toUTCString();
      case "rfc3339":
        return date.toISOString().replace(/\.\d{3}Z$/, "Z");
      default:
        return date.toISOString();
    }
  } catch (error) {
    return "Error en la conversión";
  }
});

const parseInputText = () => {
  if (!inputText.value.trim()) return;

  const text = inputText.value.trim();

  // Intentar diferentes formatos
  let parsedDate: Date | null = null;

  // Unix timestamp
  if (/^\d{10,13}$/.test(text)) {
    const timestamp = parseInt(text);
    parsedDate = new Date(
      timestamp > 9999999999 ? timestamp : timestamp * 1000
    );
  }
  // ISO format
  else if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
    parsedDate = new Date(text);
  }
  // RFC formats
  else if (text.includes("GMT") || text.includes("UTC")) {
    parsedDate = new Date(text);
  }
  // Date string
  else {
    parsedDate = new Date(text);
  }

  if (parsedDate && !isNaN(parsedDate.getTime())) {
    inputDate.value = parsedDate;
  }
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(convertedDate.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }
};

const setCurrentTime = () => {
  inputDate.value = new Date();
};

const clearInput = () => {
  inputDate.value = null;
  inputText.value = "";
};

onMounted(() => {
  setCurrentTime();
  loadSavedSettings();
});

// Watchers para guardar configuraciones
watch(selectedTimeZone, saveSettings);
watch(selectedFormat, saveSettings);
watch(inputType, saveSettings);
watch(inputText, saveSettings);
</script>

<template>
  <div class="w-full">
    <Toast />
    <BreadcrumbNav />

    <div class="min-h-screen bg-surface-ground py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
            🕐 Conversor de Fechas y Tiempos
          </h1>
          <p class="text-xl text-surface-600">
            Convierte fechas entre diferentes formatos y zonas horarias.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Panel de entrada -->
          <Card>
            <template #title>
              <div class="flex items-center">
                <CalendarIcon class="w-5 h-5 mr-2" />
                Entrada
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Tipo de entrada -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Tipo de entrada
                  </label>
                  <div class="flex space-x-4">
                    <label class="flex items-center">
                      <RadioButton
                        v-model="inputType"
                        inputId="date-input"
                        value="date"
                        class="mr-2"
                      />
                      <label for="date-input" class="ml-2"
                        >Selector de fecha</label
                      >
                    </label>
                    <label class="flex items-center">
                      <RadioButton
                        v-model="inputType"
                        inputId="text-input"
                        value="text"
                        class="mr-2"
                      />
                      <label for="text-input" class="ml-2">Texto libre</label>
                    </label>
                  </div>
                </div>

                <!-- Selector de fecha -->
                <div v-if="inputType === 'date'">
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Fecha y hora
                  </label>
                  <Calendar
                    v-model="inputDate"
                    showTime
                    showSeconds
                    showIcon
                    class="w-full"
                    :showButtonBar="true"
                  />
                </div>

                <!-- Entrada de texto -->
                <div v-if="inputType === 'text'">
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Fecha en texto
                  </label>
                  <InputGroup class="w-full">
                    <InputGroupAddon>
                      <Type class="w-4 h-4 text-surface-500" />
                    </InputGroupAddon>
                    <InputText
                      v-model="inputText"
                      class="w-full"
                      placeholder="Ej: 2024-01-15T10:30:00, 1705312200, 15/01/2024..."
                    />
                  </InputGroup>
                  <p class="text-xs text-surface-600 mt-1">
                    Formatos soportados: ISO, Unix timestamp, RFC, fechas
                    locales
                  </p>
                  <Button
                    @click="parseInputText"
                    severity="secondary"
                    size="small"
                    class="mt-2"
                  >
                    Parsear fecha
                  </Button>
                </div>

                <!-- Zona horaria -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Zona horaria
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Globe class="w-4 h-4" />
                    </InputGroupAddon>
                    <Select
                      v-model="selectedTimeZone"
                      :options="timeZones"
                      optionLabel="label"
                      placeholder="Selecciona zona horaria"
                      class="w-full"
                    />
                  </InputGroup>
                </div>

                <!-- Formato de salida -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Formato de salida
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Settings class="w-4 h-4" />
                    </InputGroupAddon>
                    <Select
                      v-model="selectedFormat"
                      :options="dateFormats"
                      optionLabel="label"
                      placeholder="Selecciona formato"
                      class="w-full"
                    />
                  </InputGroup>
                  <p class="text-xs text-surface-600 mt-1">
                    Ejemplo: {{ selectedFormat.example }}
                  </p>
                </div>

                <!-- Botones de acción -->
                <div class="flex space-x-3">
                  <Button
                    @click="setCurrentTime"
                    class="flex-1"
                    severity="primary"
                  >
                    <Clock class="w-4 h-4 mr-2" />
                    Hora actual
                  </Button>
                  <Button
                    @click="clearInput"
                    class="flex-1"
                    severity="secondary"
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </template>
          </Card>

          <!-- Panel de resultado -->
          <Card>
            <template #title>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <Clock class="w-5 h-5 mr-2" />
                  Resultado
                </div>
                <Button
                  @click="copyToClipboard"
                  :disabled="!convertedDate"
                  size="small"
                  :severity="copied ? 'success' : 'secondary'"
                >
                  <Copy class="w-4 h-4 mr-2" />
                  {{ copied ? "Copiado!" : "Copiar" }}
                </Button>
              </div>
            </template>
            <template #content>
              <div class="space-y-4">
                <div class="bg-surface-100 p-4 rounded-lg">
                  <div class="text-sm text-surface-600 mb-2">
                    {{ selectedFormat.label }} en {{ selectedTimeZone.label }}
                  </div>
                  <div class="font-mono text-lg break-all">
                    {{ convertedDate || "Selecciona una fecha" }}
                  </div>
                </div>

                <!-- Información adicional -->
                <div
                  v-if="inputDate"
                  class="space-y-2 text-sm text-surface-600"
                >
                  <div class="flex justify-between">
                    <span>Timestamp Unix:</span>
                    <span class="font-mono">{{
                      Math.floor(inputDate.getTime() / 1000)
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Timestamp JavaScript:</span>
                    <span class="font-mono">{{ inputDate.getTime() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Día de la semana:</span>
                    <span>{{
                      inputDate.toLocaleDateString("es-ES", { weekday: "long" })
                    }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Semana del año:</span>
                    <span>{{
                      Math.ceil(
                        (inputDate.getTime() -
                          new Date(inputDate.getFullYear(), 0, 1).getTime()) /
                          (7 * 24 * 60 * 60 * 1000)
                      )
                    }}</span>
                  </div>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
