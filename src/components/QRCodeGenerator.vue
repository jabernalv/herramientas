<template>
  <div class="w-full">
    <Toast />
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
          <li class="text-gray-700">Generador de códigos QR</li>
        </ol>
      </nav>
    </div>

    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-green-600">Generador de códigos QR</h1>
    </header>

    <main class="space-y-4 mx-auto mb-16 w-4/5">
      <Tabs
        v-model="activeTab"
        :value="activeTab"
        @update:value="handleTabChange"
      >
        <TabList>
          <Tab value="general">General</Tab>
          <Tab value="vcard">vCard QR</Tab>
          <Tab value="wifi">WiFi QR</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="general">
            <div class="space-y-4">
              <Textarea
                v-model="text"
                rows="4"
                class="w-full"
                placeholder="Enter text or URL here..."
              />
              <div class="w-full flex justify-end">
                <span
                  :class="[
                    'text-sm',
                    text.length > MAX_TEXT_LENGTH
                      ? 'text-red-500'
                      : 'text-gray-500',
                  ]"
                >
                  <span
                    v-if="text.length > MAX_TEXT_LENGTH"
                    class="mr-2"
                    role="img"
                    aria-label="advertencia"
                    >⚠️</span
                  >
                  {{ text.length }}/{{ MAX_TEXT_LENGTH }} caracteres
                </span>
              </div>

              <!-- Configuración de color -->
              <div class="w-full bg-white rounded-lg shadow-md p-4">
                <h3 class="text-lg font-semibold mb-4">Configuración</h3>
                <div
                  class="flex flex-col md:flex-row md:items-center md:gap-6 gap-4"
                >
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color del QR:</label
                    >
                    <ColorPicker v-model="generalQrColor" />
                    <InputText
                      :modelValue="generalQrColor"
                      @update:modelValue="(v) => handleHexInput(v, 'qr')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'qr')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: generalQrColor,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color de fondo:</label
                    >
                    <ColorPicker v-model="generalBgColor" />
                    <InputText
                      :modelValue="generalBgColor"
                      @update:modelValue="(v) => handleHexInput(v, 'bg')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'bg')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: generalBgColor,
                        color: '#000',
                        textShadow: '0 0 2px #fff',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Forma:</label
                    >
                    <Select
                      v-model="dotShape"
                      :options="DOT_SHAPES"
                      optionLabel="label"
                      optionValue="value"
                      class="w-full"
                    >
                      <template #option="slotProps">
                        <div class="flex items-center">
                          <span
                            :style="{
                              display: 'inline-block',
                              width: '18px',
                              height: '18px',
                              borderRadius:
                                slotProps.option.value === 'dots'
                                  ? '50%'
                                  : slotProps.option.value === 'rounded'
                                  ? '8px'
                                  : slotProps.option.value === 'classy'
                                  ? '2px'
                                  : slotProps.option.value === 'classy-rounded'
                                  ? '6px 6px 2px 2px'
                                  : slotProps.option.value === 'square'
                                  ? '0'
                                  : '12px',
                              background: '#0288d1',
                              border: '1.5px solid #333',
                              marginRight: '8px',
                            }"
                          ></span>
                          <span>{{ slotProps.option.label }}</span>
                        </div>
                      </template>
                    </Select>
                  </div>
                </div>
                <div class="mt-4">
                  <Button
                    @click="resetToDefaultColor"
                    severity="secondary"
                    icon="pi pi-refresh"
                    label="Restaurar configuración por defecto"
                    text
                  />
                </div>
              </div>

              <div class="w-full flex flex-col sm:flex-row gap-2 items-center">
                <Button
                  @click="generateQRCode"
                  severity="success"
                  class="w-full"
                  icon="pi pi-qrcode"
                  label="Generar código QR"
                  :disabled="!text.trim() || text.length > MAX_TEXT_LENGTH"
                />

                <Button
                  @click="copyQRCode"
                  severity="help"
                  class="w-full"
                  icon="pi pi-copy"
                  label="Copiar código QR"
                  :disabled="!qrCodeGeneral || !text.trim()"
                />

                <Button
                  @click="downloadQRCode"
                  severity="info"
                  class="w-full"
                  icon="pi pi-download"
                  label="Descargar código QR"
                  :disabled="!qrCodeGeneral || !text.trim()"
                />

                <div class="flex items-center gap-2">
                  <Button
                    @click="decreaseSize"
                    severity="secondary"
                    icon="pi pi-minus"
                    :disabled="qrSize <= MIN_SIZE"
                    v-tooltip.top="'Reducir tamaño'"
                  />
                  <span class="text-sm text-gray-600"
                    >{{ qrSize }}x{{ qrSize }}px</span
                  >
                  <Button
                    @click="increaseSize"
                    severity="secondary"
                    icon="pi pi-plus"
                    :disabled="qrSize >= MAX_SIZE"
                    v-tooltip.top="'Aumentar tamaño'"
                  />
                </div>
              </div>
              <div
                ref="qrcodeContainerGeneral"
                class="flex justify-center mt-4"
              ></div>
            </div>
          </TabPanel>

          <TabPanel value="vcard">
            <div class="space-y-4">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">
                  Información de contacto
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Nombres</label
                    >
                    <InputText
                      v-model="vCardData.firstName"
                      class="w-full"
                      placeholder="Juan"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Apellidos</label
                    >
                    <InputText
                      v-model="vCardData.lastName"
                      class="w-full"
                      placeholder="Pérez"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Celular</label
                    >
                    <InputText
                      v-model="vCardData.cellPhone"
                      class="w-full"
                      placeholder="+57 300 123 4567"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Teléfono</label
                    >
                    <InputText
                      v-model="vCardData.workPhone"
                      class="w-full"
                      placeholder="+57 1 234 5678"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Compañía</label
                    >
                    <InputText
                      v-model="vCardData.company"
                      class="w-full"
                      placeholder="Mi Empresa S.A."
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Cargo</label
                    >
                    <InputText
                      v-model="vCardData.title"
                      class="w-full"
                      placeholder="Desarrollador Senior"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Dirección</label
                    >
                    <InputText
                      v-model="vCardData.address"
                      class="w-full"
                      placeholder="Calle 123 # 45-67"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Ciudad</label
                    >
                    <InputText
                      v-model="vCardData.city"
                      class="w-full"
                      placeholder="Bogotá"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Código Postal</label
                    >
                    <InputText
                      v-model="vCardData.zip"
                      class="w-full"
                      placeholder="110111"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Departamento</label
                    >
                    <InputText
                      v-model="vCardData.state"
                      class="w-full"
                      placeholder="Cundinamarca"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >País</label
                    >
                    <InputText
                      v-model="vCardData.country"
                      class="w-full"
                      placeholder="Colombia"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Sitio web</label
                    >
                    <InputText
                      v-model="vCardData.website"
                      class="w-full"
                      placeholder="https://www.misitio.com"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Correo electrónico</label
                    >
                    <InputText
                      v-model="vCardData.email"
                      class="w-full"
                      placeholder="juan.perez@empresa.com"
                      type="email"
                    />
                  </div>
                </div>
              </div>

              <!-- Configuración de color para vCard -->
              <div class="w-full bg-white rounded-lg shadow-md p-4">
                <h3 class="text-lg font-semibold mb-4">Configuración</h3>
                <div
                  class="flex flex-col md:flex-row md:items-center md:gap-6 gap-4"
                >
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color del QR:</label
                    >
                    <ColorPicker v-model="vcardQrColor" />
                    <InputText
                      :modelValue="vcardQrColor"
                      @update:modelValue="(v) => handleHexInput(v, 'qr')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'qr')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: vcardQrColor,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color de fondo:</label
                    >
                    <ColorPicker v-model="vcardBgColor" />
                    <InputText
                      :modelValue="vcardBgColor"
                      @update:modelValue="(v) => handleHexInput(v, 'bg')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'bg')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: vcardBgColor,
                        color: '#000',
                        textShadow: '0 0 2px #fff',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Forma:</label
                    >
                    <Select
                      v-model="dotShape"
                      :options="DOT_SHAPES"
                      optionLabel="label"
                      optionValue="value"
                      class="w-full"
                    >
                      <template #option="slotProps">
                        <div class="flex items-center">
                          <span
                            :style="{
                              display: 'inline-block',
                              width: '18px',
                              height: '18px',
                              borderRadius:
                                slotProps.option.value === 'dots'
                                  ? '50%'
                                  : slotProps.option.value === 'rounded'
                                  ? '8px'
                                  : slotProps.option.value === 'classy'
                                  ? '2px'
                                  : slotProps.option.value === 'classy-rounded'
                                  ? '6px 6px 2px 2px'
                                  : slotProps.option.value === 'square'
                                  ? '0'
                                  : '12px',
                              background: '#0288d1',
                              border: '1.5px solid #333',
                              marginRight: '8px',
                            }"
                          ></span>
                          <span>{{ slotProps.option.label }}</span>
                        </div>
                      </template>
                    </Select>
                  </div>
                </div>
                <div class="mt-4">
                  <Button
                    @click="resetToDefaultColor"
                    severity="secondary"
                    icon="pi pi-refresh"
                    label="Restaurar configuración por defecto"
                    text
                  />
                </div>
              </div>

              <div class="w-full flex flex-col sm:flex-row gap-2 items-center">
                <Button
                  @click="generateVCardQR"
                  severity="success"
                  class="w-full"
                  icon="pi pi-qrcode"
                  label="Generar vCard QR"
                  :disabled="!hasVCardData"
                />

                <Button
                  @click="copyQRCode"
                  severity="help"
                  class="w-full"
                  icon="pi pi-copy"
                  label="Copiar código QR"
                  :disabled="!qrCodeVCard || !hasVCardData"
                />

                <Button
                  @click="downloadQRCode"
                  severity="info"
                  class="w-full"
                  icon="pi pi-download"
                  label="Descargar código QR"
                  :disabled="!qrCodeVCard || !hasVCardData"
                />

                <div class="flex items-center gap-2">
                  <Button
                    @click="decreaseSize"
                    severity="secondary"
                    icon="pi pi-minus"
                    :disabled="qrSize <= MIN_SIZE"
                    v-tooltip.top="'Reducir tamaño'"
                  />
                  <span class="text-sm text-gray-600"
                    >{{ qrSize }}x{{ qrSize }}px</span
                  >
                  <Button
                    @click="increaseSize"
                    severity="secondary"
                    icon="pi pi-plus"
                    :disabled="qrSize >= MAX_SIZE"
                    v-tooltip.top="'Aumentar tamaño'"
                  />
                </div>
              </div>
              <div
                ref="qrcodeContainerVCard"
                class="flex justify-center mt-4"
              ></div>
            </div>
          </TabPanel>

          <TabPanel value="wifi">
            <div class="space-y-4">
              <div class="bg-white rounded-lg shadow-md p-6">
                <h3 class="text-lg font-semibold mb-4">
                  Configuración de WiFi
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Nombre de la red (SSID)</label
                    >
                    <InputText
                      v-model="wifiData.ssid"
                      class="w-full"
                      placeholder="MiWiFi"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Contraseña</label
                    >
                    <Password
                      v-model="wifiData.password"
                      class="w-full"
                      :feedback="false"
                      toggleMask
                      placeholder="Contraseña de la red"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2"
                      >Tipo de encriptación</label
                    >
                    <Select
                      v-model="wifiData.encryption"
                      :options="[
                        { label: 'WPA/WPA2/WPA3', value: 'WPA' },
                        { label: 'WEP', value: 'WEP' },
                        { label: 'Sin encriptación', value: 'nopass' },
                      ]"
                      optionLabel="label"
                      optionValue="value"
                      class="w-full"
                    />
                  </div>
                  <div class="flex items-center">
                    <Checkbox
                      v-model="wifiData.hidden"
                      inputId="hidden-wifi"
                      binary
                      class="mr-2"
                    />
                    <label for="hidden-wifi" class="text-sm text-gray-700">
                      Red oculta
                    </label>
                  </div>
                </div>
              </div>

              <!-- Configuración de color para WiFi -->
              <div class="w-full bg-white rounded-lg shadow-md p-4">
                <h3 class="text-lg font-semibold mb-4">Configuración</h3>
                <div
                  class="flex flex-col md:flex-row md:items-center md:gap-6 gap-4"
                >
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color del QR:</label
                    >
                    <ColorPicker v-model="wifiQrColor" />
                    <InputText
                      :modelValue="wifiQrColor"
                      @update:modelValue="(v) => handleHexInput(v, 'qr')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'qr')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: wifiQrColor,
                        color: '#fff',
                        textShadow: '0 0 2px #000',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Color de fondo:</label
                    >
                    <ColorPicker v-model="wifiBgColor" />
                    <InputText
                      :modelValue="wifiBgColor"
                      @update:modelValue="(v) => handleHexInput(v, 'bg')"
                      @blur="(e: Event) => handleHexInput((e.target as HTMLInputElement).value, 'bg')"
                      class="w-24 text-center text-xs font-mono"
                      :style="{
                        backgroundColor: wifiBgColor,
                        color: '#000',
                        textShadow: '0 0 2px #fff',
                      }"
                    />
                  </div>
                  <div class="flex-1 flex items-center gap-2 min-w-0">
                    <label
                      class="text-sm font-medium text-gray-700 whitespace-nowrap"
                      >Forma:</label
                    >
                    <Select
                      v-model="dotShape"
                      :options="DOT_SHAPES"
                      optionLabel="label"
                      optionValue="value"
                      class="w-full"
                    >
                      <template #option="slotProps">
                        <div class="flex items-center">
                          <span
                            :style="{
                              display: 'inline-block',
                              width: '18px',
                              height: '18px',
                              borderRadius:
                                slotProps.option.value === 'dots'
                                  ? '50%'
                                  : slotProps.option.value === 'rounded'
                                  ? '8px'
                                  : slotProps.option.value === 'classy'
                                  ? '2px'
                                  : slotProps.option.value === 'classy-rounded'
                                  ? '6px 6px 2px 2px'
                                  : slotProps.option.value === 'square'
                                  ? '0'
                                  : '12px',
                              background: '#0288d1',
                              border: '1.5px solid #333',
                              marginRight: '8px',
                            }"
                          ></span>
                          <span>{{ slotProps.option.label }}</span>
                        </div>
                      </template>
                    </Select>
                  </div>
                </div>
                <div class="mt-4">
                  <Button
                    @click="resetToDefaultColor"
                    severity="secondary"
                    icon="pi pi-refresh"
                    label="Restaurar configuración por defecto"
                    text
                  />
                </div>
              </div>

              <div class="w-full flex flex-col sm:flex-row gap-2 items-center">
                <Button
                  @click="generateWifiQR"
                  severity="success"
                  class="w-full"
                  icon="pi pi-qrcode"
                  label="Generar WiFi QR"
                  :disabled="!hasWifiData"
                />

                <Button
                  @click="copyQRCode"
                  severity="help"
                  class="w-full"
                  icon="pi pi-copy"
                  label="Copiar código QR"
                  :disabled="!qrCodeWiFi || !hasWifiData"
                />

                <Button
                  @click="downloadQRCode"
                  severity="info"
                  class="w-full"
                  icon="pi pi-download"
                  label="Descargar código QR"
                  :disabled="!qrCodeWiFi || !hasWifiData"
                />

                <div class="flex items-center gap-2">
                  <Button
                    @click="decreaseSize"
                    severity="secondary"
                    icon="pi pi-minus"
                    :disabled="qrSize <= MIN_SIZE"
                    v-tooltip.top="'Reducir tamaño'"
                  />
                  <span class="text-sm text-gray-600"
                    >{{ qrSize }}x{{ qrSize }}px</span
                  >
                  <Button
                    @click="increaseSize"
                    severity="secondary"
                    icon="pi pi-plus"
                    :disabled="qrSize >= MAX_SIZE"
                    v-tooltip.top="'Aumentar tamaño'"
                  />
                </div>
              </div>
              <div
                ref="qrcodeContainerWiFi"
                class="flex justify-center mt-4"
              ></div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import QRCodeStyling from "qr-code-styling";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import ColorPicker from "primevue/colorpicker";
import InputText from "primevue/inputtext";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import Select from "primevue/select";
import Password from "primevue/password";

const toast = useToast();
const text = ref(localStorage.getItem("qr-text") || "");
const qrcodeContainerGeneral = ref<HTMLElement | null>(null);
const qrcodeContainerVCard = ref<HTMLElement | null>(null);
const qrcodeContainerWiFi = ref<HTMLElement | null>(null);
const qrSize = ref(Number(localStorage.getItem("qr-size")) || 300);
const MIN_SIZE = 200; // Tamaño mínimo
const MAX_SIZE = 1000; // Tamaño máximo
const qrCodeGeneral = ref<any>(null);
const qrCodeVCard = ref<any>(null);
const qrCodeWiFi = ref<any>(null);
const MAX_TEXT_LENGTH = 2900; // Aproximadamente el límite seguro para QR versión 40 con codificación alfanumérica

// Colores por tab
const DEFAULT_QR_COLOR = "#0288d1";
const DEFAULT_BG_COLOR = "#f8fafc";
const generalQrColor = ref(
  localStorage.getItem("qr-color-general") || DEFAULT_QR_COLOR
);
const generalBgColor = ref(
  localStorage.getItem("qr-bg-color-general") || DEFAULT_BG_COLOR
);
const vcardQrColor = ref(
  localStorage.getItem("qr-color-vcard") || DEFAULT_QR_COLOR
);
const vcardBgColor = ref(
  localStorage.getItem("qr-bg-color-vcard") || DEFAULT_BG_COLOR
);
const wifiQrColor = ref(
  localStorage.getItem("qr-color-wifi") || DEFAULT_QR_COLOR
);
const wifiBgColor = ref(
  localStorage.getItem("qr-bg-color-wifi") || DEFAULT_BG_COLOR
);

// Datos del vCard
const vCardData = ref({
  firstName: localStorage.getItem("vcard-firstName") || "",
  lastName: localStorage.getItem("vcard-lastName") || "",
  cellPhone: localStorage.getItem("vcard-cellPhone") || "",
  workPhone: localStorage.getItem("vcard-workPhone") || "",
  company: localStorage.getItem("vcard-company") || "",
  title: localStorage.getItem("vcard-title") || "",
  address: localStorage.getItem("vcard-address") || "",
  city: localStorage.getItem("vcard-city") || "",
  zip: localStorage.getItem("vcard-zip") || "",
  state: localStorage.getItem("vcard-state") || "",
  country: localStorage.getItem("vcard-country") || "",
  website: localStorage.getItem("vcard-website") || "",
  email: localStorage.getItem("vcard-email") || "",
});

// Verificar si hay datos suficientes para generar vCard
const hasVCardData = computed(() => {
  return (
    vCardData.value.firstName ||
    vCardData.value.lastName ||
    vCardData.value.cellPhone
  );
});

// Datos del WiFi QR
const wifiData = ref({
  ssid: localStorage.getItem("wifi-ssid") || "",
  password: localStorage.getItem("wifi-password") || "",
  encryption: localStorage.getItem("wifi-encryption") || "WPA",
  hidden: localStorage.getItem("wifi-hidden") === "true",
});

// Verificar si hay datos suficientes para generar WiFi QR
const hasWifiData = computed(() => {
  return wifiData.value.ssid.trim() !== "";
});

const DOT_SHAPES = [
  { label: "Círculos", value: "dots" },
  { label: "Redondeado", value: "rounded" },
  { label: "Clásico", value: "classy" },
  { label: "Clásico redondeado", value: "classy-rounded" },
  { label: "Cuadrado", value: "square" },
  { label: "Extra redondeado", value: "extra-rounded" },
];

const DEFAULT_DOT_SHAPE = "dots";
const dotShape = ref(localStorage.getItem("qr-dot-shape") || DEFAULT_DOT_SHAPE);
const activeTab = ref(localStorage.getItem("qr-active-tab") || "general");

const validateHexColor = (color: string): boolean => {
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color);
};

function handleHexInput(value: string | undefined, type: string = "qr") {
  if (!value) return;
  // Asegurar que el valor comience con #
  let hexValue = value.startsWith("#") ? value : `#${value}`;
  if (!validateHexColor(hexValue)) {
    toast.add({
      severity: "error",
      summary: "Formato inválido",
      detail:
        "El color debe ser un valor hexadecimal de 6 caracteres (ej: #FF0000)",
      life: 3000,
    });
    return;
  }
  if (activeTab.value === "general") {
    if (type === "qr") generalQrColor.value = hexValue;
    else generalBgColor.value = hexValue;
  } else if (activeTab.value === "vcard") {
    if (type === "qr") vcardQrColor.value = hexValue;
    else vcardBgColor.value = hexValue;
  } else if (activeTab.value === "wifi") {
    if (type === "qr") wifiQrColor.value = hexValue;
    else wifiBgColor.value = hexValue;
  }
}

function resetToDefaultColor() {
  if (activeTab.value === "general") {
    generalQrColor.value = DEFAULT_QR_COLOR;
    generalBgColor.value = DEFAULT_BG_COLOR;
    localStorage.setItem("qr-color-general", DEFAULT_QR_COLOR);
    localStorage.setItem("qr-bg-color-general", DEFAULT_BG_COLOR);
    if (isValidGeneral()) generateQRCode();
  } else if (activeTab.value === "vcard") {
    vcardQrColor.value = DEFAULT_QR_COLOR;
    vcardBgColor.value = DEFAULT_BG_COLOR;
    localStorage.setItem("qr-color-vcard", DEFAULT_QR_COLOR);
    localStorage.setItem("qr-bg-color-vcard", DEFAULT_BG_COLOR);
    if (isValidVCard()) generateVCardQR();
  } else if (activeTab.value === "wifi") {
    wifiQrColor.value = DEFAULT_QR_COLOR;
    wifiBgColor.value = DEFAULT_BG_COLOR;
    localStorage.setItem("qr-color-wifi", DEFAULT_QR_COLOR);
    localStorage.setItem("qr-bg-color-wifi", DEFAULT_BG_COLOR);
    if (isValidWifi()) generateWifiQR();
  }
  toast.add({
    severity: "success",
    summary: "Colores restaurados",
    detail: "Se han restaurado los colores por defecto del código QR",
    life: 3000,
  });
}

// Guardar colores en localStorage cuando cambien
watch([generalQrColor, generalBgColor], ([c, b]) => {
  localStorage.setItem("qr-color-general", c);
  localStorage.setItem("qr-bg-color-general", b);
});
watch([vcardQrColor, vcardBgColor], ([c, b]) => {
  localStorage.setItem("qr-color-vcard", c);
  localStorage.setItem("qr-bg-color-vcard", b);
});
watch([wifiQrColor, wifiBgColor], ([c, b]) => {
  localStorage.setItem("qr-color-wifi", c);
  localStorage.setItem("qr-bg-color-wifi", b);
});

// Generar vCard en formato estándar
const generateVCardString = () => {
  const vCard = [];
  vCard.push("BEGIN:VCARD");
  vCard.push("VERSION:3.0");

  // Nombre completo
  if (vCardData.value.firstName || vCardData.value.lastName) {
    const fullName =
      `${vCardData.value.firstName} ${vCardData.value.lastName}`.trim();
    vCard.push(`FN:${fullName}`);
    vCard.push(
      `N:${vCardData.value.lastName || ""};${
        vCardData.value.firstName || ""
      };;;`
    );
  }

  // Teléfonos
  if (vCardData.value.cellPhone) {
    vCard.push(`TEL;TYPE=CELL:${vCardData.value.cellPhone}`);
  }
  if (vCardData.value.workPhone) {
    vCard.push(`TEL;TYPE=WORK:${vCardData.value.workPhone}`);
  }

  // Correo electrónico
  if (vCardData.value.email) {
    vCard.push(`EMAIL:${vCardData.value.email}`);
  }

  // Organización
  if (vCardData.value.company) {
    vCard.push(`ORG:${vCardData.value.company}`);
  }
  if (vCardData.value.title) {
    vCard.push(`TITLE:${vCardData.value.title}`);
  }

  // Dirección
  if (
    vCardData.value.address ||
    vCardData.value.city ||
    vCardData.value.state ||
    vCardData.value.zip ||
    vCardData.value.country
  ) {
    const addressParts = [
      vCardData.value.address || "",
      vCardData.value.city || "",
      vCardData.value.state || "",
      vCardData.value.zip || "",
      vCardData.value.country || "",
    ];
    const address = addressParts.join(";");
    vCard.push(`ADR;TYPE=WORK:;;${address}`);
  }

  // Sitio web
  if (vCardData.value.website) {
    vCard.push(`URL:${vCardData.value.website}`);
  }

  vCard.push("END:VCARD");
  return vCard.join("\r\n");
};

const escapeWifi = (str: string): string => {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/:/g, "\\:");
};

const generateWifiString = () => {
  const ssid = escapeWifi(wifiData.value.ssid);
  const password = escapeWifi(wifiData.value.password);
  const type = wifiData.value.encryption || "WPA";
  let wifi = `WIFI:T:${type};S:${ssid};`;
  if (type !== "nopass" && password) {
    wifi += `P:${password};`;
  }
  if (wifiData.value.hidden) {
    wifi += "H:true;";
  }
  wifi += ";";
  return wifi;
};

const generateVCardQR = () => {
  if (!qrcodeContainerVCard.value || !isValidVCard()) return;
  qrcodeContainerVCard.value.innerHTML = "";
  const vCardString = generateVCardString();
  qrCodeVCard.value = new QRCodeStyling({
    width: qrSize.value,
    height: qrSize.value,
    data: vCardString,
    dotsOptions: {
      color: vcardQrColor.value,
      type: dotShape.value as any,
    },
    backgroundOptions: {
      color: vcardBgColor.value,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
    },
  });
  qrCodeVCard.value.append(qrcodeContainerVCard.value);
};

const generateWifiQR = () => {
  if (!qrcodeContainerWiFi.value || !isValidWifi()) return;
  qrcodeContainerWiFi.value.innerHTML = "";
  const wifiString = generateWifiString();
  qrCodeWiFi.value = new QRCodeStyling({
    width: qrSize.value,
    height: qrSize.value,
    data: wifiString,
    dotsOptions: {
      color: wifiQrColor.value,
      type: dotShape.value as any,
    },
    backgroundOptions: {
      color: wifiBgColor.value,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
    },
  });
  qrCodeWiFi.value.append(qrcodeContainerWiFi.value);
};

// Guardar datos del vCard en localStorage cuando cambien
watch(
  vCardData,
  (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(`vcard-${key}`, value);
      } else {
        localStorage.removeItem(`vcard-${key}`);
      }
    });
  },
  { deep: true }
);

// Guardar datos del WiFi en localStorage cuando cambien
watch(
  wifiData,
  (newData) => {
    Object.entries(newData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        localStorage.setItem(`wifi-${key}`, String(value));
      } else {
        localStorage.removeItem(`wifi-${key}`);
      }
    });
  },
  { deep: true }
);

// Guardar selección de forma en localStorage
watch(dotShape, (newShape) => {
  if (newShape !== DEFAULT_DOT_SHAPE) {
    localStorage.setItem("qr-dot-shape", newShape);
  } else {
    localStorage.removeItem("qr-dot-shape");
  }
  if (text.value && qrCodeGeneral.value) {
    generateQRCode();
  }
});

const copyQRCode = async () => {
  if (!qrCodeGeneral.value) return;

  try {
    // Primero obtenemos el canvas
    const canvas = qrcodeContainerGeneral.value?.querySelector("canvas");
    if (!canvas) return;

    // Convertimos el canvas a blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });

    // Copiamos al portapapeles
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);

    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Código QR copiado al portapapeles",
      life: 3000,
    });
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar el código QR",
      life: 3000,
    });
  }
};

const downloadQRCode = () => {
  if (qrCodeGeneral.value) {
    qrCodeGeneral.value.download({ name: "qr", extension: "png" });
  }
};

const increaseSize = () => {
  qrSize.value = Math.min(qrSize.value + 50, MAX_SIZE);
  localStorage.setItem("qr-size", qrSize.value.toString());
};

const decreaseSize = () => {
  qrSize.value = Math.max(qrSize.value - 50, MIN_SIZE);
  localStorage.setItem("qr-size", qrSize.value.toString());
};

const generateQRCode = () => {
  if (!qrcodeContainerGeneral.value || !text.value.trim()) return;

  // Validar longitud del texto
  if (text.value.length > MAX_TEXT_LENGTH) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: `El texto es demasiado largo. El límite es de ${MAX_TEXT_LENGTH} caracteres.`,
      life: 5000,
    });
    return;
  }

  try {
    // Eliminar QR anterior si existe
    qrcodeContainerGeneral.value.innerHTML = "";

    qrCodeGeneral.value = new QRCodeStyling({
      width: qrSize.value,
      height: qrSize.value,
      data: text.value,
      dotsOptions: {
        color: generalQrColor.value,
        type: dotShape.value as any,
      },
      backgroundOptions: {
        color: generalBgColor.value,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0,
      },
    });

    qrCodeGeneral.value.append(qrcodeContainerGeneral.value);
  } catch (error) {
    console.error("Error generando QR:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail:
        "No se pudo generar el código QR. El texto puede ser demasiado complejo.",
      life: 5000,
    });
  }
};

// --- Watchers para datos de cada tab ---
watch(text, (newValue) => {
  localStorage.setItem("qr-text", newValue);
  if (isValidGeneral()) generateQRCode();
  if (newValue.length > MAX_TEXT_LENGTH) {
    toast.add({
      severity: "warn",
      summary: "Advertencia",
      detail: `Has excedido el límite de ${MAX_TEXT_LENGTH} caracteres.`,
      life: 3000,
    });
  }
});
watch(
  vCardData,
  () => {
    if (isValidVCard()) generateVCardQR();
  },
  { deep: true }
);
watch(
  wifiData,
  () => {
    if (isValidWifi()) generateWifiQR();
  },
  { deep: true }
);

// --- Watchers para color, fondo, forma y tamaño ---
function colorWatcher(colorRef: any, regenerateFn: () => void) {
  watch(colorRef, (val: string, oldVal: string) => {
    if (!val.startsWith("#")) colorRef.value = `#${val.replace(/^#*/, "")}`;
    else if (val !== oldVal) regenerateFn();
  });
}
colorWatcher(generalQrColor, () => {
  if (isValidGeneral()) generateQRCode();
});
colorWatcher(generalBgColor, () => {
  if (isValidGeneral()) generateQRCode();
});
colorWatcher(vcardQrColor, () => {
  if (isValidVCard()) generateVCardQR();
});
colorWatcher(vcardBgColor, () => {
  if (isValidVCard()) generateVCardQR();
});
colorWatcher(wifiQrColor, () => {
  if (isValidWifi()) generateWifiQR();
});
colorWatcher(wifiBgColor, () => {
  if (isValidWifi()) generateWifiQR();
});

watch(dotShape, () => {
  if (isValidGeneral()) generateQRCode();
  if (isValidVCard()) generateVCardQR();
  if (isValidWifi()) generateWifiQR();
});
watch(qrSize, () => {
  if (isValidGeneral()) generateQRCode();
  if (isValidVCard()) generateVCardQR();
  if (isValidWifi()) generateWifiQR();
});

function handleTabChange(tab: string | number) {
  const tabStr = String(tab);
  localStorage.setItem("qr-active-tab", tabStr);
  if (tabStr === "general" && isValidGeneral()) {
    generateQRCode();
  } else if (tabStr === "vcard" && isValidVCard()) {
    generateVCardQR();
  } else if (tabStr === "wifi" && isValidWifi()) {
    generateWifiQR();
  }
}

function isValidGeneral() {
  return !!text.value.trim();
}
function isValidWifi() {
  const ssid = wifiData.value.ssid.trim();
  const password = wifiData.value.password.trim();
  const type = wifiData.value.encryption;
  if (!ssid) return false;
  if (type === "nopass") return true;
  return !!password;
}
function isValidVCard() {
  const name =
    vCardData.value.firstName.trim() || vCardData.value.lastName.trim();
  const email = vCardData.value.email.trim();
  const cell = vCardData.value.cellPhone.trim();
  return !!name && (!!email || !!cell);
}
</script>

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
