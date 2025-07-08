<template>
  <div>
    <div class="bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6">
      <nav class="text-sm" aria-label="Miga de pan">
        <ol class="list-none p-0 inline-flex space-x-2">
          <li class="flex items-center">
            <router-link to="/" class="text-blue-500 hover:text-blue-700">
              <i class="pi pi-home mr-1"></i>
              Herramientas
            </router-link>
          </li>
          <li>
            <i class="pi pi-chevron-right text-gray-400"></i>
          </li>
          <li class="text-gray-700">Lista de pendientes</li>
        </ol>
      </nav>
    </div>
    <div class="max-w-2xl mx-auto px-4 py-4">
      <div
        class="text-center mb-8 flex flex-row items-center gap-2 justify-center"
      >
        <IconTodoList class="w-10 h-10 text-blue-600 mb-2" />
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
          Lista de Pendientes
        </h1>
      </div>
      <div class="flex flex-wrap gap-2 justify-end mb-6">
        <Button
          @click="downloadJson"
          icon="pi pi-download"
          label="Descargar JSON"
          outlined
          size="small"
        />
        <label class="inline-flex items-center cursor-pointer">
          <Button
            icon="pi pi-upload"
            label="Cargar JSON"
            outlined
            size="small"
            class="mr-2"
          />
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
              icon="pi pi-plus"
              class="rounded-md ml-0"
            />
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
                <i class="pi pi-bars"></i>
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
                icon="pi pi-pencil"
                text
                class="text-blue-500"
                title="Editar"
              />
              <Button
                v-if="task.editing"
                @click="finishEditTask(index)"
                icon="pi pi-check"
                text
                class="text-green-600"
                title="Guardar"
              />
              <Button
                @click="removeTask(index)"
                icon="pi pi-trash"
                text
                severity="danger"
                title="Eliminar"
              />
            </div>
          </li>
        </Draggable>
      </Container>
      <div v-if="tasks.length > 0" class="mt-6 text-center">
        <Button
          @click="clearAllTasks"
          label="Limpiar Todo"
          icon="pi pi-trash"
          severity="danger"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Container, Draggable } from "vue3-smooth-dnd";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import { ListTodo } from "lucide-vue-next";
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
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, eliminar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
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
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
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
