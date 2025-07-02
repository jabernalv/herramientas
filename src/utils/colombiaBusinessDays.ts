// Utilidades para días hábiles y festivos en Colombia

export function getFestivosColombia(year: number) {
  function formatDate(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function siguienteLunes(date: Date) {
    const day = date.getDay();
    const diff = day === 1 ? 0 : (8 - day) % 7;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  }

  function domingoPascua(year: number) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const n = h + l - 7 * m + 114;
    const mes = Math.floor(n / 31) - 1;
    const dia = (n % 31) + 1;
    return new Date(year, mes, dia);
  }

  const pascua = domingoPascua(year);
  const festivos = [];

  [
    ["Año Nuevo", new Date(year, 0, 1)],
    ["Día del Trabajo", new Date(year, 4, 1)],
    ["Independencia de Colombia", new Date(year, 6, 20)],
    ["Batalla de Boyacá", new Date(year, 7, 7)],
    ["Inmaculada Concepción", new Date(year, 11, 8)],
    ["Navidad", new Date(year, 11, 25)],
  ].forEach(([label, date]) => {
    festivos.push({ label, date: formatDate(date as Date) });
  });

  [
    ["Epifanía", new Date(year, 0, 6)],
    ["San José", new Date(year, 2, 19)],
    ["San Pedro y San Pablo", new Date(year, 5, 29)],
    ["Asunción de la Virgen", new Date(year, 7, 15)],
    ["Día de la Raza", new Date(year, 9, 12)],
    ["Todos los Santos", new Date(year, 10, 1)],
    ["Independencia de Cartagena", new Date(year, 10, 11)],
  ].forEach(([label, baseDate]) => {
    festivos.push({
      label,
      date: formatDate(siguienteLunes(baseDate as Date)),
    });
  });

  festivos.push({
    label: "Jueves Santo",
    date: formatDate(new Date(pascua.getTime() - 3 * 86400000)),
  });
  festivos.push({
    label: "Viernes Santo",
    date: formatDate(new Date(pascua.getTime() - 2 * 86400000)),
  });
  festivos.push({
    label: "Ascensión del Señor",
    date: formatDate(
      siguienteLunes(new Date(pascua.getTime() + 43 * 86400000))
    ),
  });
  festivos.push({
    label: "Corpus Christi",
    date: formatDate(
      siguienteLunes(new Date(pascua.getTime() + 64 * 86400000))
    ),
  });
  festivos.push({
    label: "Sagrado Corazón",
    date: formatDate(
      siguienteLunes(new Date(pascua.getTime() + 71 * 86400000))
    ),
  });

  festivos.sort((a, b) => a.date.localeCompare(b.date));
  return festivos;
}

/**
 * Calcula los días hábiles colombianos entre dos fechas (inclusive o exclusivo del día inicial).
 * @param from Fecha inicial (Date)
 * @param to Fecha final (Date)
 * @param includeStart Si se incluye el día inicial en el conteo
 * @returns Número de días hábiles colombianos
 */
export function businessDaysColombia(
  from: Date,
  to: Date,
  includeStart = false
): number {
  if (from > to) return 0;
  const yearSet = new Set<number>();
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    yearSet.add(d.getFullYear());
  }
  // Obtener todos los festivos de los años involucrados
  const festivos = Array.from(yearSet)
    .flatMap(getFestivosColombia)
    .map((f) => f.date);
  let count = 0;
  for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    const day = d.getDay();
    if (
      (includeStart || d > from) &&
      day !== 0 &&
      day !== 6 &&
      !festivos.includes(dateStr)
    ) {
      count++;
    }
  }
  return count;
}

/**
 * Calcula los días calendario entre dos fechas (opcionalmente incluyendo el día inicial).
 */
export function calendarDays(
  from: Date,
  to: Date,
  includeStart = false
): number {
  if (from > to) return 0;
  const diff = Math.floor(
    (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
  );
  return includeStart ? diff + 1 : diff;
}

/**
 * Calcula los días 360 (método 30/360) entre dos fechas.
 * @param from Fecha inicial
 * @param to Fecha final
 * @param includeStart Si se incluye el día inicial
 * @returns Días según convención 360 (30 días por mes)
 */
export function days360(from: Date, to: Date, includeStart = false): number {
  let d1 = new Date(from);
  let d2 = new Date(to);
  let d1Day = d1.getDate();
  let d2Day = d2.getDate();
  if (d1Day === 31) d1Day = 30;
  if (d2Day === 31 && d1Day >= 30) d2Day = 30;
  let days =
    (d2.getFullYear() - d1.getFullYear()) * 360 +
    (d2.getMonth() - d1.getMonth()) * 30 +
    (d2Day - d1Day);
  return includeStart ? days + 1 : days;
}
