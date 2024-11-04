import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

import pkg from 'eslint';
import configsPKG from 'eslint-plugin-react';

const { config } = pkg;
const { configs } = configsPKG;

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: "module"
      },
      env: {
        browser: true,
        node: true
      }
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier
    },
    
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "arrow-body-style": ["error", "always"],
      "curly": ["error", "multi"],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "indent-legacy": ["error", "tab"],
      "lines-between-class-members": ["error", "always"],
      "no-trailing-spaces": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "prettier/prettier": ["error"]
    }
  }
];
