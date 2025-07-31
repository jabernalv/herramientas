<template>
  <div class="w-full">
    <Toast />
    <BreadcrumbNav />

    <header class="text-center mb-6">
      <h1
        class="text-4xl font-bold text-green-600 flex items-center justify-center gap-2"
      >
        <IconQRCode class="inline-block mr-2 w-24 h-24" />
        Generador de códigos QR
      </h1>
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
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import QRCodeGeneral from "@/components/QRCodeGeneral.vue";
import QRCodeVCard from "@/components/QRCodeVCard.vue";
import QRCodeWifi from "@/components/QRCodeWifi.vue";
import { DEFAULT_SIZE } from "@/utils/qrCodeCommonFunctions";
import IconQRCode from "@/components/icons/IconQRCode.vue";

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
