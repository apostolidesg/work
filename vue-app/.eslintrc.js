// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'prettier',
    "plugin:prettier/recommended",
  ],
  // required to lint *.vue files
  plugins: [
    // required to lint *.vue files
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': ['error', { vars: 'local', args: 'none', caughtErrors: 'none' }],
    'import/no-extraneous-dependencies': 'off',
    'vue/component-name-in-template-casing': 'off',
    'prettier/prettier': 'error',
    'import/order': 'off',
    radix: 'off',
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: require.resolve("./build/webpack.base.conf.js")
      }
    },
    "import/extensions": [".js", ".vue"],
  },
}
