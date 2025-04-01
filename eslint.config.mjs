import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// const eslintConfig = [...compat.extends("next/core-web-vitals")];
const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    parser: "@babel/eslint-parser", // Ensure Babel parser is used
    parserOptions: {
      ecmaVersion: 2020,  // Supports modern JavaScript features
      sourceType: "module", // To allow import/export syntax
      ecmaFeatures: {
        jsx: true, // If you're using JSX with React
      },
    },
  },
];
export default eslintConfig;
