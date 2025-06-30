<script setup lang="ts">
import { ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { RouterLink } from "vue-router";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import Message from "primevue/message";
import Dropdown from "primevue/dropdown";

interface Match {
  text: string;
  index: number;
  groups: string[];
}

const pattern = useLocalStorage("regex-pattern", "");
const testText = ref("");
const flags = ref({
  global: true,
  ignoreCase: false,
  multiline: false,
});

const matches = ref<Match[]>([]);
const error = ref("");
const highlightedText = ref("");

const regexSnippets = [
  {
    label: "Correo electrónico",
    value: "^[\w.-]+@[\w.-]+\\.[a-zA-Z]{2,}$",
    description: "Valida emails simples.",
  },
  {
    label: "URL",
    value:
      "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)",
    description: "Detecta URLs http(s).",
  },
  {
    label: "Número entero",
    value: "^-?\\d+$",
    description: "Coincide con enteros positivos o negativos.",
  },
  {
    label: "Número decimal",
    value: "^-?\\d*\\.\\d+$",
    description: "Coincide con decimales positivos o negativos.",
  },
  {
    label: "Fecha (YYYY-MM-DD)",
    value: "^\\d{4}-\\d{2}-\\d{2}$",
    description: "Formato de fecha ISO.",
  },
  {
    label: "Solo letras",
    value: "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$",
    description: "Solo letras y espacios.",
  },
  {
    label: "Solo dígitos",
    value: "^\\d+$",
    description: "Solo números.",
  },
  {
    label: "Código postal (5 - 6 dígitos)",
    value: "^\\d{5,6}$",
    description: "Ejemplo: 28013.",
  },
  {
    label: "Contraseña segura",
    value: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    description: "Mínimo 8 caracteres, letras y números.",
  },
  {
    label: "Dirección IP",
    value:
      "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
    description: "Valida direcciones IPv4 (ej: 192.168.1.1).",
  },
  {
    label: "Nombre de usuario",
    value: "^[a-zA-Z0-9_]{6,20}$",
    description: "3-16 caracteres, letras, números y guion bajo.",
  },
  {
    label: "Teléfono con indicativo",
    value: "^\\+[1-9]\\d{1,14}$",
    description: "Número con + y código de país (ej: +573001234567).",
  },
];

const selectedSnippet = ref();
const snippetDescription = ref("");

function onSnippetSelect(
  snippet: { label: string; value: string; description: string } | null
) {
  if (snippet && snippet.value) {
    pattern.value = snippet.value;
    snippetDescription.value = snippet.description;
  } else {
    snippetDescription.value = "";
  }
}

const updateMatches = () => {
  matches.value = [];
  error.value = "";
  highlightedText.value = testText.value;

  if (!pattern.value || !testText.value) return;

  try {
    const flagString = `${flags.value.global ? "g" : ""}${
      flags.value.ignoreCase ? "i" : ""
    }${flags.value.multiline ? "m" : ""}`;

    const regex = new RegExp(pattern.value, flagString);
    let match;

    if (flags.value.global) {
      while ((match = regex.exec(testText.value)) !== null) {
        matches.value.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }

      // Resaltar todas las coincidencias
      let lastIndex = 0;
      let highlighted = "";

      matches.value.forEach((match) => {
        highlighted += testText.value.slice(lastIndex, match.index);
        highlighted += `<mark class="bg-yellow-200">${match.text}</mark>`;
        lastIndex = match.index + match.text.length;
      });

      highlighted += testText.value.slice(lastIndex);
      highlightedText.value = highlighted;
    } else {
      match = regex.exec(testText.value);
      if (match) {
        matches.value.push({
          text: match[0],
          index: match.index,
          groups: match.slice(1),
        });

        // Resaltar solo la primera coincidencia
        highlightedText.value =
          testText.value.slice(0, match.index) +
          `<mark class="bg-yellow-200">${match[0]}</mark>` +
          testText.value.slice(match.index + match[0].length);
      }
    }
  } catch (e) {
    error.value = (e as Error).message;
  }
};

watch([pattern, testText, flags], updateMatches, { deep: true });
</script>

<template>
  <div>
    <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
      <nav class="text-sm" aria-label="Miga de pan">
        <ol class="list-none p-0 inline-flex space-x-2">
          <li class="flex items-center">
            <RouterLink to="/" class="text-blue-500 hover:text-blue-700">
              <i class="inline-block w-4 h-4 mr-1 align-text-bottom"></i>
              Herramientas
            </RouterLink>
          </li>
          <li>
            <i class="inline-block w-4 h-4 text-gray-400 align-text-bottom"></i>
          </li>
          <li class="text-gray-700">Probador de RegExs</li>
        </ol>
      </nav>
    </div>

    <div class="max-w-7xl mx-auto px-4 pb-4 mb-16">
      <div class="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Probador de expresiones regulares
        </h1>

        <div class="grid grid-cols-1 gap-6">
          <!-- Biblioteca de snippets -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Snippets comunes</label
            >
            <Dropdown
              v-model="selectedSnippet"
              :options="regexSnippets"
              optionLabel="label"
              placeholder="Selecciona un snippet"
              class="w-full md:w-1/2"
              @change="onSnippetSelect($event.value)"
              :showClear="true"
            />
            <div v-if="snippetDescription" class="text-xs text-gray-500 mt-1">
              {{ snippetDescription }}
            </div>
          </div>
          <!-- Patrón RegEx -->
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">
              Expresión Regular
            </label>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="w-full">
                <InputText
                  v-model="pattern"
                  class="w-full"
                  placeholder="Ingresa tu expresión regular"
                />
              </div>
              <div class="flex flex-wrap gap-4">
                <div class="flex items-center gap-2">
                  <Checkbox v-model="flags.global" binary id="global" />
                  <label for="global" class="text-sm whitespace-nowrap"
                    >Global (g)</label
                  >
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox v-model="flags.ignoreCase" binary id="ignoreCase" />
                  <label for="ignoreCase" class="text-sm whitespace-nowrap"
                    >Ignorar mayús. (i)</label
                  >
                </div>
                <div class="flex items-center gap-2">
                  <Checkbox v-model="flags.multiline" binary id="multiline" />
                  <label for="multiline" class="text-sm whitespace-nowrap"
                    >Multilínea (m)</label
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <Message
            v-if="error"
            severity="error"
            :closable="false"
            class="w-full"
          >
            {{ error }}
          </Message>

          <!-- Texto de prueba -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Texto de prueba
            </label>
            <Textarea
              v-model="testText"
              class="w-full"
              rows="8"
              placeholder="Ingresa el texto que deseas probar"
            />
          </div>

          <!-- Resultados -->
          <div v-if="matches.length > 0" class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-700">
              Coincidencias encontradas: {{ matches.length }}
            </h2>

            <!-- Texto con resaltado -->
            <div class="bg-gray-50 p-4 rounded-lg overflow-x-auto">
              <p
                class="whitespace-pre-wrap break-words"
                v-html="highlightedText"
              ></p>
            </div>

            <!-- Lista de coincidencias -->
            <div class="space-y-2">
              <div
                v-for="(match, index) in matches"
                :key="index"
                class="bg-white border rounded-lg p-4"
              >
                <div class="flex flex-wrap items-center gap-4">
                  <span class="text-sm font-medium text-gray-500"
                    >Coincidencia #{{ index + 1 }}</span
                  >
                  <span class="text-sm text-gray-500"
                    >Posición: {{ match.index }}</span
                  >
                </div>
                <div class="mt-2">
                  <p class="font-mono bg-gray-100 p-2 rounded break-all">
                    {{ match.text }}
                  </p>
                </div>
                <div v-if="match.groups.length > 0" class="mt-2">
                  <p class="text-sm font-medium text-gray-700">
                    Grupos capturados:
                  </p>
                  <div class="mt-1 space-y-1">
                    <p
                      v-for="(group, groupIndex) in match.groups"
                      :key="groupIndex"
                      class="text-sm font-mono bg-gray-50 p-1 rounded break-all"
                    >
                      Grupo {{ groupIndex + 1 }}: {{ group }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No hay coincidencias -->
          <div
            v-else-if="testText && pattern && !error"
            class="text-center py-4 text-gray-500"
          >
            No se encontraron coincidencias
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-message) {
  margin: 0;
}

:deep(.p-checkbox) {
  width: 1.5rem;
  height: 1.5rem;
}

:deep(.p-checkbox .p-checkbox-box) {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

@media (max-width: 768px) {
  :deep(.p-checkbox) {
    width: 1.25rem;
    height: 1.25rem;
  }

  :deep(.p-checkbox .p-checkbox-box) {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
}
</style>
