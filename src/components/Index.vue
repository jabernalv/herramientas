<script setup lang="ts">
import { RouterLink } from "vue-router";
import Fieldset from "primevue/fieldset";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Breadcrumb from "primevue/breadcrumb";
import { toolsMenu } from "@/data/toolsMenu";
import { computed } from "vue";
import {
  Code,
  ShieldCheck,
  Table,
  Calendar,
  FileEdit,
  Key,
  Palette,
  Globe,
  ArrowRight,
} from "lucide-vue-next";

// Mapeo de categorías a íconos
const categoryIcons: { [key: string]: any } = {
  Codificación: Code,
  Conversión: Table,
  Colores: Palette,
  Generadores: Key,
  Seguridad: ShieldCheck,
  Texto: FileEdit,
  Utilidades: Calendar,
  Desarrollo: Globe,
};

// Breadcrumb para la página principal
const home = {
  label: "Home",
};

// Agrupar herramientas por categoría
const groupedTools = computed(() => {
  const groups: { [key: string]: typeof toolsMenu } = {};
  toolsMenu.forEach((tool) => {
    if (!groups[tool.category]) {
      groups[tool.category] = [];
    }
    groups[tool.category].push(tool);
  });
  return groups;
});

// Obtener categorías ordenadas
const categories = computed(() => {
  return Object.keys(groupedTools.value).sort();
});
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
        <Breadcrumb :model="[]" :home="home" />
      </div>

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

      <main class="mb-16">
        <Accordion class="max-w-6xl mx-auto" :value="null">
          <AccordionPanel
            v-for="(category, idx) in categories"
            :key="category"
            :value="idx"
          >
            <AccordionHeader>
              <div class="flex items-center">
                <component
                  v-if="categoryIcons[category]"
                  :is="categoryIcons[category]"
                  class="w-5 h-5 mr-3 text-primary-600"
                />
                <span>
                  {{ category }} ({{ groupedTools[category].length }})
                </span>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Fieldset
                  v-for="tool in groupedTools[category]"
                  :key="tool.route"
                >
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
                      :class="[
                        'mt-4 font-medium flex items-center',
                        tool.linkColor,
                      ]"
                    >
                      {{ tool.linkText }}
                      <ArrowRight class="w-4 h-4 ml-1" />
                    </div>
                  </RouterLink>
                </Fieldset>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </main>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-accordion) {
  border: none;
  box-shadow: none;
}

:deep(.p-accordion .p-accordion-header) {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
}

:deep(
    .p-accordion
      .p-accordion-header:not(.p-disabled).p-highlight
      .p-accordion-header-link
  ) {
  background: #f3f4f6;
  border-color: #d1d5db;
}

:deep(
    .p-accordion
      .p-accordion-header:not(.p-disabled)
      .p-accordion-header-link:hover
  ) {
  background: #f9fafb;
}

:deep(.p-accordion .p-accordion-content) {
  border: none;
  background: transparent;
  padding: 1rem 0;
}

:deep(.p-accordion .p-accordion-header-link) {
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #374151;
}

:deep(.p-accordion .p-accordion-header-link:focus) {
  box-shadow: none;
}
</style>
