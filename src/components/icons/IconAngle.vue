<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    :width="size"
    :height="size"
    :fill="color"
    v-bind="$attrs"
  >
    <path
      d="M495.304,425.738H255.417c-3.576-52.031-23.828-100.842-58.185-140.23L401.371,81.37c6.52-6.52,6.52-17.091,0-23.611
    -6.519-6.52-17.091-6.52-23.611,0L4.89,430.629c-3.282,3.282-4.984,7.702-4.886,12.172c0.018,0.813,0.095,1.627,0.233,2.436
    c0.207,1.214,0.55,2.416,1.034,3.586c2.584,6.239,8.672,10.307,15.425,10.307h222.609h256c9.22,0,16.696-7.475,16.696-16.696
    C512,433.213,504.524,425.738,495.304,425.738z M57.002,425.738l116.562-116.561c28.136,32.988,44.927,73.446,48.38,116.561H57.002z"
    />
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
