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
          <li class="text-gray-700">Generador de códigos QR</li>
        </ol>
      </nav>
    </div>

    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-green-600">Generador de códigos QR</h1>
    </header>

    <main class="space-y-4 mx-auto mb-16 w-4/5 flex flex-col items-center">
      <Textarea
        v-model="text"
        rows="4"
        class="w-full"
        placeholder="Enter text or URL here..."
      />
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
      <div class="w-full flex flex-col sm:flex-row gap-2 items-center">
        <Button
          @click="generateQRCode"
          severity="success"
          class="w-full"
          icon="pi pi-qrcode"
          label="Generar código QR"
          :disabled="!text.trim() || text.length > MAX_TEXT_LENGTH"
        />

        <Button
          @click="copyQRCode"
          severity="help"
          class="w-full"
          icon="pi pi-copy"
          label="Copiar código QR"
          :disabled="!qrCode || !text.trim()"
        />

        <Button
          @click="downloadQRCode"
          severity="info"
          class="w-full"
          icon="pi pi-download"
          label="Descargar código QR"
          :disabled="!qrCode || !text.trim()"
        />

        <div class="flex items-center gap-2">
          <Button
            @click="decreaseSize"
            severity="secondary"
            icon="pi pi-minus"
            :disabled="qrSize <= MIN_SIZE"
            v-tooltip.top="'Reducir tamaño'"
          />
          <span class="text-sm text-gray-600">{{ qrSize }}x{{ qrSize }}px</span>
          <Button
            @click="increaseSize"
            severity="secondary"
            icon="pi pi-plus"
            :disabled="qrSize >= MAX_SIZE"
            v-tooltip.top="'Aumentar tamaño'"
          />
        </div>
      </div>
      <div ref="qrcodeContainer" class="flex justify-center mt-4"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import QRCodeStyling from "qr-code-styling";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const toast = useToast();
const text = ref("");
const qrcodeContainer = ref<HTMLElement | null>(null);
const qrSize = ref(Number(localStorage.getItem("qr-size")) || 300);
const MIN_SIZE = 200; // Tamaño mínimo
const MAX_SIZE = 1000; // Tamaño máximo
const qrCode = ref<any>(null);
const MAX_TEXT_LENGTH = 2900; // Aproximadamente el límite seguro para QR versión 40 con codificación alfanumérica

const copyQRCode = async () => {
  if (!qrCode.value) return;

  try {
    // Primero obtenemos el canvas
    const canvas = qrcodeContainer.value?.querySelector("canvas");
    if (!canvas) return;

    // Convertimos el canvas a blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });

    // Copiamos al portapapeles
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);

    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Código QR copiado al portapapeles",
      life: 3000,
    });
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar el código QR",
      life: 3000,
    });
  }
};

const downloadQRCode = () => {
  if (qrCode.value) {
    qrCode.value.download({ name: "qr", extension: "png" });
  }
};

const increaseSize = () => {
  qrSize.value = Math.min(qrSize.value + 50, MAX_SIZE);
  localStorage.setItem("qr-size", qrSize.value.toString());
};

const decreaseSize = () => {
  qrSize.value = Math.max(qrSize.value - 50, MIN_SIZE);
  localStorage.setItem("qr-size", qrSize.value.toString());
};

const generateQRCode = () => {
  if (!qrcodeContainer.value || !text.value.trim()) return;

  // Validar longitud del texto
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
    // Eliminar QR anterior si existe
    qrcodeContainer.value.innerHTML = "";

    qrCode.value = new QRCodeStyling({
      width: qrSize.value,
      height: qrSize.value,
      data: text.value,
      dotsOptions: {
        color: "#0288d1",
        type: "dots",
      },
      backgroundOptions: {
        color: "#f8fafc",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
      },
    });

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

// Agregar validación en tiempo real
watch(text, (newValue) => {
  if (newValue.length > MAX_TEXT_LENGTH) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: `Has excedido el límite de ${MAX_TEXT_LENGTH} caracteres.`,
      life: 3000,
    });
  }
});

// Regenerar QR cuando cambie el tamaño
watch(qrSize, () => {
  if (text.value) {
    generateQRCode();
  }
});
</script>
