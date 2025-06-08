<script setup lang="ts">
import NavHeader from "./components/NavHeader.vue";
import FooterComponent from "./components/FooterComponent.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const toast = useToast();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Toast />
    <NavHeader />
    <main class="flex-grow bg-surface-ground">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-16">
        <router-view />
      </div>
    </main>
    <FooterComponent />
  </div>
</template>

<style>
/* Eliminamos estilos globales innecesarios */
</style>
