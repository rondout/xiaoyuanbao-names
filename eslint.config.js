/*
 * @Author: shufei.han
 * @Date: 2024-09-09 12:25:29
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 16:33:29
 * @FilePath: \xiaoyuanbao-names\eslint.config.js
 * @Description: 
 */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint": {
        "no-unused-vars": "off",
      }
    },
  },
)
