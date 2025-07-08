<template>
  <div class="container mx-auto p-4 max-w-md">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
      📝 Lista de Pendientes
    </h1>
    <ConfirmDialog />
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="flex items-center gap-2">
        <InputText
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Nueva tarea..."
          class="flex-grow rounded-l-md p-3 border-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          @click="addTask"
          :disabled="!newTask.trim()"
          label="Agregar"
          icon="pi pi-plus"
          class="rounded-r-md ml-0"
        />
      </div>
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
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Container, Draggable } from "vue3-smooth-dnd";

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
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
