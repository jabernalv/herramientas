<template>
  <div>
    <BreadcrumbNav />
    <div class="max-w-2xl mx-auto px-4 py-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
          🛒 Lista de compras
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
            <ShoppingCart class="w-5 h-5 text-gray-400" />
          </InputGroupAddon>
          <InputText
            v-model="newItemName"
            @keyup.enter="addItem"
            placeholder="Escribe un nuevo artículo..."
            class="flex-grow p-3 border-none focus:ring-2 focus:ring-blue-500"
          />
          <InputGroupAddon>
            <Button
              @click="addItem"
              :disabled="!newItemName.trim()"
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
                <GripVertical class="w-4 h-4" />
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
              severity="danger"
              class="ml-4"
              text
            >
              <template #icon>
                <Trash2 class="w-4 h-4" />
              </template>
            </Button>
          </li>
        </Draggable>
      </Container>
      <div v-if="shoppingList.length > 0" class="mt-6 text-center">
        <Button @click="clearAllItems" label="Limpiar Lista" severity="danger">
          <template #icon>
            <Trash2 class="w-4 h-4 mr-2" />
          </template>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import BreadcrumbNav from "@/components/BreadcrumbNav.vue";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { Container, Draggable } from "vue3-smooth-dnd";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import {
  ShoppingCart,
  Download,
  Upload,
  Plus,
  GripVertical,
  Trash2,
} from "lucide-vue-next";

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
    acceptLabel: "Sí, eliminar",
    rejectLabel: "Cancelar",
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
    acceptLabel: "Sí, limpiar",
    rejectLabel: "Cancelar",
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

const downloadJson = () => {
  const dataStr = JSON.stringify(shoppingList.value, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "lista-compras.json";
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
            typeof item.name === "string" &&
            typeof item.bought === "boolean"
        )
      ) {
        error.value = "Archivo JSON inválido.";
        return;
      }
      shoppingList.value = json;
      saveList();
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
    ShoppingCart,
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
