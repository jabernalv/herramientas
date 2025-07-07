import {
  Code,
  Calendar,
  ShieldCheck,
  Table,
  FileEdit,
  Key,
  QrCode,
  Palette,
  Lock,
  Search,
  Shield,
  FileSpreadsheet,
  Paintbrush,
  Ruler,
  Type,
  Clock,
  Mail,
  Droplets,
} from "lucide-vue-next";

export interface ToolMenuItem {
  label: string;
  icon: any;
  iconColor?: string;
  route: string;
  description: string;
  linkText: string;
  linkColor: string;
  category: string;
}

export const toolsMenu: ToolMenuItem[] = [
  {
    label: "Base64",
    icon: Code,
    iconColor: "text-teal-500",
    route: "/base64",
    description:
      "Codifica y decodifica texto y archivos (imágenes) a/desde Base64.",
    linkText: "Ir a la herramienta",
    linkColor: "text-teal-600 hover:text-teal-800",
    category: "Codificación",
  },
  {
    label: "Cadenas Seguras",
    icon: ShieldCheck,
    iconColor: "text-green-500",
    route: "/secure-string-generator",
    description:
      "Genera cadenas de texto seguras y aleatorias para contraseñas, tokens y más.",
    linkText: "Ir al generador",
    linkColor: "text-green-600 hover:text-green-800",
    category: "Seguridad",
  },
  {
    label: "Excel a SQL",
    icon: Table,
    iconColor: "text-purple-500",
    route: "/from-xls-to-sql",
    description:
      "Convierte datos de hojas de cálculo de Excel a consultas SQL de manera eficiente.",
    linkText: "Ir al convertidor",
    linkColor: "text-purple-600 hover:text-purple-800",
    category: "Conversión",
  },
  {
    label: "Calendario",
    icon: Calendar,
    iconColor: "text-yellow-500",
    route: "/calendar",
    description:
      "Visualiza un calendario completo con los días festivos de Colombia incorporados y la opción de descargar los eventos a un archivo Excel.",
    linkText: "Ir al calendario",
    linkColor: "text-yellow-600 hover:text-yellow-800",
    category: "Utilidades",
  },
  {
    label: "LaTeX",
    icon: FileEdit,
    iconColor: "text-orange-500",
    route: "/latex-equation-generator",
    description:
      "Introduce una expresión matemática en LaTeX y obtén una imagen renderizada.",
    linkText: "Ir al generador",
    linkColor: "text-orange-600 hover:text-orange-800",
    category: "Texto",
  },
  {
    label: "UUIDs",
    icon: Key,
    iconColor: "text-blue-500",
    route: "/uuids-generator",
    description:
      "Crea identificadores únicos universales (UUIDs) versión 4 de forma rápida y sencilla.",
    linkText: "Ir al generador",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Generadores",
  },
  {
    label: "QR",
    icon: QrCode,
    iconColor: "text-blue-500",
    route: "/qr-code-generator",
    description:
      "Crea códigos QR para compartir enlaces, texto, contactos, etc.",
    linkText: "Ir al generador",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Generadores",
  },
  {
    label: "Paleta de Colores",
    icon: Palette,
    iconColor: "text-pink-500",
    route: "/color-palette-generator",
    description:
      "Crea y personaliza paletas de colores para tus proyectos de diseño.",
    linkText: "Ir al generador",
    linkColor: "text-pink-600 hover:text-pink-800",
    category: "Colores",
  },
  {
    label: "Hashes",
    icon: Lock,
    iconColor: "text-purple-500",
    route: "/hash-generator",
    description:
      "Genera hashes MD5, SHA-1 y SHA-256 de manera rápida y sencilla.",
    linkText: "Ir al generador",
    linkColor: "text-purple-600 hover:text-purple-800",
    category: "Codificación",
  },
  {
    label: "Markdown",
    icon: FileEdit,
    iconColor: "text-indigo-500",
    route: "/markdown-generator",
    description:
      "Visualiza y edita texto en formato Markdown con vista previa en tiempo real.",
    linkText: "Ir al visor",
    linkColor: "text-indigo-600 hover:text-indigo-800",
    category: "Texto",
  },
  {
    label: "Excel a MD/HTML",
    icon: Table,
    iconColor: "text-emerald-500",
    route: "/xls2md",
    description:
      "Convierte tablas de Excel a formato Markdown y HTML de forma rápida y sencilla.",
    linkText: "Ir al convertidor",
    linkColor: "text-emerald-600 hover:text-emerald-800",
    category: "Conversión",
  },
  {
    label: "RegEx",
    icon: Search,
    iconColor: "text-blue-500",
    route: "/regex-tester",
    description:
      "Prueba y valida expresiones regulares en tiempo real. Resalta coincidencias, muestra grupos de captura y soporta flags comunes.",
    linkText: "Ir a la herramienta",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Texto",
  },
  {
    label: "DRM",
    icon: Shield,
    iconColor: "text-red-500",
    route: "/drm-tools",
    description:
      "Codificador y decodificador de PSSH para Widevine, PlayReady y FairPlay.",
    linkText: "Ir a la herramienta",
    linkColor: "text-red-600 hover:text-red-800",
    category: "Seguridad",
  },
  {
    label: "XML/JSON",
    icon: Code,
    iconColor: "text-teal-500",
    route: "/code-formatter",
    description: "Decodifica XML o JSON a un formato legible y estructurado.",
    linkText: "Ir a la herramienta",
    linkColor: "text-teal-600 hover:text-teal-800",
    category: "Conversión",
  },
  {
    label: "XML/JSON a Excel",
    icon: FileSpreadsheet,
    iconColor: "text-green-500",
    route: "/xml-json-to-excel",
    description:
      "Convierte datos en formato XML o JSON a hojas de cálculo Excel.",
    linkText: "Ir al convertidor",
    linkColor: "text-green-600 hover:text-green-800",
    category: "Conversión",
  },
  {
    label: "Gradientes",
    icon: Paintbrush,
    iconColor: "text-violet-500",
    route: "/gradient-generator",
    description:
      "Crea gradientes personalizados con múltiples colores y ángulos. Obtén el código CSS en formato HEX y RGB.",
    linkText: "Ir al generador",
    linkColor: "text-violet-600 hover:text-violet-800",
    category: "Colores",
  },
  {
    label: "Unidades",
    icon: Ruler,
    iconColor: "text-amber-500",
    route: "/unit-converter",
    description:
      "Convierte entre diferentes unidades de medida: longitud, peso, temperatura, área, volumen y más.",
    linkText: "Ir al conversor",
    linkColor: "text-amber-600 hover:text-amber-800",
    category: "Conversión",
  },
  {
    label: "Lorem Ipsum",
    icon: Type,
    iconColor: "text-indigo-500",
    route: "/lorem-ipsum-generator",
    description:
      "Genera texto de relleno en diferentes formatos y estilos para tus proyectos de diseño.",
    linkText: "Ir al generador",
    linkColor: "text-indigo-600 hover:text-indigo-800",
    category: "Texto",
  },
  {
    label: "Fechas",
    icon: Clock,
    iconColor: "text-blue-500",
    route: "/date-time-converter",
    description:
      "Convierte fechas entre diferentes formatos y zonas horarias de todo el mundo.",
    linkText: "Ir al conversor",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Conversión",
  },
  {
    label: "Firmas Email",
    icon: Mail,
    iconColor: "text-green-500",
    route: "/email-signature-generator",
    description:
      "Crea firmas de correo electrónico profesionales en HTML con múltiples plantillas.",
    linkText: "Ir al generador",
    linkColor: "text-green-600 hover:text-green-800",
    category: "Texto",
  },
  {
    label: "Colores",
    icon: Droplets,
    iconColor: "text-purple-500",
    route: "/color-converter",
    description:
      "Convierte colores entre diferentes formatos: HEX, RGB, HSL, CMYK, HSV y más.",
    linkText: "Ir al conversor",
    linkColor: "text-purple-600 hover:text-purple-800",
    category: "Colores",
  },
  {
    label: "Calculadora de Días entre Fechas",
    icon: Clock,
    iconColor: "text-blue-500",
    route: "/date-diff-calculator",
    description:
      "Calcula la cantidad de días calendario, días hábiles colombianos y días 360 entre dos fechas. Permite incluir o no el día inicial.",
    linkText: "Ir a la calculadora",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Utilidades",
  },
  {
    label: "Ofuscador/Minificador de Código",
    icon: Code,
    iconColor: "text-blue-500",
    route: "/code-obfuscator",
    description:
      "Ofusca JavaScript y minifica CSS automáticamente. Detección de tipo, copiar y descargar.",
    linkText: "Ir a la herramienta",
    linkColor: "text-blue-600 hover:text-blue-800",
    category: "Utilidades",
  },
  {
    label: "Enlaces de Comunicación",
    icon: Mail,
    iconColor: "text-green-500",
    route: "/communication-links",
    description:
      "Genera enlaces rápidos para WhatsApp y Telegram con mensaje personalizado.",
    linkText: "Ir a la herramienta",
    linkColor: "text-green-600 hover:text-green-800",
    category: "Utilidades",
  },
];
