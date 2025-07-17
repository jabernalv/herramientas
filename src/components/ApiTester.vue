<template>
  <div>
    <BreadcrumbNav />
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="pi pi-globe mr-3 text-blue-600"></i>
          API Tester
        </h1>
        <p class="text-gray-600">
          Prueba APIs REST con diferentes métodos HTTP, headers y autenticación
        </p>
      </div>

      <!-- Configuración -->
      <Card class="mb-6">
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
          >
            <i class="pi pi-cog text-blue-600"></i>
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
                    <label class="block mb-2 font-medium text-gray-700">
                      <i class="pi pi-link mr-2"></i>
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
                    <label class="block mb-2 font-medium text-gray-700">
                      <i class="pi pi-arrow-right mr-2"></i>
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
                    <label class="block mb-2 font-medium text-gray-700">
                      <i class="pi pi-clock mr-2"></i>
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
                  <label class="block mb-2 font-medium text-gray-700">
                    <i class="pi pi-list mr-2"></i>
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
                        icon="pi pi-trash"
                        severity="danger"
                        text
                        size="small"
                      />
                    </div>
                    <Button
                      @click="addHeader"
                      icon="pi pi-plus"
                      label="Agregar Header"
                      severity="secondary"
                      text
                      size="small"
                    />
                  </div>
                </div>

                <!-- Body -->
                <div v-if="showBody">
                  <label class="block mb-2 font-medium text-gray-700">
                    <i class="pi pi-file-edit mr-2"></i>
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
                  <label class="block mb-2 font-medium text-gray-700">
                    <i class="pi pi-lock mr-2"></i>
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
                    <i class="pi pi-send mr-2"></i>
                  </template>
                </Button>
              </form>
            </div>

            <!-- Panel derecho: Historial -->
            <div>
              <h3
                class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
              >
                <i class="pi pi-history text-green-600"></i>
                Historial de Requests
              </h3>
              <div class="space-y-2 max-h-96 overflow-y-auto">
                <div
                  v-for="(item, index) in history"
                  :key="index"
                  @click="loadFromHistory(item)"
                  class="p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-sm font-semibold">{{
                      item.method
                    }}</span>
                    <span class="text-xs text-gray-500 truncate">{{
                      item.url
                    }}</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-1">
                    {{ new Date(item.timestamp).toLocaleString() }}
                  </div>
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
            <i class="pi pi-chart-line text-green-600"></i>
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
                      icon="pi pi-copy"
                      label="Copiar"
                      severity="secondary"
                      text
                      size="small"
                    />
                    <Button
                      @click="downloadResponse"
                      icon="pi pi-download"
                      label="Descargar"
                      severity="secondary"
                      text
                      size="small"
                    />
                  </div>
                </div>
                <div
                  class="bg-gray-900 text-green-400 p-4 rounded-lg max-h-60 overflow-y-auto"
                >
                  <pre class="text-sm">{{ formatResponse(response.body) }}</pre>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-gray-500 py-8">
            <i class="pi pi-globe text-4xl mb-4"></i>
            <p>Envía un request para ver la respuesta aquí</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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

    // Guardar en historial
    const historyItem: HistoryItem = {
      ...request.value,
      timestamp: Date.now(),
      response: response.value,
    };
    history.value.unshift(historyItem);

    // Mantener solo los últimos 10 items
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10);
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

// Inicializar
onMounted(() => {
  addHeader();
});
</script>
