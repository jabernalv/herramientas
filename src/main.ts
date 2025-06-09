import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "@/App.vue";
import router from "@/router";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";

// Importar estilos
import "./style.css";

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .use(ToastService)
  .use(PrimeVue, {
    unstyled: false,
    ripple: true,
    inputStyle: "filled",
    theme: {
      preset: Aura,
    },
  })
  .directive("tooltip", Tooltip)
  .mount("#app");
