import { Timeline, Animation } from './animation/animation.js';

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
    let position = 0;
    let currentAnimation = null;
    let nextAnimation = null;
    let timeline = null;

    let children = this.props.data.map((url) => {
      let element = <img src={url} />;
      element.addEventListener('dragstart', (e) => e.preventDefault());
      return element;
    });

    let root = <div class='carousel'>{children}</div>;

    let nextPic = () => {
      // 这里利用取余让 position 只在 0 ~ this.props.data.length - 1 之间自增1并循环
      let nextPosition = (position + 1) % this.props.data.length;

      let current = children[position];
      let next = children[nextPosition];

      // current.style.transition = 'ease 0s';
      // next.style.transition = 'ease 0s';

      // // 起始位置
      // current.style.transform = `translateX(${-100 * position}%)`;
      // next.style.transform = `translateX(${-100 * nextPosition + 100}%)`;

      // setTimeout(() => {
      //   current.style.transition = ''; // means use css rule
      //   next.style.transition = '';

      //   // 终止位置
      //   current.style.transform = `translateX(${-100 * position - 100}%)`;
      //   next.style.transform = `translateX(${-100 * nextPosition}%)`;
      //   position = nextPosition;
      // }, 16);

      currentAnimation = new Animation(
        current.style,
        'transform',
        (v) => `translateX(${v}%)`,
        -100 * position,
        -100 * position - 100,
        2000,
      );

      nextAnimation = new Animation(
        next.style,
        'transform',
        (v) => `translateX(${v}%)`,
        -100 * nextPosition + 100,
        -100 * nextPosition,
        2000,
      );

      timeline = new Timeline();
      timeline.add(currentAnimation);
      timeline.add(nextAnimation);
      timeline.start();

      position = nextPosition;

      setTimeout(nextPic, 3000);
    };

    setTimeout(nextPic, 1000);

    root.addEventListener('mousedown', (event) => {
      // event 中有很多表示鼠标位置的值，推荐使用 `clientX` 和 `clientY`，相当于可视区域的坐标，非常准确并且没有歧义，和浏览器窗口里面的可渲染区域一一对应。
      // 点击鼠标时开始位置
      let startX = event.clientX;
      let { width } = root.root.getBoundingClientRect();

      // 由于 `position - 1` 可能会出现负数，这样我们便无法获取 `childNodes` 中的元素，因此加上一个 length 来避免这样的问题
      let prevPos = (position - 1 + this.props.data.length) % this.props.data.length;
      let nextPos = (position + 1) % this.props.data.length;

      let prev = children[prevPos];
      let current = children[position];
      let next = children[nextPos];

      let move = (event) => {
        // 拖动瞬间的基本位置值
        let prevBase = -width * prevPos - width;
        let currentBase = -width * position;
        let nextBase = -width * nextPos + width;

        prev.style.transition = 'ease 0s';
        current.style.transition = 'ease 0s';
        next.style.transition = 'ease 0s';

        prev.style.transform = `translateX(${prevBase}px)`;
        current.style.transform = `translateX(${currentBase}px)`;
        next.style.transform = `translateX(${nextBase}px)`;

        // 移动量
        let moveX = event.clientX - startX;
        let x = moveX;
        prev.style.transform = `translateX(${prevBase + x}px)`;
        current.style.transform = `translateX(${currentBase + x}px)`;
        next.style.transform = `translateX(${nextBase + x}px)`;
      };

      let up = (event) => {
        // 偏移量，相对于视觉上图像的编译量
        let offset = 0;
        if (event.clientX - startX > width / 2) {
          offset = 1;
        } else if (event.clientX - startX < -width / 2) {
          offset = -1;
        }

        // 添加动画
        prev.style.transition = '';
        current.style.transition = '';
        next.style.transition = '';

        prev.style.transform = `translateX(${-width * (prevPos - offset) - width}px)`;
        current.style.transform = `translateX(${-width * (position - offset)}px)`;
        next.style.transform = `translateX(${-width * (nextPos - offset) + width}px)`;

        position = (position - offset + this.props.data.length) % this.props.data.length;

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);

      document.addEventListener('mouseup', up);
    });

    return root;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}

export { createElement, Text, Wrapper, Carousel };
