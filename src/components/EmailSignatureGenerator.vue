<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Button from "primevue/button";
import BreadcrumbNav from "./BreadcrumbNav.vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import ColorPicker from "primevue/colorpicker";
import Card from "primevue/card";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Slider from "primevue/slider";
import Toast from "primevue/toast";
import {
  User,
  Briefcase,
  Building,
  Mail,
  Phone,
  Smartphone,
  Globe,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Image,
  Layout,
} from "lucide-vue-next";

interface Template {
  label: string;
  value: string;
  preview: string;
}

const templates: Template[] = [
  {
    label: "Clásica",
    value: "classic",
    preview: "Firma clásica con información básica",
  },
  {
    label: "Moderno",
    value: "modern",
    preview: "Diseño moderno con iconos",
  },
  {
    label: "Minimalista",
    value: "minimalist",
    preview: "Diseño limpio y simple",
  },
  {
    label: "Corporativo",
    value: "corporate",
    preview: "Estilo profesional empresarial",
  },
];

const signatureData = ref({
  name: localStorage.getItem("signature-name") || "",
  title: localStorage.getItem("signature-title") || "",
  company: localStorage.getItem("signature-company") || "",
  email: localStorage.getItem("signature-email") || "",
  phone: localStorage.getItem("signature-phone") || "",
  mobile: localStorage.getItem("signature-mobile") || "",
  website: localStorage.getItem("signature-website") || "",
  address: localStorage.getItem("signature-address") || "",
  linkedin: localStorage.getItem("signature-linkedin") || "",
  twitter: localStorage.getItem("signature-twitter") || "",
  github: localStorage.getItem("signature-github") || "",
  logo: localStorage.getItem("signature-logo") || "",
});

const selectedTemplate = ref<Template>(templates[0]);
const primaryColor = ref(
  localStorage.getItem("signature-primary-color") || "#2563eb"
);
const secondaryColor = ref(
  localStorage.getItem("signature-secondary-color") || "#64748b"
);
const fontSize = ref(Number(localStorage.getItem("signature-font-size")) || 14);
const showPreview = ref(true);
const copied = ref(false);

const generatedSignature = computed(() => {
  const data = signatureData.value;

  switch (selectedTemplate.value.value) {
    case "classic":
      return generateClassicSignature(data);
    case "modern":
      return generateModernSignature(data);
    case "minimalist":
      return generateMinimalistSignature(data);
    case "corporate":
      return generateCorporateSignature(data);
    default:
      return generateClassicSignature(data);
  }
});

const generateClassicSignature = (data: any) => {
  return `
<table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: ${
    fontSize.value
  }px; color: ${secondaryColor.value}; max-width: 500px;">
  <tr>
    <td style="padding: 0;">
      <div style="border-left: 4px solid ${
        primaryColor.value
      }; padding-left: 15px;">
        <div style="font-size: ${
          fontSize.value + 4
        }px; font-weight: bold; color: ${
    primaryColor.value
  }; margin-bottom: 5px;">
          ${data.name || "Tu Nombre"}
        </div>
        <div style="margin-bottom: 3px;">
          ${data.title || "Tu Cargo"}
        </div>
        <div style="margin-bottom: 3px;">
          ${data.company || "Tu Empresa"}
        </div>
        <div style="margin-top: 10px;">
          <div style="margin-bottom: 2px;">
            📧 <a href="mailto:${data.email}" style="color: ${
    primaryColor.value
  }; text-decoration: none;">${data.email || "tu@email.com"}</a>
          </div>
          ${
            data.phone
              ? `<div style="margin-bottom: 2px;">📞 ${data.phone}</div>`
              : ""
          }
          ${
            data.mobile
              ? `<div style="margin-bottom: 2px;">📱 ${data.mobile}</div>`
              : ""
          }
          ${
            data.website
              ? `<div style="margin-bottom: 2px;">🌐 <a href="${data.website}" style="color: ${primaryColor.value}; text-decoration: none;">${data.website}</a></div>`
              : ""
          }
        </div>
      </div>
    </td>
  </tr>
</table>`;
};

const generateModernSignature = (data: any) => {
  return `
<table style="border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: ${
    fontSize.value
  }px; color: ${secondaryColor.value}; max-width: 500px;">
  <tr>
    <td style="padding: 0;">
      <div style="background: linear-gradient(135deg, ${
        primaryColor.value
      }20, ${
    secondaryColor.value
  }10); padding: 20px; border-radius: 8px; border-left: 4px solid ${
    primaryColor.value
  };">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          ${
            data.logo
              ? `<img src="${data.logo}" alt="Logo" style="width: 50px; height: 50px; margin-right: 15px; border-radius: 50%;">`
              : ""
          }
          <div>
            <div style="font-size: ${
              fontSize.value + 6
            }px; font-weight: 600; color: ${
    primaryColor.value
  }; margin-bottom: 3px;">
              ${data.name || "Tu Nombre"}
            </div>
            <div style="font-size: ${fontSize.value - 1}px; color: ${
    secondaryColor.value
  };">
              ${data.title || "Tu Cargo"}
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px; font-weight: 500;">
          ${data.company || "Tu Empresa"}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: ${
          fontSize.value - 1
        }px;">
          <div>📧 <a href="mailto:${data.email}" style="color: ${
    primaryColor.value
  }; text-decoration: none;">${data.email || "tu@email.com"}</a></div>
          ${data.phone ? `<div>📞 ${data.phone}</div>` : ""}
          ${data.mobile ? `<div>📱 ${data.mobile}</div>` : ""}
          ${
            data.website
              ? `<div>🌐 <a href="${data.website}" style="color: ${primaryColor.value}; text-decoration: none;">${data.website}</a></div>`
              : ""
          }
        </div>
        ${
          data.linkedin || data.twitter || data.github
            ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid ${
          secondaryColor.value
        }30;">
          <div style="display: flex; gap: 15px;">
            ${
              data.linkedin
                ? `<a href="${data.linkedin}" style="color: ${primaryColor.value}; text-decoration: none;">🔗 LinkedIn</a>`
                : ""
            }
            ${
              data.twitter
                ? `<a href="${data.twitter}" style="color: ${primaryColor.value}; text-decoration: none;">🐦 Twitter</a>`
                : ""
            }
            ${
              data.github
                ? `<a href="${data.github}" style="color: ${primaryColor.value}; text-decoration: none;">💻 GitHub</a>`
                : ""
            }
          </div>
        </div>`
            : ""
        }
      </div>
    </td>
  </tr>
</table>`;
};

const generateMinimalistSignature = (data: any) => {
  return `
<table style="border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${
    fontSize.value
  }px; color: ${secondaryColor.value}; max-width: 400px;">
  <tr>
    <td style="padding: 0;">
      <div style="padding: 15px 0;">
        <div style="font-size: ${
          fontSize.value + 2
        }px; font-weight: 500; color: ${
    primaryColor.value
  }; margin-bottom: 8px;">
          ${data.name || "Tu Nombre"}
        </div>
        <div style="margin-bottom: 5px; font-size: ${fontSize.value - 1}px;">
          ${data.title || "Tu Cargo"}
        </div>
        <div style="margin-bottom: 15px; font-size: ${fontSize.value - 1}px;">
          ${data.company || "Tu Empresa"}
        </div>
        <div style="font-size: ${fontSize.value - 1}px; line-height: 1.6;">
          <div>${data.email || "tu@email.com"}</div>
          ${data.phone ? `<div>${data.phone}</div>` : ""}
          ${data.website ? `<div>${data.website}</div>` : ""}
        </div>
      </div>
    </td>
  </tr>
</table>`;
};

const generateCorporateSignature = (data: any) => {
  return `
<table style="border-collapse: collapse; font-family: 'Times New Roman', serif; font-size: ${
    fontSize.value
  }px; color: ${secondaryColor.value}; max-width: 600px;">
  <tr>
    <td style="padding: 0;">
      <div style="border: 2px solid ${
        primaryColor.value
      }; padding: 20px; background-color: #fafafa;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          ${
            data.logo
              ? `<img src="${data.logo}" alt="Logo" style="width: 60px; height: 60px; margin-right: 20px;">`
              : ""
          }
          <div>
            <div style="font-size: ${
              fontSize.value + 4
            }px; font-weight: bold; color: ${
    primaryColor.value
  }; margin-bottom: 5px;">
              ${data.name || "Tu Nombre"}
            </div>
            <div style="font-size: ${
              fontSize.value
            }px; font-weight: bold; margin-bottom: 3px;">
              ${data.title || "Tu Cargo"}
            </div>
            <div style="font-size: ${fontSize.value}px; color: ${
    primaryColor.value
  };">
              ${data.company || "Tu Empresa"}
            </div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: ${
          fontSize.value - 1
        }px;">
          <div>
            <strong>Email:</strong><br>
            <a href="mailto:${data.email}" style="color: ${
    primaryColor.value
  }; text-decoration: none;">${data.email || "tu@email.com"}</a>
          </div>
          ${
            data.phone
              ? `<div>
            <strong>Teléfono:</strong><br>
            ${data.phone}
          </div>`
              : ""
          }
          ${
            data.mobile
              ? `<div>
            <strong>Móvil:</strong><br>
            ${data.mobile}
          </div>`
              : ""
          }
          ${
            data.website
              ? `<div>
            <strong>Sitio web:</strong><br>
            <a href="${data.website}" style="color: ${primaryColor.value}; text-decoration: none;">${data.website}</a>
          </div>`
              : ""
          }
        </div>
        ${
          data.address
            ? `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid ${secondaryColor.value}30;">
          <strong>Dirección:</strong><br>
          ${data.address}
        </div>`
            : ""
        }
      </div>
    </td>
  </tr>
</table>`;
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedSignature.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Error copying to clipboard:", err);
  }
};

const downloadSignature = () => {
  const blob = new Blob([generatedSignature.value], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "firma-email.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

// Guardar datos en localStorage cuando cambien
const saveToLocalStorage = () => {
  Object.entries(signatureData.value).forEach(([key, value]) => {
    if (value) {
      localStorage.setItem(`signature-${key}`, value);
    } else {
      localStorage.removeItem(`signature-${key}`);
    }
  });

  localStorage.setItem("signature-primary-color", primaryColor.value);
  localStorage.setItem("signature-secondary-color", secondaryColor.value);
  localStorage.setItem("signature-font-size", fontSize.value.toString());
};

onMounted(() => {
  // Configurar watchers para localStorage
  Object.keys(signatureData.value).forEach((key) => {
    const refKey = key as keyof typeof signatureData.value;
    watch(() => signatureData.value[refKey], saveToLocalStorage);
  });

  watch(primaryColor, saveToLocalStorage);
  watch(secondaryColor, saveToLocalStorage);
  watch(fontSize, saveToLocalStorage);
});
</script>

<template>
  <div class="w-full">
    <Toast />
    <BreadcrumbNav />

    <div class="min-h-screen bg-surface-ground py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl font-extrabold text-primary-700 mb-2">
            ✉️ Generador de firmas de email
          </h1>
          <p class="text-xl text-surface-600">
            Crea firmas de correo electrónico profesionales en HTML.
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Panel de configuración -->
          <Card>
            <template #title>
              <div class="flex items-center">
                <i class="pi pi-cog mr-2"></i>
                Configuración
              </div>
            </template>
            <template #content>
              <div class="space-y-6">
                <!-- Plantilla -->
                <div>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Plantilla
                  </label>
                  <InputGroup>
                    <InputGroupAddon>
                      <Layout class="w-4 h-4" />
                    </InputGroupAddon>
                    <Select
                      v-model="selectedTemplate"
                      :options="templates"
                      optionLabel="label"
                      placeholder="Selecciona una plantilla"
                      class="w-full"
                    />
                  </InputGroup>
                  <p class="text-xs text-surface-600 mt-1">
                    {{ selectedTemplate.preview }}
                  </p>
                </div>

                <!-- Información personal -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">
                    Información personal
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Nombre completo
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <User class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.name"
                          class="w-full"
                          placeholder="Juan Pérez"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Cargo
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Briefcase class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.title"
                          class="w-full"
                          placeholder="Desarrollador Senior"
                        />
                      </InputGroup>
                    </div>
                    <div class="md:col-span-2">
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Empresa
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Building class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.company"
                          class="w-full"
                          placeholder="Mi Empresa S.A."
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>

                <!-- Información de contacto -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">
                    Información de contacto
                  </h4>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Email
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Mail class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.email"
                          class="w-full"
                          type="email"
                          placeholder="juan.perez@empresa.com"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Teléfono
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Phone class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.phone"
                          class="w-full"
                          placeholder="+57 1 234 5678"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Móvil
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Smartphone class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.mobile"
                          class="w-full"
                          placeholder="+57 300 123 4567"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Sitio web
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Globe class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.website"
                          class="w-full"
                          placeholder="https://www.misitio.com"
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>

                <!-- Redes sociales -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">Redes sociales</h4>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        LinkedIn
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Linkedin class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.linkedin"
                          class="w-full"
                          placeholder="https://linkedin.com/in/usuario"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Twitter
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Twitter class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.twitter"
                          class="w-full"
                          placeholder="https://twitter.com/usuario"
                        />
                      </InputGroup>
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        GitHub
                      </label>
                      <InputGroup>
                        <InputGroupAddon>
                          <Github class="w-4 h-4" />
                        </InputGroupAddon>
                        <InputText
                          v-model="signatureData.github"
                          class="w-full"
                          placeholder="https://github.com/usuario"
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>

                <!-- Información adicional -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">
                    Información adicional
                  </h4>

                  <div>
                    <label
                      class="block text-sm font-medium text-surface-700 mb-2"
                    >
                      URL del logo
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <Image class="w-4 h-4" />
                      </InputGroupAddon>
                      <InputText
                        v-model="signatureData.logo"
                        class="w-full"
                        placeholder="https://ejemplo.com/logo.png"
                      />
                    </InputGroup>
                  </div>

                  <div>
                    <label
                      class="block text-sm font-medium text-surface-700 mb-2"
                    >
                      Dirección
                    </label>
                    <InputGroup>
                      <InputGroupAddon>
                        <MapPin class="w-4 h-4" />
                      </InputGroupAddon>
                      <Textarea
                        v-model="signatureData.address"
                        class="w-full"
                        :rows="3"
                        placeholder="Calle 123 # 45-67, Bogotá, Colombia"
                      />
                    </InputGroup>
                  </div>
                </div>

                <!-- Personalización -->
                <div class="space-y-4">
                  <h4 class="font-medium text-surface-700">Personalización</h4>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Color primario
                      </label>
                      <ColorPicker v-model="primaryColor" />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Color secundario
                      </label>
                      <ColorPicker v-model="secondaryColor" />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-surface-700 mb-2"
                      >
                        Tamaño de fuente
                      </label>
                      <Slider
                        v-model="fontSize"
                        :min="10"
                        :max="20"
                        class="w-full"
                      />
                      <span class="text-xs text-surface-600"
                        >{{ fontSize }}px</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </Card>

          <!-- Panel de vista previa -->
          <Card>
            <template #title>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <i class="pi pi-eye mr-2"></i>
                  Vista previa
                </div>
                <div class="flex space-x-2">
                  <Button
                    @click="togglePreview"
                    size="small"
                    severity="secondary"
                    :icon="showPreview ? 'pi pi-eye-slash' : 'pi pi-eye'"
                    v-tooltip.top="
                      showPreview ? 'Ocultar HTML' : 'Mostrar HTML'
                    "
                  />
                  <Button
                    @click="copyToClipboard"
                    size="small"
                    :severity="copied ? 'success' : 'secondary'"
                    :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
                    v-tooltip.top="copied ? 'Copiado!' : 'Copiar HTML'"
                  />
                  <Button
                    @click="downloadSignature"
                    size="small"
                    severity="info"
                    icon="pi pi-download"
                    v-tooltip.top="'Descargar HTML'"
                  />
                </div>
              </div>
            </template>
            <template #content>
              <div class="space-y-4">
                <!-- Vista previa HTML -->
                <div v-if="showPreview" class="bg-surface-100 p-4 rounded-lg">
                  <div v-html="generatedSignature"></div>
                </div>

                <!-- Código HTML -->
                <div v-else>
                  <label
                    class="block text-sm font-medium text-surface-700 mb-2"
                  >
                    Código HTML
                  </label>
                  <Textarea
                    :model-value="generatedSignature"
                    class="w-full font-mono text-sm"
                    :rows="20"
                    readonly
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
