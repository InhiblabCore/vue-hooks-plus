import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

import { globalIgnores } from 'eslint/config'

import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs([
  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
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
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
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
