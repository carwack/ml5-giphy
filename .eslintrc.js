module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    semi: ['error', 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 8,
        multiline: {
          max: 3,
          allowFirstLine: true
        }
      }
    ],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        bracketSpacing: true,
        arrowParens: 'always',
        printWidth: 120
      },
      {
        usePrettierrc: false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
