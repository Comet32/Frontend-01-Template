import { parseHTML } from '../src/parser.js';
import assert from 'assert';

it('parse a single element', () => {
  let doc = parseHTML('<div></div>');
  let div = doc.children[0];
  assert.equal(div.tagName, 'div');
  assert.equal(div.children.length, 0);
  assert.equal(div.type, 'element');
  assert.equal(div.attributes.length, 2);
});

it('parse a single with text content', () => {
  let doc = parseHTML('<div>hello</div>');
  let text = doc.children[0].children[0];
  assert.equal(text.content, 'hello');
  assert.equal(text.type, 'text');
});

// cover throw new Error("Tag start end doesn't match!");
it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div></vid>');
  } catch (e) {
    console.log(e);
    assert.equal(e.message, "Tag start end doesn't match!");
  }
});

// cover tagOpen
it('text with < ', () => {
  let doc = parseHTML('<div>a < b</div>');
  let text = doc.children[0].children[0];
  assert.equal(text.content, 'a < b');
  assert.equal(text.type, 'text');
});

// cover beforeAttributeName
it('with property', () => {
  let doc = parseHTML('<div id=a class="cls" data="abc" ></div>');
  let div = doc.children[0];

  let count = 0;

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
    } else if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cls');
    } else if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

// cover beforeAttributeName
it('with property 2', () => {
  let doc = parseHTML('<div id=a class="cla" data="abc"></div>');
  let div = doc.children[0];

  let count = 0;

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
    } else if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cla');
    } else if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

// cover beforeAttributeName
it('with property 2', () => {
  let doc = parseHTML('<div id=a class="cla" data="abc"></div>');
  let div = doc.children[0];

  let count = 0;

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
    } else if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cla');
    } else if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

// cover selfClosingStartTag
it('with property 3', () => {
  let doc = parseHTML('<div id=a class="cla" data="abc" />');
  let div = doc.children[0];

  let count = 0;

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count++;
      assert.equal(attr.value, 'a');
    } else if (attr.name === 'class') {
      count++;
      assert.equal(attr.value, 'cla');
    } else if (attr.name === 'data') {
      count++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

// cover script
it('script', () => {
  let content = `<div>abcd</div>
  <span>x</span>
  /script>
  <
  </s
  </sc
  </scr
  </scri
  </scrip
  </script`;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];
  // assert.equal(text.content, content);
  assert.equal(text.type, 'text');
});

it('attribute with no value', () => {
  let doc = parseHTML('<div class />');

});

it('attribute with no value', () => {
  let doc = parseHTML('<div class id/>');
});

it('upper case', () => {
  let doc = parseHTML('<DIV class id/>');
});

it('single quote',() => {
  let doc = parseHTML('<div class=\'123\'>')
})
