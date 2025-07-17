<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import Toast from "primevue/toast";
import FileUpload from "primevue/fileupload";
import Tabs from "primevue/tabs";
import Tab from "primevue/tab";
import TabPanel from "primevue/tabpanel";
import TabList from "primevue/tablist";
import TabPanels from "primevue/tabpanels";
import { useToast } from "primevue/usetoast";

import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import SHA512 from "crypto-js/sha512";
import CryptoJS from "crypto-js";
import Card from "primevue/card";
import bcrypt from "bcryptjs";
import Message from "primevue/message";
import { Hash, FileText, CheckCircle } from "lucide-vue-next";
import jsSHA from "jssha";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

type WordArray = CryptoJS.lib.WordArray;

interface HashAlgorithm {
  name: string;
  value: string;
  function: (text: string | WordArray) => string | Promise<string>;
  verify?: (text: string, hash: string) => boolean | Promise<boolean>;
  outputLength?: number;
}

const toast = useToast();
const inputText = ref("");
const hashResult = ref("");
const fileHashResult = ref("");
const isProcessingFile = ref(false);
const activeTabIndex = ref("generar");
const lastFile = ref<File | null>(null);

// Para la tab de verificación
const originalText = ref("");
const hashToVerify = ref("");
const verificationResult = ref<boolean | null>(null);

// Función para generar hash tipo Yii2
const generateYiiHash = (text: string | WordArray): string => {
  try {
    const salt = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(text.toString(), salt);
  } catch (error) {
    console.error("Error generando hash Yii2:", error);
    return "";
  }
};

// Función para verificar hash tipo Yii2
const verifyYiiHash = (text: string, hash: string): boolean => {
  try {
    return bcrypt.compareSync(text, hash);
  } catch (error) {
    console.error("Error verificando hash Yii2:", error);
    return false;
  }
};

// Función para generar hash SHAKE256
const generateShake256Hash = (text: string | WordArray): string => {
  try {
    const shaObj = new jsSHA("SHAKE256", "TEXT", { encoding: "UTF8" });
    shaObj.update(text.toString());
    return shaObj.getHash("HEX", { outputLen: 256 }); // 256 bits = 32 bytes
  } catch (error) {
    console.error("Error generando hash SHAKE256:", error);
    return "";
  }
};

// Recuperar algoritmo guardado
const savedAlgorithm = localStorage.getItem("selectedHashAlgorithm");
const allAlgorithms: HashAlgorithm[] = [
  {
    name: "MD5",
    value: "md5",
    function: (text: string | WordArray) => MD5(text).toString(),
  },
  {
    name: "SHA-1",
    value: "sha1",
    function: (text: string | WordArray) => SHA1(text).toString(),
  },
  {
    name: "SHA-256",
    value: "sha256",
    function: (text: string | WordArray) => SHA256(text).toString(),
  },
  {
    name: "SHA-512",
    value: "sha512",
    function: (text: string | WordArray) => SHA512(text).toString(),
  },
  {
    name: "SHAKE-256",
    value: "shake256",
    function: generateShake256Hash,
    outputLength: 256,
  },
  {
    name: "Yii2 Password Hash (bcrypt)",
    value: "yii2",
    function: generateYiiHash,
    verify: verifyYiiHash,
  },
];

const fileAlgorithms = allAlgorithms.filter((algo) => algo.value !== "yii2");

// Inicializar algoritmos
const textAlgorithm = ref(
  savedAlgorithm
    ? allAlgorithms.find((a) => a.value === savedAlgorithm) || allAlgorithms[0]
    : allAlgorithms[0]
);
const fileAlgorithm = ref(fileAlgorithms[0]);

// El algoritmo activo depende de la tab
const selectedAlgorithm = computed({
  get: () => {
    return activeTabIndex.value === "archivo"
      ? fileAlgorithm.value
      : textAlgorithm.value;
  },
  set: (value) => {
    if (activeTabIndex.value === "archivo") {
      fileAlgorithm.value = value;
    } else {
      textAlgorithm.value = value;
    }
  },
});

// Watch para guardar el algoritmo seleccionado
watch(selectedAlgorithm, (newAlgo) => {
  localStorage.setItem("selectedHashAlgorithm", newAlgo.value);
});

// Watch para debug
watch([activeTabIndex, selectedAlgorithm], ([newTab, newAlgo]) => {
  console.log("Tab activa:", newTab);
  console.log("Algoritmo seleccionado:", newAlgo);
});

// Watch para manejar cambios en la tab activa
watch(activeTabIndex, (newValue) => {
  console.log("Tab activa:", newValue);
  if (newValue === "archivo") {
    if (selectedAlgorithm.value.value === "yii2") {
      selectedAlgorithm.value = fileAlgorithms[0];
    }
  }
});

// Función para verificar un hash
const verifyHash = async () => {
  if (!originalText.value || !hashToVerify.value) return;

  try {
    if (selectedAlgorithm.value.verify) {
      // Para algoritmos con función de verificación propia (como bcrypt y argon2)
      verificationResult.value = await selectedAlgorithm.value.verify(
        originalText.value,
        hashToVerify.value
      );
    } else {
      // Para algoritmos tradicionales, generamos el hash y comparamos
      const generatedHash = await selectedAlgorithm.value.function(
        originalText.value
      );
      verificationResult.value = generatedHash === hashToVerify.value;
    }
  } catch (error) {
    console.error("Error al verificar hash:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al verificar el hash",
      life: 3000,
    });
  }
};

// Función para generar el hash de texto
const generateHash = async () => {
  if (!inputText.value.trim()) {
    hashResult.value = "";
    return;
  }

  try {
    const algorithm = selectedAlgorithm.value;
    hashResult.value = await algorithm.function(inputText.value);
  } catch (error) {
    console.error("Error al generar hash:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al generar el hash",
      life: 3000,
    });
  }
};

// Función para generar el hash de un archivo
const handleFileUpload = async (event: any) => {
  const file = event.files[0];
  if (!file) return;

  lastFile.value = file;
  await generateFileHash(file);
};

// Función para generar el hash de un archivo
const generateFileHash = async (file: File) => {
  if (!file) return;

  isProcessingFile.value = true;
  fileHashResult.value = "";

  try {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = convertArrayBufferToWordArray(arrayBuffer);
    fileHashResult.value = await selectedAlgorithm.value.function(wordArray);

    toast.add({
      severity: "success",
      summary: "Hash Generado",
      detail: `Hash ${selectedAlgorithm.value.name} generado para ${file.name}`,
      life: 3000,
    });
  } catch (error) {
    console.error("Error al procesar archivo:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al procesar el archivo",
      life: 3000,
    });
  } finally {
    isProcessingFile.value = false;
  }
};

// Función auxiliar para convertir ArrayBuffer a WordArray
const convertArrayBufferToWordArray = (arrayBuffer: ArrayBuffer): WordArray => {
  const uint8Array = new Uint8Array(arrayBuffer);
  const words: number[] = [];

  for (let i = 0; i < uint8Array.length; i += 4) {
    words.push(
      (uint8Array[i] << 24) |
        (uint8Array[i + 1] << 16) |
        (uint8Array[i + 2] << 8) |
        uint8Array[i + 3]
    );
  }

  return {
    words,
    sigBytes: uint8Array.length,
  } as WordArray;
};

// Copiar hash al portapapeles
const copyHash = async (hash: string) => {
  if (!hash) return;

  try {
    await navigator.clipboard.writeText(hash);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Hash copiado al portapapeles",
      life: 2000,
    });
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar al portapapeles",
      life: 3000,
    });
  }
};

// Observar cambios en el texto o algoritmo para regenerar el hash
watch([selectedAlgorithm], async () => {
  if (activeTabIndex.value === "generar" && hashResult.value) {
    generateHash();
  } else if (lastFile.value && fileHashResult.value) {
    await generateFileHash(lastFile.value);
  }
});
</script>

<template>
  <div>
    <BreadcrumbNav />

    <div class="w-4/5 mx-auto">
      <Toast />

      <Card class="bg-white rounded-xl shadow-lg p-6 mb-16">
        <template #title>
          <h1>Generador de Hashes</h1>
        </template>
        <template #content>
          <Tabs v-model:value="activeTabIndex" class="w-full" scrollable>
            <TabList class="flex overflow-x-auto">
              <Tab value="generar" class="flex-1 whitespace-nowrap">
                <div
                  class="flex items-center gap-1 md:gap-2 justify-center text-sm md:text-base px-2"
                >
                  <Hash class="w-3 h-3 md:w-4 md:h-4" />
                  <span>Generar</span>
                </div>
              </Tab>
              <Tab value="archivo" class="flex-1 whitespace-nowrap">
                <div
                  class="flex items-center gap-1 md:gap-2 justify-center text-sm md:text-base px-2"
                >
                  <FileText class="w-3 h-3 md:w-4 md:h-4" />
                  <span>Archivo</span>
                </div>
              </Tab>
              <Tab value="verificar" class="flex-1 whitespace-nowrap">
                <div
                  class="flex items-center gap-1 md:gap-2 justify-center text-sm md:text-base px-2"
                >
                  <CheckCircle class="w-3 h-3 md:w-4 md:h-4" />
                  <span>Verificar</span>
                </div>
              </Tab>
            </TabList>
            <TabPanels class="w-full">
              <!-- Tab de Generar Hash -->
              <TabPanel value="generar">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Texto a hashear
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <Hash class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="inputText"
                        rows="4"
                        placeholder="Escribe o pega el texto aquí..."
                        class="w-full"
                        autoResize
                      />
                    </InputGroup>
                  </div>

                  <div class="flex justify-center">
                    <Button
                      @click="generateHash"
                      icon="pi pi-refresh"
                      label="Generar Hash"
                      severity="primary"
                      :disabled="!inputText.trim()"
                    />
                  </div>

                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <label class="block text-sm font-medium text-gray-700">
                        Hash Generado ({{ selectedAlgorithm.name }})
                      </label>
                      <Button
                        v-if="hashResult"
                        icon="pi pi-copy"
                        @click="() => copyHash(hashResult)"
                        text
                        v-tooltip="'Copiar hash'"
                      />
                    </div>
                    <InputGroup>
                      <InputGroupAddon>
                        <FileText class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="hashResult"
                        rows="2"
                        readonly
                        class="w-full font-mono text-sm"
                        placeholder="El hash aparecerá aquí"
                      />
                    </InputGroup>
                  </div>
                </div>
              </TabPanel>

              <!-- Tab de Archivo -->
              <TabPanel value="archivo">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Archivo a hashear
                    </label>
                    <FileUpload
                      mode="basic"
                      :auto="true"
                      :maxFileSize="100000000"
                      @select="handleFileUpload"
                      :customUpload="true"
                      chooseLabel="Seleccionar Archivo"
                      class="w-full bg-transparent border-0"
                    />
                    <p class="text-sm text-gray-500 mt-1">
                      Máximo 100MB. El hash se generará automáticamente.
                    </p>
                  </div>

                  <div>
                    <div class="flex justify-between items-center mb-2">
                      <label class="block text-sm font-medium text-gray-700">
                        Hash del Archivo ({{ selectedAlgorithm.name }})
                      </label>
                      <Button
                        v-if="fileHashResult"
                        icon="pi pi-copy"
                        @click="() => copyHash(fileHashResult)"
                        text
                        v-tooltip="'Copiar hash'"
                      />
                    </div>
                    <div
                      class="w-full min-h-[4rem] p-3 bg-gray-50 rounded-lg border font-mono text-sm break-all"
                      :class="{ 'animate-pulse': isProcessingFile }"
                    >
                      {{
                        isProcessingFile
                          ? "Generando hash..."
                          : fileHashResult ||
                            "Selecciona un archivo para generar su hash"
                      }}
                    </div>
                  </div>
                </div>
              </TabPanel>

              <!-- Tab de Verificación -->
              <TabPanel value="verificar">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Texto original
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <FileText class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="originalText"
                        rows="2"
                        placeholder="Ingresa el texto original..."
                        class="w-full"
                        autoResize
                      />
                    </InputGroup>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Hash a verificar
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <Hash class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="hashToVerify"
                        rows="2"
                        placeholder="Ingresa el hash a verificar..."
                        class="w-full font-mono text-sm"
                        autoResize
                      />
                    </InputGroup>
                  </div>

                  <div class="flex justify-center">
                    <Button
                      @click="verifyHash"
                      icon="pi pi-check"
                      label="Verificar Hash"
                      severity="info"
                      :disabled="!originalText.trim() || !hashToVerify.trim()"
                    />
                  </div>

                  <Message
                    v-if="verificationResult !== null"
                    :severity="verificationResult ? 'success' : 'error'"
                    :closable="false"
                    class="text-lg"
                  >
                    <template #icon>
                      <i
                        v-if="verificationResult"
                        class="text-2xl pi pi-check-circle mr-2"
                      />
                      <i v-else class="text-2xl pi pi-times-circle mr-2" />
                    </template>
                    {{
                      verificationResult
                        ? "¡Hash verificado correctamente! 🎉 Los datos son auténticos."
                        : "❌ El hash no coincide. Los datos podrían haber sido modificados."
                    }}
                  </Message>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <!-- Debug info -->
          <div class="text-xs text-gray-400 mt-2">
            Tab activa: {{ activeTabIndex }}
          </div>

          <!-- Selector de Algoritmo -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Algoritmo de Hash
            </label>
            <div v-if="activeTabIndex !== 'archivo'">
              <!-- Select para texto y verificación -->
              <InputGroup>
                <InputGroupAddon>
                  <Hash class="w-4 h-4" />
                </InputGroupAddon>
                <Select
                  v-model="textAlgorithm"
                  :options="allAlgorithms"
                  optionLabel="name"
                  class="w-full md:w-64"
                  placeholder="Seleccione algoritmo"
                />
              </InputGroup>
            </div>
            <div v-else>
              <!-- Select para archivos -->
              <InputGroup>
                <InputGroupAddon>
                  <FileText class="w-4 h-4" />
                </InputGroupAddon>
                <Select
                  v-model="fileAlgorithm"
                  :options="fileAlgorithms"
                  optionLabel="name"
                  class="w-full md:w-64"
                  placeholder="Seleccione algoritmo"
                />
              </InputGroup>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-fileupload-content) {
  display: none;
}
</style>
