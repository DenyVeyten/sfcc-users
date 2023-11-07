import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: { globals: { ...globals.node } },
        rules: {
            "comma-dangle": ["error", "always-multiline"],
            "semi": ["error", "always"],
            "indent": ["error", 4],
            "eol-last": ["error", "always"],
            "object-curly-newline": ["error", { "multiline": true }],
            "object-curly-spacing": ["error", "always"],
            "array-bracket-newline": ["error", { "multiline": true }],
            "array-bracket-spacing":  ["error", "never"],
            "array-element-newline": ["error", "consistent"],
            "padding-line-between-statements": [
                "error",
                { blankLine: "always", prev: "*", next: "return" },
                { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
                { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
                { blankLine: "always", prev: "directive", next: "*" },
                { blankLine: "any", prev: "directive", next: "directive" },
            ],
            "max-len": ["error", 100],
            "max-lines-per-function": ["warn", 80],
            "no-multiple-empty-lines": ["error", { "max": 1 }],
            "no-multi-spaces": "error",
            "no-trailing-spaces": "error",
            "operator-linebreak": ["error", "before"],
            "space-in-parens": ["error", "never"],
            "space-infix-ops": "error",
            "arrow-parens": "error",
            "no-shadow": "error",
            "quotes": "warn",
        },
    },
    {
        files: ["**/*.test.js"],
        languageOptions: {
            globals: {
                it: "readonly",
                describe: "readonly",
                beforeAll: "readonly",
                beforeEach: "readonly",
                afterAll: "readonly",
                afterEach: "readonly",
                expect: "readonly",
            },
        },
    },
];
