import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import jest from "eslint-plugin-jest";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
      "react-native": reactNative,
      jest,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactNative.configs.all.rules,
      ...jest.configs.recommended.rules,
      "react/prop-types": "off",
      "react-native/no-unused-styles": "error",
      "react-native/split-platform-components": "error",
      "react-native/no-inline-styles": "warn",
    },
  },
];
