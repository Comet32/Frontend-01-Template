let css = require('css'); // parser

module.exports = function (source, map) {
  // let styleSheet = css.parse('body { font-size: 12px }');
  let styleSheet = css.parse(source);

  console.log('this.resourcePath', this.resourcePath)

  // 从 path 获取 name
  let name = this.resourcePath.match(/([^/]+).css/)[1];

  for (let rule of styleSheet.stylesheet.rules) {
    rule.selectors = rule.selectors.map((selector) => {
      return selector.match(new RegExp(`.${name}`)) ? selector : `.${name} ${selector}`;
    });
  }

  console.log('typeof css.stringify(styleSheet)', typeof css.stringify(styleSheet))

  return `
    let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))}
    document.documentElement.appendChild(style);
  `;
};
