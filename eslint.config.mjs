import js from "@eslint/js";
import globals from "globals";
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts'
import cypress from 'eslint-plugin-cypress'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import imports from 'eslint-plugin-import'


export default tseslint.config(
    {
        ignores: [
            'dist'
        ]
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            '@stylistic': stylisticTs,
            'react-refresh': reactRefresh,
            'react-hooks': reactHooks,
            'import': imports,
            'cypress': cypress,
            'no-only-tests': noOnlyTests
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...cypress.configs.recommended.rules,

            '@stylistic/semi': ['error', 'never'],
            '@stylistic/object-curly-spacing': ["error", "always"],
            '@stylistic/quotes': ['error', 'single', {
                avoidEscape: true
            }],
            '@stylistic/quote-props': ['error', 'as-needed'],

            '@typescript-eslint/semi': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',

            'react-hooks/exhaustive-deps': 'error',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true}
            ],
            'no-only-tests/no-only-tests': ['error', { fix: true }],
            'import/no-extraneous-dependencies': 'warn',

            "no-restricted-imports": ["error", {
                "patterns": ["../*", "!./*"]
            }]
        }
    }
)