<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const psshDecodeInput = ref("");
const psshEncodeInput = ref("");
const psshEncodeOutput = ref("");
const decodedData = ref<any>(null);

// DRM System IDs
const DRM_SYSTEMS = {
  WIDEVINE: "edef8ba979d64acea3c827dcd51d21ed",
  PLAYREADY: "9a04f07998404286ab92e65be0885f95",
  FAIRPLAY: "94ce86fb07ff4f43adb893d2fa968ca2",
};

// Función para convertir bytes a hex string
const bytesToHex = (bytes: Uint8Array): string => {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

// Decodificar PSSH
const decodePssh = () => {
  try {
    if (!psshDecodeInput.value) return;

    // Decodificar Base64 a array de bytes
    const binaryStr = atob(psshDecodeInput.value);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    // Verificar el header PSSH
    const psshHeader = bytesToHex(bytes.slice(4, 8));
    if (psshHeader !== "70737368") {
      // "pssh" en hex
      throw new Error("Formato PSSH inválido: header incorrecto");
    }

    // Extraer información básica
    const version = bytes[8];
    const systemId = bytesToHex(bytes.slice(12, 28));

    // Identificar el sistema DRM
    let systemName = "Desconocido";
    if (systemId === DRM_SYSTEMS.WIDEVINE) systemName = "Widevine";
    else if (systemId === DRM_SYSTEMS.PLAYREADY) systemName = "PlayReady";
    else if (systemId === DRM_SYSTEMS.FAIRPLAY) systemName = "FairPlay";

    // Para Widevine v0, el KeyID está después del data_size (0x12) y el tag (0x12 0x10)
    let keyId = "";
    let keyIdBase64 = "";
    if (systemName === "Widevine" && version === 0) {
      // Saltar al inicio de los datos (28) + data_size (4) + tag (2)
      const keyIdStart = 34;
      const keyIdBytes = bytes.slice(keyIdStart, keyIdStart + 16);
      keyId = bytesToHex(keyIdBytes);
      keyIdBase64 = btoa(String.fromCharCode.apply(null, [...keyIdBytes]));
    }

    decodedData.value = {
      systemId,
      systemName,
      version,
      keyId,
      keyIdBase64,
    };

    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "PSSH decodificado correctamente",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        error instanceof Error ? error.message : "Error al decodificar PSSH",
      life: 3000,
    });
  }
};

// Función para convertir string hex a array de números
const hexToBytes = (hex: string): number[] => {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return bytes;
};

// Función para concatenar arrays de números
const concatenateArrays = (...arrays: number[][]): number[] => {
  return arrays.flat();
};

// Función para validar si es Base64
const isBase64 = (str: string): boolean => {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
};

// Función para convertir Base64 a Hex
const base64ToHex = (base64: string): string => {
  // Remover padding si existe, pero mantener el caso original
  base64 = base64.replace(/=+$/, "");

  // Convertir Base64 a bytes manteniendo el caso original
  const raw = atob(base64);

  // Convertir bytes a hex manteniendo el caso original
  let hex = "";
  for (let i = 0; i < raw.length; i++) {
    const byte = raw.charCodeAt(i);
    hex += byte.toString(16).padStart(2, "0");
  }

  return hex;
};

// Función para convertir Hex a Base64
const hexToBase64 = (hex: string): string => {
  // Asegurarse de que tenemos un número par de caracteres
  hex = hex.length % 2 ? "0" + hex : hex;

  // Convertir hex a array de números
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }

  // Convertir bytes a Base64
  return btoa(String.fromCharCode.apply(null, bytes));
};

// Función para validar si una cadena es hexadecimal válida
const isValidHex = (str: string): boolean => {
  return /^[0-9a-f]{32}$/.test(str);
};

// Función para validar si una cadena es Base64 válida y representa 16 bytes
const isValidBase64KeyId = (str: string): boolean => {
  try {
    // Remover padding si existe, pero mantener el caso original
    str = str.replace(/=+$/, "");
    const decoded = atob(str);
    return decoded.length === 16;
  } catch {
    return false;
  }
};

// Codificar PSSH
const encodePssh = () => {
  try {
    if (!psshEncodeInput.value) return;

    let keyId = psshEncodeInput.value.trim().replace(/-/g, "");

    // Primero verificamos si es un hex válido (convertimos a minúsculas solo para la validación)
    if (isValidHex(keyId.toLowerCase())) {
      // Asegurarnos de que el keyId esté en minúsculas para el procesamiento
      keyId = keyId.toLowerCase();
    }
    // Si no es hex válido, intentamos como Base64
    else if (isValidBase64KeyId(keyId)) {
      keyId = base64ToHex(keyId);
    }
    // Si no es ninguno de los dos, error
    else {
      throw new Error(
        `El KeyID debe ser una cadena hexadecimal de 32 caracteres o un Base64 válido que represente 16 bytes.`
      );
    }

    // Recrear la estructura PSSH como arrays de números
    const header = [
      0x00, 0x00, 0x00, 0x32, 0x70, 0x73, 0x73, 0x68, 0x00, 0x00, 0x00, 0x00,
    ];
    const widevineSystemId = hexToBytes("edef8ba979d64acea3c827dcd51d21ed");
    const dataHeader = [0x00, 0x00, 0x00, 0x12, 0x12, 0x10];
    const keyIdBytes = hexToBytes(keyId);

    // Concatenar todos los componentes
    const finalArray = concatenateArrays(
      header,
      widevineSystemId,
      dataHeader,
      keyIdBytes
    );

    // Convertir a base64
    psshEncodeOutput.value = btoa(String.fromCharCode.apply(null, finalArray));

    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "PSSH codificado correctamente",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        error instanceof Error ? error.message : "Error al codificar PSSH",
      life: 3000,
    });
  }
};

// Copiar al portapapeles
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Texto copiado al portapapeles",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al copiar al portapapeles",
      life: 3000,
    });
  }
};

// Limpiar campos
const clearDecode = () => {
  psshDecodeInput.value = "";
  decodedData.value = null;
};

const clearEncode = () => {
  psshEncodeInput.value = "";
  psshEncodeOutput.value = "";
};
</script>

<template>
  <h1 class="text-2xl font-bold">DRM Tools</h1>
  <div class="flex flex-col items-center min-h-[calc(100vh-4rem)] w-full p-4">
    <div class="w-4/5 space-y-4 flex flex-row gap-4">
      <!-- Decodificador PSSH -->
      <Card class="w-full">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-lock-open"></i>
            <span>Decodificar PSSH</span>
          </div>
        </template>
        <template #subtitle>Decodifica un PSSH en formato Base64 </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2">PSSH Base64</label>
              <Textarea
                v-model="psshDecodeInput"
                rows="3"
                class="w-full"
                placeholder="Ingresa el PSSH en formato Base64"
              />
            </div>

            <div class="flex gap-2">
              <Button
                label="Decodificar"
                icon="pi pi-arrow-right"
                class="p-button-success flex-grow"
                @click="decodePssh"
                :disabled="!psshDecodeInput"
              />
              <Button
                icon="pi pi-copy"
                class="p-button-outlined"
                @click="() => copyToClipboard(psshDecodeInput)"
                :disabled="!psshDecodeInput"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="clearDecode"
                :disabled="!psshDecodeInput && !decodedData"
              />
            </div>

            <div v-if="decodedData" class="surface-ground border-round p-3">
              <p class="mb-2">
                <strong>Sistema DRM:</strong> {{ decodedData.systemName }}
              </p>
              <p class="mb-2">
                <strong>System ID:</strong> {{ decodedData.systemId }}
              </p>
              <p class="mb-2">
                <strong>Versión:</strong> {{ decodedData.version }}
              </p>
              <template v-if="decodedData.keyId">
                <div class="space-y-4">
                  <div>
                    <p class="font-bold mb-2">Key ID (HEX):</p>
                    <div class="flex items-center gap-2">
                      <code
                        class="bg-surface-200 p-1 rounded flex-grow font-mono text-sm"
                      >
                        {{ decodedData.keyId }}
                      </code>
                      <Button
                        icon="pi pi-copy"
                        class="p-button-text p-button-sm"
                        @click="() => copyToClipboard(decodedData.keyId)"
                        v-tooltip.top="'Copiar Key ID (HEX)'"
                      />
                    </div>
                  </div>

                  <div>
                    <p class="font-bold mb-2">Key ID (Base64):</p>
                    <div class="flex items-center gap-2">
                      <code
                        class="bg-surface-200 p-1 rounded flex-grow font-mono text-sm"
                      >
                        {{ decodedData.keyIdBase64 }}
                      </code>
                      <Button
                        icon="pi pi-copy"
                        class="p-button-text p-button-sm"
                        @click="() => copyToClipboard(decodedData.keyIdBase64)"
                        v-tooltip.top="'Copiar Key ID (Base64)'"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </Card>

      <!-- Codificador PSSH -->
      <Card class="w-full">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-lock"></i>
            <span>Codificar PSSH</span>
          </div>
        </template>
        <template #subtitle>
          Codifica información en formato PSSH Base64
        </template>
        <template #content>
          <div class="space-y-4">
            <div>
              <label class="block mb-2">Texto a codificar</label>
              <Textarea
                v-model="psshEncodeInput"
                rows="3"
                class="w-full"
                placeholder="Ingresa el Key ID en formato HEX (32 caracteres) o Base64 (22-24 caracteres)"
              />
            </div>

            <div class="flex gap-2">
              <Button
                label="Codificar"
                icon="pi pi-arrow-right"
                class="p-button-success flex-grow"
                @click="encodePssh"
                :disabled="!psshEncodeInput"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="clearEncode"
                :disabled="!psshEncodeInput && !psshEncodeOutput"
              />
            </div>

            <div v-if="psshEncodeOutput">
              <label class="block mb-2">Resultado en Base64</label>
              <Textarea
                v-model="psshEncodeOutput"
                rows="3"
                class="w-full mb-2"
                readonly
              />
              <Button
                icon="pi pi-copy"
                label="Copiar resultado"
                class="p-button-outlined w-full"
                @click="() => copyToClipboard(psshEncodeOutput)"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-card) {
  border-radius: 8px;
}

.p-button {
  border-radius: 6px;
}

textarea {
  border-radius: 6px;
}
</style>
