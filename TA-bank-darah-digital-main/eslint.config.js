import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import hooksPlugin from "eslint-plugin-react-hooks";
import refreshPlugin from "eslint-plugin-react-refresh";


export default [
  {
    ignores: ["dist/**", "node_modules/**", "dev-dist/**"],
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "react-hooks": hooksPlugin,
      "react-refresh": refreshPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      }
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
  }
];