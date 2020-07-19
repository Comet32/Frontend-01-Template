let parser = require('./parser.js');

module.exports = function (source, map) {
  let tree = parser.parseHTML(source);
  // console.log('source', source);
  // console.log('JS code: \n', tree.children[2].children[0].content);
  // console.log('this.resourcePath', this.resourcePath);

  let template = null;
  let script = null;

  for (let node of tree.children) {
    if (node.tagName == 'template') {
      // 过滤掉文本字符之后取数组中的第一个元素则是 DOM 元素
      template = node.children.filter((e) => e.type != 'text')[0];
    } else if (node.tagName == 'script') {
      script = node.children[0].content;
    }
  }

  // console.log('template', template);

  // 依次访问 template 子节点，返回调用 createElement
  let visit = (node) => {
    if (node.type == 'text') {
      return JSON.stringify(node.content);
    }
    let attrs = {};
    for (let attr of node.attributes) {
      attrs[attr.name] = attr.value;
    }
    // 返回调用 create 的序列
    let children = node.children.map((node) => visit(node));
    return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
  };

  let result = `
import { createElement, Text, Wrapper } from './createElement.js'; 
export class Carousel {
  constructor(config) {
    this.children = [];
    this.props = {};
    this.attr = new Map();
  }

  render(){
    return ${visit(template)}
  }

  setAttribute(name, value) {
    //attribute
    this.props[name] = value;
    this.attr.set(name, value);
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
  `;

  return result;
};
