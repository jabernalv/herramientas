import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "./App.vue";
import router from "./router";

// Importar estilos
import "./style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  unstyled: false,
  ripple: true,
  inputStyle: "filled",
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
