// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6:true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "space-before-function-paren": ["2", "always"],//函数'('前面的空格
    'eqeqeq': 'off', // 关闭===代替==的告警
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'indent': ['wran', 2],
    // 'not-unused-vars':[2,{
    //   'vars':'all',
    //   'args':'none'
    // }]
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
   /*eslint semi: ["wran", "always"]*/ //分号
  }
}
// 0-off 1-warn 2-error