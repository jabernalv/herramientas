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

    <main class="space-y-4 mx-auto mb-16 w-4/5">
      <Tabs
        v-model="activeTab"
        :value="activeTab"
        @update:value="handleTabChange"
      >
        <TabList>
          <Tab value="general">General</Tab>
          <Tab value="vcard">vCard QR</Tab>
          <Tab value="wifi">WiFi QR</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="general">
            <QRCodeGeneral :size="qrSize" @update:size="updateSize" />
          </TabPanel>
          <TabPanel value="vcard">
            <QRCodeVCard :size="qrSize" @update:size="updateSize" />
          </TabPanel>
          <TabPanel value="wifi">
            <QRCodeWifi :size="qrSize" @update:size="updateSize" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Toast from "primevue/toast";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import QRCodeGeneral from "./QRCodeGeneral.vue";
import QRCodeVCard from "./QRCodeVCard.vue";
import QRCodeWifi from "./QRCodeWifi.vue";
import { DEFAULT_SIZE } from "../utils/qrCodeCommonFunctions";

// Estado reactivo
const activeTab = ref(localStorage.getItem("qr-active-tab") || "general");
const qrSize = ref(Number(localStorage.getItem("qr-size")) || DEFAULT_SIZE);

// Métodos
const handleTabChange = (tab: string | number) => {
  const tabStr = String(tab);
  activeTab.value = tabStr;
  localStorage.setItem("qr-active-tab", tabStr);
};

const updateSize = (newSize: number) => {
  qrSize.value = newSize;
  localStorage.setItem("qr-size", newSize.toString());
};

// Inicialización
onMounted(() => {
  // Los componentes individuales se inicializan por sí solos
});
</script>

<style scoped>
/* Estilos específicos si son necesarios */
</style>
