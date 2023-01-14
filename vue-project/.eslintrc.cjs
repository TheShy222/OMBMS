/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        // '@vue/eslint-config-prettier'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        semi: ['error', 'never'], // 不使用分号结束
        quotes: ['error', 'single'], // 使用单引号
        eqeqeq: 'error', // ===
        'vue/no-unused-vars': 'error',
        'vue/multi-word-component-names':'off',
        'vue/no-reserved-component-names':'off'
    },
}