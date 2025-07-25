<template>
  <div>
    <BreadcrumbNav />
    <div class="max-w-2xl mx-auto px-4 py-4">
      <div
        class="text-center mb-8 flex flex-row items-center gap-2 justify-center"
      >
        <IconTodoList class="w-10 h-10 text-blue-600 mb-2" />
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
          Lista de pendientes
        </h1>
      </div>
      <div class="flex flex-wrap gap-2 justify-end mb-6">
        <Button
          @click="downloadJson"
          label="Descargar JSON"
          outlined
          size="small"
        >
          <template #icon>
            <Download class="w-4 h-4 mr-2" />
          </template>
        </Button>
        <label class="inline-flex items-center cursor-pointer">
          <Button label="Cargar JSON" outlined size="small" class="mr-2">
            <template #icon>
              <Upload class="w-4 h-4 mr-2" />
            </template>
          </Button>
          <input
            type="file"
            accept="application/json"
            @change="uploadJson"
            class="hidden"
          />
        </label>
      </div>
      <ConfirmDialog />
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <InputGroup>
          <InputGroupAddon>
            <ListTodo class="w-5 h-5 text-gray-400" />
          </InputGroupAddon>
          <InputText
            v-model="newTask"
            @keyup.enter="addTask"
            placeholder="Nueva tarea..."
            class="flex-grow p-3 border-none focus:ring-2 focus:ring-blue-500"
          />
          <InputGroupAddon>
            <Button
              @click="addTask"
              :disabled="!newTask.trim()"
              class="rounded-md ml-0"
            >
              <template #icon>
                <Plus class="w-4 h-4" />
              </template>
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>
      <div
        v-if="tasks.length === 0"
        class="bg-white p-6 rounded-lg shadow-md text-center text-gray-500"
      >
        <p>¡No tienes tareas pendientes! 🎉</p>
      </div>
      <Container
        tag="ul"
        class="space-y-3"
        drag-handle-selector=".drag-handle"
        @drop="onDrop"
      >
        <Draggable v-for="(task, index) in tasks" :key="task.id">
          <li
            class="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between group"
          >
            <div class="flex items-center flex-grow gap-2">
              <span
                class="drag-handle cursor-move text-gray-400 hover:text-blue-500 transition"
                title="Arrastrar para reordenar"
              >
                <GripVertical class="w-4 h-4" />
              </span>
              <Checkbox
                v-model="task.done"
                @change="saveTasks"
                :binary="true"
                class="mr-2"
              />
              <span
                v-if="!task.editing"
                :class="{
                  'line-through text-gray-500': task.done,
                  'text-gray-800': !task.done,
                }"
                class="text-lg flex-grow cursor-pointer"
                @dblclick="editTask(index)"
                :title="'Doble clic para editar'"
              >
                {{ task.text }}
              </span>
              <InputText
                v-else
                v-model="task.text"
                @keyup.enter="finishEditTask(index)"
                @blur="finishEditTask(index)"
                class="flex-grow"
                autofocus
              />
            </div>
            <div class="flex gap-1">
              <Button
                v-if="!task.editing"
                @click="editTask(index)"
                text
                class="text-blue-500"
                title="Editar"
              >
                <template #icon>
                  <Edit class="w-4 h-4" />
                </template>
              </Button>
              <Button
                v-if="task.editing"
                @click="finishEditTask(index)"
                text
                class="text-green-600"
                title="Guardar"
              >
                <template #icon>
                  <Check class="w-4 h-4" />
                </template>
              </Button>
              <Button
                @click="removeTask(index)"
                text
                severity="danger"
                title="Eliminar"
              >
                <template #icon>
                  <Trash2 class="w-4 h-4" />
                </template>
              </Button>
            </div>
          </li>
        </Draggable>
      </Container>
      <div v-if="tasks.length > 0" class="mt-6 text-center">
        <Button @click="clearAllTasks" label="Limpiar Todo" severity="danger">
          <template #icon>
            <Trash2 class="w-4 h-4 mr-2" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import InputText from "primevue/inputtext";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Container, Draggable } from "vue3-smooth-dnd";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  ListTodo,
  Download,
  Upload,
  Plus,
  GripVertical,
  Edit,
  Check,
  Trash2,
} from "lucide-vue-next";
import IconTodoList from "@/components/icons/IconTodoList.vue";

interface Task {
  id: number;
  text: string;
  done: boolean;
  editing?: boolean;
}

const tasks = ref<Task[]>([]);
const newTask = ref("");
const error = ref("");
const confirm = useConfirm();

onMounted(() => {
  const stored = localStorage.getItem("todoList");
  if (stored) tasks.value = JSON.parse(stored);
});

const saveTasks = () => {
  localStorage.setItem("todoList", JSON.stringify(tasks.value));
};

watch(tasks, saveTasks, { deep: true });

const addTask = () => {
  const text = newTask.value.trim();
  if (!text) {
    error.value = "La tarea no puede estar vacía.";
    return;
  }
  if (tasks.value.some((t) => t.text.toLowerCase() === text.toLowerCase())) {
    error.value = "Esta tarea ya existe.";
    return;
  }
  tasks.value.unshift({ id: Date.now(), text, done: false });
  newTask.value = "";
  error.value = "";
  saveTasks();
};

const editTask = (index: number) => {
  tasks.value[index].editing = true;
  nextTick(() => {
    // autofocus handled by InputText
  });
};

const finishEditTask = (index: number) => {
  const task = tasks.value[index];
  if (!task.text.trim()) {
    error.value = "La tarea no puede estar vacía.";
    return;
  }
  // Evitar duplicados al editar
  if (
    tasks.value.some(
      (t, i) => i !== index && t.text.toLowerCase() === task.text.toLowerCase()
    )
  ) {
    error.value = "Esta tarea ya existe.";
    return;
  }
  task.text = task.text.trim();
  task.editing = false;
  error.value = "";
  saveTasks();
};

const removeTask = (index: number) => {
  confirm.require({
    message: "¿Seguro que deseas eliminar esta tarea?",
    header: "Confirmar eliminación",
    acceptLabel: "Sí, eliminar",
    rejectLabel: "Cancelar",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      tasks.value.splice(index, 1);
      saveTasks();
    },
  });
};

const clearAllTasks = () => {
  confirm.require({
    message: "¿Estás seguro de que quieres limpiar todas las tareas?",
    header: "Confirmar limpieza",
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      tasks.value = [];
      saveTasks();
    },
  });
};

function onDrop(dropResult: any) {
  if (
    !dropResult ||
    (dropResult.removedIndex === null && dropResult.addedIndex === null)
  )
    return;
  const arr = [...tasks.value];
  const [moved] = arr.splice(dropResult.removedIndex, 1);
  arr.splice(dropResult.addedIndex, 0, moved);
  tasks.value = arr;
  saveTasks();
}

const downloadJson = () => {
  const dataStr = JSON.stringify(tasks.value, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lista-pendientes.json";
  a.click();
  URL.revokeObjectURL(url);
};

const uploadJson = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target?.result as string);
      if (
        !Array.isArray(json) ||
        !json.every(
          (item) =>
            typeof item.id === "number" &&
            typeof item.text === "string" &&
            typeof item.done === "boolean"
        )
      ) {
        error.value = "Archivo JSON inválido.";
        return;
      }
      tasks.value = json;
      saveTasks();
      error.value = "";
    } catch {
      error.value = "No se pudo leer el archivo JSON.";
    }
  };
  reader.readAsText(file);
};
</script>

<script lang="ts">
export default {
  components: {
    ListTodo,
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
