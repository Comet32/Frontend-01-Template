const compiler = require('@vue/compiler-sfc');

const result = compiler.compileTemplate({filename: 'example.vue', source: "<div>Hello World!</div>"});

console.log('result', result);
