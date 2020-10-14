var page = require('webpage').create();
page.open('http://localhost:8080/', function (status) {
  console.log('Status: ' + status);
  if (status === 'success') {
    // 可以认为传入 evaluate 回调中的代码是在浏览器中执行的，所以这个回调中的环境和外部的 phantomjs 的环境是隔离的,因此也无法访问外部的变量
    var body = page.evaluate(function () {
      var toString = function (pad, element) {
        var childrenString = '';
        for (var i = 0; i < element.childNodes.length; i++) {
          childrenString += toString("    " + pad, element.childNodes[i]) + (i === element.childNodes.length - 1 ? '' : '\n');
        }
        var name = '';
        if(element.nodeType === Node.TEXT_NODE){
          name = '#text ' + JSON.stringify(element.textContent);
        }
        if(element.nodeType === Node.ELEMENT_NODE){
          name = element.tagName
        }
        return pad + name + (childrenString ? '\n' + childrenString : '');
      };
      return toString('', document.body);
    });
    console.log(body)
    // console.log('Page title is ' + title);
  }
  phantom.exit();
});
