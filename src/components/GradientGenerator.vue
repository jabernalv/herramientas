<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Toast from "primevue/toast";
import Slider from "primevue/slider";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import ColorPicker from "primevue/colorpicker";
import { SlidersHorizontal } from "lucide-vue-next";
import Textarea from "primevue/textarea";

interface ColorStop {
  color: string;
  position: number;
  opacity: number;
  locked: boolean;
}

const STORAGE_KEY = "gradient-generator-state";
const CLASSNAME_KEY = "gradient-css-classname";
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
</script>

<template>
  <div class="p-2">
    <Toast />
    <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-3">
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
          <li class="text-gray-700">Generador de Gradientes</li>
        </ol>
      </nav>
    </div>

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="20"
                  height="20"
                  fill="#000000"
                >
                  <path
                    d="M495.304,425.738H255.417c-3.576-52.031-23.828-100.842-58.185-140.23L401.371,81.37c6.52-6.52,6.52-17.091,0-23.611
    -6.519-6.52-17.091-6.52-23.611,0L4.89,430.629c-3.282,3.282-4.984,7.702-4.886,12.172c0.018,0.813,0.095,1.627,0.233,2.436
    c0.207,1.214,0.55,2.416,1.034,3.586c2.584,6.239,8.672,10.307,15.425,10.307h222.609h256c9.22,0,16.696-7.475,16.696-16.696
    C512,433.213,504.524,425.738,495.304,425.738z M57.002,425.738l116.562-116.561c28.136,32.988,44.927,73.446,48.38,116.561H57.002z"
                  />
                </svg>
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
              icon="pi pi-plus"
              label="Agregar color"
              severity="success"
            />
            <Button
              @click="generateGradient"
              icon="pi pi-refresh"
              label="Generar gradiente"
              severity="info"
              :loading="isGenerating"
            />
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
                    <ColorPicker v-model="stop.color" class="w-full" />
                    <InputText
                      :modelValue="stop.color"
                      @update:modelValue="
                        (value) => handleHexInput(value, index)
                      "
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, index)"
                      class="w-full text-center text-xs input-canoe"
                      :style="{
                        backgroundColor: stop.color,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                    />
                  </div>
                  <div
                    class="col-span-1 flex flex-col items-center justify-center"
                  >
                    <Button
                      :icon="stop.locked ? 'pi pi-lock' : 'pi pi-lock-open'"
                      @click="toggleLock(index)"
                      :severity="stop.locked ? 'warning' : 'secondary'"
                      text
                      rounded
                    />
                    <Button
                      icon="pi pi-eye"
                      @click="useEyedropper(index)"
                      severity="secondary"
                      text
                      rounded
                      :title="'Seleccionar color de la pantalla'"
                      :disabled="stop.locked"
                    />
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
                    />
                  </div>
                </div>
                <div class="w-1/6 flex justify-end">
                  <Button
                    v-if="colorStops.length > 2"
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    @click="removeColorStop(index)"
                    class="mt-2"
                  />
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
              <Button
                icon="pi pi-copy"
                text
                @click="copyToClipboard(hexGradient, 'HEX')"
              />
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
              <Button
                icon="pi pi-copy"
                text
                @click="copyToClipboard(rgbGradient, 'RGBA')"
              />
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
                    <i class="pi pi-cog"></i>
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
                  icon="pi pi-cog"
                  label="Generar clase"
                  @click="generateCssClassBlock"
                  severity="info"
                />
              </div>
              <div class="w-full md:w-auto">
                <Button
                  icon="pi pi-copy"
                  label="Copiar"
                  @click="copyCssClassBlock"
                  severity="success"
                  :disabled="!cssClassBlock"
                />
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
