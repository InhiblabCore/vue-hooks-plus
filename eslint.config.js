import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...pluginVue.configs['flat/recommended'],
  globalIgnores(['dist/*', 'node_modules/*', 'patches/*', 'types/*']),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-self-closing': 'off',
      'react/no-string-refs': 'off',
      'react/no-unknown-property': 'off',
      'react/display-name': 'off',
      'no-sparse-arrays': 0,
      'no-inner-declarations': 0,
      'no-constant-condition': 0,
      'no-restricted-imports': [
        'error',
        {
          paths: ['vue-hooks-plus', '..', '../..', 'packages/hooks/src/index.ts'],
        },
      ],
      'no-unused-vars': [
        2,
        {
          vars: 'local',
          args: 'none',
        },
      ],
      'node/no-callback-literal': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',

      'vue/attributes-order': 'off',
      'vue/one-component-per-file': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
])
