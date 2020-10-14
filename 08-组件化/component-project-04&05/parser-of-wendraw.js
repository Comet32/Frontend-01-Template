const EOF = Symbol("EOF"); // End Of File

let currentToken = null;
let currentAttribute = null;

let stack = [{ type: "document", children: [] }];
let currentTextNode = null;

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attribute: [],
    };

    // 抄属性
    element.tagName = token.tagName;
    for (let p in token) {
      if (p !== "type" && p !== "tagName") {
        element.attribute.push({
          name: p,
          value: token[p],
        });
      }
    }

    top.children.push(element);
    // element.parent = top;

    if (!token.isSelfClosing) stack.push(element);
    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      // 栈顶的元素不是当前 tag 的 startTag 匹配失败
      throw new Error("Tag start end doesn't match!");
    } else {
      // 当前 tag 结束了，没有子元素，弹出当前的 element。
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === "text") {
    if (currentTextNode === null) {
      currentTextNode = {
        type: "text",
        content: "",
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

function data(c) {
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit({
      type: "EOF",
    });
    return;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}

function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    // 对应 HTML 标准中的 Reconsume 关键字，
    // 就会将当前值重新代理给 tagName 状态机。
    return tagName(c);
  } else {
    return data;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c === ">") {
    throw new Error("This is a missing end tag name parse error.");
  } else if (c === EOF) {
    throw new Error("This is a eof before tag name parse error.");
  } else {
    throw new Error(
      "This is a invalid first character of tag name parse error."
    );
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    // 标签结束
    emit(currentToken);
    return data;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; //.toLowerCase()
    return tagName;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    return tagName;
  }
}

function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    throw new Error("This is a unexpected solidus in tag parse error.");
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 忽略这些空格符
    return beforeAttributeName;
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    throw new Error("This is a unexpected equals sign before attribute name");
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 忽略这些空格符
    return afterAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    // 将属性挂到 token 上
    currentToken[currentAttribute.name] = currentAttribute.value;
    // 创建新的属性
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === "/" || c === ">" || c === EOF) {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === '"' || c === "'" || c === "<") {
    throw new Error(
      "This is a unexpected character in attribute name parse error."
    );
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuoteAttributeValue;
  } else if (c === "'") {
    return singleQuoteAttributeValue;
  } else if (c === ">") {
    throw new Error("This is a missing attribute value parse error.");
  } else {
    return unquoteAttributeValue(c);
  }
}

function doubleQuoteAttributeValue(c) {
  if (c === '"') {
    // 将属性挂到 token 上
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    currentAttribute.value += c;
    return doubleQuoteAttributeValue;
  }
}

function singleQuoteAttributeValue(c) {
  if (c === "'") {
    // 将属性挂到 token 上
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuoteAttributeValue;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    currentAttribute.value += c;
    return singleQuoteAttributeValue;
  }
}

function afterQuoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    throw new Error(
      "This is a missing whitespace between attributes parse error."
    );
  }
}

function unquoteAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentAttribute[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {
    throw new Error(
      "unexpected character in unquoted attribute value parse error."
    );
  } else if (c === EOF) {
    throw new Error("This is a eof in tag parse error.");
  } else {
    currentAttribute.value += c;
    return unquoteAttributeValue;
  }
}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let char of html) {
    state = state(char);
  }
  state = state(EOF);
  return stack[0];
};
