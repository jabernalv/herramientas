<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "primevue/button";
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
import { RouterLink } from "vue-router";
import MD5 from "crypto-js/md5";
import SHA1 from "crypto-js/sha1";
import SHA256 from "crypto-js/sha256";
import CryptoJS from "crypto-js";
import Card from "primevue/card";

type WordArray = CryptoJS.lib.WordArray;

interface HashAlgorithm {
  name: string;
  value: string;
  function: (text: string | WordArray) => string;
}

const toast = useToast();
const inputText = ref("");
const hashResult = ref("");
const fileHashResult = ref("");
const isProcessingFile = ref(false);
const activeTabIndex = ref("texto");
const lastFile = ref<File | null>(null);

// Recuperar el último algoritmo usado del localStorage
const savedAlgorithm = localStorage.getItem("selectedHashAlgorithm");
const algorithms: HashAlgorithm[] = [
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
];

const selectedAlgorithm = ref<HashAlgorithm>(
  savedAlgorithm
    ? algorithms.find((a) => a.value === savedAlgorithm) || algorithms[0]
    : algorithms[0]
);

// Guardar el algoritmo seleccionado cuando cambie
watch(selectedAlgorithm, (newAlgorithm) => {
  localStorage.setItem("selectedHashAlgorithm", newAlgorithm.value);
});

// Función para generar el hash de texto
const generateHash = () => {
  if (!inputText.value.trim()) {
    hashResult.value = "";
    return;
  }

  try {
    hashResult.value = selectedAlgorithm.value.function(inputText.value);
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
    fileHashResult.value = selectedAlgorithm.value.function(wordArray);

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
watch(
  [inputText, selectedAlgorithm],
  async () => {
    if (activeTabIndex.value === "texto") {
      generateHash();
    } else if (lastFile.value) {
      await generateFileHash(lastFile.value);
    }
  },
  { immediate: true }
);
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
          <li class="text-gray-700">Generador de Hashes</li>
        </ol>
      </nav>
    </div>

    <div class="w-4/5 mx-auto">
      <Toast />

      <Card class="bg-white rounded-xl shadow-lg p-6 mb-16">
        <template #title>
          <h1>Generador de Hashes</h1>
        </template>
        <template #content>
          <!-- Selector de Algoritmo común -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Algoritmo de Hash
            </label>
            <Select
              v-model="selectedAlgorithm"
              :options="algorithms"
              optionLabel="name"
              class="w-full md:w-64"
              placeholder="Selecciona un algoritmo"
            />
          </div>

          <Tabs v-model="activeTabIndex" value="texto">
            <TabList>
              <Tab value="texto">Texto</Tab>
              <Tab value="archivo">Archivo</Tab>
            </TabList>
            <TabPanels>
              <!-- Tab de Texto -->
              <TabPanel value="texto">
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Texto a hashear
                    </label>
                    <Textarea
                      v-model="inputText"
                      rows="4"
                      placeholder="Escribe o pega el texto aquí..."
                      class="w-full"
                      autoResize
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
                    <Textarea
                      v-model="hashResult"
                      rows="2"
                      readonly
                      class="w-full font-mono text-sm"
                      :placeholder="
                        inputText
                          ? 'Generando hash...'
                          : 'El hash aparecerá aquí'
                      "
                    />
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
            </TabPanels>
          </Tabs>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-fileupload-content) {
  display: none;
}

/* Eliminar estilos deprecados de high-contrast */
:deep(.p-component),
:deep(.p-button),
:deep(.p-select),
:deep(.p-fileupload),
:deep(.p-textarea) {
  @apply transition-colors duration-200;
}
</style>
