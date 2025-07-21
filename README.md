# 🛠️ Herramientas Web

Una colección moderna de herramientas web útiles desarrollada con Vue.js y PrimeVue. Esta aplicación proporciona una suite de utilidades para desarrolladores y usuarios en general, con una interfaz moderna y fácil de usar.

## 🚀 Características

- 💻 Interfaz moderna y responsive
- 🎨 Diseño limpio y profesional con PrimeVue
- 📱 Totalmente adaptable a dispositivos móviles
- ⚡ Procesamiento del lado del cliente
- 🔒 Privacidad garantizada - sin almacenamiento de datos
- 🌐 Disponible en línea: [https://jabernalv.github.io/herramientas/](https://jabernalv.github.io/herramientas/)

## 🔧 Herramientas Disponibles

### 💻 Codificación

- **Base64**: Codifica y decodifica texto y archivos (imágenes) a/desde Base64.
- **Hashes**: Genera hashes MD5, SHA-1 y SHA-256 de manera rápida y sencilla.

### 🔄 Conversión

- **Excel a SQL**: Convierte datos de hojas de cálculo de Excel a consultas SQL de manera eficiente.
- **Excel a MD/HTML**: Convierte tablas de Excel a formato Markdown y HTML de forma rápida y sencilla.
- **XML/JSON**: Decodifica XML o JSON a un formato legible y estructurado.
- **XML/JSON a Excel**: Convierte datos en formato XML o JSON a hojas de cálculo Excel.
- **Unidades**: Convierte entre diferentes unidades de medida: longitud, peso, temperatura, área, volumen y más.
- **Fechas**: Convierte fechas entre diferentes formatos y zonas horarias de todo el mundo.

### 🎨 Colores

- **Paleta de Colores**: Crea y personaliza paletas de colores para tus proyectos de diseño.
- **Gradientes**: Crea gradientes personalizados con múltiples colores y ángulos. Obtén el código CSS en formato HEX y RGB.
- **Colores**: Convierte colores entre diferentes formatos: HEX, RGB, HSL, CMYK, HSV y más.

### 🔑 Generadores

- **UUIDs**: Crea identificadores únicos universales (UUIDs) versión 4 de forma rápida y sencilla.
- **QR**: Crea códigos QR para compartir enlaces, texto, contactos (vCard) y configuraciones WiFi. Incluye opciones de personalización de colores y formas.

### 🛡️ Seguridad

- **Cadenas Seguras**: Genera cadenas de texto seguras y aleatorias para contraseñas, tokens y más.
- **DRM**: Codificador y decodificador de PSSH para Widevine, PlayReady y FairPlay.

### 📝 Texto

- **LaTeX**: Introduce una expresión matemática en LaTeX y obtén una imagen renderizada.
- **Markdown**: Visualiza y edita texto en formato Markdown con vista previa en tiempo real.
- **RegEx**: Prueba y valida expresiones regulares en tiempo real. Resalta coincidencias, muestra grupos de captura y soporta flags comunes.
- **Lorem Ipsum**: Genera texto de relleno en diferentes formatos y estilos para tus proyectos de diseño.
- **Firmas Email**: Crea firmas de correo electrónico profesionales en HTML con múltiples plantillas.
- **Procesador de Texto**: Cuenta caracteres, palabras y líneas automáticamente. Convierte texto entre mayúsculas, minúsculas, camelCase, snake_case y más formatos.

### 🔧 Utilidades

- **Calendario**: Visualiza un calendario completo con los días festivos de Colombia incorporados y la opción de descargar los eventos a un archivo Excel.
- **Calculadora de Días entre Fechas**: Calcula la cantidad de días calendario, días hábiles colombianos y días 360 entre dos fechas. Permite incluir o no el día inicial.
- **Ofuscador/Minificador de Código**: Ofusca JavaScript y minifica CSS automáticamente. Detección de tipo, copiar y descargar.
- **Enlaces de Comunicación**: Genera enlaces rápidos para WhatsApp y Telegram con mensaje personalizado.
- **Calculadora de IMC**: Calcula tu Índice de Masa Corporal y obtén recomendaciones de salud personalizadas.
- **Lista de Compras**: Organiza y marca tus compras fácilmente. Guarda en localStorage.
- **Lista de Pendientes**: Organiza, edita y reordena tus tareas pendientes de forma intuitiva.

### 🌐 Desarrollo

- **API Tester**: Prueba APIs REST con diferentes métodos HTTP, headers y autenticación.

## ✨ Características Destacadas

### Generador de Códigos QR

- **QR General**: Texto, URLs con límite de 2900 caracteres
- **QR vCard**: Contactos completos con 13 campos (nombres, teléfonos, empresa, dirección, email, sitio web)
- **QR WiFi**: Configuraciones de red con soporte para WPA/WPA2/WPA3, WEP y redes abiertas
- **Personalización**: Colores personalizables y múltiples formas de puntos
- **Funcionalidades**: Generar, copiar, descargar y ajustar tamaño

### Herramientas de Conversión Avanzadas

- **Excel a SQL**: Soporte para múltiples tipos de consultas SQL
- **XML/JSON a Excel**: Conversión bidireccional con preservación de estructura
- **Unidades**: Más de 20 categorías de conversión (longitud, peso, temperatura, etc.)

### Utilidades de Productividad

- **Calendario Colombiano**: Días festivos integrados y exportación a Excel
- **Calculadora de Días**: Múltiples métodos de cálculo (calendario, hábiles, 360 días)
- **Listas Inteligentes**: Compras y pendientes con persistencia local

## 🛠️ Tecnologías

- **Frontend**: Vue.js 3 con Composition API
- **UI Framework**: PrimeVue con tema personalizado
- **Styling**: Tailwind CSS
- **Iconos**: Lucide Vue Next
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Gestión de Paquetes**: pnpm

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jabernalv/herramientas.git

# Entrar al directorio
cd herramientas

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Construir para producción
pnpm build
```

## 🚀 Despliegue

El proyecto incluye un script de despliegue automatizado para GitHub Pages:

```bash
# Ejecutar despliegue
./deploy.sh
```

## 📁 Estructura del Proyecto

```
herramientas/
├── src/
│   ├── components/          # Componentes de herramientas
│   ├── utils/              # Utilidades compartidas
│   ├── data/               # Datos de configuración
│   ├── router/             # Configuración de rutas
│   └── types/              # Definiciones TypeScript
├── public/                 # Archivos estáticos
└── deploy.sh              # Script de despliegue
```

## 🔄 Historial de Versiones

- **v1.22.0**: Refactorización completa del generador QR con arquitectura modular
- **v1.21.9**: Corrección del checkbox WiFi en generador QR
- **Versiones anteriores**: Implementación progresiva de todas las herramientas

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, siéntete libre de:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado por [jabernalv](https://github.com/jabernalv)

---

⭐ Si te resulta útil, ¡no olvides darle una estrella al repositorio!
