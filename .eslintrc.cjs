module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/strict",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".vue"],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    // Regla personalizada: Prohibir íconos PrimeVue "pi pi-*"
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/pi pi-/]",
        message:
          '🚫 NO usar íconos PrimeVue "pi pi-*". Usa íconos de Lucide en su lugar.',
      },
      {
        selector: "TemplateElement[value.raw=/pi pi-/]",
        message:
          '🚫 NO usar íconos PrimeVue "pi pi-*" en templates. Usa íconos de Lucide en su lugar.',
      },
    ],
  },
};
