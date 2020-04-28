/*
 * @Author: your name
 * @Date: 2020-04-28 16:03:36
 * @LastEditTime: 2020-04-28 17:30:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /week03/covertNumberToString.js
 */
function covertNumberToString(number, radix) {
  let integer = Math.floor(number);
  let decimal = number - integer;
  let string = '';

  while (integer > 0) {
    // 除以进制数求余数来获取个位数
    string = (integer % radix) + string;
    integer = Math.floor(integer / radix);
  }

  string += '.';

  while (decimal < 1) {
    decimal = decimal * radix;
    let unit = Math.floor(decimal);
    if(unit === 0) break;
    string = string + unit;
    decimal = decimal - unit; 
  }
  return string;
}

var value = covertNumberToString(102.423, 10);
