<script setup lang="ts">
import { RouterLink } from "vue-router";
import Fieldset from "primevue/fieldset";
import { toolsMenu } from "../data/toolsMenu";
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-8">
        <h1
          class="text-4xl font-extrabold text-primary-700 mb-2 flex items-center justify-center"
        >
          🛠️ Caja de herramientas Web
        </h1>
        <p class="text-xl text-surface-600">
          Un conjunto de utilidades web para facilitar tus tareas diarias.
        </p>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <Fieldset v-for="tool in toolsMenu" :key="tool.route">
          <template #legend>
            <component
              :is="tool.icon"
              :class="['w-6 h-6 mr-3 flex-shrink-0', tool.iconColor]"
            />
            {{ tool.label }}
          </template>
          <RouterLink :to="tool.route" class="block p-6">
            <p class="text-surface-700 text-sm">
              {{ tool.description }}
            </p>
            <div
              :class="['mt-4 font-medium flex items-center', tool.linkColor]"
            >
              {{ tool.linkText }}
              <i class="pi pi-arrow-right ml-1"></i>
            </div>
          </RouterLink>
        </Fieldset>
      </main>
    </div>
  </div>
</template>
