import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'backend/node_modules/**'
    ]
  },

  {
    files: ['**/*.{js,jsx}'],

    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    rules: {
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^[A-Z]',
          argsIgnorePattern: '^_'
        }
      ]
    }
  },

  {
    files: ['src/**/*.{js,jsx}'],

    plugins: {
      'react-hooks': reactHooks
    },

    rules: {
      'react-hooks/rules-of-hooks':
        'error',

      'react-hooks/exhaustive-deps':
        'warn'
    }
  }
]