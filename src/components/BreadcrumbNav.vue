<template>
  <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
    <nav class="flex items-center space-x-2 text-sm">
      <router-link
        to="/"
        class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Home class="w-4 h-4" />
      </router-link>

      <template v-for="(item, index) in items" :key="index">
        <span class="text-gray-400">/</span>
        <router-link
          v-if="item.to && index < items.length - 1"
          :to="item.to"
          class="text-gray-600 hover:text-gray-800 transition-colors"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="text-gray-800 font-medium">
          {{ item.label }}
        </span>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Home } from "lucide-vue-next";
import { toolsMenu } from "@/data/toolsMenu";

const route = useRoute();

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
