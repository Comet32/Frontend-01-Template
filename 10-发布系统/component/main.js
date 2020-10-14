import { createElement } from './createElement';

const component = (
  <div>
    <span>Hello World</span>
  </div>
);

component.mountTo(document.body);
