<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="$attrs.class"
    fill="none"
    viewBox="-8 -8 256 256"
  >
    <path
      fill="#fddc5c"
      d="M0 128a128.001 128.001 0 0 0 218.51 90.51 128.003 128.003 0 0 0 0-181.02A128.001 128.001 0 0 0 0 128Z"
    />
    <path
      fill="#0c098c"
      fill-rule="evenodd"
      d="m50.863 248.38 11.196-64.382H5.333V157.33h61.364L76.9 98.665H26.667V71.998h54.87L93.53 3.047l26.273 4.569-11.197 64.382h58.268l11.991-68.951 26.272 4.569-11.197 64.382h56.728v26.667H189.3l-10.2 58.665h50.234v26.667h-54.872l-11.992 68.951-26.272-4.57 11.197-64.381H89.126l-11.991 68.951-26.272-4.57Zm101.169-91.049 10.203-58.666h-58.268L93.764 157.33h58.268Z"
      clip-rule="evenodd"
    />
  </svg>
</template>

<script setup lang="ts">
// Permitir que las clases se pasen al componente
defineOptions({
  inheritAttrs: false,
});
</script>
