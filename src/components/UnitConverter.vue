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
          <li class="text-gray-700">Conversor de unidades</li>
        </ol>
      </nav>
    </div>

    <header class="text-center mb-6">
      <h1 class="text-4xl font-bold text-blue-600">
        Conversor de unidades universal
      </h1>
    </header>

    <main class="space-y-4 mx-auto mb-16 w-4/5">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Categoría</label
            >
            <InputGroup>
              <InputGroupAddon>
                <Tags />
              </InputGroupAddon>
              <Select
                v-model="selectedCategory"
                :options="categories"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                @change="onCategoryChange"
              />
            </InputGroup>
          </div>

          <!-- Unidad de origen -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >De</label
            >
            <InputGroup>
              <InputGroupAddon>
                <Calculator />
              </InputGroupAddon>
              <Select
                v-model="fromUnit"
                :options="currentUnits"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                @change="convert"
              />
            </InputGroup>
          </div>

          <!-- Unidad de destino -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >A</label
            >
            <InputGroup>
              <InputGroupAddon>
                <Target />
              </InputGroupAddon>
              <Select
                v-model="toUnit"
                :options="currentUnits"
                optionLabel="label"
                optionValue="value"
                class="w-full"
                @change="convert"
              />
            </InputGroup>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Valor de entrada -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Valor</label
            >
            <InputGroup>
              <InputGroupAddon>
                <Hash />
              </InputGroupAddon>
              <InputNumber
                v-model="inputValue"
                class="w-full"
                :minFractionDigits="0"
                :maxFractionDigits="6"
                @input="convert"
              />
            </InputGroup>
          </div>

          <!-- Resultado -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Resultado</label
            >
            <InputGroup>
              <InputGroupAddon>
                <ArrowRight />
              </InputGroupAddon>
              <InputText
                :value="result"
                readonly
                class="w-full font-mono text-lg"
              />
            </InputGroup>
          </div>
        </div>

        <!-- Botón de intercambiar -->
        <div class="mt-6 text-center">
          <Button
            @click="swapUnits"
            severity="secondary"
            text
            class="flex items-center gap-2"
          >
            <ArrowLeftRight class="w-4 h-4" />
            Intercambiar unidades
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Toast from "primevue/toast";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  Tags,
  ArrowRight,
  Calculator,
  Target,
  Hash,
  ArrowLeftRight,
} from "lucide-vue-next";

// Categorías de conversión
const categories = [
  { label: "Longitud", value: "length" },
  { label: "Peso/Masa", value: "weight" },
  { label: "Volumen", value: "volume" },
  { label: "Temperatura", value: "temperature" },
  { label: "Área", value: "area" },
  { label: "Velocidad", value: "speed" },
  { label: "Tiempo", value: "time" },
  { label: "Energía", value: "energy" },
];

// Unidades por categoría
const units = {
  length: [
    { label: "Metros (m)", value: "m" },
    { label: "Kilómetros (km)", value: "km" },
    { label: "Centímetros (cm)", value: "cm" },
    { label: "Milímetros (mm)", value: "mm" },
    { label: "Pies (ft)", value: "ft" },
    { label: "Pulgadas (in)", value: "in" },
    { label: "Yardas (yd)", value: "yd" },
    { label: "Millas (mi)", value: "mi" },
  ],
  weight: [
    { label: "Kilogramos (kg)", value: "kg" },
    { label: "Gramos (g)", value: "g" },
    { label: "Miligramos (mg)", value: "mg" },
    { label: "Libras (lb)", value: "lb" },
    { label: "Onzas (oz)", value: "oz" },
    { label: "Toneladas (t)", value: "t" },
  ],
  volume: [
    { label: "Litros (L)", value: "L" },
    { label: "Mililitros (mL)", value: "mL" },
    { label: "Metros cúbicos (m³)", value: "m3" },
    { label: "Galones (gal)", value: "gal" },
    { label: "Pintas (pt)", value: "pt" },
    { label: "Onzas fluidas (fl oz)", value: "fl_oz" },
  ],
  temperature: [
    { label: "Celsius (°C)", value: "C" },
    { label: "Fahrenheit (°F)", value: "F" },
    { label: "Kelvin (K)", value: "K" },
  ],
  area: [
    { label: "Metros cuadrados (m²)", value: "m2" },
    { label: "Kilómetros cuadrados (km²)", value: "km2" },
    { label: "Centímetros cuadrados (cm²)", value: "cm2" },
    { label: "Pies cuadrados (ft²)", value: "ft2" },
    { label: "Pulgadas cuadradas (in²)", value: "in2" },
    { label: "Acres (ac)", value: "ac" },
    { label: "Hectáreas (ha)", value: "ha" },
  ],
  speed: [
    { label: "Metros por segundo (m/s)", value: "mps" },
    { label: "Kilómetros por hora (km/h)", value: "kmh" },
    { label: "Millas por hora (mph)", value: "mph" },
    { label: "Nudos (kn)", value: "kn" },
    { label: "Pies por segundo (ft/s)", value: "fps" },
  ],
  time: [
    { label: "Segundos (s)", value: "s" },
    { label: "Minutos (min)", value: "min" },
    { label: "Horas (h)", value: "h" },
    { label: "Días (d)", value: "d" },
    { label: "Semanas (wk)", value: "wk" },
    { label: "Meses (mo)", value: "mo" },
    { label: "Años (yr)", value: "yr" },
  ],
  energy: [
    { label: "Julios (J)", value: "J" },
    { label: "Kilojulios (kJ)", value: "kJ" },
    { label: "Calorías (cal)", value: "cal" },
    { label: "Kilocalorías (kcal)", value: "kcal" },
    { label: "Vatios-hora (Wh)", value: "Wh" },
    { label: "Kilovatios-hora (kWh)", value: "kWh" },
  ],
};

// Estado reactivo
const selectedCategory = ref(
  localStorage.getItem("unit-converter-category") || "length"
);
const fromUnit = ref(localStorage.getItem("unit-converter-from-unit") || "m");
const toUnit = ref(localStorage.getItem("unit-converter-to-unit") || "ft");
const inputValue = ref(
  Number(localStorage.getItem("unit-converter-input-value")) || 1
);
const result = ref("");

// Unidades actuales basadas en la categoría seleccionada
const currentUnits = computed(() => {
  return units[selectedCategory.value as keyof typeof units] || [];
});

// Factores de conversión (simplificados)
const conversionFactors = {
  length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144,
    mi: 1609.344,
  },
  weight: {
    kg: 1,
    g: 0.001,
    mg: 0.000001,
    lb: 0.453592,
    oz: 0.0283495,
    t: 1000,
  },
  volume: {
    L: 1,
    mL: 0.001,
    m3: 1000,
    gal: 3.78541,
    pt: 0.473176,
    fl_oz: 0.0295735,
  },
  temperature: {
    C: "C",
    F: "F",
    K: "K", // Temperatura requiere conversión especial
  },
  area: {
    m2: 1,
    km2: 1000000,
    cm2: 0.0001,
    ft2: 0.092903,
    in2: 0.00064516,
    ac: 4046.86,
    ha: 10000,
  },
  speed: {
    mps: 1,
    kmh: 0.277778,
    mph: 0.44704,
    kn: 0.514444,
    fps: 0.3048,
  },
  time: {
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    wk: 604800,
    mo: 2592000,
    yr: 31536000,
  },
  energy: {
    J: 1,
    kJ: 1000,
    cal: 4.184,
    kcal: 4184,
    Wh: 3600,
    kWh: 3600000,
  },
};

// Función de conversión
const convert = () => {
  if (!inputValue.value || !fromUnit.value || !toUnit.value) {
    result.value = "";
    return;
  }

  const category = selectedCategory.value as keyof typeof conversionFactors;
  const factors = conversionFactors[category];

  if (category === "temperature") {
    // Conversión especial para temperatura
    const celsius = convertToCelsius(inputValue.value, fromUnit.value);
    const converted = convertFromCelsius(celsius, toUnit.value);
    result.value = converted.toFixed(4);
  } else {
    // Conversión estándar para otras unidades
    const fromFactor = factors[fromUnit.value as keyof typeof factors];
    const toFactor = factors[toUnit.value as keyof typeof factors];

    if (fromFactor && toFactor) {
      const baseValue = inputValue.value * fromFactor;
      const convertedValue = baseValue / toFactor;
      result.value = convertedValue.toFixed(6);
    }
  }
};

// Conversión de temperatura a Celsius
const convertToCelsius = (value: number, unit: string): number => {
  switch (unit) {
    case "C":
      return value;
    case "F":
      return ((value - 32) * 5) / 9;
    case "K":
      return value - 273.15;
    default:
      return value;
  }
};

// Conversión de Celsius a otra unidad
const convertFromCelsius = (celsius: number, unit: string): number => {
  switch (unit) {
    case "C":
      return celsius;
    case "F":
      return (celsius * 9) / 5 + 32;
    case "K":
      return celsius + 273.15;
    default:
      return celsius;
  }
};

// Cambiar categoría
const onCategoryChange = () => {
  const categoryUnits = currentUnits.value;
  if (categoryUnits.length > 0) {
    fromUnit.value = categoryUnits[0].value;
    toUnit.value = categoryUnits[1]?.value || categoryUnits[0].value;
    convert();
  }
};

// Intercambiar unidades
const swapUnits = () => {
  const temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;
  convert();
};

// Guardar en localStorage cuando cambien los valores
watch(selectedCategory, (newCategory) => {
  localStorage.setItem("unit-converter-category", newCategory);
});

watch(fromUnit, (newFromUnit) => {
  localStorage.setItem("unit-converter-from-unit", newFromUnit);
});

watch(toUnit, (newToUnit) => {
  localStorage.setItem("unit-converter-to-unit", newToUnit);
});

watch(inputValue, (newInputValue) => {
  localStorage.setItem("unit-converter-input-value", newInputValue.toString());
});

// Convertir cuando cambien los valores
watch([inputValue, fromUnit, toUnit], convert);

// Convertir al montar el componente
convert();
</script>

<style scoped>
:deep(.p-select) {
  width: 100%;
}

:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber input) {
  text-align: right;
}

:deep(.p-inputtext) {
  width: 100%;
}

:deep(.p-inputtext[readonly]) {
  text-align: right;
}

:deep(.p-inputgroup) {
  width: 100%;
}

:deep(.p-inputgroup-addon) {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #6c757d;
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
}

:deep(.p-inputgroup-addon svg) {
  width: 1rem;
  height: 1rem;
}
</style>
