<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Menubar from "primevue/menubar";
import Button from "primevue/button";
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";

const router = useRouter();
const mobileMenu = ref<InstanceType<typeof Menu> | null>(null);
const isMobileMenuVisible = ref(false);

const toggleMobileMenu = (event: MouseEvent) => {
  mobileMenu.value?.toggle(event);
  isMobileMenuVisible.value = !isMobileMenuVisible.value;
};

const menuItems: MenuItem[] = [
  {
    label: "Inicio",
    icon: "pi pi-home",
    command: () => router.push("/"),
  },
  {
    label: "Base64",
    icon: "pi pi-code",
    command: () => router.push("/base64"),
  },
  {
    label: "UUIDs",
    icon: "pi pi-key",
    command: () => router.push("/uuids-generator"),
  },
  {
    label: "Cadenas Seguras",
    icon: "pi pi-shield",
    command: () => router.push("/secure-string-generator"),
  },
  {
    label: "Excel a SQL",
    icon: "pi pi-table",
    command: () => router.push("/from-xls-to-sql"),
  },
  {
    label: "Códigos QR",
    icon: "pi pi-qrcode",
    command: () => router.push("/qr-code-generator"),
  },
  {
    label: "Calendario",
    icon: "pi pi-calendar",
    command: () => router.push("/calendar"),
  },
  {
    label: "Excel a Markdown",
    icon: "pi pi-file",
    command: () => router.push("/xls2md"),
  },
  {
    label: "LaTeX",
    icon: "pi pi-calculator",
    command: () => router.push("/latex-equation-generator"),
  },
  {
    label: "Visor Markdown",
    icon: "pi pi-file-edit",
    command: () => router.push("/markdown-generator"),
  },
  {
    label: "Paleta de Colores",
    icon: "pi pi-palette",
    command: () => router.push("/color-palette-generator"),
  },
  {
    label: "Generador de Hashes",
    icon: "pi pi-lock",
    command: () => router.push("/hash-generator"),
  },
  {
    label: "Probador de RegEx",
    icon: "pi pi-search",
    command: () => router.push("/regex-tester"),
  },
  {
    label: "DRM Tools",
    icon: "pi pi-shield",
    command: () => router.push("/drm-tools"),
  },
];

// Menú de escritorio
const items: MenuItem[] = [
  {
    label: "Inicio",
    icon: "pi pi-home",
    command: () => router.push("/"),
  },
  {
    label: "Herramientas",
    icon: "pi pi-wrench",
    items: menuItems.slice(1), // Excluimos "Inicio" que ya está en el primer nivel
  },
];
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-600 z-50"
  >
    <div class="mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
          <span class="text-xl font-bold text-white">🛠️ Herramientas Web</span>
        </div>

        <!-- Menú de escritorio -->
        <nav class="hidden md:block">
          <Menubar :model="items" class="bg-transparent border-none" />
        </nav>

        <!-- Botón de menú móvil -->
        <div class="block md:hidden">
          <Button
            icon="pi pi-bars"
            @click="toggleMobileMenu"
            class="p-button-text p-button-white"
          />

          <Menu
            ref="mobileMenu"
            :model="menuItems"
            :popup="true"
            class="w-full mobile-menu"
          />
        </div>
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

:deep(.p-menuitem-link:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-button-text.p-button-white) {
  color: white !important;
}

:deep(.p-button-text.p-button-white:hover) {
  background: rgba(255, 255, 255, 0.1) !important;
}

:deep(.mobile-menu) {
  width: 100vw !important;
  position: fixed !important;
  top: 4rem !important;
  left: 0 !important;
  margin: 0 !important;
  border-radius: 0 !important;
  background: #1e40af !important;

  .p-menuitem {
    width: 100%;

    .p-menuitem-link {
      padding: 1rem !important;
      color: white !important;

      &:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }

      .p-menuitem-icon,
      .p-menuitem-text {
        color: white !important;
      }
    }
  }
}

.container {
  max-width: 1280px;
}
</style>
