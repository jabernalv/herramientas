<template>
  <div>
    <BreadcrumbNav />
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="text-center mb-8">
        <h1
          class="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center"
        >
          <Calculator class="mr-3 text-blue-600" />
          Calculadora de IMC
        </h1>
        <p class="text-gray-600">
          Calcula tu Índice de Masa Corporal y obtén información sobre tu salud
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Formulario de entrada -->
        <Card class="w-full">
          <template #title>
            <h2
              class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
            >
              <User class="text-blue-600" />
              Datos Personales
            </h2>
          </template>
          <template #content>
            <form @submit.prevent="calculateBMI" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    class="block mb-2 font-medium text-gray-700 flex items-center"
                  >
                    <Ruler class="w-4 h-4 mr-2" />
                    Altura
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Ruler class="w-4 h-4" />
                    </InputGroupAddon>
                    <InputNumber
                      v-model="height"
                      class="w-full"
                      :minFractionDigits="0"
                      :maxFractionDigits="2"
                      :min="50"
                      :max="300"
                      placeholder="170"
                      required
                    />
                    <InputGroupAddon>cm</InputGroupAddon>
                  </InputGroup>
                </div>

                <div>
                  <label
                    class="block mb-2 font-medium text-gray-700 flex items-center"
                  >
                    <Weight class="w-4 h-4 mr-2" />
                    Peso
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Weight class="w-4 h-4" />
                    </InputGroupAddon>
                    <InputNumber
                      v-model="weight"
                      class="w-full"
                      :minFractionDigits="0"
                      :maxFractionDigits="2"
                      :min="20"
                      :max="500"
                      placeholder="70"
                      required
                    />
                    <InputGroupAddon>kg</InputGroupAddon>
                  </InputGroup>
                </div>
              </div>

              <div>
                <label
                  class="block mb-2 font-medium text-gray-700 flex items-center"
                >
                  <User class="w-4 h-4 mr-2" />
                  Edad
                </label>
                <InputGroup>
                  <InputGroupAddon>
                    <User class="w-4 h-4" />
                  </InputGroupAddon>
                  <InputNumber
                    v-model="age"
                    class="w-full"
                    :minFractionDigits="0"
                    :maxFractionDigits="0"
                    :min="1"
                    :max="120"
                    placeholder="30"
                    required
                  />
                  <InputGroupAddon>años</InputGroupAddon>
                </InputGroup>
              </div>

              <div>
                <label
                  class="block mb-2 font-medium text-gray-700 flex items-center"
                >
                  <Users class="w-4 h-4 mr-2" />
                  Sexo
                </label>
                <div class="flex gap-4">
                  <div class="flex items-center">
                    <RadioButton
                      v-model="gender"
                      value="male"
                      inputId="male"
                      name="gender"
                    />
                    <label for="male" class="ml-2">Masculino</label>
                  </div>
                  <div class="flex items-center">
                    <RadioButton
                      v-model="gender"
                      value="female"
                      inputId="female"
                      name="gender"
                    />
                    <label for="female" class="ml-2">Femenino</label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                label="Calcular IMC"
                class="w-full bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
                :disabled="!height || !weight || !age || !gender"
              >
                <template #icon>
                  <Calculator class="w-4 h-4 mr-2" />
                </template>
              </Button>
            </form>
          </template>
        </Card>

        <!-- Resultados -->
        <Card v-if="bmiResult" class="w-full">
          <template #title>
            <h2
              class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
            >
              <BarChart3 class="text-green-600" />
              Resultados
            </h2>
          </template>
          <template #content>
            <div class="space-y-6">
              <!-- IMC Principal -->
              <div
                class="text-center p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg"
              >
                <div class="text-4xl font-bold text-gray-800 mb-2">
                  {{ bmiResult.bmi.toFixed(1) }}
                </div>
                <div
                  class="text-lg font-semibold mb-2"
                  :class="bmiResult.colorClass"
                >
                  {{ bmiResult.category }}
                </div>
                <div class="text-sm text-gray-600">
                  IMC: {{ bmiResult.bmi.toFixed(1) }} kg/m²
                </div>
              </div>

              <!-- Barra de progreso -->
              <div>
                <label class="block mb-2 font-medium text-gray-700"
                  >Rango de IMC:</label
                >
                <div
                  class="relative h-8 bg-gray-200 rounded-full overflow-hidden"
                >
                  <div
                    class="absolute h-full transition-all duration-500 rounded-full"
                    :class="bmiResult.progressColor"
                    :style="{ width: bmiResult.progressWidth + '%' }"
                  ></div>
                  <div
                    class="absolute inset-0 flex items-center justify-center text-xs font-medium text-white"
                  >
                    {{ bmiResult.bmi.toFixed(1) }}
                  </div>
                </div>
                <div class="flex justify-between text-xs text-gray-600 mt-1">
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>35</span>
                </div>
              </div>

              <!-- Información detallada -->
              <div class="space-y-4">
                <div class="p-4 bg-gray-50 rounded-lg">
                  <h3
                    class="font-semibold text-gray-800 mb-2 flex items-center"
                  >
                    <Info class="w-4 h-4 mr-2" />
                    Interpretación
                  </h3>
                  <p class="text-gray-700">{{ bmiResult.description }}</p>
                </div>

                <div class="p-4 bg-blue-50 rounded-lg">
                  <h3
                    class="font-semibold text-blue-800 mb-2 flex items-center"
                  >
                    <Lightbulb class="w-4 h-4 mr-2" />
                    Recomendaciones
                  </h3>
                  <ul class="text-blue-700 space-y-1">
                    <li
                      v-for="(rec, index) in bmiResult.recommendations"
                      :key="index"
                      class="flex items-start"
                    >
                      <CheckCircle class="w-4 h-4 mr-2 mt-0.5 text-green-600" />
                      {{ rec }}
                    </li>
                  </ul>
                </div>

                <!-- Peso ideal -->
                <div class="p-4 bg-green-50 rounded-lg">
                  <h3
                    class="font-semibold text-green-800 mb-2 flex items-center"
                  >
                    <Target class="w-4 h-4 mr-2" />
                    Peso Ideal
                  </h3>
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span class="text-gray-600">Mínimo:</span>
                      <span class="font-semibold text-green-700 ml-2"
                        >{{ bmiResult.idealWeight.min.toFixed(1) }} kg</span
                      >
                    </div>
                    <div>
                      <span class="text-gray-600">Máximo:</span>
                      <span class="font-semibold text-green-700 ml-2"
                        >{{ bmiResult.idealWeight.max.toFixed(1) }} kg</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Información adicional -->
      <Card class="mt-8">
        <template #title>
          <h2
            class="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2"
          >
            <Info class="text-purple-600" />
            Información sobre el IMC
          </h2>
        </template>
        <template #content>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-semibold text-gray-800 mb-3">¿Qué es el IMC?</h3>
              <p class="text-gray-700 mb-4">
                El Índice de Masa Corporal (IMC) es una medida que relaciona el
                peso con la altura. Se calcula dividiendo el peso en kilogramos
                entre el cuadrado de la altura en metros.
              </p>
              <p class="text-gray-700">
                <strong>Fórmula:</strong> IMC = peso (kg) / altura² (m)
              </p>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800 mb-3">
                Categorías de IMC
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-red-600">Bajo peso:</span>
                  <span>&lt; 18.5</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-green-600">Normal:</span>
                  <span>18.5 - 24.9</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-yellow-600">Sobrepeso:</span>
                  <span>25.0 - 29.9</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-orange-600">Obesidad I:</span>
                  <span>30.0 - 34.9</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-600">Obesidad II:</span>
                  <span>35.0 - 39.9</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-red-800">Obesidad III:</span>
                  <span>&gt; 40.0</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import InputNumber from "primevue/inputnumber";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";
import {
  Ruler,
  Weight,
  User,
  Calculator,
  BarChart3,
  Info,
  Lightbulb,
  CheckCircle,
  Target,
  Users,
} from "lucide-vue-next";

// Estado reactivo
const height = ref<number | null>(null);
const weight = ref<number | null>(null);
const age = ref<number | null>(null);
const gender = ref<string>("");
const bmiResult = ref<any>(null);

// Calcular IMC
const calculateBMI = () => {
  if (!height.value || !weight.value) return;

  const heightInMeters = height.value / 100;
  const bmi = weight.value / (heightInMeters * heightInMeters);

  bmiResult.value = {
    bmi,
    ...getBMICategory(bmi),
    idealWeight: calculateIdealWeight(height.value),
  };
};

// Obtener categoría de IMC
const getBMICategory = (bmi: number) => {
  if (bmi < 18.5) {
    return {
      category: "Bajo peso",
      colorClass: "text-blue-600",
      progressColor: "bg-blue-500",
      progressWidth: Math.min((bmi / 18.5) * 25, 25),
      description:
        "Tu IMC indica que tienes un peso por debajo del rango saludable. Esto puede afectar tu salud y energía.",
      recommendations: [
        "Consulta con un profesional de la salud",
        "Aumenta la ingesta calórica de forma saludable",
        "Incluye proteínas magras en tu dieta",
        "Realiza ejercicios de fuerza para ganar masa muscular",
      ],
    };
  } else if (bmi < 25) {
    return {
      category: "Peso normal",
      colorClass: "text-green-600",
      progressColor: "bg-green-500",
      progressWidth: 25 + ((bmi - 18.5) / (25 - 18.5)) * 25,
      description:
        "¡Excelente! Tu IMC está en el rango saludable. Mantén un estilo de vida activo y una dieta equilibrada.",
      recommendations: [
        "Mantén una dieta equilibrada y variada",
        "Realiza actividad física regular",
        "Duerme 7-9 horas por noche",
        "Mantén un peso estable",
      ],
    };
  } else if (bmi < 30) {
    return {
      category: "Sobrepeso",
      colorClass: "text-yellow-600",
      progressColor: "bg-yellow-500",
      progressWidth: 50 + ((bmi - 25) / (30 - 25)) * 25,
      description:
        "Tu IMC indica sobrepeso. Pequeños cambios en tu estilo de vida pueden mejorar significativamente tu salud.",
      recommendations: [
        "Reduce la ingesta calórica gradualmente",
        "Aumenta la actividad física diaria",
        "Incluye más frutas y verduras en tu dieta",
        "Considera consultar con un nutricionista",
      ],
    };
  } else if (bmi < 35) {
    return {
      category: "Obesidad I",
      colorClass: "text-orange-600",
      progressColor: "bg-orange-500",
      progressWidth: 75 + ((bmi - 30) / (35 - 30)) * 25,
      description:
        "Tu IMC indica obesidad grado I. Es importante tomar medidas para mejorar tu salud y calidad de vida.",
      recommendations: [
        "Consulta con un médico para un plan personalizado",
        "Establece metas realistas de pérdida de peso",
        "Incorpora ejercicio regular de forma gradual",
        "Considera terapia conductual para cambios de hábitos",
      ],
    };
  } else if (bmi < 40) {
    return {
      category: "Obesidad II",
      colorClass: "text-red-600",
      progressColor: "bg-red-500",
      progressWidth: 100,
      description:
        "Tu IMC indica obesidad grado II. Es importante buscar ayuda médica profesional para mejorar tu salud.",
      recommendations: [
        "Consulta urgentemente con un médico",
        "Considera opciones de tratamiento médico",
        "Busca apoyo de profesionales de la salud mental",
        "Establece un plan de tratamiento integral",
      ],
    };
  } else {
    return {
      category: "Obesidad III",
      colorClass: "text-red-800",
      progressColor: "bg-red-800",
      progressWidth: 100,
      description:
        "Tu IMC indica obesidad grado III. Es fundamental buscar atención médica inmediata para tu salud.",
      recommendations: [
        "Busca atención médica inmediata",
        "Considera opciones de tratamiento especializado",
        "Trabaja con un equipo médico multidisciplinario",
        "Prioriza tu salud y bienestar",
      ],
    };
  }
};

// Calcular peso ideal
const calculateIdealWeight = (height: number) => {
  const heightInMeters = height / 100;
  const minBMI = 18.5;
  const maxBMI = 24.9;

  return {
    min: minBMI * (heightInMeters * heightInMeters),
    max: maxBMI * (heightInMeters * heightInMeters),
  };
};
</script>
