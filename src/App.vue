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
/* Estilo global */
.p-tab {
  border-top-left-radius: 8px !important;
  border-top-right-radius: 8px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.p-tab-active {
  background-color: #f9f9f9 !important;
}
</style>
