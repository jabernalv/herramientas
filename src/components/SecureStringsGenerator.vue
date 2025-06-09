<script setup lang="ts">
import { ref } from "vue";
import { Key, List, Hash, CircleDot, Text, CircleEqual } from "lucide-vue-next";
import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

const toast = useToast();
const length = ref(16);
const keyType = ref("password");
const uppercase = ref(true);
const lowercase = ref(true);
const numbers = ref(true);
const symbols = ref(true);
const result = ref("");
const strengthMeter = ref({ value: 0, color: "bg-gray-200" });

const keyTypes = [
  { label: "Contraseña", value: "password" },
  { label: "API Key", value: "api" },
  { label: "Clave de cifrado", value: "encryption" },
];

function generateKey() {
  const charset = buildCharset();
  let key = "";

  const array = new Uint8Array(length.value);
  crypto.getRandomValues(array);

  for (let i = 0; i < length.value; i++) {
    key += charset[array[i] % charset.length];
  }

  result.value = key;
  checkStrength(key);
}

function copyToClipboard() {
  if (!result.value) {
    toast.add({
      severity: "warn",
      summary: "Aviso",
      detail: "Primero debes generar una clave",
      life: 3000,
    });
    return;
  }

  navigator.clipboard.writeText(result.value).then(() => {
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

function checkStrength(key: string) {
  const strength = calculateStrength(key);
  strengthMeter.value = strength;
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
    <Card class="mb-16">
      <template #title><h1>Generador de claves</h1></template>
      <template #content>
        <Toast />
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
              for="length"
            >
              <Hash class="w-4 h-4 text-blue-500" />
              Longitud:
            </label>
            <InputGroup class="relative">
              <InputGroupAddon>
                <Hash class="w-4 h-4" />
              </InputGroupAddon>
              <InputNumber
                id="length"
                v-model="length"
                :min="8"
                :max="64"
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
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
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
          @click="generateKey"
          icon="pi pi-bolt"
          class="w-full mb-4"
          severity="info"
          label="Generar Clave"
        />

        <div
          :class="['h-2 rounded-full', strengthMeter.color]"
          :style="{ width: strengthMeter.value + '%' }"
        ></div>

        <div v-if="result" class="mt-4">
          <div class="flex gap-2">
            <div
              class="flex-grow p-4 bg-gray-50 rounded-l-md text-gray-800 font-mono break-all"
            >
              {{ result }}
            </div>
            <Button
              @click="copyToClipboard"
              icon="pi pi-copy"
              class="rounded-l-none"
              severity="secondary"
              aria-label="Copiar al portapapeles"
              v-tooltip.left="'Copiar al portapapeles'"
            />
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
}
</style>
