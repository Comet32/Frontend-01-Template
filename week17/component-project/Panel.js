import { createElement, Wrapper, Text } from './createElement.js';

// 容器
export class Panel {
  constructor(config) {
    this.children = [];
    this.props = {};
    this.attr = new Map();
  }

  setAttribute(name, value) {
    //attribute
    this.props[name] = value;
    this.attr.set(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return (
      <div class='panel'>
        <h1>{this.attr.get('title')}</h1>
        <div>{this.children}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
