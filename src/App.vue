<script setup lang="ts">
import NavHeader from "@/components/NavHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import Toast from "primevue/toast";
import { RouterView } from "vue-router";
</script>

<template>
  <!-- Test div para Tailwind -->
  <!-- <div class="bg-blue-500 text-white p-4 text-center font-bold mb-4 mt-16">
    Tailwind está funcionando correctamente
  </div> -->

  <div class="min-h-screen flex flex-col">
    <NavHeader />
    <main class="flex-grow pt-16">
      <RouterView />
    </main>
    <FooterComponent
      class="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 shadow-lg"
    />
  </div>
  <Toast />
</template>

<style>
/* Forzar ancho del panel y del input de búsqueda del dropdown de PrimeVue en móvil */
@media (max-width: 768px) {
  .p-dropdown-panel,
  .p-select-panel {
    max-width: 95vw !important;
    width: 95vw !important;
    min-width: unset !important;
    left: 2.5vw !important;
    right: 2.5vw !important;
    box-sizing: border-box !important;
  }
  .p-dropdown-panel .p-dropdown-header,
  .p-select-panel .p-select-header {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
  .p-dropdown-panel .p-iconfield,
  .p-select-panel .p-iconfield {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
  .p-dropdown-panel .p-dropdown-filter,
  .p-dropdown-panel .p-select-filter,
  .p-select-panel .p-select-filter {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
  .p-dropdown-panel .p-dropdown-items-wrapper,
  .p-select-panel .p-select-items-wrapper {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
  }
}
</style>
