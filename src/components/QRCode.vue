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
          <li class="text-gray-700">Generador de códigos QR</li>
        </ol>
      </nav>
    </div>

    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-green-600">QR Generator</h1>
    </header>

    <main class="w-full max-w-md space-y-4 mx-auto mb-16">
      <Textarea
        v-model="text"
        rows="4"
        class="w-full"
        placeholder="Enter text or URL here..."
      />

      <Button
        @click="generateQRCode"
        severity="success"
        class="w-full"
        icon="pi pi-qrcode"
        label="Generate QR Code"
      />

      <div ref="qrcodeContainer" class="flex justify-center mt-4"></div>

      <Button
        @click="downloadQRCode"
        severity="info"
        class="w-full"
        icon="pi pi-download"
        label="Download QR Code"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import QRCodeStyling from "qr-code-styling";

const text = ref("");
const qrcodeContainer = ref<HTMLElement | null>(null);
let qrCode: any = null;

const downloadQRCode = () => {
  if (qrCode) {
    qrCode.download({ name: "qr-code", extension: "png" });
  }
};

const generateQRCode = () => {
  if (!qrcodeContainer.value) return;

  // Eliminar QR anterior si existe
  qrcodeContainer.value.innerHTML = "";

  qrCode = new QRCodeStyling({
    width: 1024,
    height: 1024,
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

  qrCode.append(qrcodeContainer.value);
};
</script>
