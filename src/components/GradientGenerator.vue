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

interface ColorStop {
  color: string;
  position: number;
  opacity: number;
  locked: boolean;
}

const STORAGE_KEY = "gradient-generator-state";

const toast = useToast();
const colorStops = ref<ColorStop[]>([
  { color: "#ff0000", position: 0, opacity: 1, locked: false },
  { color: "#0000ff", position: 100, opacity: 1, locked: false },
]);
const angle = ref(90);
const isGenerating = ref(false);

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
                <div class="flex-1 flex flex-col items-center gap-2">
                  <div class="flex items-center gap-2">
                    <ColorPicker v-model="stop.color" />
                    <Button
                      :icon="stop.locked ? 'pi pi-lock' : 'pi pi-lock-open'"
                      @click="toggleLock(index)"
                      :severity="stop.locked ? 'warning' : 'secondary'"
                      text
                      rounded
                    />
                  </div>
                  <span class="text-xs text-gray-600">{{ stop.color }}</span>
                </div>
                <div class="flex-1">
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
  font-family: monospace;
}

:deep(.p-slider) {
  width: 100%;
}

:deep(.p-slider .p-slider-handle) {
  background: #4f46e5;
  border: 2px solid #4f46e5;
}

:deep(.p-slider-range) {
  background: #4f46e5;
}

:deep(.p-slider .p-slider-handle:hover) {
  background: #4338ca;
  border-color: #4338ca;
}

:deep(.p-colorpicker-preview) {
  width: 100%;
  height: 2rem;
}

:deep(.p-colorpicker-panel) {
  width: 100%;
  max-width: 300px;
}
</style>
