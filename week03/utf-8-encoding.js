/*
 * @Author: your name
 * @Date: 2020-05-06 21:38:14
 * @LastEditTime: 2020-05-06 23:11:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /undefined/Users/harry/Documents/GeekTime-courses/Frontend-01-Template/week03/utf-8-encoding.js
 */

function encodeToUTF8(str) {
  let utf8Code = ''; // 编译后 utf-8
  let result = []; // 最终返回的十六进制项数组
  const codePoint = str.codePointAt();
  // 判断是否为一个字符，由于超过 65535 之后的字符在 JS 中其 `length` 为 2，所以还需要判断 codePoint
  if (str.length !== 1 && codePoint <= 65535) {
    throw new Error("只能传入单个字符")
  };
  const binary = codePoint.toString(2); // Unicode 码点二进制表示
  //编码
  if (binary.length <= 7) {
    utf8Code = '0' + binary.padStart(7, 0);
  } else {
    let rest = binary;
    while (true) {
      if (rest.length < 6) {
        utf8Code = `110${rest}`.padStart(8,1) + utf8Code;
        break;
      }
      utf8Code += `10${rest.slice(-6, rest.length)}`;
      rest = rest.slice(0, -6);
    }
  }
  // 拆分为八位二进制为一项的数组
  for (let l = utf8Code.length; l > 0; l -= 8) {
    let str = utf8Code.slice(l - 8, l)
    result.unshift(str);
  }
  return result.map((binary) => parseInt(binary, 2).toString(16)); // 转换为十六进制
}

const res = encodeToUTF8('赵');
console.log('res', res);
