<script setup lang="ts">
import NavHeader from "./components/NavHeader.vue";
import FooterComponent from "./components/FooterComponent.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { RouterView } from "vue-router";

const toast = useToast();
</script>

<template>
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
/* Eliminamos estilos globales innecesarios */
</style>
