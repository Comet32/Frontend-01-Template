import { createElement, Wrapper, Text } from './createElement.js';

// 容器
export class ListView {
  constructor(config) {
    this.children = [];
    this.props = {};
    this.attr = new Map();
    this.state = Object.create(null);
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
    let { data } = this.props;
    return <div class='list-view' style='width: 300px'>
      {
        data.map(this.children[0])
      }
    </div>;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
