<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ColorPicker from "primevue/colorpicker";
import Card from "primevue/card";
import { Copy, Palette, Eye, RefreshCw } from "lucide-vue-next";
import Toast from "primevue/toast";

interface ColorFormat {
  label: string;
  value: string;
  example: string;
}

const colorFormats: ColorFormat[] = [
  { label: "HEX", value: "hex", example: "#FF0000" },
  { label: "RGB", value: "rgb", example: "rgb(255, 0, 0)" },
  { label: "RGBA", value: "rgba", example: "rgba(255, 0, 0, 1)" },
  { label: "HSL", value: "hsl", example: "hsl(0, 100%, 50%)" },
  { label: "HSLA", value: "hsla", example: "hsla(0, 100%, 50%, 1)" },
  { label: "CMYK", value: "cmyk", example: "cmyk(0%, 100%, 100%, 0%)" },
  { label: "HSV", value: "hsv", example: "hsv(0, 100%, 100%)" },
  { label: "Decimal", value: "decimal", example: "16711680" },
];

const selectedColor = ref("#FF0000");
const selectedFormat = ref<string>("hex");
const copied = ref<boolean>(false);

// Cargar configuraciones guardadas
const loadSavedSettings = () => {
  const savedColor = localStorage.getItem("color-converter-selected");
  if (savedColor) selectedColor.value = savedColor;

  const savedFormat = localStorage.getItem("color-converter-format");
  if (savedFormat) {
    const found = colorFormats.find((format) => format.value === savedFormat);
    if (found) selectedFormat.value = found.value;
  }
};

// Guardar configuraciones en localStorage
const saveSettings = () => {
  localStorage.setItem("color-converter-selected", selectedColor.value);
  localStorage.setItem("color-converter-format", selectedFormat.value);
};

// Convertir HEX a RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Convertir RGB a HSL
const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Convertir RGB a HSV
const rgbToHsv = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; v: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
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

  return { h: h * 360, s: s * 100, v: v * 100 };
};

// Convertir RGB a CMYK
const rgbToCmyk = (
  r: number,
  g: number,
  b: number
): { c: number; m: number; y: number; k: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
};

// Convertir RGB a decimal
const rgbToDecimal = (r: number, g: number, b: number): number => {
  return (r << 16) + (g << 8) + b;
};

const convertedColor = computed(() => {
  const rgb = hexToRgb(selectedColor.value);
  if (!rgb) return "Color inválido";

  const { r, g, b } = rgb;
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const decimal = rgbToDecimal(r, g, b);

  switch (selectedFormat.value) {
    case "hex":
      return selectedColor.value.toUpperCase();
    case "rgb":
      return `rgb(${r}, ${g}, ${b})`;
    case "rgba":
      return `rgba(${r}, ${g}, ${b}, 1)`;
    case "hsl":
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%)`;
    case "hsla":
      return `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%, 1)`;
    case "hsv":
      return `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(
        hsv.v
      )}%)`;
    case "cmyk":
      return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    case "decimal":
      return decimal.toString();
    default:
      return selectedColor.value;
  }
});

const allFormats = computed(() => {
  const rgb = hexToRgb(selectedColor.value);
  if (!rgb) return {};

  const { r, g, b } = rgb;
  const hsl = rgbToHsl(r, g, b);
  const hsv = rgbToHsv(r, g, b);
  const cmyk = rgbToCmyk(r, g, b);
  const decimal = rgbToDecimal(r, g, b);

  return {
    hex: selectedColor.value.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 1)`,
    hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
      hsl.l
    )}%)`,
    hsla: `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
      hsl.l
    )}%, 1)`,
    hsv: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(
      hsv.v
    )}%)`,
    cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    decimal: decimal.toString(),
  };
});

const copyToClipboard = async (text?: string) => {
  try {
    await navigator.clipboard.writeText(text || convertedColor.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }
};

const pickColor = async () => {
  try {
    if ("EyeDropper" in window) {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      selectedColor.value = result.sRGBHex;
    } else {
      // Fallback para navegadores que no soportan EyeDropper
      alert(
        "Tu navegador no soporta el selector de color. Usa el color picker manual."
      );
    }
  } catch (err) {
    console.error("Error picking color:", err);
  }
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  selectedColor.value = color;
};

const validateHexColor = (color: string): boolean => {
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color);
};

const handleHexInput = (value: string | undefined) => {
  if (!value) return;

  const hexValue = value.startsWith("#") ? value : `#${value}`;

  if (validateHexColor(hexValue)) {
    selectedColor.value = hexValue;
  }
};

onMounted(() => {
  // Cargar configuraciones guardadas
  loadSavedSettings();
});

// Watchers para guardar configuraciones
watch(selectedColor, saveSettings);
watch(selectedFormat, saveSettings);
</script>

<template>
  <div class="w-full">
    <Toast />
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
          <li class="text-gray-700">Conversor universal de color</li>
        </ol>
      </nav>
    </div>

    <div class="min-h-screen bg-surface-ground py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
            🎨 Conversor universal de color
          </h1>
          <p class="text-xl text-surface-600">
            Convierte colores entre diferentes formatos y herramientas de color.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Panel de entrada -->
          <Card>
            <template #title>
              <div class="flex items-center">
                <Palette class="w-5 h-5 mr-2" />
                Selección de color
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Color picker -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Color
                  </label>
                  <div class="flex items-center gap-4">
                    <ColorPicker v-model="selectedColor" />
                    <InputText
                      :model-value="selectedColor"
                      @update:model-value="handleHexInput"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value)"
                      class="w-32 text-center font-mono"
                      :style="{
                        backgroundColor: selectedColor,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                    />
                  </div>
                </div>

                <!-- Herramientas -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">Herramientas</h4>

                  <div class="flex space-x-3">
                    <Button
                      @click="pickColor"
                      class="flex-1"
                      severity="secondary"
                    >
                      <Eye class="w-4 h-4 mr-2" />
                      Selector de color
                    </Button>
                    <Button
                      @click="generateRandomColor"
                      class="flex-1"
                      severity="secondary"
                    >
                      <RefreshCw class="w-4 h-4 mr-2" />
                      Color aleatorio
                    </Button>
                  </div>
                </div>

                <!-- Formato de salida -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Formato de salida
                  </label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <label
                      v-for="format in colorFormats"
                      :key="format.value"
                      class="flex items-center p-2 border rounded cursor-pointer hover:bg-surface-100"
                      :class="{
                        'bg-primary-50 border-primary-200':
                          selectedFormat === format.value,
                      }"
                    >
                      <input
                        type="radio"
                        :value="format.value"
                        v-model="selectedFormat"
                        class="mr-2"
                      />
                      <div>
                        <div class="text-sm font-medium">
                          {{ format.label }}
                        </div>
                        <div class="text-xs text-surface-600">
                          {{ format.example }}
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Panel de resultado -->
          <Card>
            <template #title>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <i class="pi pi-palette mr-2"></i>
                  Resultado
                </div>
                <Button
                  @click="() => copyToClipboard()"
                  size="small"
                  :severity="copied ? 'success' : 'secondary'"
                >
                  <Copy class="w-4 h-4 mr-2" />
                  {{ copied ? "Copiado!" : "Copiar" }}
                </Button>
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Color seleccionado -->
                <div class="bg-surface-100 p-4 rounded-lg">
                  <div class="text-sm text-surface-600 mb-2">
                    {{
                      selectedFormat === "hex"
                        ? "HEX"
                        : selectedFormat === "rgb"
                        ? "RGB"
                        : selectedFormat === "rgba"
                        ? "RGBA"
                        : selectedFormat === "hsl"
                        ? "HSL"
                        : selectedFormat === "hsla"
                        ? "HSLA"
                        : selectedFormat === "hsv"
                        ? "HSV"
                        : selectedFormat === "cmyk"
                        ? "CMYK"
                        : "Decimal"
                    }}
                  </div>
                  <div class="font-mono text-lg break-all">
                    {{ convertedColor }}
                  </div>
                </div>

                <!-- Vista previa del color -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">Vista previa</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="text-center">
                      <div
                        class="w-full h-20 rounded-lg border mb-2"
                        :style="{ backgroundColor: selectedColor }"
                      ></div>
                      <div class="text-sm text-surface-600">Color sólido</div>
                    </div>
                    <div class="text-center">
                      <div
                        class="w-full h-20 rounded-lg border mb-2"
                        :style="{
                          background: `linear-gradient(45deg, ${selectedColor}, transparent)`,
                        }"
                      ></div>
                      <div class="text-sm text-surface-600">Gradiente</div>
                    </div>
                    <div class="text-center">
                      <div
                        class="w-full h-20 rounded-lg border mb-2"
                        :style="{
                          background: `radial-gradient(circle, ${selectedColor}, transparent)`,
                        }"
                      ></div>
                      <div class="text-sm text-surface-600">Radial</div>
                    </div>
                  </div>
                </div>

                <!-- Todos los formatos -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">
                    Todos los formatos
                  </h4>
                  <div class="space-y-2">
                    <div
                      v-for="(value, format) in allFormats"
                      :key="format"
                      class="flex items-center justify-between p-2 bg-surface-50 rounded"
                    >
                      <div class="flex items-center">
                        <span
                          class="text-sm font-medium text-surface-700 w-16"
                          >{{ format.toUpperCase() }}</span
                        >
                        <span class="font-mono text-sm ml-2">{{ value }}</span>
                      </div>
                      <Button
                        @click="() => copyToClipboard(value)"
                        size="small"
                        severity="secondary"
                        icon="pi pi-copy"
                        v-tooltip.top="'Copiar'"
                      />
                    </div>
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
