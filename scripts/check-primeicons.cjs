#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * 🛡️ Script de verificación: Detecta íconos PrimeVue "pi pi-*"
 *
 * Este script busca el patrón "pi pi-" en todos los archivos .vue
 * y falla si encuentra alguna ocurrencia, evitando que se introduzcan
 * accidentalmente íconos de PrimeVue cuando queremos usar solo Lucide.
 */

const PRIME_ICON_PATTERN = /pi\s+pi-/g;
const SRC_DIR = path.join(__dirname, "..", "src");

function findVueFiles(dir) {
  const files = [];

  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith(".vue")) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

function checkFileForPrimeIcons(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = [];
  let match;

  while ((match = PRIME_ICON_PATTERN.exec(content)) !== null) {
    const lines = content.substring(0, match.index).split("\n");
    const lineNumber = lines.length;
    const lineContent = content.split("\n")[lineNumber - 1];

    matches.push({
      line: lineNumber,
      content: lineContent.trim(),
      match: match[0],
    });
  }

  return matches;
}

function main() {
  console.log("🔍 Verificando íconos PrimeVue...\n");

  const vueFiles = findVueFiles(SRC_DIR);
  const violations = [];

  for (const file of vueFiles) {
    const matches = checkFileForPrimeIcons(file);
    if (matches.length > 0) {
      violations.push({ file, matches });
    }
  }

  if (violations.length === 0) {
    console.log('✅ ¡Perfecto! No se encontraron íconos PrimeVue "pi pi-*"');
    console.log("🎯 Todos los íconos son de Lucide como debería ser.\n");
    process.exit(0);
  }

  // Hay violaciones - mostrar errores y fallar
  console.log("🚫 ¡ERRORES ENCONTRADOS! Se detectaron íconos PrimeVue:\n");

  for (const violation of violations) {
    const relativePath = path.relative(process.cwd(), violation.file);
    console.log(`📁 ${relativePath}:`);

    for (const match of violation.matches) {
      console.log(`   ❌ Línea ${match.line}: ${match.content}`);
      console.log(`      └─ Encontrado: "${match.match}"`);
    }
    console.log("");
  }

  console.log("💡 SOLUCIÓN:");
  console.log('   1. Reemplaza los íconos "pi pi-*" con íconos de Lucide');
  console.log("   2. Importa el ícono de lucide-vue-next");
  console.log("   3. Usa <template #icon><LucideIcon /></template> en botones");
  console.log("   4. Usa <LucideIcon /> directamente en otros lugares\n");

  console.log("📚 Ejemplo:");
  console.log('   ❌ icon="pi pi-home"');
  console.log('   ✅ <template #icon><Home class="w-4 h-4" /></template>\n');

  process.exit(1);
}

if (require.main === module) {
  main();
}

module.exports = { checkFileForPrimeIcons, findVueFiles };
