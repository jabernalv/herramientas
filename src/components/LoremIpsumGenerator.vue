<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Textarea from "primevue/textarea";
import Card from "primevue/card";
import { Copy, RefreshCw } from "lucide-vue-next";
import Toast from "primevue/toast";

interface LoremOption {
  label: string;
  value: string;
}

const loremOptions: LoremOption[] = [
  { label: "Lorem Ipsum clásico", value: "lorem" },
  { label: "Texto en español", value: "spanish" },
  { label: "Texto técnico", value: "technical" },
  { label: "Texto de marketing", value: "marketing" },
  { label: "Texto de noticias", value: "news" },
];

const selectedType = ref<LoremOption>(loremOptions[0]);
const paragraphCount = ref<number>(3);
const wordCount = ref<number>(50);
const characterCount = ref<number>(200);
const startWithLorem = ref<boolean>(true);
const includeHTML = ref<boolean>(false);
const outputMode = ref<string>("paragraphs");
const generatedText = ref<string>("");
const copied = ref<boolean>(false);

// Textos base para diferentes tipos
const textBases = {
  lorem: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  ],
  spanish: [
    "El desarrollo de software es un proceso complejo que requiere atención al detalle y planificación cuidadosa. Cada línea de código debe ser escrita con precisión para evitar errores y garantizar el funcionamiento correcto de la aplicación.",
    "La experiencia del usuario es fundamental en el diseño de aplicaciones modernas. Los desarrolladores deben considerar no solo la funcionalidad, sino también la usabilidad y la accesibilidad para crear productos que satisfagan las necesidades de los usuarios.",
    "La tecnología evoluciona constantemente, lo que significa que los profesionales del sector deben mantenerse actualizados con las últimas tendencias y herramientas. El aprendizaje continuo es esencial para el éxito en este campo dinámico.",
  ],
  technical: [
    "The implementation of microservices architecture requires careful consideration of service boundaries and communication protocols. RESTful APIs and message queues are commonly used to facilitate inter-service communication while maintaining loose coupling.",
    "Database optimization involves analyzing query performance, indexing strategies, and data normalization techniques. Proper indexing can significantly improve query execution times, while denormalization may be necessary for read-heavy workloads.",
    "Container orchestration platforms like Kubernetes provide automated deployment, scaling, and management of containerized applications. They handle load balancing, service discovery, and health monitoring across distributed systems.",
  ],
  marketing: [
    "Transform your business with our innovative solutions that drive growth and increase efficiency. Our cutting-edge technology empowers teams to achieve more while reducing operational costs and improving customer satisfaction.",
    "Experience the future of digital transformation with our comprehensive suite of tools designed for modern enterprises. From cloud migration to data analytics, we provide the expertise and technology needed to stay ahead of the competition.",
    "Join thousands of satisfied customers who have revolutionized their workflows with our intuitive platform. Our user-friendly interface and powerful features make complex tasks simple, enabling you to focus on what matters most.",
  ],
  news: [
    "Technology companies continue to innovate at an unprecedented pace, with artificial intelligence and machine learning driving significant advances across various industries. These developments are reshaping how businesses operate and interact with customers.",
    "The global shift toward remote work has accelerated digital transformation initiatives worldwide. Organizations are investing heavily in cloud infrastructure and collaboration tools to support distributed teams and maintain productivity.",
    "Cybersecurity remains a top priority as cyber threats become more sophisticated. Companies are implementing advanced security measures and adopting zero-trust architectures to protect sensitive data and maintain customer trust.",
  ],
};

// Cargar configuraciones guardadas
const loadSavedSettings = () => {
  const savedType = localStorage.getItem("lorem-type");
  if (savedType) {
    const found = loremOptions.find((option) => option.value === savedType);
    if (found) selectedType.value = found;
  }

  const savedParagraphCount = localStorage.getItem("lorem-paragraph-count");
  if (savedParagraphCount) paragraphCount.value = Number(savedParagraphCount);

  const savedWordCount = localStorage.getItem("lorem-word-count");
  if (savedWordCount) wordCount.value = Number(savedWordCount);

  const savedCharacterCount = localStorage.getItem("lorem-character-count");
  if (savedCharacterCount) characterCount.value = Number(savedCharacterCount);

  const savedStartWithLorem = localStorage.getItem("lorem-start-with-lorem");
  if (savedStartWithLorem)
    startWithLorem.value = savedStartWithLorem === "true";

  const savedIncludeHTML = localStorage.getItem("lorem-include-html");
  if (savedIncludeHTML) includeHTML.value = savedIncludeHTML === "true";

  const savedOutputMode = localStorage.getItem("lorem-output-mode");
  if (savedOutputMode) outputMode.value = savedOutputMode;
};

// Guardar configuraciones en localStorage
const saveSettings = () => {
  localStorage.setItem("lorem-type", selectedType.value.value);
  localStorage.setItem(
    "lorem-paragraph-count",
    paragraphCount.value.toString()
  );
  localStorage.setItem("lorem-word-count", wordCount.value.toString());
  localStorage.setItem(
    "lorem-character-count",
    characterCount.value.toString()
  );
  localStorage.setItem(
    "lorem-start-with-lorem",
    startWithLorem.value.toString()
  );
  localStorage.setItem("lorem-include-html", includeHTML.value.toString());
  localStorage.setItem("lorem-output-mode", outputMode.value);
};

const generateLoremIpsum = () => {
  const baseTexts =
    textBases[selectedType.value.value as keyof typeof textBases];
  let result = "";

  if (outputMode.value === "paragraphs") {
    for (let i = 0; i < paragraphCount.value; i++) {
      const text = baseTexts[i % baseTexts.length];
      if (includeHTML.value) {
        result += `<p>${text}</p>\n\n`;
      } else {
        result += text + "\n\n";
      }
    }
  } else if (outputMode.value === "words") {
    const words = baseTexts.join(" ").split(" ");
    const selectedWords = words.slice(0, wordCount.value);
    result = selectedWords.join(" ");
  } else if (outputMode.value === "characters") {
    const fullText = baseTexts.join(" ");
    result = fullText.substring(0, characterCount.value);
  }

  if (startWithLorem.value && selectedType.value.value === "lorem") {
    result = "Lorem ipsum dolor sit amet, " + result;
  }

  generatedText.value = result.trim();
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedText.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }
};

const clearText = () => {
  generatedText.value = "";
};

onMounted(() => {
  loadSavedSettings();
  generateLoremIpsum();
});

// Watchers para guardar configuraciones
watch(selectedType, saveSettings);
watch(paragraphCount, saveSettings);
watch(wordCount, saveSettings);
watch(characterCount, saveSettings);
watch(startWithLorem, saveSettings);
watch(includeHTML, saveSettings);
watch(outputMode, saveSettings);
</script>

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
          <li class="text-gray-700">Generador de Lorem Ipsum</li>
        </ol>
      </nav>
    </div>

    <div class="min-h-screen bg-surface-ground py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
            📝 Generador de Lorem Ipsum
          </h1>
          <p class="text-xl text-surface-600">
            Genera texto de relleno para tus proyectos de diseño y desarrollo.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Panel de configuración -->
          <Card>
            <template #title>
              <div class="flex items-center">
                <i class="pi pi-cog mr-2"></i>
                Configuración
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Tipo de texto -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Tipo de texto
                  </label>
                  <Dropdown
                    v-model="selectedType"
                    :options="loremOptions"
                    option-label="label"
                    placeholder="Selecciona el tipo de texto"
                    class="w-full"
                    @change="generateLoremIpsum"
                  />
                </div>

                <!-- Modo de salida -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Modo de salida
                  </label>
                  <div class="flex space-x-4">
                    <label class="flex items-center">
                      <input
                        type="radio"
                        v-model="outputMode"
                        value="paragraphs"
                        class="mr-2"
                        @change="generateLoremIpsum"
                      />
                      Párrafos
                    </label>
                    <label class="flex items-center">
                      <input
                        type="radio"
                        v-model="outputMode"
                        value="words"
                        class="mr-2"
                        @change="generateLoremIpsum"
                      />
                      Palabras
                    </label>
                    <label class="flex items-center">
                      <input
                        type="radio"
                        v-model="outputMode"
                        value="characters"
                        class="mr-2"
                        @change="generateLoremIpsum"
                      />
                      Caracteres
                    </label>
                  </div>
                </div>

                <!-- Cantidad según modo -->
                <div v-if="outputMode === 'paragraphs'">
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Número de párrafos
                  </label>
                  <InputNumber
                    v-model="paragraphCount"
                    :min="1"
                    :max="20"
                    class="w-full"
                    @change="generateLoremIpsum"
                  />
                </div>

                <div v-if="outputMode === 'words'">
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Número de palabras
                  </label>
                  <InputNumber
                    v-model="wordCount"
                    :min="1"
                    :max="1000"
                    class="w-full"
                    @change="generateLoremIpsum"
                  />
                </div>

                <div v-if="outputMode === 'characters'">
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Número de caracteres
                  </label>
                  <InputNumber
                    v-model="characterCount"
                    :min="1"
                    :max="5000"
                    class="w-full"
                    @change="generateLoremIpsum"
                  />
                </div>

                <!-- Opciones adicionales -->
                <div class="space-y-3">
                  <div class="flex items-center">
                    <Checkbox
                      v-model="startWithLorem"
                      :binary="true"
                      :disabled="selectedType.value !== 'lorem'"
                      @change="generateLoremIpsum"
                    />
                    <label class="ml-2 text-sm text-surface-700">
                      Comenzar con "Lorem ipsum dolor sit amet"
                    </label>
                  </div>

                  <div class="flex items-center">
                    <Checkbox
                      v-model="includeHTML"
                      :binary="true"
                      :disabled="outputMode !== 'paragraphs'"
                      @change="generateLoremIpsum"
                    />
                    <label class="ml-2 text-sm text-surface-700">
                      Incluir etiquetas HTML
                    </label>
                  </div>
                </div>

                <!-- Botones de acción -->
                <div class="flex space-x-3">
                  <Button
                    @click="generateLoremIpsum"
                    class="flex-1"
                    severity="primary"
                  >
                    <RefreshCw class="w-4 h-4 mr-2" />
                    Regenerar
                  </Button>
                  <Button
                    @click="clearText"
                    class="flex-1"
                    severity="secondary"
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </template>
          </Card>

          <!-- Panel de resultado -->
          <Card>
            <template #title>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <i class="pi pi-file-text mr-2"></i>
                  Texto generado
                </div>
                <Button
                  @click="copyToClipboard"
                  :disabled="!generatedText"
                  size="small"
                  :severity="copied ? 'success' : 'secondary'"
                >
                  <Copy class="w-4 h-4 mr-2" />
                  {{ copied ? "Copiado!" : "Copiar" }}
                </Button>
              </div>
            </template>
            <template #content>
              <div class="space-y-4">
                <div class="flex justify-between text-sm text-surface-600">
                  <span>
                    {{
                      outputMode === "words"
                        ? "Palabras"
                        : outputMode === "characters"
                        ? "Caracteres"
                        : "Párrafos"
                    }}:
                    {{
                      outputMode === "words"
                        ? generatedText.split(" ").length
                        : outputMode === "characters"
                        ? generatedText.length
                        : generatedText.split("\n\n").filter((p) => p.trim())
                            .length
                    }}
                  </span>
                  <span v-if="outputMode === 'characters'">
                    Caracteres: {{ generatedText.length }}
                  </span>
                </div>

                <Textarea
                  v-model="generatedText"
                  :rows="15"
                  class="w-full font-mono text-sm"
                  readonly
                  placeholder="El texto generado aparecerá aquí..."
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
