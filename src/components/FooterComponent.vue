<template>
  <footer
    class="bg-white py-4 px-4 text-gray-600 mt-auto flex justify-between items-center"
  >
    <p class="text-sm">
      Liberado bajo licencia MIT | Jairo Bernal, {{ new Date().getFullYear() }}
    </p>
    <span id="visitas" class="text-gray-400 text-xs"
      >Visitas: {{ visitas }}</span
    >
  </footer>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";

let visitas = ref(0);

onMounted(() => {
  fetch(
    "https://intranet.dirigiendoproyectos.com/contador-visitas.php?type=herramientas"
  )
    .then((res) => res.json())
    .then((data) => {
      visitas.value = data.visitas;
    })
    .catch(() => {
      visitas.value = 0;
    });
});
</script>
<style scoped></style>
