import { createElement } from 'createElement.js';

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

  setAttribute(name, value) {
    //attribute
    this.root.setAttribute(name, value);
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

class Carousel {
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
      <div class='carousel'>
        {this.props.data.map((url) => {
          let element = <img src={url} />;
          element.addEventListener('dragstart', (e) => e.preventDefault());
          return element;
        })}
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}

export { Text, Wrapper, Carousel };
