<script setup lang="ts">
import { ref } from "vue";
import { Key, List, Hash, CircleDot, Text, CircleEqual } from "lucide-vue-next";
import Button from "primevue/button";
import Card from "primevue/card";

const length = ref(16);
const keyType = ref("password");
const uppercase = ref(true);
const lowercase = ref(true);
const numbers = ref(true);
const symbols = ref(true);
const result = ref("");
const strengthMeter = ref({ value: 0, color: "bg-gray-200" });

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
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Hash class="w-4 h-4 text-blue-500" />
              Longitud:
            </label>
            <div class="relative">
              <input
                type="number"
                v-model="length"
                class="w-full p-2 border rounded-md pl-10"
                min="8"
                max="64"
              />
              <span class="absolute left-3 top-2.5 text-blue-400">
                <Hash class="w-4 h-4" />
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="block text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <Key class="w-4 h-4 text-green-500" />
              Tipo de clave:
            </label>
            <div class="relative">
              <select
                v-model="keyType"
                class="w-full p-2 border rounded-md pl-10"
              >
                <option value="password">Contraseña</option>
                <option value="api">API Key</option>
                <option value="encryption">Clave de cifrado</option>
              </select>
              <span class="absolute left-3 top-2.5 text-green-400">
                <List class="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="uppercase"
                class="form-checkbox"
              />
              <span class="flex items-center gap-1 text-gray-700">
                <Text class="w-4 h-4 text-purple-500" />
                Mayúsculas (A-Z)
              </span>
            </label>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="numbers" class="form-checkbox" />
              <span class="flex items-center gap-1 text-gray-700">
                <CircleEqual class="w-4 h-4 text-yellow-500" />
                Números (0-9)
              </span>
            </label>
          </div>
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="symbols" class="form-checkbox" />
              <span class="flex items-center gap-1 text-gray-700">
                <CircleDot class="w-4 h-4 text-red-500" />
                Símbolos (!@#)
              </span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="lowercase"
                class="form-checkbox"
              />
              <span class="flex items-center gap-1 text-gray-700">
                <Text class="w-4 h-4 text-blue-400" />
                Minúsculas (a-z)
              </span>
            </label>
          </div>
        </div>

        <Button
          @click="generateKey"
          icon="pi pi-bolt"
          class="w-full"
          severity="info"
          label="Generar Clave"
        />

        <div
          :class="['h-2 rounded-full mt-4', strengthMeter.color]"
          :style="{ width: strengthMeter.value + '%' }"
        ></div>
        <div
          v-if="result"
          class="mt-4 p-4 bg-gray-50 rounded-md text-gray-800 font-mono"
        >
          {{ result }}
        </div>
      </template>
    </Card>
  </div>
</template>
