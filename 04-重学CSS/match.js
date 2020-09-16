// 只支持 id class type 三种简单选择器的匹配
function match(selector, element) {
  if (!selector || !element) {
    return false;
  }
  const attrArr = Array(element.attributes);

  if (selector.charAt(0) == '#') {
    let attr = attrArr.filter((attr) => attr.name == 'id')[0];
    if (attr && attr.value === selector.replace('#', '')) {
      return true;
    }
  } else if (selector.charAt(0) == '.') {
    let attr = attrArr.filter((attr) => attr.name === 'class')[0];
    if (attr && attr.value === selector.replace('.', '')) return true;
  } else {
    if (element.tagName.toLowerCase() === selector) {
      return true;
    }
  }
  return false;
}
