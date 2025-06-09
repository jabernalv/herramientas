<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { RouterLink } from "vue-router";

interface Color {
  hex: string;
  locked: boolean;
}

const toast = useToast();
const colors = ref<Color[]>([]);
const DEFAULT_PALETTE_SIZE = 5;
const MAX_COLORS = 10; // Máximo número de colores permitidos
const MIN_COLORS = 3; // Mínimo número de colores permitidos

// Función para asegurar formato hexadecimal
const ensureHexFormat = (color: string): string => {
  // Si ya tiene #, retornarlo
  if (color.startsWith("#")) {
    return color.toUpperCase();
  }

  // Si es un número hexadecimal sin #
  if (/^[0-9A-Fa-f]{6}$/.test(color)) {
    return `#${color}`.toUpperCase();
  }

  // Si es RGB, convertir a hex
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    const hex = `#${Number(r).toString(16).padStart(2, "0")}${Number(g)
      .toString(16)
      .padStart(2, "0")}${Number(b).toString(16).padStart(2, "0")}`;
    return hex.toUpperCase();
  }

  return color.toUpperCase();
};

// Función para generar un color hexadecimal aleatorio
const generateRandomColor = (): string => {
  const hex = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  return `#${hex}`.toUpperCase();
};

// Función para generar la paleta inicial o regenerar colores no bloqueados
const generatePalette = () => {
  if (colors.value.length === 0) {
    // Generar paleta inicial
    colors.value = Array(DEFAULT_PALETTE_SIZE)
      .fill(null)
      .map(() => ({
        hex: generateRandomColor(),
        locked: false,
      }));
  } else {
    // Regenerar solo los colores no bloqueados
    colors.value = colors.value.map((color) =>
      color.locked ? color : { ...color, hex: generateRandomColor() }
    );
  }
};

// Función para copiar un color al portapapeles
const copyColor = (hex: string) => {
  navigator.clipboard.writeText(hex).then(() => {
    toast.add({
      severity: "success",
      summary: "Color Copiado",
      detail: `${hex} copiado al portapapeles`,
      life: 2000,
    });
  });
};

// Función para copiar toda la paleta
const copyPalette = () => {
  const paletteText = colors.value.map((color) => color.hex).join(", ");

  navigator.clipboard.writeText(paletteText).then(() => {
    toast.add({
      severity: "success",
      summary: "Paleta Copiada",
      detail: "Paleta completa copiada al portapapeles",
      life: 2000,
    });
  });
};

// Función para exportar la paleta como JSON
const exportAsJson = () => {
  const paletteJson = JSON.stringify(colors.value, null, 2);
  const blob = new Blob([paletteJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "color-palette-generator.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Función para alternar el bloqueo de un color
const toggleLock = (index: number) => {
  colors.value[index].locked = !colors.value[index].locked;
};

// Función para actualizar un color manualmente
const updateColor = (index: number, newColor: string) => {
  if (newColor) {
    colors.value[index].hex = ensureHexFormat(newColor);
  }
};

// Función para añadir un nuevo color
const addColor = () => {
  if (colors.value.length < MAX_COLORS) {
    colors.value.push({
      hex: generateRandomColor(),
      locked: false,
    });
  } else {
    toast.add({
      severity: "warn",
      summary: "Límite alcanzado",
      detail: `Máximo ${MAX_COLORS} colores permitidos`,
      life: 2000,
    });
  }
};

// Función para eliminar el último color
const removeColor = () => {
  if (colors.value.length > MIN_COLORS) {
    colors.value.pop();
  } else {
    toast.add({
      severity: "warn",
      summary: "Límite alcanzado",
      detail: `Mínimo ${MIN_COLORS} colores requeridos`,
      life: 2000,
    });
  }
};

// Generar paleta inicial al montar el componente
onMounted(() => {
  generatePalette();
});
</script>

<template>
  <div>
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
          <li class="text-gray-700">Generador de Paletas</li>
        </ol>
      </nav>
    </div>

    <div class="w-full mx-auto px-4 pb-4 mb-16" style="max-width: 1280px">
      <Toast />

      <div class="controls mb-4 flex flex-col sm:flex-row gap-4 justify-center">
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            icon="pi pi-refresh"
            label="Generar Nueva"
            @click="generatePalette"
            severity="primary"
            class="w-full sm:w-auto"
          />
          <Button
            icon="pi pi-copy"
            label="Copiar"
            @click="copyPalette"
            severity="secondary"
            class="w-full sm:w-auto"
          />
          <Button
            icon="pi pi-download"
            label="Exportar"
            @click="exportAsJson"
            severity="help"
            class="w-full sm:w-auto"
          />
        </div>
        <div class="flex gap-2 justify-center sm:justify-start">
          <Button
            icon="pi pi-minus"
            @click="removeColor"
            severity="danger"
            :disabled="colors.length <= MIN_COLORS"
            class="w-full sm:w-12 !min-w-0"
            aria-label="Eliminar color"
            v-tooltip.top="'Eliminar color'"
          />
          <Button
            icon="pi pi-plus"
            @click="addColor"
            severity="success"
            :disabled="colors.length >= MAX_COLORS"
            class="w-full sm:w-12 !min-w-0"
            aria-label="Añadir color"
            v-tooltip.top="'Añadir color'"
          />
        </div>
      </div>

      <div
        class="palette-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(color, index) in colors"
          :key="index"
          class="relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
        >
          <div
            class="h-32 w-full cursor-pointer relative transition-opacity hover:opacity-90"
            :style="{ backgroundColor: color.hex }"
            @click="() => copyColor(color.hex)"
          >
            <Button
              :icon="color.locked ? 'pi pi-lock' : 'pi pi-lock-open'"
              class="absolute top-2 right-2 !w-8 !h-8 !min-w-0"
              :severity="color.locked ? 'danger' : 'secondary'"
              @click.stop="() => toggleLock(index)"
            />
          </div>

          <div class="p-3 bg-white dark:bg-gray-800">
            <div class="flex items-center justify-between">
              <span class="text-sm font-mono">{{ color.hex }}</span>
              <ColorPicker
                :modelValue="color.hex"
                @update:modelValue="(value) => updateColor(index, value)"
                class="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-button) {
  white-space: nowrap;
}

@media (max-width: 640px) {
  :deep(.p-button) {
    padding: 0.5rem;
  }

  :deep(.p-button-label) {
    font-size: 0.875rem;
  }
}
</style>
