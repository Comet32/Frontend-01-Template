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

  //console.log(children);
  console.log(o);
  for (let child of children) {
    if (typeof child === 'string') child = new Text(child);

    o.appendChild(child);
  }

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

  setAttribute(name, value) {
    //attribute
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);

    for (let child of this.children) {
      child.mountTo(this.root);
    }
  }
}

class MyComponent {
  constructor(config) {
    this.children = [];
    this.attr = new Map();
  }

  setAttribute(name, value) {
    //attribute
    this.attr.set(name, value);
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return (
      <article>
        <header>I'm a header</header>
        {this.slot}
        <footer>I'm a footer</footer>
      </article>
    );
  }

  mountTo(parent) {
    this.slot = <div></div>;
    for (let child of this.children) {
      this.slot.appendChild(child);
    }
    this.render().mountTo(parent);
  }
}

/*let component = <div id="a" cls="b" style="width:100px;height:100px;background-color:lightgreen">
        <div></div>
        <p></p>
        <div></div>
        <div></div>
    </div>*/

let component = (
  <MyComponent>
    <div>text text text</div>
  </MyComponent>
);

component.mountTo(document.body);
/*
var component = createElement(
    Parent, 
    {
        id: "a",
        "class": "b"
    }, 
    createElement(Child, null), 
    createElement(Child, null), 
    createElement(Child, null)
);
*/

console.log(component);

//componet.setAttribute("id", "a");
