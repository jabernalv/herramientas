import QRCodeStyling from "qr-code-styling";

// Constantes comunes
export const MIN_SIZE = 200;
export const MAX_SIZE = 1000;
export const DEFAULT_SIZE = 300;
export const DEFAULT_QR_COLOR = "#0288d1";
export const DEFAULT_BG_COLOR = "#f8fafc";
export const DEFAULT_DOT_SHAPE = "dots";
export const MAX_TEXT_LENGTH = 2900;

// Opciones de formas para los puntos
export const DOT_SHAPES = [
  { label: "Círculos", value: "dots" },
  { label: "Redondeado", value: "rounded" },
  { label: "Clásico", value: "classy" },
  { label: "Clásico redondeado", value: "classy-rounded" },
  { label: "Cuadrado", value: "square" },
  { label: "Extra redondeado", value: "extra-rounded" },
];

// Función para validar colores hexadecimales
export const validateHexColor = (color: string): boolean => {
  const hexRegex = /^#?[0-9A-Fa-f]{6}$/;
  return hexRegex.test(color);
};

// Función para manejar input de colores hex
export const handleHexInput = (
  value: string | undefined,
  type: "qr" | "bg",
  qrColorRef: any,
  bgColorRef: any,
  toast: any
) => {
  if (!value) return;

  let hexValue = value.startsWith("#") ? value : `#${value}`;
  if (!validateHexColor(hexValue)) {
    toast.add({
      severity: "error",
      summary: "Formato inválido",
      detail:
        "El color debe ser un valor hexadecimal de 6 caracteres (ej: #FF0000)",
      life: 3000,
    });
    return;
  }

  if (type === "qr") {
    qrColorRef.value = hexValue;
  } else {
    bgColorRef.value = hexValue;
  }
};

// Función para crear un código QR
export const createQRCode = (
  data: string,
  size: number,
  qrColor: string,
  bgColor: string,
  dotShape: string
): any => {
  return new QRCodeStyling({
    width: size,
    height: size,
    data: data,
    dotsOptions: {
      color: qrColor,
      type: dotShape as any,
    },
    backgroundOptions: {
      color: bgColor,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 0,
    },
  });
};

// Función para copiar QR al portapapeles
export const copyQRToClipboard = async (
  container: HTMLElement | null,
  toast: any
) => {
  if (!container) return;

  try {
    const canvas = container.querySelector("canvas");
    if (!canvas) return;

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), "image/png");
    });

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);

    toast.add({
      severity: "success",
      summary: "Copiado",
      detail: "Código QR copiado al portapapeles",
      life: 3000,
    });
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No se pudo copiar el código QR",
      life: 3000,
    });
  }
};

// Función para descargar QR
export const downloadQR = (qrCode: any, fileName: string = "qr") => {
  if (qrCode) {
    qrCode.download({ name: fileName, extension: "png" });
  }
};

// Función para resetear colores a valores por defecto
export const resetColors = (
  qrColorRef: any,
  bgColorRef: any,
  storagePrefix: string,
  toast: any
) => {
  qrColorRef.value = DEFAULT_QR_COLOR;
  bgColorRef.value = DEFAULT_BG_COLOR;
  localStorage.setItem(`${storagePrefix}-qr-color`, DEFAULT_QR_COLOR);
  localStorage.setItem(`${storagePrefix}-bg-color`, DEFAULT_BG_COLOR);

  toast.add({
    severity: "success",
    summary: "Colores restaurados",
    detail: "Se han restaurado los colores por defecto del código QR",
    life: 3000,
  });
};

// Función para manejar cambios de tamaño
export const adjustSize = (
  currentSize: number,
  increment: number,
  min: number = MIN_SIZE,
  max: number = MAX_SIZE
): number => {
  return Math.max(min, Math.min(max, currentSize + increment));
};

// Función para escapar caracteres especiales en WiFi
export const escapeWifi = (str: string): string => {
  return String(str)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/:/g, "\\:");
};

// Función para generar string de vCard
export const generateVCardString = (vCardData: any): string => {
  const vCard = [];
  vCard.push("BEGIN:VCARD");
  vCard.push("VERSION:3.0");

  // Nombre completo
  if (vCardData.firstName || vCardData.lastName) {
    const fullName = `${vCardData.firstName} ${vCardData.lastName}`.trim();
    vCard.push(`FN:${fullName}`);
    vCard.push(`N:${vCardData.lastName || ""};${vCardData.firstName || ""};;;`);
  }

  // Teléfonos
  if (vCardData.cellPhone) {
    vCard.push(`TEL;TYPE=CELL:${vCardData.cellPhone}`);
  }
  if (vCardData.workPhone) {
    vCard.push(`TEL;TYPE=WORK:${vCardData.workPhone}`);
  }

  // Correo electrónico
  if (vCardData.email) {
    vCard.push(`EMAIL:${vCardData.email}`);
  }

  // Organización
  if (vCardData.company) {
    vCard.push(`ORG:${vCardData.company}`);
  }
  if (vCardData.title) {
    vCard.push(`TITLE:${vCardData.title}`);
  }

  // Dirección
  if (
    vCardData.address ||
    vCardData.city ||
    vCardData.state ||
    vCardData.zip ||
    vCardData.country
  ) {
    const addressParts = [
      vCardData.address || "",
      vCardData.city || "",
      vCardData.state || "",
      vCardData.zip || "",
      vCardData.country || "",
    ];
    const address = addressParts.join(";");
    vCard.push(`ADR;TYPE=WORK:;;${address}`);
  }

  // Sitio web
  if (vCardData.website) {
    vCard.push(`URL:${vCardData.website}`);
  }

  vCard.push("END:VCARD");
  return vCard.join("\r\n");
};

// Función para generar string de WiFi
export const generateWifiString = (wifiData: any): string => {
  const ssid = escapeWifi(wifiData.ssid);
  const password = escapeWifi(wifiData.password);
  const type = wifiData.encryption || "WPA";

  let wifi = `WIFI:T:${type};S:${ssid};`;
  if (type !== "nopass" && password) {
    wifi += `P:${password};`;
  }
  if (wifiData.hidden) {
    wifi += "H:true;";
  }
  wifi += ";";
  return wifi;
};
