import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";
import globals from "globals";

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  // Common settings for all files
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },
  // JavaScript files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  // Vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      globals: {
        ...globals.browser,
      },
    },
  },
  ...eslintPluginVue.configs["flat/recommended"]
);
