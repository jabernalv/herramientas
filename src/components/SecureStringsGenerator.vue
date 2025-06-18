<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  Key,
  List,
  Hash,
  CircleDot,
  Text,
  CircleEqual,
  Ruler,
} from "lucide-vue-next";
import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Message from "primevue/message";

const toast = useToast();

// Función para cargar los parámetros guardados
const loadSavedParams = () => {
  const savedParams = localStorage.getItem("secureGeneratorParams");
  if (savedParams) {
    const params = JSON.parse(savedParams);
    length.value = params.length || 16;
    keyType.value = params.keyType || "password";
    numberOfKeys.value = params.numberOfKeys || 1;
    uppercase.value = params.uppercase ?? true;
    lowercase.value = params.lowercase ?? true;
    numbers.value = params.numbers ?? true;
    symbols.value = params.symbols ?? true;
  }
};

// Inicialización de variables con valores por defecto
const length = ref(16);
const keyType = ref("password");
const numberOfKeys = ref(1);
const uppercase = ref(true);
const lowercase = ref(true);
const numbers = ref(true);
const symbols = ref(true);
const results = ref<
  Array<{ key: string; strength: { value: number; color: string } }>
>([]);

// Cargar parámetros guardados al montar el componente
onMounted(() => {
  loadSavedParams();
});

// Observar cambios en los parámetros y guardarlos
watch(
  [length, keyType, numberOfKeys, uppercase, lowercase, numbers, symbols],
  () => {
    const params = {
      length: length.value,
      keyType: keyType.value,
      numberOfKeys: numberOfKeys.value,
      uppercase: uppercase.value,
      lowercase: lowercase.value,
      numbers: numbers.value,
      symbols: symbols.value,
    };
    localStorage.setItem("secureGeneratorParams", JSON.stringify(params));
  },
  { deep: true }
);

const keyTypes = [
  { label: "Contraseña", value: "password" },
  { label: "API Key", value: "api" },
  { label: "Clave de cifrado", value: "encryption" },
];

const numberOfKeysOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1} ${i === 0 ? "clave" : "claves"}`,
  value: i + 1,
}));

function generateKeys() {
  const charset = buildCharset();
  results.value = [];

  for (let j = 0; j < numberOfKeys.value; j++) {
    let key = "";
    const array = new Uint8Array(length.value);
    crypto.getRandomValues(array);

    for (let i = 0; i < length.value; i++) {
      key += charset[array[i] % charset.length];
    }

    const strength = calculateStrength(key);
    results.value.push({ key, strength });
  }
}

function copyToClipboard(key: string) {
  navigator.clipboard.writeText(key).then(() => {
    toast.add({
      severity: "success",
      summary: "Éxito",
      detail: "Clave copiada al portapapeles",
      life: 3000,
    });
  });
}

function buildCharset() {
  let charset = "";
  if (uppercase.value) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase.value) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers.value) charset += "0123456789";
  if (symbols.value) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
  return charset;
}

function calculateStrength(key: string) {
  const hasUpper = /[A-Z]/.test(key);
  const hasLower = /[a-z]/.test(key);
  const hasNumber = /\d/.test(key);
  const hasSymbol = /[^A-Za-z0-9]/.test(key);

  let strength = 0;
  if (hasUpper) strength += 25;
  if (hasLower) strength += 25;
  if (hasNumber) strength += 25;
  if (hasSymbol) strength += 25;

  return {
    value: strength,
    color:
      strength >= 75
        ? "bg-green-500"
        : strength >= 50
        ? "bg-yellow-500"
        : "bg-red-500",
  };
}
</script>

<template>
  <div>
    <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
      <nav class="text-sm" aria-label="Miga de pan">
        <ol class="list-none p-0 inline-flex space-x-2">
          <li class="flex items-center">
            <router-link to="/" class="text-blue-500 hover:text-blue-700">
              <i class="inline-block w-4 h-4 mr-1 align-text-bottom"></i>
              Herramientas
            </router-link>
          </li>
          <li>
            <i class="inline-block w-4 h-4 text-gray-400 align-text-bottom"></i>
          </li>
          <li class="text-gray-700">Generador de claves</li>
        </ol>
      </nav>
    </div>
    <Card class="mb-16 w-full sm:w-4/5 mx-auto">
      <template #title><h1>Generador de claves</h1></template>
      <template #content>
        <Toast />
        <!-- Controles principales en línea en escritorio -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
              for="length"
            >
              <Ruler class="w-4 h-4 text-blue-500" />
              Longitud:
            </label>
            <InputGroup class="relative">
              <InputGroupAddon>
                <Ruler class="w-4 h-4" />
              </InputGroupAddon>
              <InputNumber
                id="length"
                v-model="length"
                :min="8"
                :max="512"
                class="w-full"
                :inputStyle="{ width: '100%' }"
                showButtons
                fluid
              />
            </InputGroup>
          </div>

          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Key class="w-4 h-4 text-green-500" />
              Tipo de clave:
            </label>
            <InputGroup>
              <InputGroupAddon>
                <List class="w-4 h-4" />
              </InputGroupAddon>
              <Select
                v-model="keyType"
                :options="keyTypes"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                :inputStyle="{ paddingLeft: '2.5rem' }"
              />
            </InputGroup>
          </div>

          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Hash class="w-4 h-4 text-blue-500" />
              Número de claves:
            </label>
            <InputGroup>
              <InputGroupAddon>
                <Hash class="w-4 h-4" />
              </InputGroupAddon>
              <Select
                v-model="numberOfKeys"
                :options="numberOfKeysOptions"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                :inputStyle="{ paddingLeft: '2.5rem' }"
              />
            </InputGroup>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Checkbox
                v-model="uppercase"
                :binary="true"
                inputId="uppercase"
              />
              <label
                for="uppercase"
                class="flex items-center gap-1 text-gray-700 cursor-pointer"
              >
                <Text class="w-4 h-4 text-purple-500" />
                Mayúsculas (A-Z)
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox v-model="numbers" :binary="true" inputId="numbers" />
              <label
                for="numbers"
                class="flex items-center gap-1 text-gray-700 cursor-pointer"
              >
                <CircleEqual class="w-4 h-4 text-yellow-500" />
                Números (0-9)
              </label>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <Checkbox v-model="symbols" :binary="true" inputId="symbols" />
              <label
                for="symbols"
                class="flex items-center gap-1 text-gray-700 cursor-pointer"
              >
                <CircleDot class="w-4 h-4 text-red-500" />
                Símbolos (!@#)
              </label>
            </div>
            <div class="flex items-center space-x-2">
              <Checkbox
                v-model="lowercase"
                :binary="true"
                inputId="lowercase"
              />
              <label
                for="lowercase"
                class="flex items-center gap-1 text-gray-700 cursor-pointer"
              >
                <Text class="w-4 h-4 text-blue-400" />
                Minúsculas (a-z)
              </label>
            </div>
          </div>
        </div>

        <Button
          @click="generateKeys"
          icon="pi pi-bolt"
          class="w-full mb-4"
          severity="info"
          :label="`Generar ${numberOfKeys === 1 ? 'clave' : 'claves'}`"
        />

        <div v-if="results.length > 0" class="mt-4 flex flex-col gap-4">
          <div v-for="(result, index) in results" :key="index" class="relative">
            <div class="flex justify-end absolute right-2 top-2 z-10">
              <Button
                @click="copyToClipboard(result.key)"
                icon="pi pi-copy"
                class="text-gray-200 hover:text-gray-600"
                text
                plain
                size="small"
                aria-label="Copiar al portapapeles"
              />
            </div>
            <Message severity="info" class="w-full">
              <div class="pr-8">{{ result.key }}</div>
              <div
                class="h-1 rounded-full mt-2"
                :class="[result.strength.color]"
                :style="{ width: result.strength.value + '%' }"
              ></div>
            </Message>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-button) {
  white-space: nowrap;
}

:deep(.p-inputnumber-input),
:deep(.p-dropdown) {
  width: 100% !important;
}

:deep(.p-checkbox) {
  width: 1.5rem;
  height: 1.5rem;
}

:deep(.p-checkbox .p-checkbox-box) {
  width: 1.5rem !important;
  height: 1.5rem !important;
}

@media (max-width: 640px) {
  :deep(.p-button) {
    padding: 0.5rem;
  }

  :deep(.p-button-label) {
    font-size: 0.875rem;
  }

  :deep(.p-checkbox) {
    width: 1.25rem;
    height: 1.25rem;
  }

  :deep(.p-checkbox .p-checkbox-box) {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }

  :deep(.p-inputgroup-addon) {
    padding: 0.5rem;
  }

  :deep(.p-inputnumber-button) {
    padding: 0.5rem;
  }

  :deep(.p-card-content) {
    padding: 1rem !important;
  }

  :deep(.p-card-title) {
    font-size: 1.25rem !important;
    padding: 1rem !important;
  }
}
</style>
