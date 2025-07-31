<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Card from "primevue/card";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import "flag-icon-css/css/flag-icons.min.css";
// @ts-expect-error: No type definitions for world-countries-capitals
import wcc from "world-countries-capitals";
import IconWhatsapp from "@/components/icons/IconWhatsapp.vue";
import IconTelegram from "@/components/icons/IconTelegram.vue";
import {
  MessageSquare,
  Globe,
  Phone,
  Link2,
  Copy,
  User,
} from "lucide-vue-next";

type CountryFull = {
  name: string;
  code: string;
  dial: string;
  continent: string;
  flag: string; // URL a la imagen
};

const continentNames: Record<string, string> = {
  AF: "África",
  AN: "Antártida",
  AS: "Asia",
  EU: "Europa",
  NA: "América del Norte",
  OC: "Oceanía",
  SA: "América del Sur",
};

const MAX_COUNTRY_NAME_LENGTH = 25;

function truncateCountryName(name: string): string {
  return name.length > MAX_COUNTRY_NAME_LENGTH
    ? name.slice(0, MAX_COUNTRY_NAME_LENGTH - 1) + "…"
    : name;
}

const allCountries = wcc.getAllCountryDetails();
const fullCountryList: CountryFull[] = allCountries.map((c: any) => ({
  name: truncateCountryName(
    c.country.charAt(0).toUpperCase() + c.country.slice(1)
  ),
  code: c.iso.alpha_2.toUpperCase(),
  dial: c.phone_code,
  continent: c.continent, // código, ej: 'EU', 'AF', etc.
  flag: c.flag,
}));

// Obtener continentes únicos presentes en los datos
const uniqueContinents = Array.from(
  new Set(fullCountryList.map((c) => c.continent))
);
// Ordenar continentes por nombre en español
const sortedContinents = uniqueContinents.sort((a, b) =>
  (continentNames[a] || a).localeCompare(continentNames[b] || b)
);

// Agrupar países por continente y ordenar países alfabéticamente
const countriesByContinent = sortedContinents.map((code) => ({
  continent: code,
  continentLabel: continentNames[code] || code,
  countries: fullCountryList
    .filter((c) => c.continent === code)
    .sort((a, b) => a.name.localeCompare(b.name)),
}));

// Opciones para el select de países, tipado correctamente
const countryOptions: (CountryFull | { isGroup: boolean; label: string })[] = (
  [] as (CountryFull | { isGroup: boolean; label: string })[]
).concat(
  ...countriesByContinent.map((g) => [
    {
      isGroup: true,
      label: continentNames[g.continent.toUpperCase()] || "Otro",
    },
    ...g.countries,
  ])
);

// WhatsApp
const waCountry = ref<CountryFull | null>(null);
const waNumber = ref<number | null>(null);
const whatsappCountryKey = "whatsappCountry";
const whatsappNumberKey = "whatsappNumber";
const telegramUserKey = "telegramUser";
const waMessage = ref("");
const waLink = ref("");

// Telegram
const tgUser = ref("");
const tgMessage = ref("");
const tgLink = ref("");

// Cargar localStorage al iniciar
onMounted(() => {
  const countryCode = localStorage.getItem(whatsappCountryKey);
  const number = localStorage.getItem(whatsappNumberKey);
  const tgUserSaved = localStorage.getItem(telegramUserKey);
  if (countryCode) {
    const found = fullCountryList.find(
      (c) => c.code.toUpperCase() === countryCode.toUpperCase()
    );
    if (found) waCountry.value = found;
  }
  if (number) waNumber.value = Number(number);
  if (tgUserSaved) tgUser.value = tgUserSaved;
  if (!waCountry.value) waCountry.value = fullCountryList[0];
});

// Guardar en localStorage cuando cambian waCountry o waNumber
watch(
  waCountry,
  (country) => {
    if (country) {
      localStorage.setItem(whatsappCountryKey, country.code);
    }
  },
  { deep: true }
);
watch(waNumber, (number) => {
  if (number !== null && number !== undefined) {
    localStorage.setItem(whatsappNumberKey, String(number));
  }
});
// Guardar en localStorage cuando cambia el usuario de Telegram
watch(tgUser, (user) => {
  if (user) {
    localStorage.setItem(telegramUserKey, user);
  }
});

// Generar enlace WhatsApp
function generateWaLink() {
  if (!waCountry.value || !waNumber.value) return;
  const phone = `${waCountry.value.dial.replace("+", "")}${waNumber.value}`;
  waLink.value = `https://wa.me/${phone}${
    waMessage.value ? `?text=${encodeURIComponent(waMessage.value)}` : ""
  }`;
}

// Generar enlace Telegram
function generateTgLink() {
  if (!tgUser.value) return;
  tgLink.value = `https://t.me/${tgUser.value}${
    tgMessage.value ? `?text=${encodeURIComponent(tgMessage.value)}` : ""
  }`;
}

// Utilidad para verificar si existe la clase de flag-icon-css para un país
function hasFlagIconCss(code: string) {
  // Lista de códigos soportados por flag-icon-css (ISO 3166-1 alpha-2, minúsculas)
  // flag-icon-css cubre la mayoría de países estándar
  // Para máxima compatibilidad, asumimos que si el código es de 2 letras, existe
  return /^[a-z]{2}$/.test(code.toLowerCase());
}

// Función para copiar texto al portapapeles
function copyToClipboard(text: string) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

// Función para enfocar el campo de búsqueda cuando se abre el select
function onCountrySelectShow() {
  // Enfocar el campo de búsqueda después de un pequeño delay
  setTimeout(() => {
    const searchInput = document.querySelector(
      ".p-dropdown-filter"
    ) as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
    }
  }, 100);
}
</script>

<template>
  <div>
    <BreadcrumbNav />
    <div
      class="flex flex-col md:flex-row gap-8 px-4 py-4 w-full md:w-4/5 md:mx-auto"
    >
      <!-- WhatsApp Card -->
      <Card class="w-full flex-1">
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2"
          >
            <IconWhatsapp class="w-6 h-6" />
            WhatsApp
          </h2>
        </template>
        <template #content>
          <form @submit.prevent="generateWaLink" class="space-y-4">
            <div>
              <label class="block mb-1 font-medium">País</label>
              <InputGroup>
                <InputGroupAddon>
                  <Globe class="w-4 h-4" />
                </InputGroupAddon>
                <Select
                  v-model="waCountry"
                  :options="countryOptions"
                  optionLabel="name"
                  :optionValue="(c) => c"
                  placeholder="Buscar país o indicativo..."
                  class="w-full"
                  :filter="true"
                  :showClear="false"
                  :filterPlaceholder="'Buscar país o indicativo...'"
                  :filterMatchMode="'contains'"
                  :filterFields="['name', 'dial']"
                  @show="onCountrySelectShow"
                >
                  <template #option="{ option }">
                    <template v-if="option.isGroup">
                      <div
                        class="px-2 py-1 text-xs font-bold text-gray-500 bg-gray-100"
                      >
                        {{ option.label }}
                      </div>
                    </template>
                    <template v-else>
                      <span class="flex items-center gap-2">
                        <template
                          v-if="hasFlagIconCss(option.code.toLowerCase())"
                        >
                          <span
                            :class="`flag-icon flag-icon-${option.code.toLowerCase()} w-6 h-6 mr-1 align-middle`"
                          ></span>
                        </template>
                        <template v-else-if="option.flag">
                          <img
                            :src="option.flag"
                            :alt="option.code"
                            class="w-6 h-6 mr-1 align-middle inline-block"
                          />
                        </template>
                        <template v-else>
                          <span
                            class="w-6 h-6 mr-1 align-middle inline-block bg-gray-200 text-xs flex items-center justify-center rounded"
                            >{{ option.code }}</span
                          >
                        </template>
                        <span :title="option.name">{{ option.name }}</span>
                      </span>
                    </template>
                  </template>
                  <template #value="{ value }">
                    <span
                      v-if="value && value.code"
                      class="flex items-center gap-2"
                    >
                      <template v-if="hasFlagIconCss(value.code.toLowerCase())">
                        <span
                          :class="`flag-icon flag-icon-${value.code.toLowerCase()} w-6 h-6 mr-1 align-middle`"
                        ></span>
                      </template>
                      <template v-else-if="value.flag">
                        <img
                          :src="value.flag"
                          :alt="value.code"
                          class="w-6 h-6 mr-1 align-middle inline-block"
                        />
                      </template>
                      <template v-else>
                        <span
                          class="w-6 h-6 mr-1 align-middle inline-block bg-gray-200 text-xs flex items-center justify-center rounded"
                          >{{ value.code }}</span
                        >
                      </template>
                      <span :title="value.name">{{ value.name }}</span>
                    </span>
                    <span v-else>País</span>
                  </template>
                </Select>
              </InputGroup>
            </div>
            <div>
              <label class="block mb-1 font-medium">Número de teléfono</label>
              <InputGroup>
                <InputGroupAddon>
                  <Phone class="w-4 h-4" />
                </InputGroupAddon>
                <InputNumber
                  v-model="waNumber"
                  class="w-full text-right"
                  inputClass="text-right"
                  :useGrouping="false"
                  :minFractionDigits="0"
                  :maxFractionDigits="0"
                  :min="0"
                  placeholder="Ej: 3001234567"
                  required
                />
              </InputGroup>
            </div>
            <div>
              <label class="block mb-1 font-medium">Mensaje (opcional)</label>
              <InputGroup>
                <InputGroupAddon>
                  <MessageSquare class="w-4 h-4" />
                </InputGroupAddon>
                <Textarea
                  v-model="waMessage"
                  class="w-full"
                  autoResize
                  rows="2"
                  placeholder="Escribe tu mensaje"
                />
              </InputGroup>
            </div>
            <Button
              type="submit"
              label="Generar enlace"
              class="w-full bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
              :disabled="!waCountry || !waNumber"
            >
              <template #icon>
                <Link2 class="w-4 h-4 mr-2" />
              </template>
            </Button>
          </form>
          <div v-if="waLink" class="mt-4">
            <label class="block mb-1 font-medium">Enlace generado:</label>
            <a
              :href="waLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-700 underline break-all"
            >
              {{ waLink }}
            </a>
            <div class="mt-2">
              <Button
                @click="copyToClipboard(waLink)"
                severity="secondary"
                text
              >
                <Copy class="w-4 h-4 mr-2" />
                Copiar enlace
              </Button>
            </div>
          </div>
        </template>
      </Card>

      <!-- Telegram Card -->
      <Card class="w-full flex-1">
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 mb-4 flex items-center justify-center gap-2"
          >
            <IconTelegram class="w-6 h-6" />
            Telegram
          </h2>
        </template>
        <template #content>
          <form @submit.prevent="generateTgLink" class="space-y-4">
            <div>
              <label class="block mb-1 font-medium">Usuario</label>
              <InputGroup>
                <InputGroupAddon>
                  <User class="w-4 h-4" />
                </InputGroupAddon>
                <InputText
                  v-model="tgUser"
                  type="text"
                  class="w-full"
                  required
                  placeholder="Ej: usuario123"
                />
              </InputGroup>
            </div>
            <div>
              <label class="block mb-1 font-medium">Mensaje (opcional)</label>
              <InputGroup>
                <InputGroupAddon>
                  <MessageSquare class="w-4 h-4" />
                </InputGroupAddon>
                <Textarea
                  v-model="tgMessage"
                  class="w-full"
                  autoResize
                  rows="2"
                  placeholder="Escribe tu mensaje"
                />
              </InputGroup>
            </div>
            <Button
              type="submit"
              label="Generar enlace"
              class="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
              :disabled="!tgUser"
            >
              <template #icon>
                <Link2 class="w-4 h-4 mr-2" />
              </template>
            </Button>
          </form>
          <div v-if="tgLink" class="mt-4">
            <label class="block mb-1 font-medium">Enlace generado:</label>
            <a
              :href="tgLink"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-700 underline break-all"
            >
              {{ tgLink }}
            </a>
            <div class="mt-2">
              <Button
                @click="copyToClipboard(tgLink)"
                severity="secondary"
                text
              >
                <Copy class="w-4 h-4 mr-2" />
                Copiar enlace
              </Button>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Controlar el ancho del dropdown en móvil */
@media (max-width: 768px) {
  .p-dropdown-panel {
    max-width: 90vw !important;
    width: 90vw !important;
  }
  .p-dropdown-filter {
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .p-dropdown-items-wrapper {
    max-width: 100% !important;
  }
}
</style>
