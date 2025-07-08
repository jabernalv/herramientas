<template>
  <div class="container mx-auto p-4 max-w-md">
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
      🛒 Lista de compras 🛒
    </h1>
    <ConfirmDialog />
    <div class="bg-white p-6 rounded-lg shadow-md mb-6">
      <div class="flex items-center">
        <InputText
          v-model="newItemName"
          @keyup.enter="addItem"
          placeholder="Escribe un nuevo artículo..."
          class="flex-grow rounded-l-md p-3 border-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          @click="addItem"
          :disabled="!newItemName.trim()"
          label="Agregar"
          icon="pi pi-plus"
          class="rounded-r-md ml-0"
        />
      </div>
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
    </div>
    <div
      v-if="shoppingList.length === 0"
      class="bg-white p-6 rounded-lg shadow-md text-center text-gray-500"
    >
      <p>¡Tu lista de compras está vacía! Añade algunos artículos.</p>
    </div>
    <Container
      tag="ul"
      class="space-y-3"
      drag-handle-selector=".drag-handle"
      @drop="onDrop"
    >
      <Draggable v-for="item in shoppingList" :key="item.id">
        <li
          class="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
        >
          <div class="flex items-center flex-grow">
            <span
              class="drag-handle cursor-move text-gray-400 hover:text-blue-500 transition mr-2"
              title="Arrastrar para reordenar"
            >
              <i class="pi pi-bars"></i>
            </span>
            <Checkbox
              v-model="item.bought"
              @change="saveList"
              class="mr-3"
              :binary="true"
            />
            <span
              :class="{
                'line-through text-gray-500': item.bought,
                'text-gray-800': !item.bought,
              }"
              class="text-lg flex-grow"
            >
              {{ item.name }}
            </span>
          </div>
          <Button
            @click="removeItem(item.id)"
            icon="pi pi-trash"
            severity="danger"
            class="ml-4"
            text
          />
        </li>
      </Draggable>
    </Container>
    <div v-if="shoppingList.length > 0" class="mt-6 text-center">
      <Button
        @click="clearAllItems"
        label="Limpiar Lista"
        icon="pi pi-trash"
        severity="danger"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Container, Draggable } from "vue3-smooth-dnd";

interface BuyItem {
  id: number;
  name: string;
  bought: boolean;
}

const shoppingList = ref<BuyItem[]>([]);
const newItemName = ref("");
const error = ref("");
const confirm = useConfirm();

onMounted(() => {
  const storedList = localStorage.getItem("shoppingList");
  if (storedList) {
    shoppingList.value = JSON.parse(storedList);
  }
});

const saveList = () => {
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList.value));
};

watch(shoppingList, saveList, { deep: true });

const addItem = () => {
  const name = newItemName.value.trim();
  if (name === "") {
    error.value = "El nombre del artículo no puede estar vacío.";
    return;
  }
  if (
    shoppingList.value.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    )
  ) {
    error.value = "Este artículo ya está en tu lista.";
    return;
  }
  const newItem: BuyItem = {
    id: Date.now(),
    name,
    bought: false,
  };
  shoppingList.value.push(newItem);
  newItemName.value = "";
  error.value = "";
  saveList();
};

const removeItem = (id: number) => {
  confirm.require({
    message: "¿Seguro que deseas eliminar este artículo?",
    header: "Confirmar eliminación",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, eliminar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      shoppingList.value = shoppingList.value.filter((item) => item.id !== id);
      saveList();
    },
  });
};

const clearAllItems = () => {
  confirm.require({
    message: "¿Estás seguro de que quieres limpiar toda la lista?",
    header: "Confirmar limpieza",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
    acceptIcon: "pi pi-trash",
    rejectIcon: "pi pi-times-circle",
    acceptClass: "p-button-danger",
    rejectClass: "p-button-warning",
    accept: () => {
      shoppingList.value = [];
      saveList();
    },
  });
};

function onDrop(dropResult: any) {
  if (
    !dropResult ||
    (dropResult.removedIndex === null && dropResult.addedIndex === null)
  )
    return;
  const arr = [...shoppingList.value];
  const [moved] = arr.splice(dropResult.removedIndex, 1);
  arr.splice(dropResult.addedIndex, 0, moved);
  shoppingList.value = arr;
  saveList();
}
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
