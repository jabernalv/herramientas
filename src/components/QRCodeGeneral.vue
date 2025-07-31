<template>
  <div class="space-y-4">
    <InputGroup>
      <InputGroupAddon>
        <QrCode class="w-4 h-4" />
      </InputGroupAddon>
      <Textarea
        v-model="text"
        rows="4"
        class="w-full"
        placeholder="Enter text or URL here..."
      />
    </InputGroup>
    <div class="w-full flex justify-end">
      <span
        :class="[
          'text-sm',
          text.length > MAX_TEXT_LENGTH ? 'text-red-500' : 'text-gray-500',
        ]"
      >
        <span
          v-if="text.length > MAX_TEXT_LENGTH"
          class="mr-2"
          role="img"
          aria-label="advertencia"
          >⚠️</span
        >
        {{ text.length }}/{{ MAX_TEXT_LENGTH }} caracteres
      </span>
    </div>

    <!-- Configuración de color -->
    <div class="w-full bg-white rounded-lg shadow-md p-4">
      <h3 class="text-lg font-semibold mb-4">Configuración</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
            >Color del QR:</label
          >
          <ColorPicker v-model="qrColor" />
          <InputGroup>
            <InputGroupAddon>
              <Palette class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              :modelValue="qrColor"
              @update:modelValue="
                (v) => handleHexInput(v, 'qr', qrColorRef, bgColorRef, toast)
              "
              @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'qr', qrColorRef, bgColorRef, toast)"
              class="w-24 text-center text-xs font-mono"
              :style="{
                backgroundColor: qrColor,
                color: '#fff',
                textShadow: '0 0 2px #000',
              }"
            />
          </InputGroup>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
            >Color de fondo:</label
          >
          <ColorPicker v-model="bgColor" />
          <InputGroup>
            <InputGroupAddon>
              <Palette class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              :modelValue="bgColor"
              @update:modelValue="
                (v) => handleHexInput(v, 'bg', qrColorRef, bgColorRef, toast)
              "
              @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'bg', qrColorRef, bgColorRef, toast)"
              class="w-24 text-center text-xs font-mono"
              :style="{
                backgroundColor: bgColor,
                color: '#000',
                textShadow: '0 0 2px #fff',
              }"
            />
          </InputGroup>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
            >Forma:</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Settings class="w-4 h-4" />
            </InputGroupAddon>
            <Select
              v-model="dotShape"
              :options="DOT_SHAPES"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            >
              <template #option="slotProps">
                <div class="flex items-center">
                  <span
                    :style="{
                      display: 'inline-block',
                      width: '18px',
                      height: '18px',
                      borderRadius:
                        slotProps.option.value === 'dots'
                          ? '50%'
                          : slotProps.option.value === 'rounded'
                          ? '8px'
                          : slotProps.option.value === 'classy'
                          ? '2px'
                          : slotProps.option.value === 'classy-rounded'
                          ? '6px 6px 2px 2px'
                          : slotProps.option.value === 'square'
                          ? '0'
                          : '12px',
                      background: '#0288d1',
                      border: '1.5px solid #333',
                      marginRight: '8px',
                    }"
                  ></span>
                  <span>{{ slotProps.option.label }}</span>
                </div>
              </template>
            </Select>
          </InputGroup>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700 whitespace-nowrap"
            >Formato:</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Image class="w-4 h-4" />
            </InputGroupAddon>
            <Select
              v-model="exportFormat"
              :options="EXPORT_FORMATS"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            >
              <template #option="slotProps">
                <div class="flex items-center">
                  <span class="font-medium">{{ slotProps.option.label }}</span>
                </div>
              </template>
            </Select>
          </InputGroup>
        </div>
      </div>
      <div class="mt-4">
        <Button
          @click="resetToDefaultColors"
          severity="secondary"
          label="Restaurar configuración por defecto"
          text
        >
          <template #icon>
            <RefreshCw class="w-4 h-4 mr-2" />
          </template>
        </Button>
      </div>
    </div>

    <div class="w-full flex flex-col sm:flex-row gap-2 items-center">
      <Button
        @click="generateQR"
        severity="success"
        class="w-full"
        label="Generar código QR"
        :disabled="!text.trim() || text.length > MAX_TEXT_LENGTH"
      >
        <template #icon>
          <QrCode class="w-4 h-4 mr-2" />
        </template>
      </Button>

      <Button
        @click="copyQR"
        severity="help"
        class="w-full"
        label="Copiar código QR"
        :disabled="!qrCode || !text.trim()"
      >
        <template #icon>
          <Copy class="w-4 h-4 mr-2" />
        </template>
      </Button>

      <Button
        @click="downloadQR"
        severity="info"
        class="w-full"
        :label="`Descargar ${exportFormat.toUpperCase()}`"
        :disabled="!qrCode || !text.trim()"
      >
        <template #icon>
          <Download class="w-4 h-4 mr-2" />
        </template>
      </Button>

      <div class="flex items-center gap-2">
        <Button
          @click="decreaseSize"
          severity="secondary"
          :disabled="qrSize <= MIN_SIZE"
          v-tooltip.top="'Reducir tamaño'"
        >
          <template #icon>
            <Minus class="w-4 h-4" />
          </template>
        </Button>
        <span class="text-sm text-gray-600">{{ qrSize }}x{{ qrSize }}px</span>
        <Button
          @click="increaseSize"
          severity="secondary"
          :disabled="qrSize >= MAX_SIZE"
          v-tooltip.top="'Aumentar tamaño'"
        >
          <template #icon>
            <Plus class="w-4 h-4" />
          </template>
        </Button>
      </div>
    </div>
    <div ref="qrcodeContainer" class="flex justify-center mt-4"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import ColorPicker from "primevue/colorpicker";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  QrCode,
  Settings,
  Palette,
  RefreshCw,
  Copy,
  Download,
  Minus,
  Plus,
  Image,
} from "lucide-vue-next";
import { useToast } from "primevue/usetoast";
import {
  MIN_SIZE,
  MAX_SIZE,
  DEFAULT_SIZE,
  DEFAULT_QR_COLOR,
  DEFAULT_BG_COLOR,
  DEFAULT_DOT_SHAPE,
  DEFAULT_EXPORT_FORMAT,
  MAX_TEXT_LENGTH,
  DOT_SHAPES,
  EXPORT_FORMATS,
  handleHexInput,
  createQRCode,
  copyQRToClipboard,
  downloadQR as downloadQRUtil,
  resetColors,
  adjustSize,
} from "../utils/qrCodeCommonFunctions";

const toast = useToast();

// Props
interface Props {
  size: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: DEFAULT_SIZE,
});

// Emits
const emit = defineEmits<{
  "update:size": [size: number];
}>();

// Reactive state
const text = ref(localStorage.getItem("qr-text") || "");
const qrcodeContainer = ref<HTMLElement | null>(null);
const qrCode = ref<any>(null);
const qrSize = ref(props.size);

// Colors
const qrColor = ref(
  localStorage.getItem("qr-color-general") || DEFAULT_QR_COLOR
);
const bgColor = ref(
  localStorage.getItem("qr-bg-color-general") || DEFAULT_BG_COLOR
);
const dotShape = ref(localStorage.getItem("qr-dot-shape") || DEFAULT_DOT_SHAPE);
const exportFormat = ref(localStorage.getItem("qr-export-format") || DEFAULT_EXPORT_FORMAT);

// Refs for handleHexInput
const qrColorRef = ref(qrColor);
const bgColorRef = ref(bgColor);

// Methods
const generateQR = () => {
  if (!qrcodeContainer.value || !text.value.trim()) return;

  if (text.value.length > MAX_TEXT_LENGTH) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: `El texto es demasiado largo. El límite es de ${MAX_TEXT_LENGTH} caracteres.`,
      life: 5000,
    });
    return;
  }

  try {
    qrcodeContainer.value.innerHTML = "";
    qrCode.value = createQRCode(
      text.value,
      qrSize.value,
      qrColor.value,
      bgColor.value,
      dotShape.value
    );
    qrCode.value.append(qrcodeContainer.value);
  } catch (error) {
    console.error("Error generando QR:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        "No se pudo generar el código QR. El texto puede ser demasiado complejo.",
      life: 5000,
    });
  }
};

const copyQR = () => {
  copyQRToClipboard(qrcodeContainer.value, toast);
};

const downloadQR = () => {
  downloadQRUtil(qrCode.value, "qr-general", exportFormat.value as "png" | "svg" | "jpeg" | "webp");
};

const resetToDefaultColors = () => {
  resetColors(qrColorRef, bgColorRef, "general", toast);
  if (text.value.trim()) {
    generateQR();
  }
};

const increaseSize = () => {
  const newSize = adjustSize(qrSize.value, 50);
  qrSize.value = newSize;
  emit("update:size", newSize);
};

const decreaseSize = () => {
  const newSize = adjustSize(qrSize.value, -50);
  qrSize.value = newSize;
  emit("update:size", newSize);
};

// Watchers
watch(text, (newValue) => {
  localStorage.setItem("qr-text", newValue);
  if (newValue.trim()) {
    generateQR();
  }
  if (newValue.length > MAX_TEXT_LENGTH) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: `Has excedido el límite de ${MAX_TEXT_LENGTH} caracteres.`,
      life: 3000,
    });
  }
});

watch([qrColor, bgColor], ([newQrColor, newBgColor]) => {
  localStorage.setItem("qr-color-general", newQrColor);
  localStorage.setItem("qr-bg-color-general", newBgColor);
  if (text.value.trim()) {
    generateQR();
  }
});

watch(dotShape, (newShape) => {
  localStorage.setItem("qr-dot-shape", newShape);
  if (text.value.trim()) {
    generateQR();
  }
});

watch(exportFormat, (newFormat) => {
  localStorage.setItem("qr-export-format", newFormat);
});

watch(
  () => props.size,
  (newSize) => {
    qrSize.value = newSize;
    if (text.value.trim()) {
      generateQR();
    }
  }
);

// Initialize
onMounted(() => {
  if (text.value.trim()) {
    generateQR();
  }
});
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
}
</style>
