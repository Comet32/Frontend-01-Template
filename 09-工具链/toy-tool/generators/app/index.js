let Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts){
    super(args, opts);
  }

  // 收集信息
  collecting(){
    this.log('method 1 just ran')
  }

  // 创建文件
  creating(){
    this.fs.copyTpl(
      this.templatePath('createElement.js'),
      this.destinationPath('src/createElement.js'),
    )
    this.fs.copyTpl(
      this.templatePath('gesture.js'),
      this.destinationPath('src/gesture.js'),
    )
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js'),
    )
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
    )
    this.fs.copyTpl(
      this.templatePath('main.test.js'),
      this.destinationPath('test/main.test.js'),
    )
    this.fs.copyTpl(
      this.templatePath('.nycrc'),
      this.destinationPath('.nycrc'),
    )
    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc'),
    )
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'), 
      this.destinationPath('webpack.config.js'),
    )
    // 创建 package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {name: 'init-package-name'}
    )
    // 安装开发依赖
    this.npmInstall([
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      'html-webpack-plugin',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      '@babel/plugin-transform-react-jsx',
      '@babel/register',
      'mocha',
      'nyc',
      '@istanbuljs/nyc-config-babel',
      'babel-plugin-istanbul'
    ], { 'save-dev': true })
  }
}
