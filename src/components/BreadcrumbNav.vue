<template>
  <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
    <Breadcrumb :model="items" :home="home" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "primevue/breadcrumb";
import { toolsMenu } from "@/data/toolsMenu";

const route = useRoute();

const home = {
  icon: "pi pi-home",
  to: "/",
};

const items = computed(() => {
  const currentPath = route.path;
  const currentTool = toolsMenu.find((tool) => tool.route === currentPath);

  if (!currentTool) return [];

  return [
    {
      label: currentTool.category,
      to: `/${currentTool.category.toLowerCase()}`,
    },
    {
      label: currentTool.label,
    },
  ];
});
</script>
