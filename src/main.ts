import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "@/App.vue";
import router from "@/router";
import ToastService from "primevue/toastservice";

// Importar estilos
import "./style.css";

const app = createApp(App);

app.use(createPinia()).use(router).use(ToastService);
app.use(PrimeVue, {
  unstyled: false,
  ripple: true,
  inputStyle: "filled",
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
