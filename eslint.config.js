// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import importPlugin from 'eslint-plugin-import';
import cspellESLintPluginRecommended from '@cspell/eslint-plugin/recommended';

const configExtends = [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    angular.configs.tsRecommended,
    importPlugin.flatConfigs.recommended,
    cspellESLintPluginRecommended,
];

export default defineConfig([
    { ignores: ['**/node_modules/**', '**/dist/**', '**/out/**', '**/.angular/**', '**/icons/**'] },
    {
        files: ['projects/ui/**/*.ts'],
        extends: configExtends,
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'ui',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'ui',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        files: ['projects/**/*.ts'],
        extends: configExtends,
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/no-output-on-prefix': 'off',
            '@angular-eslint/prefer-inject': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@angular-eslint/no-output-native': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    disallowTypeAnnotations: true,
                    fixStyle: 'inline-type-imports',
                    prefer: 'no-type-imports',
                },
            ],
            '@typescript-eslint/member-ordering': 'error',
            '@typescript-eslint/sort-type-constituents': 'error',

            'no-restricted-syntax': ['error', { selector: 'TSEnumDeclaration', message: "Don't declare enums" }],
            'no-alert': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'no-shadow': 'warn',
            'no-template-curly-in-string': 'error',
            'prefer-template': 'warn',

            'import/first': 'warn',
            'import/newline-after-import': 'warn',
            'import/no-absolute-path': 'warn',
            'import/no-duplicates': 'error',
            'import/no-empty-named-blocks': 'warn',
            'import/no-unresolved': 'off',
            'import/named': 'off',
            'import/order': ['warn', { alphabetize: { order: 'asc' } }],

            '@cspell/spellchecker': [
                'error',
                { configFile: new URL('./cspell.config.yaml', import.meta.url).toString() },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
        rules: {},
    },
]);
