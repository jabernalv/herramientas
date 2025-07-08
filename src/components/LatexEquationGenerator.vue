<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useToast } from "primevue/usetoast";
import { Canvg } from "canvg";
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from "primevue/confirmdialog";

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
const confirm = useConfirm();

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

  // Cargar último LaTeX generado
  const lastLatex = localStorage.getItem("latexLastInput");
  if (lastLatex) {
    latexInput.value = lastLatex;
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

  // Guardar el último LaTeX generado
  localStorage.setItem("latexLastInput", latexInput.value);

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
  confirm.require({
    message: "¿Estás seguro de borrar todo el historial?",
    header: "Confirmar limpieza",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      historial.value = [];
      localStorage.removeItem("latexHistorial");
    },
  });
};

const eliminarDelHistorial = (index: number) => {
  historial.value.splice(index, 1);
  localStorage.setItem("latexHistorial", JSON.stringify(historial.value));
};

const copiarAlPortapapeles = async (texto: string) => {
  try {
    await navigator.clipboard.writeText(texto);
    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Código LaTeX copiado al portapapeles",
      life: 2000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar al portapapeles",
      life: 2000,
    });
  }
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
    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
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
    if (!ctx) throw new Error("No se pudo obtener el contexto 2D del canvas.");
    const v = await Canvg.from(ctx, svgString);
    await v.render();

    canvas.toBlob(async (blob) => {
      try {
        if (!blob) throw new Error("No se pudo generar la imagen PNG.");
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

const generateFileName = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}.png`;
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

  const clonedSvg = svgElement.cloneNode(true) as SVGElement;
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
  link.download = generateFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const limpiarLatexInput = () => {
  confirm.require({
    message: "¿Seguro que deseas limpiar el código LaTeX?",
    header: "Confirmar limpieza",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      latexInput.value = "";
    },
  });
};

onUnmounted(() => {
  const script = document.getElementById("MathJax-script");
  if (script) {
    script.remove();
  }
});
</script>

<template>
  <div>
    <ConfirmDialog />
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
          <li class="text-gray-700">Generador de ecuaciones LaTeX</li>
        </ol>
      </nav>
    </div>
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
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <line
                  x1="10"
                  y1="50"
                  x2="90"
                  y2="50"
                  stroke="currentColor"
                  stroke-width="3"
                />
                <text
                  x="50"
                  y="15"
                  font-size="60"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  a
                </text>
                <text
                  x="50"
                  y="85"
                  font-size="60"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  b
                </text>
              </svg>
            </Button>
            <Button @click="insertarLatex('\\sqrt{x}')" severity="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <path
                  d="M5,40 L15,40 L30,85 L70,20 L95,20"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Button @click="insertarLatex('x^{n}')" severity="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <text
                  x="30"
                  y="65"
                  font-size="60"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  x
                </text>
                <text
                  x="65"
                  y="25"
                  font-size="40"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  n
                </text>
              </svg>
            </Button>
            <Button @click="insertarLatex('\\int_a^b')" severity="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <text
                  x="20"
                  y="60"
                  font-size="90"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  ∫
                </text>
                <text
                  x="55"
                  y="30"
                  font-size="30"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  b
                </text>
                <text
                  x="40"
                  y="80"
                  font-size="30"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  a
                </text>
              </svg>
            </Button>
            <Button
              @click="insertarLatex('\\sum_{i=1}^n')"
              severity="secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <text
                  x="50"
                  y="50"
                  font-size="60"
                  fill="currentColor"
                  text-anchor="middle"
                  dominant-baseline="middle"
                >
                  Σ
                </text>
                <text
                  x="50"
                  y="25"
                  font-size="40"
                  fill="currentColor"
                  text-anchor="middle"
                >
                  n
                </text>
                <text
                  x="50"
                  y="90"
                  font-size="22"
                  fill="currentColor"
                  text-anchor="middle"
                >
                  i=1
                </text>
              </svg>
            </Button>
            <Button @click="insertarLatex('a\\approx b')" severity="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                class="w-6 h-6"
              >
                <path
                  d="M20,35 C35,25 45,25 50,35 C55,45 65,45 80,35"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                />
                <path
                  d="M20,65 C35,55 45,55 50,65 C55,75 65,75 80,65"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                />
              </svg>
            </Button>
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
            <Button
              @click="limpiarLatexInput"
              severity="danger"
              icon="pi pi-trash"
              label="Limpiar"
              text
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
                  @click="() => copiarAlPortapapeles(formula)"
                  icon="pi pi-copy"
                  text
                  severity="info"
                  size="small"
                  v-tooltip.top="'Copiar código LaTeX'"
                  class="ml-1"
                />
                <Button
                  @click="eliminarDelHistorial(index)"
                  icon="pi pi-times"
                  text
                  severity="danger"
                  size="small"
                />
              </li>
            </ul>
            <p v-else class="text-surface-600 text-sm italic">
              No hay historial
            </p>
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
  </div>
</template>

<style scoped>
:deep(textarea) {
  font-family: monospace;
}
.CCTextArea:empty:not(:focus):before {
  content: attr(placeholder);
  font-size: 120%;
  color: #888;
  padding: 5px;
  position: absolute;
}
.CCTextArea .underline {
  border-bottom: solid 2px rgba(36, 157, 127, 0.8);
}
.CCTextArea > .CCtext {
  color: #00f;
  font-style: italic;
}
.CCTextArea > .CCmatrix {
  color: #f00;
  font-weight: bold;
}
.CCTextArea > .CCoperator {
  color: #0a0;
  font-weight: bold;
}
.CCTextArea > .CCcommand {
  font-weight: bold;
}
.CCTextArea > .CCword {
  color: #057;
}
.CCTextArea > .CCnumbers {
  color: #060;
  font-weight: bold;
}
.CCTextArea > .CCbrackets {
  color: #6a6;
  font-weight: bold;
}
.CCTextArea > .CCrestricted {
  color: #a00;
  font-weight: bold;
  text-decoration-line: underline;
  text-decoration-style: double;
  text-decoration-color: #a00;
}
.CCTextArea > .CCtemp {
  color: #555;
  background-color: #ddd;
}
.CCToolbar .scrollable {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
.CCToolbar .cc_dropdown {
  display: inline-block;
  vertical-align: top;
  webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: initial;
  margin: 5px 6px;
}
.CCToolbar .cc_dropdown img:hover {
  background-color: #d9d9d9;
}
.CCToolbar .cc_dropdown > span {
  padding: 0 2px;
  display: grid;
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 5px;
  position: relative;
}
.CCToolbar .cc_dropdown > div {
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 5px;
  display: none;
  position: absolute;
  background-color: white;
  padding: 6px 2px;
  box-shadow: 0px 16px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 10;
}
.CCToolbar .cc_dropdown > div.cc_show {
  display: grid;
}
.CCToolbar .cc_dropdown > span:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 7px 7px 0 0;
  border-color: transparent #063a92 transparent transparent;
  right: 0;
  top: 40px;
  position: absolute;
}
.CCToolbar .cc_dropdown:hover > span:after {
  border-color: transparent;
}
.CCToolbar .vertical-line {
  width: 1px;
  background-color: #063a92;
  height: 35px;
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
}
.CCToolbar .toolbar {
  white-space: nowrap;
  padding-bottom: 5px;
}
.CCToolbar .toolbar::-webkit-scrollbar {
  -webkit-appearance: none;
}
.CCToolbar .toolbar::-webkit-scrollbar-thumb {
  background-color: #003794;
  border: 3px solid transparent;
  border-radius: 9px;
  background-clip: content-box;
}
.CCToolbar .toolbar::-webkit-scrollbar-track {
  background-color: rgba(100, 100, 100, 0.1);
  width: 10px;
}
.CCButton {
  border: 1px solid transparent;
  border-radius: 3px;
  padding: 0px 5px;
  width: fit-content;
  margin: auto;
}
.CCImage {
  margin: auto;
}
.CCToolbar .matrixCellSelection {
  column-gap: 5px;
  row-gap: 5px;
  padding: 10px;
}
.CCToolbar .matrixCellSelection div {
  height: 10px;
  width: 100%;
  background-color: #eee;
}
.CCToolbar .matrixCellSelection div.cellon {
  background-color: #063a92;
}
.CCToolbar .cc_manualSelection {
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  column-gap: 5px;
  row-gap: 5px;
  padding: 10px;
  padding-top: 0;
}
.CCToolbar .cc_manualSelection input {
  width: 40px;
  height: 20px;
  font-size: 12px;
}
.CCToolbar .cc_manualSelection label {
  font-size: 12px;
  font-weight: 500;
  text-align: right;
  margin: auto 0;
}
.CCToolbar .cc_manualSelection button {
  width: 100%;
  height: 20px;
  text-align: center;
  font-size: 10px;
  border: none;
  background-color: #063a92;
  color: white;
}
#CC_floatingDiv {
  border: 1px solid #003794;
  overflow-y: scroll;
  max-height: 100px;
  z-index: 5;
  background-color: #fff;
}
#CC_floatingDiv ul {
  list-style-type: none;
  padding: 3px;
  margin: 0px;
  font-size: 80%;
  float: left;
  font-weight: 400;
  color: black;
  line-height: normal;
  font-family: Arial, Helvetica, sans-serif;
}
#CC_floatingDiv li:before {
  content: none;
}
#CC_floatingDiv ul .active,
#CC_floatingDiv ul li:focus {
  background-color: #003794;
  color: white;
}
#CC_floatingDiv ul li:hover {
  background-color: #009437;
  color: white;
}
</style>
