import { createElement, Wrapper, Text } from './createElement.js';

// 容器
export class TabPanel {
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

  select(i) {
    for (let view of this.childViews) {
      view.style.display = 'none';
    }
    this.childViews[i].style.display = ''; // 使用默认 display

    for (let view of this.titleViews) {
      view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
    // this.titleView.innerText = this.children[i].props.title;
  }

  render() {
    this.childViews = this.children.map((child) => <div style='width: 300px;min-height: 300px;'>{child}</div>);
    // 没有 ref 机制所有只能手动获
    this.titleViews = this.children.map((child, i) => (
      <span style=' background-color: lightgreen;margin:10px' onClick={() => this.select(i)}>
        {child.getAttribute('title') || ''}
      </span>
    ));
    // 每次重新 render 都让其选择 0
    setTimeout(() => this.select(0));

    return (
      <div class='panel' style='width: 300px'>
        <h2 style='width: 300px;margin:0;'>{this.titleViews}</h2>
        <div style='border: solid 1px lightgreen;'>{this.childViews}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
