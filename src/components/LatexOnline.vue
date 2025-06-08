<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";
import { Canvg } from "canvg";

declare global {
  interface Window {
    MathJax: any;
  }
}

const toast = useToast();
const latexInput = ref("");
const output = ref<HTMLDivElement | null>(null);
const currentFontSize = ref(16);
const historial = ref<string[]>([]);
const mathJaxReady = ref(false);

// Configurar MathJax
window.MathJax = {
  loader: { load: ["input/tex", "output/svg"] },
  svg: { fontCache: "none" },
  startup: {
    ready: () => {
      mathJaxReady.value = true;
      window.MathJax.startup.defaultReady();
    },
  },
};

onMounted(() => {
  // Cargar MathJax
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js";
  script.async = true;
  script.id = "MathJax-script";
  document.head.appendChild(script);

  // Cargar historial
  const savedHistorial = localStorage.getItem("latexHistorial");
  if (savedHistorial) {
    historial.value = JSON.parse(savedHistorial);
  }
});

const insertarLatex = (latex: string) => {
  const textarea = document.getElementById("latexInput") as HTMLTextAreaElement;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  textarea.value = text.substring(0, start) + latex + text.substring(end);
  latexInput.value = textarea.value;
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + latex.length;
};

const guardarEnHistorial = (equation: string) => {
  if (!historial.value.includes(equation)) {
    historial.value.unshift(equation);
    if (historial.value.length > 20) historial.value.pop(); // Limitar a 20 entradas
    localStorage.setItem("latexHistorial", JSON.stringify(historial.value));
  }
};

const graficar = () => {
  if (!latexInput.value.trim()) {
    toast.add({
      severity: "warn",
      summary: "Aviso",
      detail: "Ingresa una ecuación LaTeX",
      life: 3000,
    });
    return;
  }

  if (output.value && mathJaxReady.value) {
    output.value.innerHTML = "$$" + latexInput.value + "$$";
    output.value.style.fontSize = currentFontSize.value + "px";
    window.MathJax.typesetPromise([output.value]).then(() => {
      guardarEnHistorial(latexInput.value);
    });
  }
};

const aumentarTamano = () => {
  currentFontSize.value += 2;
  if (output.value && mathJaxReady.value) {
    output.value.style.fontSize = currentFontSize.value + "px";
    window.MathJax.typesetPromise([output.value]);
  }
};

const disminuirTamano = () => {
  if (currentFontSize.value > 10) {
    currentFontSize.value -= 2;
    if (output.value && mathJaxReady.value) {
      output.value.style.fontSize = currentFontSize.value + "px";
      window.MathJax.typesetPromise([output.value]);
    }
  }
};

const borrarHistorial = () => {
  if (confirm("¿Estás seguro de borrar todo el historial?")) {
    historial.value = [];
    localStorage.removeItem("latexHistorial");
  }
};

const eliminarDelHistorial = (index: number) => {
  historial.value.splice(index, 1);
  localStorage.setItem("latexHistorial", JSON.stringify(historial.value));
};

const usarHistorial = (formula: string) => {
  latexInput.value = formula;
  graficar();
};

const copiarPNGAlPortapapeles = async () => {
  const svgElement = output.value?.querySelector("svg");
  if (!svgElement) {
    toast.add({
      severity: "warn",
      summary: "Aviso",
      detail: "Primero debes graficar una ecuación",
      life: 3000,
    });
    return;
  }

  try {
    const clonedSvg = svgElement.cloneNode(true);
    clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const bbox = svgElement.getBBox();
    const width = Math.ceil(bbox.width + 20);
    const height = Math.ceil(bbox.height + 20);
    clonedSvg.setAttribute("width", width.toString());
    clonedSvg.setAttribute("height", height.toString());

    const svgString = new XMLSerializer().serializeToString(clonedSvg);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    const v = await Canvg.from(ctx, svgString);
    await v.render();

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        toast.add({
          severity: "success",
          summary: "Éxito",
          detail: "✅ Imagen PNG copiada al portapapeles",
          life: 3000,
        });
      } catch (err) {
        console.error("Error al copiar:", err);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "❌ No se pudo copiar. ¿Tu navegador lo permite?",
          life: 3000,
        });
      }
    }, "image/png");
  } catch (err) {
    console.error("Error al procesar SVG:", err);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al procesar la imagen",
      life: 3000,
    });
  }
};

const descargarPNG = async () => {
  const svgElement = output.value?.querySelector("svg");
  if (!svgElement) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Primero debes graficar una ecuación.",
      life: 3000,
    });
    return;
  }

  const clonedSvg = svgElement.cloneNode(true);
  clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const bbox = svgElement.getBBox();
  const width = Math.ceil(bbox.width + 20);
  const height = Math.ceil(bbox.height + 20);
  clonedSvg.setAttribute("width", width.toString());
  clonedSvg.setAttribute("height", height.toString());

  const svgString = new XMLSerializer().serializeToString(clonedSvg);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const v = await Canvg.from(ctx, svgString);
  await v.render();

  const pngUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = pngUrl;
  link.download = "ecuacion.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onUnmounted(() => {
  const script = document.getElementById("MathJax-script");
  if (script) {
    script.remove();
  }
});
</script>

<template>
  <div class="min-h-screen bg-surface-ground py-6">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
          Graficador de ecuaciones LaTeX
        </h1>
        <p class="text-xl text-surface-600">
          Genera y exporta ecuaciones matemáticas en formato LaTeX
        </p>
      </header>

      <main class="bg-surface-card p-6 rounded-xl shadow-md">
        <div class="mb-4">
          <label
            for="latexInput"
            class="block text-surface-700 text-sm font-bold mb-2"
          >
            Introduce tu código LaTeX:
          </label>
          <Textarea
            id="latexInput"
            v-model="latexInput"
            rows="3"
            class="w-full font-mono"
            placeholder="Ejemplo: y = x^2"
          />
        </div>

        <div class="mb-4 flex flex-wrap gap-2">
          <Button
            @click="insertarLatex('\\dfrac{a}{b}')"
            severity="secondary"
            label="Fracción"
          />
          <Button
            @click="insertarLatex('\\sqrt{x}')"
            severity="secondary"
            label="Raíz"
          />
          <Button
            @click="insertarLatex('x^{n}')"
            severity="secondary"
            label="Potencia"
          />
          <Button
            @click="insertarLatex('\\int_a^b')"
            severity="secondary"
            label="Integral"
          />
          <Button
            @click="insertarLatex('\\sum_{i=1}^n')"
            severity="secondary"
            label="Sumatoria"
          />
        </div>

        <div class="mb-4 flex flex-wrap gap-2">
          <Button
            @click="graficar"
            severity="primary"
            label="Graficar"
            icon="pi pi-play"
          />
          <Button
            @click="aumentarTamano"
            severity="success"
            icon="pi pi-plus"
          />
          <Button
            @click="disminuirTamano"
            severity="danger"
            icon="pi pi-minus"
          />
          <Button
            @click="copiarPNGAlPortapapeles"
            severity="info"
            label="Copiar PNG"
            icon="pi pi-copy"
          />
          <Button
            severity="warning"
            @click="descargarPNG"
            label="Exportar PNG"
            icon="pi pi-download"
          />
        </div>

        <div ref="output" class="mt-6 text-center"></div>

        <div class="mt-6">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-semibold text-surface-700">Historial</h2>
            <Button
              v-if="historial.length"
              icon="pi pi-trash"
              @click="borrarHistorial"
              severity="danger"
              text
              size="small"
              label="Borrar historial"
            />
          </div>
          <ul v-if="historial.length" class="space-y-1">
            <li
              v-for="(formula, index) in historial"
              :key="index"
              class="flex items-center justify-between bg-white rounded px-3 py-1 shadow-sm hover:bg-gray-50"
            >
              <span
                @click="usarHistorial(formula)"
                class="cursor-pointer hover:underline flex-grow text-primary-600 hover:text-primary-800 text-sm"
              >
                {{ formula }}
              </span>
              <Button
                @click="eliminarDelHistorial(index)"
                icon="pi pi-times"
                text
                severity="danger"
                size="small"
              />
            </li>
          </ul>
          <p v-else class="text-surface-600 text-sm italic">No hay historial</p>
        </div>

        <p class="mt-4 text-surface-500 text-sm">
          Powered by
          <a
            href="https://www.mathjax.org/"
            target="_blank"
            class="text-primary-500 hover:underline"
            >MathJax</a
          >.
        </p>
      </main>
    </div>
  </div>
</template>

<style scoped>
:deep(textarea) {
  font-family: monospace;
}
</style>
