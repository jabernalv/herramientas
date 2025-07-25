<template>
  <div class="space-y-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-4">Configuración de WiFi</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nombre de la red (SSID)</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Wifi class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="wifiData.ssid"
              class="w-full"
              placeholder="MiWiFi"
            />
          </InputGroup>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Contraseña</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Lock class="w-4 h-4" />
            </InputGroupAddon>
            <Password
              v-model="wifiData.password"
              class="w-full"
              :feedback="false"
              toggleMask
              placeholder="Contraseña de la red"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Tipo de encriptación</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Settings class="w-4 h-4" />
            </InputGroupAddon>
            <Select
              v-model="wifiData.encryption"
              :options="[
                { label: 'WPA/WPA2/WPA3', value: 'WPA' },
                { label: 'WEP', value: 'WEP' },
                { label: 'Sin encriptación', value: 'nopass' },
              ]"
              optionLabel="label"
              optionValue="value"
              class="w-full"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Red oculta</label
          >
          <div class="flex items-center">
            <Checkbox
              v-model="wifiData.hidden"
              inputId="hidden-wifi"
              binary
              class="mr-2"
            />
            <label for="hidden-wifi" class="text-sm text-gray-700">
              Sí, la red está oculta
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuración de color para WiFi -->
    <div class="w-full bg-white rounded-lg shadow-md p-4">
      <h3 class="text-lg font-semibold mb-4">Configuración</h3>
      <div class="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
        <div class="flex-1 flex items-center gap-2 min-w-0">
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
        <div class="flex-1 flex items-center gap-2 min-w-0">
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
        <div class="flex-1 flex items-center gap-2 min-w-0">
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
        label="Generar WiFi QR"
        :disabled="!hasWifiData"
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
        :disabled="!qrCode || !hasWifiData"
      >
        <template #icon>
          <Copy class="w-4 h-4 mr-2" />
        </template>
      </Button>

      <Button
        @click="downloadQR"
        severity="info"
        class="w-full"
        label="Descargar código QR"
        :disabled="!qrCode || !hasWifiData"
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
import { ref, watch, computed, onMounted } from "vue";
import Button from "primevue/button";
import ColorPicker from "primevue/colorpicker";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  Wifi,
  Lock,
  Settings,
  Palette,
  RefreshCw,
  QrCode,
  Copy,
  Download,
  Minus,
  Plus,
} from "lucide-vue-next";
import { useToast } from "primevue/usetoast";
import {
  MIN_SIZE,
  MAX_SIZE,
  DEFAULT_SIZE,
  DEFAULT_QR_COLOR,
  DEFAULT_BG_COLOR,
  DEFAULT_DOT_SHAPE,
  DOT_SHAPES,
  handleHexInput,
  createQRCode,
  copyQRToClipboard,
  downloadQR as downloadQRUtil,
  resetColors,
  adjustSize,
  generateWifiString,
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
const qrcodeContainer = ref<HTMLElement | null>(null);
const qrCode = ref<any>(null);
const qrSize = ref(props.size);

// WiFi data
const wifiData = ref({
  ssid: localStorage.getItem("wifi-ssid") || "",
  password: localStorage.getItem("wifi-password") || "",
  encryption: localStorage.getItem("wifi-encryption") || "WPA",
  hidden: localStorage.getItem("wifi-hidden") === "true",
});

// Colors
const qrColor = ref(localStorage.getItem("qr-color-wifi") || DEFAULT_QR_COLOR);
const bgColor = ref(
  localStorage.getItem("qr-bg-color-wifi") || DEFAULT_BG_COLOR
);
const dotShape = ref(localStorage.getItem("qr-dot-shape") || DEFAULT_DOT_SHAPE);

// Refs for handleHexInput
const qrColorRef = ref(qrColor);
const bgColorRef = ref(bgColor);

// Computed
const hasWifiData = computed(() => {
  return wifiData.value.ssid.trim() !== "";
});

// Methods
const generateQR = () => {
  if (!qrcodeContainer.value || !hasWifiData.value) return;

  try {
    qrcodeContainer.value.innerHTML = "";
    const wifiString = generateWifiString(wifiData.value);
    qrCode.value = createQRCode(
      wifiString,
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
      detail: "No se pudo generar el código QR WiFi.",
      life: 5000,
    });
  }
};

const copyQR = () => {
  copyQRToClipboard(qrcodeContainer.value, toast);
};

const downloadQR = () => {
  downloadQRUtil(qrCode.value, "qr-wifi");
};

const resetToDefaultColors = () => {
  resetColors(qrColorRef, bgColorRef, "wifi", toast);
  if (hasWifiData.value) {
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
watch(
  wifiData,
  (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(`wifi-${key}`, String(value));
      } else {
        localStorage.removeItem(`wifi-${key}`);
      }
    });
    if (hasWifiData.value) {
      generateQR();
    }
  },
  { deep: true }
);

watch([qrColor, bgColor], ([newQrColor, newBgColor]) => {
  localStorage.setItem("qr-color-wifi", newQrColor);
  localStorage.setItem("qr-bg-color-wifi", newBgColor);
  if (hasWifiData.value) {
    generateQR();
  }
});

watch(dotShape, (newShape) => {
  localStorage.setItem("qr-dot-shape", newShape);
  if (hasWifiData.value) {
    generateQR();
  }
});

watch(
  () => props.size,
  (newSize) => {
    qrSize.value = newSize;
    if (hasWifiData.value) {
      generateQR();
    }
  }
);

// Initialize
onMounted(() => {
  if (hasWifiData.value) {
    generateQR();
  }
});
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-checkbox) {
  width: 1.5rem;
  height: 1.5rem;
}

:deep(.p-checkbox .p-checkbox-box) {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

@media (max-width: 768px) {
  :deep(.p-checkbox) {
    width: 1.25rem;
    height: 1.25rem;
  }

  :deep(.p-checkbox .p-checkbox-box) {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
}
</style>
