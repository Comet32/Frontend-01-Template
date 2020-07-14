import './foo.js';

function createElement(Tag, attributes, ...children) {
  let o;

  if (typeof Tag === 'string') {
    o = new Wrapper(Tag);
  } else {
    o = new Tag();
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  for (let child of children) {
    if (typeof child === 'string') {
      child = new Text(child);
    }
    o.appendChild(child);
  }
  return o;
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(tag) {
    this.children = [];
    this.root = document.createElement(tag);
  }

  set class(v) {
    let componentName = this.constructor.name;
    console.log(componentName + ' set Class', v);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for (const child of this.children) {
      debugger;
      child.mountTo(this.root);
    }
  }
}

class Component {
  constructor(props) {
    this.children = [];
    this.root = document.createElement('div');
  }

  set class(v) {
    let componentName = this.constructor.name;
    console.log(componentName + ' set Class', v);
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (const child of this.children) {
      child.mountTo(this.slot);
    }
    this.render().mountTo(parent);
  }
}

class Parent extends Component {
  render() {
    return (
      <h1>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </h1>
    );
  }
}

class Child extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h2>{this.slot}</h2>;
  }
}

const component = (
  <Parent id='a' class='b' style='width:400px;height:400px;background-color:lightGreen'>
    <Child style='width:100px;height:100px;background-color:pink'>child1</Child>
    <Child style='width:100px;height:100px;background-color:green'>child2</Child>
    <Child style='width:100px;height:100px;background-color:red'>child3</Child>
    <div style='width:100px;height:100px;background-color:skyBlue'>child4</div>
  </Parent>
);

console.log('component', component);

component.mountTo(document.querySelector('body'));

// component.setAttribute('id', 'a');
