/*
 * @Author: your name
 * @Date: 2020-04-28 14:32:45
 * @LastEditTime: 2020-04-28 16:02:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /week03/covertNumberToString.js
 */

function covertStringToNumber(string, radix) {
  let chars = string.split('');
  let number = 0; // 最终返回的 number 结果
  let i = 0; 
  let j = string.length - 1; // 从字符串最后一位开始的 index
  // 整数部分的处理，使用 while 可以更好的进行控制和分段
  while (i < chars.length && chars[i] !== '.') {
    // 获取下一位数字时，先通过乘以进制数来使之前的数字扩大一个量级
    number = number * radix;
    // 利用字符的 codePoint 来获取数字值
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  let decimalPointIndex = i;
  // 小数点位让 i 自增，进入到对小数的处理
  if (chars[i] === '.') {
    i++;
  }
  let decimal = 0;
  // 小数部分的处理
  while (j > decimalPointIndex) {
    decimal += chars[j].codePointAt(0) - '0'.codePointAt(0);
    decimal = decimal / radix;
    j--;
  }
  return number + decimal;
}

const res = covertStringToNumber('10.1',10);
console.log('res', res)
