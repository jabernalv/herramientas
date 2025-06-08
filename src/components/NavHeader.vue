<script setup lang="ts">
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import { Wrench } from "lucide-vue-next";

const router = useRouter();

const items = [
  {
    label: "Inicio",
    icon: "pi pi-home",
    command: () => router.push("/"),
  },
  {
    label: "Herramientas",
    icon: "pi pi-wrench",
    items: [
      {
        label: "Base64",
        icon: "pi pi-code",
        command: () => router.push("/base64"),
      },
      {
        label: "UUIDs",
        icon: "pi pi-key",
        command: () => router.push("/generate-uuids"),
      },
      {
        label: "Cadenas Seguras",
        icon: "pi pi-shield",
        command: () => router.push("/generate-secure-strings"),
      },
      {
        label: "Excel a SQL",
        icon: "pi pi-table",
        command: () => router.push("/from-xls-to-sql"),
      },
      {
        label: "Códigos QR",
        icon: "pi pi-qrcode",
        command: () => router.push("/qrcode"),
      },
      {
        label: "Calendario",
        icon: "pi pi-calendar",
        command: () => router.push("/calendario"),
      },
      {
        label: "Excel a Markdown",
        icon: "pi pi-file",
        command: () => router.push("/xls2md"),
      },
      {
        label: "LaTeX",
        icon: "pi pi-calculator",
        command: () => router.push("/latex-online"),
      },
      {
        label: "Visor Markdown",
        icon: "pi pi-file-edit",
        command: () => router.push("/visor-markdown"),
      },
    ],
  },
];
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-600"
  >
    <div class="mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
          <Wrench class="w-6 h-6 text-white" />
          <span class="text-xl font-bold text-white">Herramientas Web</span>
        </div>
        <nav>
          <Menubar :model="items" class="bg-transparent border-none" />
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
:deep(.p-menubar) {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-menuitem-text) {
  color: white !important;
}

:deep(.p-menuitem-icon) {
  color: white !important;
}

:deep(.p-submenu-icon) {
  color: white !important;
}

:deep(.p-submenu-list) {
  background: #1e40af !important;
  border: none;
  padding: 0.5rem 0;
}

:deep(.p-menuitem-link:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

.container {
  max-width: 1280px;
}
</style>
