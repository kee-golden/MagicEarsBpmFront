// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
    // "AMap": true,
    // "AMapUI": true,
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "guard-for-in": 0,
    "prefer-template": "off",
    "no-restricted-syntax": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-unused-vars": "off",
    "object-shorthand": 0,
    "linebreak-style": "off",
    // don't require .vue extension when importing
    'import/extensions': [
      'error', 'always', {
        'js': 'never',
        'vue': 'never'
      }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error', {
        'optionalDependencies': ['test/unit/index.js']
      }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
