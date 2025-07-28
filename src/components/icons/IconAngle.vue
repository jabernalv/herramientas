<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    v-bind="$attrs"
  >
    <path stroke="none" d="M0 0h24v24H0z"/>
    <path d="M21 19H3l9-15m8.615 11.171h.015m-1.115-3.4h.015m-1.815-3.1h.015m-2.315-2.7h.015"/>
  </svg>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  size: {
    type: [String, Number],
    default: 20, // Valor por defecto para el tamaño
  },
  color: {
    type: String,
    default: "#000000", // Valor por defecto para el color
  },
});
</script>

<style scoped>
/* Puedes añadir estilos específicos para el SVG si lo necesitas */
</style>
