<template>
  <div>
    <BreadcrumbNav />
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="text-center mb-8">
        <h1
          class="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center"
        >
          <Globe class="text-blue-600 mr-3" />
          API Tester
        </h1>
        <p class="text-gray-600">
          Prueba APIs REST con diferentes métodos HTTP, headers y autenticación
        </p>

        <!-- Nota CORS -->
        <div
          class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-4xl mx-auto"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5">
              <svg
                class="w-5 h-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="text-left">
              <h4 class="text-sm font-semibold text-amber-800 mb-1">
                ⚠️ Importante: Configuración CORS
              </h4>
              <p class="text-sm text-amber-700 mb-2">
                Para que este API Tester funcione correctamente, la API que vas
                a probar debe permitir CORS desde este dominio:
              </p>
              <div
                class="bg-amber-100 px-3 py-2 rounded border text-sm font-mono text-amber-800 mb-2"
              >
                https://jabernalv.github.io
              </div>
              <p class="text-xs text-amber-600">
                Si tienes problemas de CORS, consulta la documentación de tu API
                sobre cómo configurar los headers
                <span class="font-mono">Access-Control-Allow-Origin</span> y
                <span class="font-mono">Access-Control-Allow-Methods</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuración -->
      <Card class="mb-6">
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
          >
            <Cog class="text-blue-600" />
            Configuración del Request
          </h2>
        </template>
        <template #content>
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Panel izquierdo: Configuración principal -->
            <div class="space-y-4">
              <form @submit.prevent="sendRequest" class="space-y-4">
                <!-- URL -->
                <div class="space-y-3">
                  <div>
                    <label
                      class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                    >
                      <Link class="mr-2" />
                      URL
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <Link class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="request.url"
                        class="w-full"
                        placeholder="https://api.example.com/endpoint"
                        required
                      />
                    </InputGroup>
                  </div>
                </div>

                <!-- Método y Timeout -->
                <div class="flex gap-2">
                  <div class="flex-1">
                    <label
                      class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                    >
                      <ArrowRight class="w-4 h-4 mr-2" />
                      Método
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <ArrowRight class="w-4 h-4" />
                      </InputGroupAddon>
                      <Select
                        v-model="request.method"
                        :options="httpMethods"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="GET"
                        class="w-full"
                      />
                    </InputGroup>
                  </div>
                  <div class="flex-1">
                    <label
                      class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                    >
                      <Clock class="w-4 h-4 mr-2" />
                      Timeout
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <Clock class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputNumber
                        v-model="request.timeout"
                        class="w-full"
                        :min="1000"
                        :max="60000"
                        :step="1000"
                        placeholder="5000"
                      />
                      <InputGroupAddon>ms</InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>

                <!-- Headers -->
                <div>
                  <label
                    class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                  >
                    <List class="mr-2" />
                    Headers
                  </label>
                  <div class="space-y-2">
                    <div
                      v-for="(header, index) in request.headers"
                      :key="index"
                      class="flex gap-2"
                    >
                      <InputGroup class="flex-1">
                        <InputGroupAddon>
                          <Tag class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="header.key"
                          placeholder="Content-Type"
                          class="w-full"
                        />
                      </InputGroup>
                      <InputGroup class="flex-1">
                        <InputGroupAddon>
                          <ChevronRight class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="header.value"
                          placeholder="application/json"
                          class="w-full"
                        />
                      </InputGroup>
                      <Button
                        @click="removeHeader(index)"
                        severity="danger"
                        text
                        size="medium"
                      >
                        <template #icon>
                          <Trash2 class="w-4 h-4" />
                        </template>
                      </Button>
                    </div>
                    <Button
                      @click="addHeader"
                      label="Agregar Header"
                      severity="secondary"
                      text
                      size="small"
                      class="w-full"
                    >
                      <template #icon>
                        <Plus class="w-4 h-4 mr-2" />
                      </template>
                    </Button>
                  </div>
                </div>

                <!-- Body -->
                <div v-if="showBody">
                  <label
                    class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                  >
                    <FilePen class="mr-2" />
                    Body
                  </label>
                  <div class="space-y-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <FileEdit class="w-4 h-4" />
                      </InputGroupAddon>
                      <Select
                        v-model="request.bodyType"
                        :options="bodyTypes"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="JSON"
                        class="w-full"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon>
                        <FileEdit class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="request.body"
                        class="w-full"
                        :rows="8"
                        placeholder='{"key": "value"}'
                      />
                    </InputGroup>
                  </div>
                </div>

                <!-- Authentication -->
                <div>
                  <label
                    class="block mb-2 font-medium text-gray-700 flex items-center justify-center"
                  >
                    <Lock class="mr-2"></Lock>
                    Autenticación
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Lock class="w-4 h-4" />
                    </InputGroupAddon>
                    <Select
                      v-model="request.auth.type"
                      :options="authTypes"
                      optionLabel="label"
                      optionValue="value"
                      placeholder="Sin autenticación"
                      class="w-full mb-3"
                    />
                  </InputGroup>

                  <div v-if="request.auth.type === 'basic'" class="space-y-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <User class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="request.auth.username"
                        placeholder="Usuario"
                        class="w-full"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon>
                        <Key class="w-4 h-4" />
                      </InputGroupAddon>
                      <Password
                        v-model="request.auth.password"
                        placeholder="Contraseña"
                        class="w-full"
                        :feedback="false"
                      />
                    </InputGroup>
                  </div>

                  <div v-if="request.auth.type === 'bearer'" class="space-y-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <Key class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="request.auth.token"
                        placeholder="Token Bearer"
                        class="w-full"
                      />
                    </InputGroup>
                  </div>

                  <div v-if="request.auth.type === 'apikey'" class="space-y-2">
                    <InputGroup>
                      <InputGroupAddon>
                        <Hash class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="request.auth.key"
                        placeholder="Nombre del header (ej: X-API-Key)"
                        class="w-full"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon>
                        <Key class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="request.auth.value"
                        placeholder="Valor de la API Key"
                        class="w-full"
                      />
                    </InputGroup>
                  </div>
                </div>

                <Button
                  type="submit"
                  label="Enviar Request"
                  class="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                  :loading="loading"
                >
                  <template #icon>
                    <Send class="mr-2"></Send>
                  </template>
                </Button>
              </form>
            </div>

            <!-- Panel derecho: Historial -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3
                  class="text-lg font-semibold text-gray-800 flex items-center gap-2"
                >
                  <History class="text-green-600" />
                  Historial de Requests
                </h3>
                <Button
                  @click="clearAllHistory"
                  severity="danger"
                  outlined
                  size="medium"
                  v-tooltip="'Borrar todo el historial'"
                  :disabled="history.length === 0"
                >
                  <template #icon>
                    <Trash class="w-6 h-6" />
                  </template>
                </Button>
              </div>
              <div class="space-y-2 max-h-96 overflow-y-auto">
                <div
                  v-for="(item, index) in history"
                  :key="index"
                  class="p-3 border rounded hover:bg-gray-50 transition-colors relative group"
                >
                  <div
                    @click="loadFromHistory(item)"
                    class="cursor-pointer pr-12"
                  >
                    <div class="flex items-center justify-between">
                      <span class="font-mono text-sm font-semibold">{{
                        item.method
                      }}</span>
                      <span class="text-xs text-gray-500 truncate max-w-48">{{
                        item.url
                      }}</span>
                    </div>
                    <div class="text-xs text-gray-600 mt-1">
                      {{ new Date(item.timestamp).toLocaleString() }}
                    </div>
                  </div>
                  <Button
                    @click.stop="removeHistoryItem(index)"
                    severity="danger"
                    text
                    size="small"
                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-red-200 hover:border-red-300"
                    v-tooltip="'Eliminar del historial'"
                  >
                    <template #icon>
                      <Trash class="w-4 h-4 text-red-500" />
                    </template>
                  </Button>
                </div>
                <div
                  v-if="history.length === 0"
                  class="text-center text-gray-500 text-sm py-4"
                >
                  No hay requests en el historial
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Respuesta -->
      <Card>
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
          >
            <ChartLine class="text-green-600" />
            Respuesta del API
          </h2>
        </template>
        <template #content>
          <div v-if="response" class="space-y-4">
            <!-- Status y tiempo -->
            <div
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <span
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                  :class="getStatusColor(response.status)"
                >
                  {{ response.status }}
                </span>
                <span class="text-sm text-gray-600">
                  {{ response.statusText }}
                </span>
              </div>
              <div class="text-sm text-gray-500">{{ response.time }}ms</div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Headers de respuesta -->
              <div>
                <h3 class="font-semibold text-gray-800 mb-2">
                  Headers de Respuesta
                </h3>
                <div class="bg-gray-50 p-3 rounded-lg max-h-60 overflow-y-auto">
                  <div
                    v-for="(value, key) in response.headers"
                    :key="key"
                    class="text-sm font-mono"
                  >
                    <span class="text-blue-600">{{ key }}:</span>
                    <span class="text-gray-700 ml-2">{{ value }}</span>
                  </div>
                </div>
              </div>

              <!-- Body de respuesta -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-800">Body de Respuesta</h3>
                  <div class="flex gap-2">
                    <Button
                      @click="copyResponse"
                      label="Copiar"
                      severity="secondary"
                      text
                      size="small"
                    >
                      <template #icon>
                        <Copy class="w-4 h-4" />
                      </template>
                    </Button>
                    <Button
                      @click="downloadResponse"
                      label="Descargar"
                      severity="secondary"
                      text
                      size="small"
                    >
                      <template #icon>
                        <Download class="w-4 h-4" />
                      </template>
                    </Button>
                  </div>
                </div>
                <div
                  class="bg-gray-900 text-green-400 p-4 rounded-lg max-h-60 overflow-y-auto"
                >
                  <pre
                    class="text-sm text-left whitespace-pre-wrap break-words"
                    >{{ formatResponse(response.body) }}</pre
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="text-center text-gray-500 py-8 flex items-center justify-center"
          >
            <Globe class="mb-4 mr-2" />
            <p>Envía un request para ver la respuesta aquí</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Card from "primevue/card";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Textarea from "primevue/textarea";
import Password from "primevue/password";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import {
  Link,
  ArrowRight,
  Clock,
  Tag,
  ChevronRight,
  FileEdit,
  Lock,
  Key,
  User,
  Hash,
  Globe,
  Cog,
  List,
  Plus,
  Trash2,
  FilePen,
  Send,
  History,
  ChartLine,
  Copy,
  Download,
  Trash,
} from "lucide-vue-next";

// Tipos
interface Header {
  key: string;
  value: string;
}

interface Auth {
  type: string;
  username?: string;
  password?: string;
  token?: string;
  key?: string;
  value?: string;
}

interface Request {
  url: string;
  method: string;
  timeout: number;
  headers: Header[];
  body: string;
  bodyType: string;
  auth: Auth;
}

interface Response {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  time: number;
}

interface HistoryItem extends Request {
  timestamp: number;
  response?: Response;
}

// Estado reactivo
const request = ref<Request>({
  url: "",
  method: "GET",
  timeout: 5000,
  headers: [],
  body: "",
  bodyType: "json",
  auth: { type: "none" },
});

const response = ref<Response | null>(null);
const loading = ref(false);
const history = ref<HistoryItem[]>([]);

// Constantes
const STORAGE_KEY = "api-tester-history";
const MAX_HISTORY_ITEMS = 12;

// Opciones
const httpMethods = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "PATCH", value: "PATCH" },
  { label: "DELETE", value: "DELETE" },
  { label: "HEAD", value: "HEAD" },
  { label: "OPTIONS", value: "OPTIONS" },
];

const bodyTypes = [
  { label: "JSON", value: "json" },
  { label: "Form Data", value: "form" },
  { label: "XML", value: "xml" },
  { label: "Text", value: "text" },
];

const authTypes = [
  { label: "Sin autenticación", value: "none" },
  { label: "Basic Auth", value: "basic" },
  { label: "Bearer Token", value: "bearer" },
  { label: "API Key", value: "apikey" },
];

// Computed
const showBody = computed(() => {
  return ["POST", "PUT", "PATCH"].includes(request.value.method);
});

// Métodos localStorage
const saveHistoryToStorage = () => {
  try {
    const data = JSON.stringify(history.value);
    localStorage.setItem(STORAGE_KEY, data);
    console.log(`Guardado ${history.value.length} items en localStorage`);
  } catch (error) {
    console.error("Error saving history to localStorage:", error);
  }
};

const loadHistoryFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        history.value = parsed;
        console.log(
          `Cargados ${history.value.length} items desde localStorage`
        );
      }
    } else {
      console.log("No hay datos en localStorage");
    }
  } catch (error) {
    console.error("Error loading history from localStorage:", error);
    history.value = [];
  }
};

// Métodos de historial
const isSameRequest = (req1: Request, req2: Request): boolean => {
  // Comparar elementos principales para detectar duplicados
  return (
    req1.url === req2.url &&
    req1.method === req2.method &&
    req1.body === req2.body &&
    JSON.stringify(req1.headers) === JSON.stringify(req2.headers) &&
    JSON.stringify(req1.auth) === JSON.stringify(req2.auth)
  );
};

const removeHistoryItem = (index: number) => {
  history.value.splice(index, 1);
};

const clearAllHistory = () => {
  history.value = [];
  response.value = null;
  localStorage.removeItem(STORAGE_KEY);
};

// Métodos
const addHeader = () => {
  request.value.headers.push({ key: "", value: "" });
};

const removeHeader = (index: number) => {
  request.value.headers.splice(index, 1);
};

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) return "bg-green-100 text-green-800";
  if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800";
  if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

const formatResponse = (body: string) => {
  try {
    if (body.startsWith("{") || body.startsWith("[")) {
      return JSON.stringify(JSON.parse(body), null, 2);
    }
    return body;
  } catch {
    return body;
  }
};

const sendRequest = async () => {
  if (!request.value.url) return;

  loading.value = true;
  const startTime = Date.now();

  try {
    // Preparar headers
    const headers: Record<string, string> = {};
    request.value.headers.forEach((header) => {
      if (header.key && header.value) {
        headers[header.key] = header.value;
      }
    });

    // Agregar headers de autenticación
    if (
      request.value.auth.type === "basic" &&
      request.value.auth.username &&
      request.value.auth.password
    ) {
      const credentials = btoa(
        `${request.value.auth.username}:${request.value.auth.password}`
      );
      headers["Authorization"] = `Basic ${credentials}`;
    } else if (
      request.value.auth.type === "bearer" &&
      request.value.auth.token
    ) {
      headers["Authorization"] = `Bearer ${request.value.auth.token}`;
    } else if (
      request.value.auth.type === "apikey" &&
      request.value.auth.key &&
      request.value.auth.value
    ) {
      headers[request.value.auth.key] = request.value.auth.value;
    }

    // Preparar body
    let body: any = null;
    if (showBody.value && request.value.body) {
      if (request.value.bodyType === "json") {
        try {
          body = JSON.parse(request.value.body);
          headers["Content-Type"] = "application/json";
        } catch {
          body = request.value.body;
        }
      } else if (request.value.bodyType === "form") {
        const formData = new FormData();
        const lines = request.value.body.split("\n");
        lines.forEach((line) => {
          const [key, value] = line.split("=");
          if (key && value) {
            formData.append(key.trim(), value.trim());
          }
        });
        body = formData;
      } else {
        body = request.value.body;
        headers["Content-Type"] =
          request.value.bodyType === "xml" ? "application/xml" : "text/plain";
      }
    }

    // Realizar request
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      request.value.timeout
    );

    const fetchResponse = await fetch(request.value.url, {
      method: request.value.method,
      headers,
      body:
        body instanceof FormData
          ? body
          : body
          ? JSON.stringify(body)
          : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Procesar respuesta
    const responseText = await fetchResponse.text();
    const responseHeaders: Record<string, string> = {};
    fetchResponse.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    const endTime = Date.now();
    response.value = {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      headers: responseHeaders,
      body: responseText,
      time: endTime - startTime,
    };

    // Guardar en historial solo si no es duplicado
    const isDuplicate = history.value.some((item) =>
      isSameRequest(item, request.value)
    );

    if (!isDuplicate) {
      const historyItem: HistoryItem = {
        ...request.value,
        timestamp: Date.now(),
        response: response.value,
      };
      history.value.unshift(historyItem);

      // Mantener solo los últimos 12 items
      if (history.value.length > MAX_HISTORY_ITEMS) {
        history.value = history.value.slice(0, MAX_HISTORY_ITEMS);
      }
    } else {
      // Si es duplicado, actualizar solo la respuesta y timestamp del existente
      const existingIndex = history.value.findIndex((item) =>
        isSameRequest(item, request.value)
      );
      if (existingIndex !== -1) {
        history.value[existingIndex].response = response.value;
        history.value[existingIndex].timestamp = Date.now();
        // Mover al inicio
        const item = history.value.splice(existingIndex, 1)[0];
        history.value.unshift(item);
      }
    }
  } catch (error: any) {
    const endTime = Date.now();
    response.value = {
      status: 0,
      statusText: "Error",
      headers: {},
      body: error.message || "Error de red",
      time: endTime - startTime,
    };

    // Guardar en historial también cuando hay error (solo si no es duplicado)
    const isDuplicate = history.value.some((item) =>
      isSameRequest(item, request.value)
    );

    if (!isDuplicate) {
      const historyItem: HistoryItem = {
        ...request.value,
        timestamp: Date.now(),
        response: response.value,
      };
      history.value.unshift(historyItem);

      // Mantener solo los últimos 12 items
      if (history.value.length > MAX_HISTORY_ITEMS) {
        history.value = history.value.slice(0, MAX_HISTORY_ITEMS);
      }
    } else {
      // Si es duplicado, actualizar solo la respuesta y timestamp del existente
      const existingIndex = history.value.findIndex((item) =>
        isSameRequest(item, request.value)
      );
      if (existingIndex !== -1) {
        history.value[existingIndex].response = response.value;
        history.value[existingIndex].timestamp = Date.now();
        // Mover al inicio
        const item = history.value.splice(existingIndex, 1)[0];
        history.value.unshift(item);
      }
    }
  } finally {
    loading.value = false;
  }
};

const loadFromHistory = (item: HistoryItem) => {
  request.value = { ...item };
  if (item.response) {
    response.value = item.response;
  }
};

const copyResponse = () => {
  if (response.value) {
    navigator.clipboard.writeText(response.value.body);
  }
};

const downloadResponse = () => {
  if (response.value) {
    const blob = new Blob([response.value.body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Watcher para guardar automáticamente
watch(
  history,
  () => {
    saveHistoryToStorage();
  },
  { deep: true }
);

// Inicializar
onMounted(() => {
  loadHistoryFromStorage();

  // Cargar automáticamente el último request si existe
  if (history.value.length > 0) {
    const lastRequest = history.value[0]; // El más reciente está al inicio
    loadFromHistory(lastRequest);
  }

  // Solo agregar header vacío si no hay headers cargados
  if (request.value.headers.length === 0) {
    addHeader();
  }
});
</script>
