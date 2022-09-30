module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['vue'],
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  rules: {
    'max-len': 0,
    camelcase: 0, // 变量可以用下划线
    'no-plusplus': 0, // 禁止使用++，--
    'guard-for-in': 0,
    'no-extra-semi': 0, // 和prettier冲突
    'import/extensions': 0, // import不需要写文件扩展名
    'import/no-unresolved': 0,
    'no-underscore-dangle': 0, // 无下划线
    'no-restricted-syntax': 0,
    'consistent-return': 'off',
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
    semi: ['error', 'never'],
    'no-prototype-builtins': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'no-param-reassign': ['error', { props: false }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['script/**/*.js'] }],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: 'never',
      },
    ],
    'linebreak-style': [0, 'error', 'windows'],
    'vue/script-indent': [
      'error',
      2,
      {
        // script标签缩进设置
        baseIndent: 1,
        switchCase: 0,
        ignores: [],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
      },
    },
  ],
}
