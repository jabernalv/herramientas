<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Toast from "primevue/toast";
import Slider from "primevue/slider";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import ColorPicker from "primevue/colorpicker";
import {
  SlidersHorizontal,
  Plus,
  RefreshCw,
  Lock,
  LockOpen,
  Eye,
  Trash2,
  Copy,
  Settings,
  Check,
} from "lucide-vue-next";
import Textarea from "primevue/textarea";
import IconAngle from "@/components/icons/IconAngle.vue";

interface ColorStop {
  color: string;
  position: number;
  opacity: number;
  locked: boolean;
}

const STORAGE_KEY = "gradient-generator-state";
const CLASSNAME_KEY = "gradient-css-classname";
const HISTORY_KEY = "gradient-generator-history";
const toast = useToast();
const colorStops = ref<ColorStop[]>([
  { color: "#ff0000", position: 0, opacity: 1, locked: false },
  { color: "#0000ff", position: 100, opacity: 1, locked: false },
]);
const angle = ref(90);
const isGenerating = ref(false);
const cssClassName = ref(localStorage.getItem(CLASSNAME_KEY) || "mi-gradiente");
const cssClassError = ref("");
const cssClassBlock = ref("");
const gradientHistory = ref<
  Array<{
    id: string;
    colorStops: ColorStop[];
    angle: number;
    timestamp: number;
    name?: string;
  }>
>([]);
const NAVHEADER_GRADIENT_KEY = "NAVHEADER_GRADIENT";
const DEFAULT_GRADIENT =
  "linear-gradient(75deg, rgba(72, 107, 173, 1) 0%, rgba(15, 28, 184, 1) 25%, rgba(86, 58, 235, 1) 50%, rgba(43, 101, 162, 1) 75%, rgba(7, 9, 255, 1) 100%)";

// Cargar estado guardado al iniciar
onMounted(() => {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    try {
      const { colorStops: savedColorStops, angle: savedAngle } =
        JSON.parse(savedState);
      colorStops.value = savedColorStops;
      angle.value = savedAngle;
    } catch (error) {
      console.error("Error al cargar el estado guardado:", error);
    }
  }

  // Cargar historial de gradientes
  loadGradientHistory();
});

// Guardar cambios en LocalStorage
watch(
  [colorStops, angle],
  () => {
    const state = {
      colorStops: colorStops.value,
      angle: angle.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  { deep: true }
);

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const addColorStop = () => {
  if (colorStops.value.length < 5) {
    const lastPosition = colorStops.value[colorStops.value.length - 1].position;
    const newPosition = Math.min(lastPosition + 20, 100);
    colorStops.value.push({
      color: "#00ff00",
      position: newPosition,
      opacity: 1,
      locked: false,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "Límite alcanzado",
      detail: "No se pueden agregar más de 5 colores",
      life: 3000,
    });
  }
};

const removeColorStop = (index: number) => {
  if (colorStops.value.length > 2) {
    colorStops.value.splice(index, 1);
  } else {
    toast.add({
      severity: "warn",
      summary: "Límite alcanzado",
      detail: "Se requieren al menos 2 colores",
      life: 3000,
    });
  }
};

const toggleLock = (index: number) => {
  colorStops.value[index].locked = !colorStops.value[index].locked;
};

const generateGradient = () => {
  isGenerating.value = true;

  // Generar colores aleatorios solo para los no bloqueados
  colorStops.value.forEach((stop) => {
    if (!stop.locked) {
      const randomColor =
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");
      stop.color = randomColor;
    }
  });

  // Guardar el nuevo gradiente en el historial
  saveToHistory();

  isGenerating.value = false;
};

const gradientStyle = computed(() => {
  const stops = colorStops.value
    .map((stop) => {
      const rgb = hexToRgb(stop.color);
      return rgb
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.opacity}) ${stop.position}%`
        : `${stop.color} ${stop.position}%`;
    })
    .join(", ");
  return `linear-gradient(${angle.value}deg, ${stops})`;
});

const hexGradient = computed(() => {
  const stops = colorStops.value
    .map((stop) => {
      // Convert opacity (0-1) to hex (00-ff)
      const opacityHex = Math.round(stop.opacity * 255)
        .toString(16)
        .padStart(2, "0");
      // Remove the # from the color and add the opacity
      const colorWithOpacity = stop.color.replace("#", "") + opacityHex;
      return `#${colorWithOpacity} ${stop.position}%`;
    })
    .join(", ");
  return `background: linear-gradient(${angle.value}deg, ${stops});`;
});

const rgbGradient = computed(() => {
  const stops = colorStops.value
    .map((stop) => {
      const rgb = hexToRgb(stop.color);
      return rgb
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.opacity}) ${stop.position}%`
        : `${stop.color} ${stop.position}%`;
    })
    .join(", ");
  return `background: linear-gradient(${angle.value}deg, ${stops});`;
});

const copyToClipboard = (text: string, format: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: `Gradiente en formato ${format} copiado al portapapeles`,
      life: 2000,
    });
  });
};

const validateHexColor = (color: string): boolean => {
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color);
};

const handleHexInput = (value: string | undefined, index: number) => {
  if (!value) return;

  // Asegurar que el valor comience con #
  const hexValue = value.startsWith("#") ? value : `#${value}`;

  if (validateHexColor(hexValue)) {
    colorStops.value[index].color = hexValue;
  } else {
    toast.add({
      severity: "error",
      summary: "Formato inválido",
      detail:
        "El color debe ser un valor hexadecimal de 6 caracteres (ej: #FF0000)",
      life: 3000,
    });
    // Restaurar el valor anterior
    colorStops.value[index].color = colorStops.value[index].color;
  }
};

function validateCssClassName(name: string): boolean {
  // Debe empezar con letra o guion bajo, y solo contener letras, números, guion y guion bajo
  return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name);
}

function generateCssClassBlock() {
  if (!validateCssClassName(cssClassName.value)) {
    cssClassError.value =
      "Nombre de clase inválido. Usa solo letras, números, guion y guion bajo, y no empieces con número.";
    cssClassBlock.value = "";
    return;
  }
  cssClassError.value = "";
  cssClassBlock.value = `.${cssClassName.value} {\n  ${rgbGradient.value}\n}`;
  localStorage.setItem(CLASSNAME_KEY, cssClassName.value);
}

function copyCssClassBlock() {
  if (cssClassBlock.value) {
    navigator.clipboard.writeText(cssClassBlock.value).then(() => {
      toast.add({
        severity: "success",
        summary: "Copiado",
        detail: `Clase CSS copiada al portapapeles`,
        life: 2000,
      });
    });
  }
}

// Función para usar el eyedropper
function useEyedropper(index: number) {
  if (colorStops.value[index].locked) return;
  if ("EyeDropper" in window) {
    const eyeDropper = new (window as any).EyeDropper();
    eyeDropper
      .open()
      .then((result: any) => {
        colorStops.value[index].color = result.sRGBHex;
      })
      .catch(() => {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "No se pudo seleccionar el color",
          life: 3000,
        });
      });
  } else {
    toast.add({
      severity: "warn",
      summary: "No compatible",
      detail: "Tu navegador no soporta el selector de color",
      life: 3000,
    });
  }
}

function applyGradientToNavHeader() {
  // Usar solo el valor de gradientStyle (sin 'background:')
  const gradient = gradientStyle.value.startsWith("linear-gradient")
    ? gradientStyle.value
    : gradientStyle.value.replace(/^background:\s*/, "").replace(/;$/, "");
  localStorage.setItem(NAVHEADER_GRADIENT_KEY, gradient);
  window.dispatchEvent(new Event("navheader-gradient-updated"));
  toast.add({
    severity: "success",
    summary: "NavHeader actualizado",
    detail: "El degradado se aplicó al navheader",
    life: 2000,
  });
}

function restoreDefaultNavHeaderGradient() {
  localStorage.setItem(NAVHEADER_GRADIENT_KEY, DEFAULT_GRADIENT);
  window.dispatchEvent(new Event("navheader-gradient-updated"));
  toast.add({
    severity: "info",
    summary: "Restaurado",
    detail: "Se restauró el degradado por defecto en el navheader",
    life: 2000,
  });
}

// Función para convertir HEX a HSL
function hexToHsl(hex: string, opacity: number = 1): string {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  return `hsl(${h}, ${s}%, ${l}%)${
    opacity < 1 ? ` / ${Math.round(opacity * 100) / 100}` : ""
  }`;
}

const hslGradient = computed(() => {
  const stops = colorStops.value
    .map((stop) => {
      return `${hexToHsl(stop.color, stop.opacity)} ${stop.position}%`;
    })
    .join(", ");
  return `background: linear-gradient(${angle.value}deg, ${stops});`;
});

// Funciones para el historial de gradientes
function loadGradientHistory() {
  const savedHistory = localStorage.getItem(HISTORY_KEY);
  if (savedHistory) {
    try {
      gradientHistory.value = JSON.parse(savedHistory);
    } catch (error) {
      console.error("Error al cargar el historial:", error);
      gradientHistory.value = [];
    }
  }
}

function saveToHistory() {
  const newGradient = {
    id: Date.now().toString(),
    colorStops: JSON.parse(JSON.stringify(colorStops.value)),
    angle: angle.value,
    timestamp: Date.now(),
    name: new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  // Agregar al inicio del array
  gradientHistory.value.unshift(newGradient);

  // Mantener solo los últimos 12
  if (gradientHistory.value.length > 12) {
    gradientHistory.value = gradientHistory.value.slice(0, 12);
  }

  // Guardar en localStorage
  localStorage.setItem(HISTORY_KEY, JSON.stringify(gradientHistory.value));
}

function loadFromHistory(historyItem: (typeof gradientHistory.value)[0]) {
  colorStops.value = JSON.parse(JSON.stringify(historyItem.colorStops));
  angle.value = historyItem.angle;

  toast.add({
    severity: "success",
    summary: "Gradiente cargado",
    detail: `Se cargó: ${historyItem.name}`,
    life: 2000,
  });
}

function clearHistory() {
  gradientHistory.value = [];
  localStorage.removeItem(HISTORY_KEY);

  toast.add({
    severity: "info",
    summary: "Historial limpiado",
    detail: "Se eliminó todo el historial de gradientes",
    life: 2000,
  });
}

function removeFromHistory(index: number) {
  const removedGradient = gradientHistory.value[index];
  gradientHistory.value.splice(index, 1);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(gradientHistory.value));

  toast.add({
    severity: "info",
    summary: "Gradiente eliminado",
    detail: `Se eliminó: ${removedGradient.name}`,
    life: 2000,
  });
}
</script>

<template>
  <div class="p-2">
    <Toast />
    <BreadcrumbNav />

    <div class="w-9/10 mx-auto">
      <h1 class="text-2xl font-bold mb-6 text-center text-primary-800">
        Generador de Gradientes
      </h1>

      <!-- Controles -->
      <div class="bg-white rounded-lg shadow-md pl-2 pr-2 mb-2">
        <div class="flex flex-wrap items-end gap-2 mb-2">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ángulo del gradiente (0° - 360°)
            </label>
            <InputGroup>
              <InputGroupAddon>
                <IconAngle />
              </InputGroupAddon>
              <InputNumber
                v-model="angle"
                :min="0"
                :max="360"
                class="w-full"
                showButtons
                suffix="°"
                :step="1"
              />
            </InputGroup>
          </div>
          <div class="flex gap-2">
            <Button
              @click="addColorStop"
              label="Agregar color"
              severity="success"
              :disabled="colorStops.length >= 5"
            >
              <template #icon>
                <Plus class="w-4 h-4 mr-2" />
              </template>
            </Button>
            <Button
              @click="generateGradient"
              label="Generar gradiente"
              severity="info"
              :loading="isGenerating"
              :disabled="colorStops.every((stop: ColorStop) => stop.locked)"
            >
              <template #icon>
                <RefreshCw class="w-4 h-4 mr-2" />
              </template>
            </Button>
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="(stop, index) in colorStops"
            :key="index"
            class="bg-gray-50 p-4 rounded-lg border border-gray-200 flex-1 min-w-[200px]"
          >
            <div class="flex flex-col items-center gap-4">
              <div class="flex flex-row items-center gap-2">
                <div class="grid grid-cols-5 w-full items-center">
                  <div class="col-span-2 flex flex-col gap-0">
                    <ColorPicker
                      v-model="stop.color"
                      class="w-full"
                      :disabled="stop.locked"
                    />
                    <InputText
                      :modelValue="stop.color"
                      @update:modelValue="
                        (value: string | undefined) => handleHexInput(value, index)
                      "
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, index)"
                      class="w-full text-center text-xs input-canoe"
                      :style="{
                        backgroundColor: stop.color,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                      :readonly="stop.locked"
                    />
                  </div>
                  <div
                    class="col-span-1 flex flex-col items-center justify-center"
                  >
                    <Button
                      @click="toggleLock(index)"
                      :severity="stop.locked ? 'warning' : 'secondary'"
                      text
                      rounded
                    >
                      <template #icon>
                        <Lock v-if="stop.locked" class="w-4 h-4" />
                        <LockOpen v-else class="w-4 h-4" />
                      </template>
                    </Button>
                    <Button
                      @click="useEyedropper(index)"
                      severity="secondary"
                      text
                      rounded
                      :title="'Seleccionar color de la pantalla'"
                    >
                      <template #icon>
                        <Eye class="w-4 h-4" />
                      </template>
                    </Button>
                  </div>
                  <div class="col-span-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <SlidersHorizontal />
                      </InputGroupAddon>
                      <InputNumber
                        v-model="stop.position"
                        :min="0"
                        :max="100"
                        suffix="%"
                        class="w-full"
                        showButtons
                        :disabled="stop.locked"
                      />
                    </InputGroup>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Posición: {{ stop.position }}%
                    </label>
                  </div>
                </div>
              </div>
              <div class="w-full flex flex-row gap-2">
                <div class="w-5/6">
                  <div class="flex justify-between items-center mb-2">
                    <label class="text-sm font-medium text-gray-700">
                      Opacidad
                    </label>
                    <span class="text-sm text-gray-600">
                      {{ Math.round(stop.opacity * 100) }}%
                    </span>
                  </div>
                  <div class="flex items-center gap-4">
                    <Slider
                      v-model="stop.opacity"
                      :min="0"
                      :max="1"
                      :step="0.01"
                      class="flex-1"
                      :disabled="stop.locked"
                    />
                  </div>
                </div>
                <div class="w-1/6 flex justify-end">
                  <Button
                    v-if="colorStops.length > 2"
                    severity="danger"
                    text
                    @click="removeColorStop(index)"
                    class="mt-2"
                    :disabled="stop.locked"
                  >
                    <template #icon>
                      <Trash2 class="w-4 h-4" />
                    </template>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vista previa -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-2">
        <h2 class="text-lg font-semibold mb-2">Vista previa</h2>
        <div
          class="w-full h-24 rounded-lg mb-4"
          :style="{ background: gradientStyle }"
        ></div>

        <!-- Código del gradiente -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Código CSS (HEX)
            </label>
            <div class="flex gap-2">
              <InputText
                :value="hexGradient"
                readonly
                class="flex-1 font-mono"
              />
              <Button text @click="copyToClipboard(hexGradient, 'HEX')">
                <template #icon>
                  <Copy class="w-4 h-4" />
                </template>
              </Button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Código CSS (RGBA)
            </label>
            <div class="flex gap-2">
              <InputText
                :value="rgbGradient"
                readonly
                class="flex-1 font-mono"
              />
              <Button text @click="copyToClipboard(rgbGradient, 'RGBA')">
                <template #icon>
                  <Copy class="w-4 h-4" />
                </template>
              </Button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Código CSS (HSL)
            </label>
            <div class="flex gap-2">
              <InputText
                :value="hslGradient"
                readonly
                class="flex-1 font-mono"
              />
              <Button text @click="copyToClipboard(hslGradient, 'HSL')">
                <template #icon>
                  <Copy class="w-4 h-4" />
                </template>
              </Button>
            </div>
          </div>

          <!-- Exportar como clase CSS -->
          <div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Exportar como clase CSS
              </label>
            </div>
            <div class="flex flex-col md:flex-row md:justify-start gap-2">
              <div class="w-full md:w-[500px]">
                <InputGroup>
                  <InputGroupAddon>
                    <Settings class="w-4 h-4" />
                  </InputGroupAddon>
                  <InputText
                    v-model="cssClassName"
                    name="cssClassName"
                    id="css-class-name"
                    placeholder="Nombre de la clase"
                    class="font-mono w-full"
                    @input="generateCssClassBlock"
                  />
                </InputGroup>
              </div>
              <div class="w-full md:w-auto">
                <Button
                  label="Generar clase"
                  @click="generateCssClassBlock"
                  severity="info"
                >
                  <template #icon>
                    <Settings class="w-4 h-4 mr-2" />
                  </template>
                </Button>
              </div>
              <div class="w-full md:w-auto">
                <Button
                  label="Copiar"
                  @click="copyCssClassBlock"
                  severity="success"
                  :disabled="!cssClassBlock"
                >
                  <template #icon>
                    <Copy class="w-4 h-4 mr-2" />
                  </template>
                </Button>
              </div>
            </div>
            <div v-if="cssClassError" class="text-xs text-red-500 mt-1">
              {{ cssClassError }}
            </div>
            <div v-if="cssClassBlock" class="mt-2">
              <label class="block text-xs text-gray-500 mb-1"
                >Clase generada:</label
              >
              <Textarea
                :value="cssClassBlock"
                rows="3"
                class="w-full font-mono"
                readonly
              />
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <Button
            label="Aplicar este gradiente al navheader"
            severity="success"
            @click="applyGradientToNavHeader"
          >
            <template #icon>
              <Check class="w-4 h-4 mr-2" />
            </template>
          </Button>
          <Button
            label="Restaurar degradado por defecto"
            severity="info"
            @click="restoreDefaultNavHeaderGradient"
          >
            <template #icon>
              <RefreshCw class="w-4 h-4 mr-2" />
            </template>
          </Button>
        </div>
      </div>

      <!-- Historial de gradientes -->
      <div
        v-if="gradientHistory.length > 0"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Historial de Gradientes</h2>
          <Button
            label="Limpiar historial"
            severity="danger"
            size="small"
            @click="clearHistory"
          >
            <template #icon>
              <Trash2 class="w-4 h-4 mr-2" />
            </template>
          </Button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="(historyItem, index) in gradientHistory"
            :key="historyItem.id"
            class="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <!-- Vista previa del gradiente -->
            <div
              class="h-16 w-full cursor-pointer"
              :style="{
                background: `linear-gradient(${
                  historyItem.angle
                }deg, ${historyItem.colorStops
                  .map((stop: ColorStop) => {
                    const rgb = hexToRgb(stop.color);
                    return rgb
                      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.opacity}) ${stop.position}%`
                      : `${stop.color} ${stop.position}%`;
                  })
                  .join(', ')})`,
              }"
              @click="loadFromHistory(historyItem)"
              title="Clic para cargar este gradiente"
            ></div>

            <!-- Información del gradiente -->
            <div class="p-3">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="font-medium text-sm text-gray-800">
                    {{ historyItem.name }}
                  </h3>
                  <p class="text-xs text-gray-500">
                    {{ new Date(historyItem.timestamp).toLocaleString() }}
                  </p>
                  <p class="text-xs text-gray-600">
                    Ángulo: {{ historyItem.angle }}° •
                    {{ historyItem.colorStops.length }} colores
                  </p>
                </div>
                <Button
                  severity="danger"
                  size="small"
                  text
                  @click="removeFromHistory(index)"
                  title="Eliminar del historial"
                >
                  <template #icon>
                    <Trash2 class="w-3 h-3" />
                  </template>
                </Button>
              </div>

              <div class="flex gap-1 mt-2">
                <Button
                  label="Cargar"
                  size="small"
                  severity="success"
                  @click="loadFromHistory(historyItem)"
                  class="flex-1"
                >
                  <template #icon>
                    <RefreshCw class="w-3 h-3 mr-1" />
                  </template>
                </Button>
                <Button
                  size="small"
                  severity="secondary"
                  @click="
                    copyToClipboard(
                      `background: linear-gradient(${
                        historyItem.angle
                      }deg, ${historyItem.colorStops
                        .map((stop: ColorStop) => {
                          const rgb = hexToRgb(stop.color);
                          return rgb
                            ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${stop.opacity}) ${stop.position}%`
                            : `${stop.color} ${stop.position}%`;
                        })
                        .join(', ')});`,
                      'CSS'
                    )
                  "
                  title="Copiar CSS"
                >
                  <template #icon>
                    <Copy class="w-3 h-3" />
                  </template>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputtext) {
  padding: 0.25rem;
  font-family: monospace;
}

:deep(.p-inputtext:focus) {
  box-shadow: none;
  border-color: var(--primary-color);
}

:deep(.p-slider) {
  width: 100%;
}

:deep(.p-slider .p-slider-handle) {
  transition: transform 0.2s;
}

:deep(.p-slider .p-slider-handle:hover) {
  transform: scale(1.2);
}

:deep(.p-colorpicker-preview) {
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem 0.5rem 0 0 !important;
}

:deep(.p-colorpicker-panel) {
  width: 100%;
  max-width: 300px;
  z-index: 1000;
}

:deep(.p-inputtext) {
  padding: 0.25rem;
  font-family: monospace;
}

:deep(.p-inputtext:focus) {
  box-shadow: none;
  border-color: var(--primary-color);
}
.input-canoe {
  border-radius: 0 0 0.5rem 0.5rem !important;
}
</style>
