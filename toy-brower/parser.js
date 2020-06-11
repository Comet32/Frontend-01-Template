// 为什么有一个 EOF symbol
// 有些文本节点的结束可能是在文件结束的时候自然结束的，在没有遇到一个特殊的标签之前，可能这个解析器还会保持着一个等待补全字符的状态
// 所以我们没有办法把最后的这个文本挂上去，因此用一个 symbol（唯一）将其当作一个特殊的字符在整个循环结束之后再传给 state
// 这样我们就可以实现标示文件结尾的作用
// 可以使用这个技巧来处理绝大多数带结束的场景，有些时候处理字符串时也会用到
// 也可以不使用 Symbol，使用对象也可以，只要是唯一的
const EOF = Symbol('EOF'); // EOF: End Of File

function data(c) {
  // 有三种 tag 开始标签、结束标签、自封闭标签
  if (c === '<') {
    return tagOpen;
  } else if (c == EOF) {
    return;
  } else {
    return data;
  }
}

function tagOpen(c) {
  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    // 因为当前字符需要使用 tagName 状态机处理所以传入调用，这个在标准中也用 Reconsume 告诉你需要调用
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c){
  if(c.match(/^[a-zA-Z]$/)){
    currentToken = {
      type: "endTag",
      tagName: "",
    }
    return tagName(c);
  }else if(c === '>'){

  }else if(c === EOF){

  }else {
    
  }
}

function tagName(c) {
  // 处理空格
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName;
  } else if (c === '>') {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName() {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '>') {
    return data;
  } else if (c === '=') {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}

function selfClosingStartTag(c){
  if(c === '>'){
    currentToken.isSelfClosing = true;
    return data;
  }else if(c === "EOF"){

  }else {

  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
};
