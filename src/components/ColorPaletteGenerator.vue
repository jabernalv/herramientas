<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { Hash } from "lucide-vue-next";
import BreadcrumbNav from "./BreadcrumbNav.vue";

interface Color {
  hex: string;
  locked: boolean;
  role: string;
}

const toast = useToast();
const DEFAULT_PALETTE = [
  { hex: "#3B82F6", locked: false, role: "Primario" }, // blue-500
  { hex: "#F59E42", locked: false, role: "Secundario" }, // orange-400
  { hex: "#22C55E", locked: false, role: "Éxito" }, // green-500
  { hex: "#EF4444", locked: false, role: "Peligro" }, // red-500
  { hex: "#FACC15", locked: false, role: "Advertencia" }, // yellow-400
  { hex: "#06B6D4", locked: false, role: "Información" }, // cyan-500
  { hex: "#F3F4F6", locked: false, role: "Fondo" }, // gray-100
  { hex: "#111827", locked: false, role: "Texto" }, // gray-900
];
const PALETTE_STORAGE_KEY = "color-palette-generator";

// Inicializa colors con la paleta guardada o la de defecto
const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY);
const colors = ref<Color[]>(
  savedPalette
    ? (() => {
        try {
          const parsed = JSON.parse(savedPalette);
          if (Array.isArray(parsed) && parsed.length === 8) {
            return parsed;
          }
        } catch (e) {}
        return [...DEFAULT_PALETTE];
      })()
    : [...DEFAULT_PALETTE]
);

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

// Función para asegurar que colors siempre tenga 8 elementos
function normalizeColors() {
  if (colors.value.length < 8) {
    colors.value = [
      ...colors.value,
      ...DEFAULT_PALETTE.slice(colors.value.length, 8),
    ];
  } else if (colors.value.length > 8) {
    colors.value = colors.value.slice(0, 8);
  }
}

// Modifica generatePalette para normalizar antes y después de regenerar
const generatePalette = () => {
  normalizeColors();
  colors.value = colors.value.map((color) =>
    color.locked ? color : { ...color, hex: generateRandomColor() }
  );
  normalizeColors();
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

// Función para usar el gotero (eyedropper)
const useEyedropper = async (index: number) => {
  if (colors.value[index].locked) return;

  try {
    // Verificar si el navegador soporta EyeDropper API
    if ("EyeDropper" in window) {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        colors.value[index].hex = ensureHexFormat(result.sRGBHex);
        toast.add({
          severity: "success",
          summary: "Color Capturado",
          detail: `Color ${result.sRGBHex} aplicado`,
          life: 2000,
        });
      }
    } else {
      toast.add({
        severity: "warn",
        summary: "No Soportado",
        detail: "Tu navegador no soporta la herramienta de gotero",
        life: 3000,
      });
    }
  } catch (error) {
    // Usuario canceló la selección o error
    console.log("Eyedropper cancelled or error:", error);
  }
};

// Función para restaurar por defecto
function restoreDefaultPalette() {
  colors.value = DEFAULT_PALETTE.map((c) => ({ ...c }));
  localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(colors.value));
}

// Al montar, normaliza y genera
onMounted(() => {
  normalizeColors();
});

watch(
  colors,
  (newColors) => {
    newColors.forEach((color) => {
      color.hex = ensureHexFormat(color.hex);
    });
    localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(newColors));
  },
  { deep: true }
);

// Helper para exportar como CSS variables
function paletteToCssVars() {
  return (
    `:root {\n` +
    colors.value
      .map(
        (c) =>
          `  --color-${c.role
            .toLowerCase()
            .normalize("NFD")
            .replace(/[ 0-]/g, "")
            .replace(/[^a-z0-9]+/g, "-")}: ${c.hex};`
      )
      .join("\n") +
    `\n}`
  );
}
function copyCssVars() {
  navigator.clipboard.writeText(paletteToCssVars());
}
</script>

<template>
  <div>
    <BreadcrumbNav />

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
            :disabled="colors.every((c) => c.locked)"
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
          <Button
            icon="pi pi-undo"
            label="Restaurar por defecto"
            @click="restoreDefaultPalette"
            severity="info"
            class="w-full sm:w-auto"
            :disabled="colors.some((c) => c.locked)"
          />
        </div>
      </div>

      <div
        class="palette-row overflow-x-auto grid grid-cols-8 md:grid-cols-4 sm:grid-cols-1 gap-4"
      >
        <Card
          v-for="(color, index) in colors"
          :key="index"
          class="flex-shrink-0 shadow-lg"
        >
          <template #header>
            <div class="text-center font-bold text-lg py-2">
              {{ colors[index].role }}
            </div>
          </template>
          <template #content>
            <div
              class="h-20 w-full relative"
              :style="{ backgroundColor: color.hex }"
            >
              <Button
                :icon="color.locked ? 'pi pi-lock' : 'pi pi-lock-open'"
                class="!w-12 !h-12 !min-w-0 !rounded-full bg-gray-100 text-gray-700 border-none shadow"
                :severity="'secondary'"
                rounded
                @click.stop="() => toggleLock(index)"
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                "
              />
            </div>
          </template>
          <template #footer>
            <div class="flex items-center gap-2 p-2 justify-between">
              <div class="flex items-center gap-1">
                <ColorPicker
                  v-model="colors[index].hex"
                  :disabled="color.locked"
                  class="w-8 h-8"
                />
                <Button
                  icon="pi pi-eye-slash"
                  @click="() => useEyedropper(index)"
                  :disabled="color.locked"
                  severity="secondary"
                  outlined
                  size="small"
                  class="!w-6 !h-6 !min-w-0 !p-0"
                  v-tooltip.top="'Gotero de color'"
                />
              </div>
              <InputGroup class="w-28">
                <InputGroupAddon>
                  <Hash class="text-gray-500" />
                </InputGroupAddon>
                <InputText
                  :modelValue="color.hex"
                  @update:modelValue="
                    (value) => updateColor(index, value || '')
                  "
                  :readonly="color.locked"
                  :placeholder="color.role"
                  class="font-mono"
                />
              </InputGroup>
            </div>
          </template>
        </Card>
      </div>
      <!-- Ejemplo de botones -->
      <div
        class="mt-8 rounded-lg p-6"
        :style="{ backgroundColor: colors[6].hex }"
      >
        <h2 class="text-lg font-bold mb-2" :style="{ color: colors[7].hex }">
          Ejemplo de botones por color de la paleta
        </h2>
        <div class="grid grid-cols-6 gap-4">
          <div
            v-for="(color, index) in colors.slice(0, 6)"
            :key="'filled-' + index"
            class="flex flex-col items-center"
          >
            <Button
              :label="color.role"
              :style="{
                backgroundColor: color.hex,
                color: colors[7].hex,
                border: 'none',
              }"
              class="w-32 mb-1"
            />
          </div>
          <div
            v-for="(color, index) in colors.slice(0, 6)"
            :key="'outlined-' + index"
            class="flex flex-col items-center"
          >
            <Button
              :label="color.role"
              outlined
              :style="{
                color: color.hex,
                borderColor: color.hex,
                backgroundColor: 'transparent',
              }"
              class="w-32"
            />
          </div>
        </div>
      </div>
      <!-- Previsualización de la paleta como CSS -->
      <div class="mt-8">
        <h2 class="text-lg font-bold mb-2" :style="{ color: colors[7].hex }">
          Previsualización de la paleta (CSS)
        </h2>
        <div class="flex gap-2 mb-2">
          <Button
            icon="pi pi-copy"
            label="Copiar CSS"
            @click="copyCssVars"
            severity="secondary"
          />
        </div>
        <textarea
          class="w-full font-mono rounded border p-2 text-sm"
          rows="10"
          readonly
          :value="paletteToCssVars()"
          style="background: #fff; color: #222"
        ></textarea>
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

.palette-row {
  scrollbar-width: thin;
  scrollbar-color: #bbb #eee;
}
.palette-row::-webkit-scrollbar {
  height: 8px;
}
.palette-row::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 4px;
}
.palette-row::-webkit-scrollbar-track {
  background: #eee;
  border-radius: 4px;
}
:deep(.p-card-body) {
  padding: 0 !important;
  margin: 0 !important;
}
:deep(.p-card-content) {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
