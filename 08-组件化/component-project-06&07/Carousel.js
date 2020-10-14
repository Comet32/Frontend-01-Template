import { createElement, Text, Wrapper } from './createElement.js';
import { Timeline, Animation } from './animation/animation_set.js';

export class Carousel {
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
    let timeoutID = null;
    let currentAnimation = null;
    let nextAnimation = null;
    let timeline = new Timeline();

    let children = this.props.data.map((url, currentPosition, data) => {
      let offset = 0;

      let handleGestureStart = () => {
        let { width } = root.root.getBoundingClientRect();
        // 获取元素当前 translateX 的值
        let currentElement = children[currentPosition];
        let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
        // 当鼠标点击时，图片完美居中与点击图片停止时的偏移值，在 pan 中用此偏移值来计算 transformValue
        offset = currentTransformValue + width * currentPosition;
      };

      let handlePanstart = () => {
        timeline.pause();
        clearTimeout(timeoutID);
      };

      let handlePan = (event) => {
        let { width } = root.root.getBoundingClientRect();
        let lastPosition = (currentPosition - 1 + data.length) % data.length;
        let nextPosition = (currentPosition + 1) % data.length;

        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let lastTransformValue = -width - width * lastPosition + offset;
        let currentTransformValue = -width * currentPosition + offset;
        let nextTransformValue = width - width * nextPosition + offset;

        let dx = event.clientX - event.startX;

        lastElement.style.transform = `translateX(${lastTransformValue + dx}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue + dx}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue + dx}px)`;
      };

      let handlePanend = (event) => {
        let lastPosition = (currentPosition - 1 + data.length) % data.length;
        let nextPosition = (currentPosition + 1) % data.length;

        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];
        let { width } = root.root.getBoundingClientRect();

        let direction = 0;
        let dx = event.clientX - event.startX;

        if (dx + offset > width / 2 || (dx > 0 && event.isFlick)) {
          direction = 1;
        } else if (dx + offset < -width / 2 || (dx < 0 && event.isFlick)) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();

        let lastAnimation = new Animation(
          lastElement.style,
          'transform',
          (v) => `translateX(${v}px)`,
          -width - width * lastPosition + offset + dx,
          -width - width * lastPosition + direction * width,
          500,
        );
        let currentAnimation = new Animation(
          currentElement.style,
          'transform',
          (v) => `translateX(${v}px)`,
          -width * currentPosition + offset + dx,
          -width * currentPosition + direction * width,
          500,
        );
        let nextAnimation = new Animation(
          nextElement.style,
          'transform',
          (v) => `translateX(${v}px)`,
          width - width * nextPosition + offset + dx,
          width - width * nextPosition + direction * width,
          500,
        ); 

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + this.props.data.length) % this.props.data.length;

        timeoutID = setTimeout(nextPic, 3000);
      };
 
      let element = (
        <img
          src={url}
          enableGesture={true}
          onGesturestart={handleGestureStart}
          onPan={handlePan}
          onPanend={handlePanend}
          onPanstart={handlePanstart}
        />
      );
      element.root.style.transform = 'translateX(0)';

      element.addEventListener('dragstart', (e) => e.preventDefault());
      return element;
    });

    let root = <div class='carousel'>{children}</div>;

    let nextPic = () => {
      let { width } = root.root.getBoundingClientRect();
      // 这里利用取余让 position 只在 0 ~ this.props.data.length - 1 之间自增1并循环
      let nextPosition = (position + 1) % this.props.data.length;

      let current = children[position];
      let next = children[nextPosition];

      currentAnimation = new Animation(
        current.style,
        'transform',
        (v) => `translateX(${v}px)`,
        -width * position,
        -width * position - width,
        2000,
      );

      nextAnimation = new Animation(
        next.style,
        'transform',
        (v) => `translateX(${v}px)`,
        -width * nextPosition + width,
        -width * nextPosition,
        2000,
      );

      // timeline = new Timeline();
      timeline.add(currentAnimation);
      timeline.add(nextAnimation);
      timeline.start();

      position = nextPosition;

      timeoutID = setTimeout(nextPic, 3000);
    };

    nextPic();

    root.addEventListener('mousedown1', (event) => {
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
        // 偏移量，相对于视觉上图像的偏移量
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
