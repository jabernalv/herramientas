<template>
  <div class="space-y-4">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold mb-4">Información de contacto</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Nombres</label
          >
          <InputGroup>
            <InputGroupAddon>
              <User class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.firstName"
              class="w-full"
              placeholder="Juan"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Apellidos</label
          >
          <InputGroup>
            <InputGroupAddon>
              <User class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.lastName"
              class="w-full"
              placeholder="Pérez"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Celular</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Phone class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.cellPhone"
              class="w-full"
              placeholder="+57 300 123 4567"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Teléfono</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Phone class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.workPhone"
              class="w-full"
              placeholder="+57 1 234 5678"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Compañía</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Building class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.company"
              class="w-full"
              placeholder="Mi Empresa S.A."
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Cargo</label
          >
          <InputGroup>
            <InputGroupAddon>
              <User class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.title"
              class="w-full"
              placeholder="Desarrollador Senior"
            />
          </InputGroup>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Dirección</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Building class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.address"
              class="w-full"
              placeholder="Calle 123 # 45-67"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Ciudad</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Building class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.city"
              class="w-full"
              placeholder="Bogotá"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Código Postal</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Building class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.zip"
              class="w-full"
              placeholder="110111"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Departamento</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Building class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.state"
              class="w-full"
              placeholder="Cundinamarca"
            />
          </InputGroup>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >País</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Globe class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.country"
              class="w-full"
              placeholder="Colombia"
            />
          </InputGroup>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Sitio web</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Globe class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.website"
              class="w-full"
              placeholder="https://www.misitio.com"
            />
          </InputGroup>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Correo electrónico</label
          >
          <InputGroup>
            <InputGroupAddon>
              <Mail class="w-4 h-4" />
            </InputGroupAddon>
            <InputText
              v-model="vCardData.email"
              class="w-full"
              placeholder="juan.perez@empresa.com"
              type="email"
            />
          </InputGroup>
        </div>
      </div>
    </div>

    <!-- Configuración de color para vCard -->
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
        label="Generar vCard QR"
        :disabled="!hasVCardData"
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
        :disabled="!qrCode || !hasVCardData"
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
        :disabled="!qrCode || !hasVCardData"
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
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  User,
  Mail,
  Phone,
  Building,
  Globe,
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
  generateVCardString,
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

// vCard data
const vCardData = ref({
  firstName: localStorage.getItem("vcard-firstName") || "",
  lastName: localStorage.getItem("vcard-lastName") || "",
  cellPhone: localStorage.getItem("vcard-cellPhone") || "",
  workPhone: localStorage.getItem("vcard-workPhone") || "",
  company: localStorage.getItem("vcard-company") || "",
  title: localStorage.getItem("vcard-title") || "",
  address: localStorage.getItem("vcard-address") || "",
  city: localStorage.getItem("vcard-city") || "",
  zip: localStorage.getItem("vcard-zip") || "",
  state: localStorage.getItem("vcard-state") || "",
  country: localStorage.getItem("vcard-country") || "",
  website: localStorage.getItem("vcard-website") || "",
  email: localStorage.getItem("vcard-email") || "",
});

// Colors
const qrColor = ref(localStorage.getItem("qr-color-vcard") || DEFAULT_QR_COLOR);
const bgColor = ref(
  localStorage.getItem("qr-bg-color-vcard") || DEFAULT_BG_COLOR
);
const dotShape = ref(localStorage.getItem("qr-dot-shape") || DEFAULT_DOT_SHAPE);

// Refs for handleHexInput
const qrColorRef = ref(qrColor);
const bgColorRef = ref(bgColor);

// Computed
const hasVCardData = computed(() => {
  return (
    vCardData.value.firstName ||
    vCardData.value.lastName ||
    vCardData.value.cellPhone
  );
});

// Methods
const generateQR = () => {
  if (!qrcodeContainer.value || !hasVCardData.value) return;

  try {
    qrcodeContainer.value.innerHTML = "";
    const vCardString = generateVCardString(vCardData.value);
    qrCode.value = createQRCode(
      vCardString,
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
      detail: "No se pudo generar el código QR vCard.",
      life: 5000,
    });
  }
};

const copyQR = () => {
  copyQRToClipboard(qrcodeContainer.value, toast);
};

const downloadQR = () => {
  downloadQRUtil(qrCode.value, "qr-vcard");
};

const resetToDefaultColors = () => {
  resetColors(qrColorRef, bgColorRef, "vcard", toast);
  if (hasVCardData.value) {
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
  vCardData,
  (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`vcard-${key}`, value);
      } else {
        localStorage.removeItem(`vcard-${key}`);
      }
    });
    if (hasVCardData.value) {
      generateQR();
    }
  },
  { deep: true }
);

watch([qrColor, bgColor], ([newQrColor, newBgColor]) => {
  localStorage.setItem("qr-color-vcard", newQrColor);
  localStorage.setItem("qr-bg-color-vcard", newBgColor);
  if (hasVCardData.value) {
    generateQR();
  }
});

watch(dotShape, (newShape) => {
  localStorage.setItem("qr-dot-shape", newShape);
  if (hasVCardData.value) {
    generateQR();
  }
});

watch(
  () => props.size,
  (newSize) => {
    qrSize.value = newSize;
    if (hasVCardData.value) {
      generateQR();
    }
  }
);

// Initialize
onMounted(() => {
  if (hasVCardData.value) {
    generateQR();
  }
});
</script>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
}
</style>
