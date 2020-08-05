import { enableGesture } from './gesture';

function createElement(Cls, attributes, ...children) {
  let o;

  if (typeof Cls === 'string') {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {},
    });
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  // 递归处理 children 中的 child 有数组的情况
  let visit = (children) => {
    for (let child of children) {
      if (typeof child === 'string') child = new Text(child);
      if (child instanceof Array) {
        visit(child);
        // 不将 child 添加到 o 中
        continue;
      }
      o.appendChild(child);
    }
  };
  visit(children);

  return o;
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  get style() {
    return this.root.style;
  }

  get classList() {
    return this.root.classList;
  }

  set innerText(text) {
    return (this.root.innerText = text);
  }

  setAttribute(name, value) {
    //attribute
    this.root.setAttribute(name, value);

    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/[\s\S]+/, (c) => c.toLocaleLowerCase());
      this.addEventListener(eventName, value);
    }

    if (name === 'enableGesture' && value) {
      enableGesture(this.root);
    }
  }

  getAttribute(name) {
    return this.root.getAttribute(name);
  }

  appendChild(child) {
    this.children.push(child);
  }

  addEventListener(...args) {
    this.root.addEventListener(...args);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

export { createElement, Text, Wrapper };
