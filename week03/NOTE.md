# 每周总结可以写在这里

# 01.重学 JavaScript | 表达式，类型转换

[toc]

## 上节课遗留问题

IEEE 754 Double Float 浮点数转换为位（bit）表示。



winder 提供的转换工具：https://jsfiddle.net/pLh8qeor/19/ 工具界面：

<img src="assets/image-20200425151052716.png" alt="image-20200425151052716" style="zoom:50%;" />

上面部分是二进制位（0和1 表示），下面输入框可以输入十进制浮点数。通过 vue 的 watch，将输入的浮点数转换为上面位的表示，从而可以更清楚的看到浮点数在内存中布局的情况，从而帮助我们理解 float。

### 一个机制

在讲这个机制之前，我们先来了解一下 IEEE 754 Double Float 具体是怎么来表示数字的。

> JavaScript 中的常规数字以 64 位的格式 [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754-2008_revision) 存储，也被称为“双精度浮点数”。这是我们大多数时候所使用的数字，而这种“双精度浮点数”是用**二进制的科学计数法**来表示的，在计算机上是以二进制来进行存储的，单精度浮点数占用32位，双精度浮点数占用64位，如下图是 64 位双精度浮点数：
>
> ![img](assets/v2-0faecd08386e94b0259056de48dcde9e_1440w.jpg)
>
> 最高位是**符号位(sign)**，**0**表示正数，**1**表示负数。接下来的11位储存的是的**指数(exponent)**，最后是52位储存的是**小数(fraction)**。浮点数的值可以用下面这个式子算出，类似于十进制的科学计数法。
>
> ![image-20200425211905743](assets/image-20200425211905743.png)
>
> 那么，既然谈到科学记数法，我们就来了解一下科学记数法。
>
> #### 科学记数法
>
> **科学记数法**（英语：Scientific notation，英国则称为 Standard form），又称为**科学记数法**或**科学记法**，是一种数字的表示法。科学记数法最早由[阿基米德](https://www.wikiwand.com/zh-hans/阿基米德)提出。
>
> 在科学记数法中，一个[数](https://www.wikiwand.com/zh-hans/數)被写成一个[实数](https://www.wikiwand.com/zh-hans/實數)![a\,](assets/1d73aa5354c24942dab5316be466465a9d171510.svg)与一个10的![n\,](assets/205e33e6845813cc72ca346b896a7945f90ca373.svg)次[幂](https://www.wikiwand.com/zh-hans/幂)的积：
>
> ![a \times 10^n\,](assets/d8bdcbab5a43aa52a7bda118d10ffdd9f6e8bba9.svg)
>
> 其中 ：
>
> - ![n\,](https://wikimedia.org/api/rest_v1/media/math/render/svg/205e33e6845813cc72ca346b896a7945f90ca373)必须是一个整数
> - ![1\le|a|<10](assets/6f211e9c01ef43ced05b0e8908ef763365efede0.svg)（如果 ![|a|\,](assets/9b769e3c31b2dafbe243dc419c40f57d321c2794.svg) 是一个小于1的小数，或 ![|a|\,](https://wikimedia.org/api/rest_v1/media/math/render/svg/9b769e3c31b2dafbe243dc419c40f57d321c2794) 大于等于10，皆可通过改变 ![n\,](https://wikimedia.org/api/rest_v1/media/math/render/svg/205e33e6845813cc72ca346b896a7945f90ca373) 来表示）s
> - ![a\,](https://wikimedia.org/api/rest_v1/media/math/render/svg/1d73aa5354c24942dab5316be466465a9d171510)是一个[实数](https://www.wikiwand.com/zh-hans/實數)，可称为**有效数**（英语：[significand](https://www.wikiwand.com/en/significand)）或尾数（英语：[significand](https://www.wikiwand.com/en/significand)）（英语：mantissa，在一些讨论[浮点数](https://www.wikiwand.com/zh-hans/浮點數)或[对数](https://www.wikiwand.com/zh-hans/对数)的文献中，亦使用尾数这个词，但定义与范围不一定相同，因此加以说明，以避免混淆）。
>
> 在[电脑](https://www.wikiwand.com/zh-hans/电脑)或[计算器](https://www.wikiwand.com/zh-hans/计算器)中一般用EXP或E（[Exponential](https://www.wikiwand.com/zh-hans/冪)）来表示10的幂：
>
> - 7.823E5=782300
> - 1.2e−4=0.00012
>
> #### 用科学记号的好处：
>
> 当我们要表示非常大或非常小的数时，如果用一般的方法，将一个数的所有位数都写出来，会很难直接确知它的大小，还会浪费很多空间。但若使用科学记数法，一个数的[数量级](https://www.wikiwand.com/zh-hans/数量级)、[精确度](https://www.wikiwand.com/zh-hans/精確度)和[数值](https://www.wikiwand.com/zh-hans/数值)都较容易看出，例如于[化学](https://www.wikiwand.com/zh-hans/化學)里，以[公克](https://www.wikiwand.com/zh-hans/公克)表示一个[质子](https://www.wikiwand.com/zh-hans/質子)[质量](https://www.wikiwand.com/zh-hans/質量)的数值为︰
>
> ![{\displaystyle 0.00000000000000000000000167262158}](assets/3c78547d57c143afc2c34fde538aec3381fbd8d4.svg)
>
> 但如果将它转成科学记数法的形式，便可不需要写那么多零︰
>
> ![{\displaystyle 1.67262158\times 10^{-24))](assets/12cd52a2c7787fdebdbbd93aed3ee6901dc37dd5.svg)
>
> 
>
> 又例如，若以[公斤](https://www.wikiwand.com/zh-hans/公斤)为表示单位，则[木星](https://www.wikiwand.com/zh-hans/木星)的质量值约为：
>
> ![{\displaystyle 1898130000000000000000000000}](assets/52039acff323c10e51ebc2aadb6619d971a2e8b4.svg)
>
> 像这样的大数亦无法直接用列出所有位数的方式表达出精确度，但科学记数法就能用下方形式明白的表示出来：
>
> ![{\displaystyle 1.89813\times 10^{27}\,}](assets/7a432b1fabae8334ad2bc16b1d3ecdd66040edf7.svg)
>
> 所以，比较两个数时，可以先看其数量级，也就是其**次幂数**的大小，然后再看其实**实数（有效数）**的大小。
>
> #### 那么什么是实数？
>
> 在[数学](https://www.wikiwand.com/zh-hans/數學)中，**实数**是[有理数](https://www.wikiwand.com/zh-hans/有理數)和[无理数](https://www.wikiwand.com/zh-hans/無理數)的总称，前者如![{\displaystyle 0}](assets/2aae8864a3c1fec9585261791a809ddec1489950.svg)、![{\displaystyle -4}](assets/addc8519724f81b43a6883c5eb2c996f9fc2996f.svg)、![{\displaystyle {\frac {81}{7))}](assets/772fe391e9a16ae2073fa6da4415099488acef71.svg)；后者如![{\sqrt {2))](assets/b4afc1e27d418021bf10898eb44a7f5f315735ff.svg)、![\pi ](assets/9be4ba0bb8df3af72e90a0535fabcc17431e540a.svg)等。实数可以[直观](https://www.wikiwand.com/zh-hans/直觀)地看作[小数](https://www.wikiwand.com/zh-hans/小数)（[有限](https://www.wikiwand.com/zh-hans/有限小数)或[无限](https://www.wikiwand.com/zh-hans/无限小数)的），它们能把[数轴](https://www.wikiwand.com/zh-hans/数轴)“填满”。但仅仅以[枚举](https://www.wikiwand.com/zh-hans/枚举)的方式不能描述实数的全体。实数和[虚数](https://www.wikiwand.com/zh-hans/虚数)共同构成[复数](https://www.wikiwand.com/zh-hans/复数_(数学))。
>
> #### 什么是有理数？
>
> [数学](https://www.wikiwand.com/zh-hans/数学)上，可以表达为**两个整数比**的数(![{\frac {a}{b))](assets/9fbb66e57f89debc3cde3213de12228971148a93.svg), ![{\displaystyle b\neq 0}](assets/ad073253b4c817f2ec7e3dd7517b7f89a8e581dc.svg))被定义为**有理数**，例如![{\displaystyle {\frac {3}{8))}](assets/f6fe52a498e9788c548326304098d2122ca4645d.svg)，0.75(可被表达为![\frac{3}{4}](assets/7572f1241ec7c2f9311985bc3dfb0b7d6f491e44.svg))。整数和分数统称为有理数。与有理数对应的是[无理数](https://www.wikiwand.com/zh-hans/无理数)，如![{\sqrt {2))](https://wikimedia.org/api/rest_v1/media/math/render/svg/b4afc1e27d418021bf10898eb44a7f5f315735ff)无法用整数比表示。
> 有理数与[分数](https://www.wikiwand.com/zh-hans/分數)形式的区别，[分数](https://www.wikiwand.com/zh-hans/分數)形式是一种表示比值的记法，如 [分数形式](https://www.wikiwand.com/zh-hans/分數)![{\frac {\sqrt {2)){2))](assets/2fb9b5960bf5eae3065db9c23495e465f5fef61e.svg)是[无理数](https://www.wikiwand.com/zh-hans/无理数)。
> 所有有理数的[集合](https://www.wikiwand.com/zh-hans/集合_(数学))表示为**Q**，Q+,或![\mathbb{Q}](assets/c5909f0b54e4718fa24d5fd34d54189d24a66e9a.svg)。定义如下：
>
> ![\mathbb{Q} = \left\{\frac{m}{n} : m \in \mathbb{Z}, n \in \mathbb{Z}, n \ne 0 \right\}](assets/5d32c576a132a89e30c1083da67c4423d2a37227.svg)
>
> 有理数的[小数](https://www.wikiwand.com/zh-hans/小数)部分有限或为[循环](https://www.wikiwand.com/zh-hans/循环小数)。不是有理数的[实数](https://www.wikiwand.com/zh-hans/實數)遂称为[无理数](https://www.wikiwand.com/zh-hans/無理數)。
>
> #### 什么是无理数？
>
> **无理数**是指除[有理数](https://www.wikiwand.com/zh-hans/有理数)以外的[实数](https://www.wikiwand.com/zh-hans/实数)，当中的“理”字来自于[拉丁语](https://www.wikiwand.com/zh-hans/拉丁语)的rationalis，意思是“理解”，实际是拉丁文对于logos“说明”的翻译，是指无法用两个[整数](https://www.wikiwand.com/zh-hans/整数)的比来说明一个无理数。
>
> 非[有理数](https://www.wikiwand.com/zh-hans/有理數)之[实数](https://www.wikiwand.com/zh-hans/實數)，不能写作两整数之比。若将它写成[小数](https://www.wikiwand.com/zh-hans/小数)形式，小数点之后的数字有无限多个，并且不会循环，即无限不循环小数（任何有限或无限循环小数可被表示称两个整数的比）。常见的无理数有大部分的[平方根](https://www.wikiwand.com/zh-hans/平方根)、[π](https://www.wikiwand.com/zh-hans/圓周率)和[e](https://www.wikiwand.com/zh-hans/E_(数学常数))（其中后两者同时为[超越数](https://www.wikiwand.com/zh-hans/超越數)）等。无理数的另一特征是无限的[连分数](https://www.wikiwand.com/zh-hans/連分數)表达式。
>
> [传说](https://www.wikiwand.com/zh-hans/傳說)中，无理数最早由[毕达哥拉斯](https://www.wikiwand.com/zh-hans/畢達哥拉斯)学派弟子[希伯斯](https://www.wikiwand.com/zh-hans/希伯斯)发现。他以几何方法证明![{\sqrt {2))](https://wikimedia.org/api/rest_v1/media/math/render/svg/b4afc1e27d418021bf10898eb44a7f5f315735ff)无法用[整数](https://www.wikiwand.com/zh-hans/整数)及[分数](https://www.wikiwand.com/zh-hans/分數)表示。而毕达哥拉斯深信任意数均可用整数及分数表示，不相信无理数的存在。后来希伯斯触犯学派章程，将无理数透露给外人，因而被扔进海中处死，其罪名竟然等同于“渎神”。另见[第一次数学危机](https://www.wikiwand.com/zh-hans/第一次數學危機)。
>
> 无理数可以通过有理数的[分划](https://www.wikiwand.com/zh-hans/分划)的概念进行定义。
>
> ##### 举例
>
> 1. ![{\sqrt {3))=1.73205080\cdots ](assets/cdacf2f0a987a1915c0e3dab89466f597c76d2e7.svg)
> 2. ![\log _{10}3=0.47712125\cdots ](assets/059ba71f3a28bf8ac882084080e5ca8b4a9855db.svg)
> 3. ![e=2.71828182845904523536\cdots ](assets/5bedbf847fc8605a6a660ec518c0f065de0bbc38.svg)
> 4. ![{\displaystyle \sin {45^{\circ ))={\frac {\sqrt {2)){2))=0.70710678\cdots }](assets/4025c40d3dd8d9a1f7fc53f67042002c0078d93f.svg)
>
> 好的，这样我们就知道了什么是科学记数法，以及与科学记数法相关的概念，总的来说，科学记数法就是一种表示数的形式。那么为什么用当用二进制科学记数法来表示十进制数时会出现精度丢失的问题？
>
> 这个问题首先要从**数位表示法**说起。今天我们看到的 `123` 这样的十进制数，是自然而然的理解其意义，但是有没有深究其内在的数学原理呢？
>
> 所谓十进制是 `0~9` 十个基本符号为基础的一种**数字表示法**，数位表示法是将一串**基本符号从左到右连续排列**的一种方法。为什么 `12` 是表示一十二，而不是二十一，或者是一加二的意思呢？因为数字所处的位置是有特别意义的，最右边第一个数字符号，代表基本的数0~9，而第二位的意义并不是`0~9`，而是`0*10`~`9*10`。推而广之，百位是`x*100`，（`x`是数字符号），用简练的数学公式就是`x*10^k `, 个位`k`是`0`，十位`k`是 `1` ，百位 `k` 是 `2` ，从右到左一直数下去。`123` 的意思就是`1*10^2+2*10^1+3*10^0`。
>
> **位置，进制，符号**这三者的关系就是 `“123”` 这种数字表示法内在的数学原理。
>
> 那么，`0.1` 是什么意思？是 `1*10^-1` ，向右数数的结果。小数点是为了区分个位的位置在哪里。
>
> 一个数要用**“数位表示法”**表示出来，必然需要能够化为`x*10^k`的形式，而并不是任意数都能够做到。从数位法小数的定义看可以得知，一个数要能够被表示出来，需要能除尽 `10`，才有若干个`x*10^k `的数位组合表示它，否则就是无数个符号才能表示。如`1/3`这个数除以`10`等于`1/3*1/10 = 0.0333333….`循环小数。
>
> 究竟哪些数可以用十进制表示哪些不可以？如**分母是10的因子和因子的合数**，如1，2，5，10，20，50等（当数的分母为 1 时，就是整数的时候，由于其分母可以用任意数进行表示，所以是可以通过科学记数法进行表示的。比如 `2`，写成分数 `2 * 2 / 1 * 2`）。
>
> 回答题目，为什么`0.1`无法被二进制小数表示，`0.1`即`1/10`这个数要转换成二进制即`x*2^k`的组合数，必须要除尽`2`.要注意，`2`进制只有`0，1`两个符号，另一个需要注意，二进制被除数右移一位等于`*2`，而非`10`进制的`*10`。
>
> 那么 `2` 进制能够表示哪些十进制小数，`5/10`，因为能约成`1/2`，分母是`2`的因子。
>
> 总结一点，就是**位置表示法**有其自身的缺陷，**并不能在有限的数位，表示众多有理数**，这个时候，需要借助分数来帮忙，来避免位置表示法以固定数作分母这个缺点。
>
> 
>
> 以上内容摘自：
>
> - [为什么0.1无法被二进制小数精确表示？](https://www.cnblogs.com/nobel/archive/2013/04/08/3009162.html)
> - [详解二进制浮点数](https://zhuanlan.zhihu.com/p/58731780)
> - [浮点数的二进制表示](https://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html)



有效数字问题。比如 10 进制的有效数字，其第一位是非 0 的值，同理，二进制也是非 0 的值。而二进制与十进制的不同在于，其只有 0 和 1 两种数字。那么基于此，在 IEEE 754 中做了一个操作，它将第一位忽略不显示，原因是只要是二进制数其第一位不可能是 0，那么不是 0，就一定是 1，一定是 1 就可以省略从而能够节省一位的空间。

### 0

0 在内存中用位进行表示时，有正 0 和负 0，上图中就是第一个位（蓝色），0 表示正，1 表示负。

虽然有正零和负零，但是在数据层面来说是完全相等的，只不过在内存中的表示不同。

#### 如何区分是正零还是负零

```js
function check(zero){
  if(1/zero === Infinity){
    return 1
  }
  if(1/zero === -Infinity){
    return -1
  }
}
```

- 用 `1` 去除以这个 `0`，如果是正零，则等于 `Infinity` ，否则等于 `-Infinity`



衍生到取符号的方法：

```js
function sign(number){
  return number / Math.abs(number)
}

sign(100)  // => 1
sign(-200)  // => -1

sign(0) // => NaN
```

- 这个方法传入 0 时，会返回 `NaN` ，原因规范规定了 `0/0` 会返回 `NaN` ：

  > Division of a zero by a zero results in NaN; division of zero by any other finite value results in zero, with the sign determined by the rule already stated above.
  >
  > 零被零除以零的结果为NaN；零被任何其他有限值除以零的结果为零，其符号由上述规则决定。
  >
  > (from 12.7.3.2 Applying the / Operator)

那么我们就应该针对传入 `0` 的情况做处理：

```js
function sign(number){
  if(1/number === Infinity){
    return 1
  }
  if(1/number === -Infinity){
    return -1
  }
  if(1/number === 0){
    return 1
  }
  if(1/number === -0){
    return -1
  }
  return number / Math.abs(number)
}
```

- 当然其实不只是要处理 `0` ，还有对于传入非零值的处理，还有 `Infinity` 也会返回 `NaN`
- 所以要写一个完整、稳定的 `sign` 函数还是有点难度的。
- 要记得用去思考如何对 `sign` 做单元测试。



### 另一个问题

为什么 `Math.abs(1.3 + 1.1 - 2.4) < Number.EPSILON` 不对。

> `Number.EPSILON` 是用于测试浮点数的运算是否相等，比如：
>
> ```js
> x = 0.2;
> y = 0.3;
> z = 0.1;
> equal = (Math.abs(x - y + z) < Number.EPSILON);
> ```

这里 winter 给出的解释是，`1.3` `1.1` `2.4` 在转换为二进制时有三次精度丢失，然后在进行 `+` 和 `-` 的运算时会有两次的精度丢失，一共有五次的精度丢失，累计起来就会使其绝对值超过 `Number.EPSILON` 的值。但是呢，通过上面的 MDN 上给出的例子，一样也是所谓的五次精度丢失，所以这个可以将 winter 所说的原因证伪。

但是，他后面说的挺有道理。他说不同的浮点数进行转换时会产生不同的精度损失，所以我们应该设置一个自己的可接受损失值而不是使用环境所提供的 `Number.EPSILON` ，只是 `Number.EPSILON` 精度损失值是一个非常非常小的值，如果能小于它，那么说明计算的结果已经非常非常的准确了。

那么我们如何解决关于精度计算的问题？

最可靠的方法是借助方法 [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 对结果进行舍入：

```javascript
let sum = 0.1 + 0.2;
alert( sum.toFixed(2) ); // 0.30
```

请注意，`toFixed` 总是返回一个字符串。它确保小数点后有 2 位数字。如果我们有一个电子购物网站，并需要显示 `¥ 0.30`，这实际上很方便。对于其他情况，我们可以使用一元加号将其强制转换为一个数字：

```javascript
let sum = 0.1 + 0.2;
alert( +sum.toFixed(2) ); // 0.3
```

​	那么，我们来对 `1.3 + 1.1` 的结果进行验证，可以这样做：

```js
var a = 1.3;
var b = 1.1;
var isEqual = +(a + b).toFixed(1) === 2.4
isEqual // => true
```



## Expression 表达式

上节课我们讲了 Atom 部分，也就是词法部分，这节课开始我们将要进入语法部分的讲解。

Expression 是一个基础结构，通过这个结构我们可以让计算机做最为重要的工作：计算。大部分的主体内容也是由 expression 来做的。

我们会分成 Grammar（语法）和 Runtime（运行时）两部分来讲。

### Grammar

表达式中运算符的优先级是通过生成树的结构来实现的：

![image-20200426114109495](assets/image-20200426114109495.png)

比如上图中的表达式 `1 + 2 * 3` ，其实是将 `+` 的左边与右边分别生成两个节点，由于右边又是一个由运算符 `*` 组成的新的表达式 `2 * 3` ，所以又生成了新的节点。

运算符的优先级是从使用者（程序猿）的角度来说的，而从语言的实现和定义的角度来看，而被称为树的结构或者语法，这部分内容实际上在产生式那一节有讲。

#### Member & New

Member 可以直接认为是取属性的运算，属性或是成员访问

![image-20200426114536047](assets/image-20200426114536047.png)

Member 和 New 运算符是优先级最高的运算符。

> MemberExpression 在 ECMA-262 12.3 Left-Hand-Side Expressions 章节。



Member 有如下具体的表达方式：

- `a.b`  

  - 访问属性成员

- `a[b]` 

  - 传入字符串就和 `a.b` 等效，只是可以传入表达式，传入变量可以在运行时动态访问数据。比如来自于用户输入。

- `super.b` && `super['b']`

  - `super` 可以当作构造函数来使用，不过只能在 `class` 环境中使用，比如在 `constructor` 或是方法成员中调用。

  - `super` 关键字用于访问和调用一个对象的父对象上的函数。

  - `super` 可以像构造器去使用，也可以用于访问其父对象上属性，访问之前需要先调用 `super()` 来实例化一个父类对象：

    ```js
    class Parent{
    	constructor(){
        this.a = 1;
      }
    }
    
    class Child extends Parent{
      constructor(){
    		super(); // 我理解为实例化一个父类对象,并将其绑定到 this 上，这样才能在之后访问其属性
        console.log(this.a)
    	}
    }c
    ```

- `new.target`

  - 这个表达式只能完全的使用这几个字符来访问，而不能 `new.xxx` 这样。
  - 同样，这个表达式只能在构造函数中使用。
  - **`new.target`**属性允许你检测函数或构造方法是否是通过[new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符被调用的。在通过[new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符被初始化的函数或构造方法中，`new.target`返回一个指向构造方法或函数的引用。在普通的函数调用中，`new.target` 的值是[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。
  - `new.target` 用于什么地方？
    - 用于判断函数是否是通过 `new` 来调用的，并且能够知道是在 `new` 哪一个函数。因为非 `new` 时，其值为 `undefined` 。
    - 不过能判断是否通过 `new` 来调用基本上用不到，只是对于某些库的作者不希望使用者通过非设计方式来调用，或者说可以知道这个构造函数是通过什么方式来调用从而采取不同的处理方式，这属于防御性的 Feature.

- ```js
  foo`string`
  
  var name = 'enxiao'
  
  function foo(){
    console.log(arguments)
  }
  
  foo`Hello ${name}!`
  // =>
  0: Array(2)
  	0: "Hello "
  	1: "!"
  	length: 2
  	raw: (2) ["Hello ", "!"]
  1: "enxiao"
  ```

  - 将字符串和变量分为两个序列传入函数中，这就像之前讲字符串模版时所说的，会将字符串模版分段，会将表达式与字符串进行分割，然后传入函数时，就是将所有的字符串放入一个数组传入第一个参数位置，之后再依次传入每一个表达式的返回值作为其后的每一个参数，最后调用。
  - 这个可以用于之后写四则运算题。

- `new Foo()` 与 `new Foo` 的优先级不同。

  ```js
  function class1(){
  	return 'class1'
  }
  
  function class2(){
    return class1;
  }
  
  new class2 // => f class1(){} 这里是，如果构造函数内部返回了一个对象，则在通过 new 关键字进行实例化时会返回这个对象，而不是类的实例
  
  class2() // => f CLASS1(){} 与如上的结果相同
  
  new new class2()
  
  //上面这个表达式程序如何理解？
  //是以 new (new class2)() 来执行
  //还是以 new (new class2()) 来执行
  //答案是第二种
  ```



#### Reference

![image-20200426225727945](assets/image-20200426225727945.png)

member 运算所返回的类型是： `Reference` 类型

```js
var o = {x: 1};
o.x + 2 // => 3
1 + 3 // => 1
// 以上，从执行结果来看没有任何区别
delete o.x
delete 1 
// 但当通过 delete 去操作时就不同了
```

- 之所有 `delete` 可以对 `o.x` 进行操作，是因为 `o.x` 会返回 `Reference` 类型
- 在进行加法运算时，会将引用类型的值找出然后进行计算。

`Reference` 类型由两部分组成：

- Object （上面式子中的 `o` ）
- Key （上面式子中的 `x` ）

`Reference` 很像指针概念的东西，是既能读又能写的参数。比如，`+` 号运算符有读的能力，而 `delete` 操作符有写的能力。

有写的能力的运算符有两个：

- `delete`
- `assign`

我们也可以认为引用类型只有在写的时候才和其他的数据类型有区别，在读的时候都是一样的。（我觉得这里之所以这样说，是指针对于这个运算符操作的时候，因为当你执行 `o.x + 2` 和 `1+3` 实际上对于 `+` 这个运算符来说确实没有区别，但是对于整个程序来说差别就大了，一个是动态值而另一个是静态值，在程序运行时是可能完全不同的两个值）

#### call

接下来讲比 `new` 优先级更低的表达式 `call` ：

![image-20200426232856490](assets/image-20200426232856490.png)

对于 `new a()['b']` 会先执行 `new a()` 再执行 `['b']` 访问成员，而不是先执行 `a()['b']` 再 `new`

#### Left Handside & Right Handside

![image-20200426231725386](assets/image-20200426231725386.png)

上面学到的 `Member` `new` `call` 三种表达式可以属于 `Left Handside` ，其余表达式属于 `Right Handside` 

Left Handside & Right Handside 指的是等号的左边与右边。也就是有些表达式只能放到等号左边，有些表达式只能放到等号右边。所以在不同的语言部分都有这个概念。

```js
let obj = {};

function foo(){
	return obj
}

foo() = 1 // 会报错，但是并不是说这不符合语言规范，只是宿主（host）不允许这样做，算是一种约定俗成的规范
foo()['b'] = 2 

obj // => {b: 2}
```

#### Update

![image-20200426233114227](assets/image-20200426233114227.png)

由于环境不允许出现 `++ a ++` 这样的语句，所以允许去深究前自增与后自增的优先级问题。

```js
 var a = 1, b = 1, c = 1;
a
++
b
++
c
[a, b, c] // => [1, 3, 3]
```

- 可以看到是 `b` 和 `c` 自增了，这是因为 `a ++` ，`a` 的后面不允许出现换行符。

#### Unary（单目运算符、一元运算符）

![image-20200427202816985](assets/image-20200427202816985.png)

- 这里要注意 `await` 也是单目运算符。

- `void` 在 js 中是一个运算符，其运算结果是 `undefined` ，无论其后面是什么。

  - 对于运行时来说没有什么作用。

  - 不过它有一个非常重要的作用是生成 `undefined` ，比如 `void 0` ，这是因为 `undefined` 在 js 中可以作为变量来使用，当你用一个被赋于其他值的 `undefined` 赋值给一个变量时就会发生错误。所以，如果要使用 `undefined` 值，就使用 `void 0` 来代替。

  - `void` 也能像空格一样起到改变语法结构的作用。比如：

    ```js
    for(var i = 0; i < 10; i++){
        var button = document.createElement('button');
        button.innerHTML = i
        (function (i){
    			button.onclick = () => console.log(i)
    		})(i)
        document.body.append(button)
    }
    ```

    在这个例子中，为了保证每一个按钮点击所打印的数字都是其按钮上显示的数字，我们使用了 IIFE（立即执行函数表达式）来产生一个闭包存储不同的 `i` 值。但这里的 IIFE 是通过添加在函数外层添加括号的方式来实现的，但其会产生问题，如下：

    ```js
    (function (i){
    			button.onclick = () => console.log(i)
    		})(i)
    (function (i){
    			button.onclick = () => console.log(i)
    		})(i)
    ```

    当存在上面这种没有在 IIEF 之后添加分号的情况时，就会将下面的依然是上面语句的一部分，从而产生问题。所以这里我们可以适应 `void` 来产生一个 IIFE：

    ```js
    for(var i = 0; i < 10; i++){
        var button = document.createElement('button');
        button.innerHTML = i
        void function (i){
    			button.onclick = () => console.log(i)
    		}(i)
        document.body.append(button)
    }
    ```

- `~` 是按位取反，之后会有课程专门讲位运算。

- `! ` 非运算，我们可以使用 `!!a` 来做转化为布尔值的运算。



#### Exponentail（指数运算）

![image-20200427210148206](assets/image-20200427210148206.png)

指数运算是唯一一个右结合的运算符。

#### Multiplicative（乘法）

- `*` `/` `%`

#### Additive （加法）

- `+` `-`

#### Shift（左右移位）

- `<<` `>>` `>>>`

#### Relationship（关系）

- `<` `>` `<=` `>=` `instanceof` `in`

#### Equality（等式）

- `==` `!=` `===` `!==`

#### Bitwise（按位）

- `&` `^` `|` 

#### Logical（逻辑运算）

- `&&`  `||`

- 逻辑运算是短路逻辑，当某一表达式的结果符合`&&` 或 `||` 预期值（`&&` 预期 `falsy` 值，`||` 预期 `truthy` 值）则直接返回，比如：

  ```js
  function foo1(){
    console.log('foo1')
    return false
  }
  
  function foo2(){
    console.log('foo2')
  }
  
  foo1() && foo2() // => false 并打印 1
  ```

  这里由于 `foo1()` 返回 `false` 造成整个表达式被短路，`foo2()` 并没有执行。

  所以，并非先将两边的表达式都执行完之后再做运算。

#### Conditional

- ` x ? y : c` 三目运算符和上面两个逻辑运算符相同同样是短路逻辑。如果 `x` 为 `true` 则执行 `y` 否则执行 `c` ，并不会两者都执行。

> 问题：JS 中有几种加法？
>
> 两种，number 之间和 string 之间
>
> 有几种乘法
>
> 一种，number 之间相乘



以上我们所学习的大多数运算符都是支持所有数据类型，但却并不是对所有的数据类型都能做运算，所以这里就涉及到类型转换的问题。

比如：

- 加法要么两边是数字，要么两边是字符串。
- `a.b` （member），其左边一定是一个对象，所以你得转成对象，右边可以是 Symbol 或是 string。
- `a++` 的 `a` 必须是一个 number 
- `delete a.b` 右边得是一个 Reference
- `typeof a` 右边是什么都可以
- `~ a` 右边是 number 还得是整数
- `await a` 右边得是 `Promise`
- `in` 前面是 symbol 或 string 后面是 obj

### Type Convertion

![image-20200427212925416](assets/image-20200427212925416.png)



##### 装箱

原始类型 -> 对象类型

- `Number` `String` `Boolean` `Symbol` 四个类正好对应四种数据类型 `number` `string` `boolean` `symbol` ，需要注意的是它们是不同的东西，通过 `typeof` 就能看到其输出的类型不同。在使用它们进行运算时，会因为不同运算符而相互转换。

- `Number` `String` `Boolean` 在不使用关键字 `new` 调用时，则是显示的做类型转换，比如 `String(1)` 会将 `number` `1` 转换为 `string` `'1'` 。所以，对于需要转换数据类型的时候，推荐使用这种显式的方式来转换数据类型，虽然代码上看起来很冗余，但提高了可读性，对理解代码实际意思有帮助。

  而使用 `new` 调用时则会传入的原始类型装箱返回对象。除了使用这三种类来进行装箱之外，也可以使用 `Object` 进行装箱，比如 `Object('s')` ，会返回一个 `String` 的对象，`Object` 使用 `new` 和不使用都相同。

- `Symbol` 只能通过直接调用来获取一个 `symbol` 类型的值，而不能通过 `new` 来调用得到一个 `Symbol` 类对象，会提示 `Symbol is not a  constructor` ，但是可以通过 `Object` 来装箱获取：

  ```js
  Symbol('11') // => Symbol(11)
  typeof Symbol('11')  // => "symbol"
  
  typeof Object(Symbol('11')) // => "object"
  
  Object(Symbol('11')).constructor  // => ƒ Symbol() { [native code] }
  
  Object.getPrototypeOf(Object(Symbol('11'))) === Symbol.prototype // => true
  
  Object(Symbol('11')) instanceof Symbol // => true
  ```

  - 可以看到，`Symbol` 除了不能 `new` 之外，具备了 JS 类的其他特性，有 `prototype` `constructor` ，也能通过 `instanceof` 来查看被装箱后的值是否是 `Symbol` 的实例。

- 除了使用 `Object` 进行装箱之外，还可以使用以下方式来进行装箱：

  ```js
  (function (){return this}).apply(Symbol('1')) // => Symbol {Symbol(1)}
  ```

  - `apply` 的调用和使用 `.` 来访问相同，从而造成装箱的效果。（这里不是很明白）

- 装箱是将原始类型包装为对应对象类型，对于 `number` `string` `symbol` `boolean` `bigint` 而言是有对应的类对象的，而 `null` `undefined` 没有，通过 `Object` 进行装箱会返回一个空对象，而不是对应的类的实例对象。



##### 拆箱

对象类型 -> 原始类型

先看原始类型与对象类型相加的例子：

```js
1 + {} // =>"1[object Object]"

1 + {valueOf(){return 1}} // => 2

1 + {toString(){return 2}} // => 3

1 + {toString(){return '2'}} // => "12"

1 + {valueOf(){return 1},toString(){return '2'}} // => 2

'1' + {valueOf(){return 1}, toString(){return '2'}} // => "11"

1 + {[Symbol.toPrimitive](){return 'toPrimitive'},valueOf(){return 1},toString(){return '2'}} // => "1toPrimitive"
```

- 在对象没有提供 `valueOf` 或是 `toString` 方法时，会调用其原型上的 `toString` 方法或是 `valueOf` 方法。
- 如果对象上有 `valueOf` 或是 `toString` 方法时则会返回这个方法的调用结果作为其拆箱的值，如果两个方法都有，则以 `valueOf` 为主。
- 除了以上两个方法之外，如果对象上有 `[Symbol.toPrimitive]` 方法，则以这个方法的结果为主。

上面我们是返回原始值，我们试试返回对象值：

```js
1 + {[Symbol.toPrimitive](){return {}},valueOf(){return 1},toString(){return '2'}} // VM13504:1 Uncaught TypeError: Cannot convert object to primitive value at <anonymous>:1:3

1 + {valueOf(){return {}},toString(){return '2'}} // => '12'

1 + {valueOf(){return {}},toString(){return {}}} // VM13654:1 Uncaught TypeError: Cannot convert object to primitive value at <anonymous>:1:3
```

- `[Symbol.toPrimitive]` 不允许返回非原始值
- 当 `valueOf` 返回对象值，则返回 `toString` 的值
- 最后是不能都返回为非原始值

这部分也可以去看一下规范。或是看看现代的 JS 教程：https://zh.javascript.info/object-toprimitiv 

从现代 JS 教程中，我能看到 `[Symbol.toPrimitive]` 方法实际会接受一个叫做 `hint` 的值：

```js
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// 转换演示：
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

而这个 `hint` 就是指当一个对象被用在需要原始值的上下文中时，环境所「暗示」其转换的类型。有三种：`string` `number` `default` 



## 课后问答：

哪里能找到 ECMAScript 的测试用例？

- https://github.com/tc39/test262

如何防止用于下载用于显示在浏览器上的 pdf 问题？

- 这个没有办法，因为文件在用户的浏览器上，那么这个资源用户就有权下载，只是你可以通过一些方式来使用户下载的成本变高。
- 在浏览器端，用户的权限是高于前端代码能做到的权限的，并且很多时候你也需要获得用户的权限。





## 课程涉及内容

### 预习课件：

- 链接：[ https://pan.baidu.com/s/1jhqWjUk3K-HHmLpblRK-eg](https://pan.baidu.com/s/1jhqWjUk3K-HHmLpblRK-eg)
  提取码：yxa5

### 课后作业：

- 根据课上讲师已写好的部分，补充写完函数 convertStringToNumber
- 以及函数 convertNumberToString



### 参考链接：

- 讲师提供：
  - https://jsfiddle.net/pLh8qeor/19/
- 学员提供：
  - 运算符优先级：[ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

### 参考名词：

- LeftHandSideExpression：ECMA-262.pdf 201 页 12.3
- UpdateExpression：ECMA-262.pdf 178 页 11.9.1
- [IIFE ](https://zh.wikipedia.org/wiki/立即调用函数表达式)：Immediately-invoked Function Expressions 立即执行的函数表达式





# 02.重学 JavaScript | 语句，对象

[toc]

## Statement 语句

- 在 JS 中我们怎么去定义、理解语句。

![image-20200428205533479](assets/image-20200428205533479.png)

首先我们来讲语句分个类，在 Grammar 层面有三种分类：

- 简单语句
  - 只有一句，比如调用 `foo()` 
- 组合语句
  - 可以嵌套简单语句
- 声明
  - 会产生特殊行为



### Runtime

除了我们之前所说的八种从语法层面来说的数据类型之外，在 Runtime 中还有很多**内置类型**，虽然这些类型我们在写代码时碰不到，但当程序运行时它们却确实存在于内存之中。



两个概念：

- Completion Record
  - 早期版本就叫 Completion，指语句的执行结果
- Lexical Enviorment
  - 初始词法环境



#### Completion Record

![image-20200428210109744](assets/image-20200428210109744.png)

这个类型有三个字段：

- [[type]]；语句完成的类型，有五种取值，对应四个语句（除 normal 之外的）。
- [[value]]；之前所讲的八种语言类型。除此之外还有空值 `empty` 
  - 目前，只有 `throw` 和 `return` 会带这个字段
- [[target]]；一定是个 label

这些都是指**语句完成后**状态的描述。虽然 Completion Record 如果不去读规范，可能都不知道有这么个东西，但是它却在影响着语句的行为。之后也会在不同的语句中讲解它是如何发挥作用的。（以下简称 CR）



### 简单语句

![image-20200428211329682](assets/image-20200428211329682.png)

其中三个产生 normal，四个产生非 normal。

复杂语句中都是根据其产生的 type 来决定自己的执行过程。 

#### ExpressionStatement（表达式语句）

表达式本身就可以构成一个语句，也是语句中最主体的部分，其告诉计算机做运算。

```js
a = 1 + 2;
```



#### EmptyStatement（空语句）

也就是一个分号 `;` 

```js
;
```



#### DebuggerStatement（调试语句）

`debugger` 这个语句对于运行时而言不会发生任何作用，比如用户的电脑上，但是其在控制台中用于调试，产生中断，是规范留给引擎去实现的一个东西。

```js
debugger
```



#### ThrowStatement

其后面可以跟一个表达式

```JS
throw a;
```



#### ContinueStatement

```js
continue;
// or
continue [label1];
```

- 可带 `label` 

#### BreakStatement

```js
break;
// or
break [label2];
```

- 可带 `label`

#### ReturnStatement

其后面可以跟一个表达式

```js
return 1 + 2;
```



### 复合语句

![image-20200428212103410](assets/image-20200428212103410-1588080067883.png)

#### BlockStatement

![image-20200428212144277](assets/image-20200428212144277.png)

- 其由一对 `{}` 括起来构成，和对象的直接量构成方式相同。

- 会将多条语句括起来之后变成像是一条语句。所以它是形成我们语句非常关键的一个因素。

- 在最新的 ECMA 中，还能为 `let` 和 `const` 提供作用域。所以你可以在控制台中这样写代码：

  ```JS
  {
    const a = 1;
  }
  
  {
    const a = 1;
  }
  ```

- 正常情况下 BlockStatement 的执行结果就是 normal，但如果其内部 statement list 中的语句产生了非 normal 的结果则执行过程会被中断，比如：

  ```js
  {
    const a = 1;
    throw 1;
    const b = 2;
    console.log(b)
  }
  ```

  - 这里因为 `throw 1` 语句而中断了 block 语句的中的执行过程。

  - 这也是 `throw` `continue` `break` `return` 能够改变代码、语句执行顺序的基础逻辑，都在 block 中。

  - 不过对于 `continue` `break` `return` 需要在特定的语句下才能执行，比如 `continue` 需要在迭代语句中。否则会报：

    ```
    Uncaught SyntaxError: Illegal continue statement: no surrounding iteration statement
    ```

- blockstament 虽然很简单，其 block 内的语句是顺次执行，但如果其中某个语句产生了非 normal 的结果，就会打断这样的执行状态，从而能够产生代码结构化的特点（不是很懂，这个后面应该在讲代码结构化的部分会讲到）。

- 从这里我们可以看出，CR 的 type 是非常重要的东西，能够控制语句执行不执行，怎么执行。



#### Iteration

![image-20200428213817899](assets/image-20200428213817899.png)

这里先讲前 5 种，`for await(of)` 等着之后讲结构化，promise 的部分再展开。

Iteration 语句和别的语句不同的是，语句可以执行多次，而其他的只会执行一次。

上面偏黑色的部分可以声明变量，稍浅的部分可以放表达式，再浅的部分可以放 block statement

- `while` 是由一个表达式 + 语句的结构，由于有 block 语句的存在，所以其可以有多个简单语句。`while` 有个特点，如果其内部语句的 CR type 是 `continue` 或者 `break`，`while` 会将其消费掉。而不是简单的跳出这个语句，也就是说如果子语句出现 `continue` 或者 `break` 就会做相应的处理。如果是 `break` 就不执行了，`continue` 则中断这一次的 block，跳过这一次循环。

  - 如果 `break` 和 `continue` 的 CR 带有 label，则会由 `lable` 所指定的目标语句来消费。目前，`lable` 只有在循环语句中有作用。

- `do...while` 和 `while` 基本相同，只是多执行一遍语句。

- `for` 很特殊，上图中的偏黑部分可以放声明（`let` `const` `var`），对于 `var` 的声明都还好，因为其产生的变量只会在函数中产生作用域，而 `let` `const` 就会产生作用域，其范围在 block 之外。

  ```js
  for(let i = 0; i < 10; i++){
    console.log(i);
  }
  // => 0 1 2 3 4 5 6 7 8 9
  
  for(let i = 0; i < 10; i ++){
    let i = 0
    console.log(i);
  }
  
  // => (10) 0 
  
  {
    let i = 0;
    if(i < 10){
      let i = 0
    	console.log(i);
    }
    i ++
  }
  ```

  - 在第二个 for 循环的语句中，我们重新声明了一个 `i` 但是并没有报错，说明并不是在 block 中声明的。
  - 可以试想是在 block 之外还有一个 block，在那里声明了一个 i 

  - `let i = 0; i < 10; i ++` 这三句话可以理解为在循环外层有一个副作用域，如上 13 行开始的代码。

- `for in` 和 `for of` 在语句结构层面完全类似

  -  `for in`  循环一个对象的所有属性

- 而 `for of` 就稍微比较复杂，对任何可迭代属性的对象进行迭代，可以将其理解为一个语法糖，相当于调用了对象上的一个方法。

- `in` 运算符和 `for in` 中的 `in` 有语法冲突，所以 `for in` 中的表达式是不能出现 `in` 的，那么语法的规范中就出现了两种表达式，带 `in` 和不带 `in` （会有 ?in 的表示）



#### 标签、循环、break、continue

![image-20200429101601352](assets/image-20200429101601352.png)

所有的语句都可以加标签变成 `LabelledStatement` ，而只有 `IterationStatement` 和 `SwitchStatement` 语句能够消费标签的语句。

虽然所有的语句都可以支持添加标签，但是并不会有任何的作用，所以有些人会将这个特性用于在代码可读性上来帮助自己区别，比如：

```js
function Parent(){
  public:
  	this.a = a;
  	this.b = b;
  private:
  	var x = 3;
  	var y = 4;
}
```

- 在还没有 `class` 的时候，通过标签来区分公有成员和私有成员。
- 但是对于协同开发的项目来说，如果不事先有一个开发规范，那么就会使和你一起协同开发的人搞不清楚这是什么。
- winter 不推荐写这样模仿外观但却没有任何功能的代码，我们应该追求的是**表达能力**相近而不是长相相近。比如函数式编程，我们用 JS 的语法特性来实现其编程的能力，这样才有意义，改变外观会造成混淆和难以调试，并且可能会面对因为未来的更新造成程序出错。

LabelledStatement 其实非常的不常用，并且很多代码规范不推荐使用它。虽然使用它能够提升一些性能，但是这点性能实际上太小而没有多大意义，并且会让很多人读代码的过程中产生疑惑🤔。

#### try

![image-20200429104857061](assets/image-20200429104857061.png)

- try 是 js 语句中行为最为复杂的例子

- 每一个语句都需要带有花括号

- 除了 `throw` 语句之外，还有其他的语句能够产生 `throw` 的执行结果吗？

  - ExpressionStatement 可能会产生，比如 `1 = a` 所产生运行时错误。

- `catch` 后小括号的那部分所接受的变量和花括号共用一个作用域。

  - **作用域**是从语言的角度来描述，并不关心运行时和底层机制或是背后思想，只关心声明的变量有效的范围。

  ```js
  try{
      throw 1;
  }catch(e){
      let e = 1;
      console.log('catch')
  }
  // Uncaught SyntaxError: Identifier 'e' has already been declared
  ```

  - 可以看到在 `catch` 之后的语句块中我们重新声明变量 `e` 报错了，提示我们已经声明过。这个行为和 `for` 中声明的不同，和函数很像。

作用域与上下文的区别？

- 作用域指的是程序员电脑上，源代码中文本的范围。比如：

  ```js
  try{
      throw 1;
  }catch(e){
      console.log('catch')
  }
  ```

  - 这里 `e` 就只能作用于后面的 block 之中的文本区域。

- 执行上下文指在用户的电脑上，内存中存变量的地方，JS 在执行的时候，所需要的对象。

- ES3 中使用 `scope` 这个词来指代用户内存中的对象，新版换成了 `lexical environment`



### 声明（一种机制）

![image-20200429142823053](assets/image-20200429142823053.png)

#### FunctionDeclaration

```js
function foo(){
  
}
```

- 需要 `function` 关键字和名称
- `function` 位于语句开头，IIFE 是表达式，因为语句的开头并不是 `function` 关键字

下面这个是函数表达式，不要和函数声明混淆，完全不同：

```js
const foo = function (){
  
}
```

- 可以没有名称，并且也可以形成 IIFE

同理 ClassDeclaration 一样

#### ClassDeclaration

```js
class Cat{
  
}

const Dog = class {}
```

- 上面的类声明不允许缺少名称，会报错。

#### GeneratorDeclaration

```js
function *gen(){
  let i = 0;
  yield 1;
  yield 2;
  while(true){
    yield i++
  }
}
```

- Generator 可以理解为特殊的 function，其内部可以使用 `yield` 
- generator 可以用于模拟 await
- 标准的 generator 的用法就是向上面那样产生无尽的序列，或是分步返回多个值。
- Generator 和 Function 特性基本相同，比如可以有表达式
- 它属于结构化编程的一部分，所谓结构化编程就是我为你提供各种结构化的表达能力，比如对象、函数、过程等等，通过提供这些东西让你的表达更接近于自然的思维。比如，有 `while` 这种循环了，为什么还要搞其他的 `do...while` `for` ，明明 `while` 也能实现它们的能力，说白了就是提供多一个选项，从而你能够选择多一种「词汇」来进行表达，和写文章的词汇量一样。当然，前提是你和你的读者要对这不同的「词汇」有足够的理解，才能使表达更清晰而不含混。

#### AsyncFunctionDeclaration

为什么说异步很重要？

- 和性能没有关系，主要是代码结构的问题。

- 比如我们写一个时钟：

  ```js
  function tick(){
      var i = 0;
      setInterval(function(){
          console.log(i++)
      },1000)
  }
  ```

  - 上面是使用普通的函数，然后里面调用 `setInterval` 的方式

  ```js
  function sleep(m){
    return new Promise(resolve => {
  		setTimeout(resolve, m);
    })
  }
  
  void async function(){
    let i = 0;
    while(true){
      await sleep(1000)
      console.log(i++);
    }
  }();
  ```

  - 虽然和上面的效果相同，但是看起来更像是同步代码，就是等上面 `await` 执行完之后再执行后面的代码。

#### AsyncGeneratorDeclaration

```js
function sleep(m){
  return new Promise(resolve => {
		setTimeout(resolve, m);
  })
}

async function *gen(){
  let i = 0;
  while(true){
    yield i++
    await sleep(1000);
  }
}

void async function(){
  var g = gen();
  for await(let e of g){
    console.log(e)
  }
}()
```

- 具有 `Async` 和 `Generator` 两种函数的功能
- `for await` 就是为 `AsyncGeneratorDeclaration` 设计的。



#### VariableStatement（关于 `var` 及变量提升）

```js
var x = 0;
function foo(){
	var o = {x: 1};
  x = 2;
  with(o){
    var x = 3;
  }
  console.log(x)
}
foo(2) 
console.log(x)

// => 2
// => 0
```

- 为什么里面的函数打印的是 2，而外面的打印的是 0，原因是 `with` 语句块内的 `var x` 是在函数作用域的任何位置都可以被调用（提升，标准中叫 be BoundNames of VariableDeclarationList）。

  这个行为的产生是由于 runtime 在之前执行代码之前会做预处理，将声明的变量找出来放到一个列表中（包括其他的声明，只是 `class` `let` `const` 不允许你在声明之前使用。

三条关于使用 `var` 的注意事项：

- 如果有 `var` ，不建议大家写在任何的子结构之中，一定要写在 function 的范围内
- 有 `var` 写在函数的最前面，至少是这个变量第一次出现的位置。
- 不要在任何的 block 中去写 `var` 

现在也有编程规范规定完全舍弃 `var` ，比如之前 Udacity 上的课程。



除了 `var` 之外，之前我们所学到的四大函数声明也有提升的效果，但函数与 `var` 不同的是其被赋予的内容也可以使用。



#### ClassDeclaration

相比之前的声明，class 就合理很多了。

```js
var cls1 = 0;
function foo(){
  cls1 =2;
  class cls1{}
}

foo()

//VM151:3 Uncaught ReferenceError: Cannot access 'cla1' before initialization
```

- 会告诉你第 3 行对 cls 1 的赋值不能在类声明之前。
- 并且不允许重复声明
- `const` `let` 都是如此



### LexicalDeclaration

就是 `const` `let` 声明，特点和 `class` 相同。



## Object

这里将 JS 的对象机制，虽然 object 是一种数据类型，但也是 JS 结构化的一部分。

Object 在中文世界中不好翻译，在英文中 object 代表着世间万物，在大陆翻译为对象，但对象有目标性，比如打击对象，恋爱对象。台湾翻译为固件。中文其实有一个词很像「东西」「物」。

一种意识：对象这个概念其实不是一种数据存储的工具，如果讲结构体这个概念就是数据存储的工具。

### 对象的唯一标识性

![image-20200429215314973](assets/image-20200429215314973.png)

除了上面这个例子以外，还有一个例子是，有两个长的一模一样的苹果，你吃咬掉其中一个的一部分，另一个并不会变，从而你会知道这两个苹果不是同一个东西，这个概念从你 5 岁的时候就会建立。所以，不同的对象就是不同的，虽然长的一模一样，比如随着程序或是现实世界的改变，这两个对象可能发生不同的改变。

![image-20200429215807725](assets/image-20200429215807725.png)

如果在计算机中描述这个事情，在不考虑资源占用的情况下，就是先平铺直叙的创建三个对象，然后改变其中一个。当然，在计算机中可以用一些方式（比如原型、享元模式等）来复用减少资源并且也能达到目的。

还是之前提到的那点，任何符合图灵完备的语言都可以实现相同的逻辑，比如使用递归来实现 while，之所以不同的语言都这么多不同的特性，就是方便你用这些特性来清晰的表达你所要表达的内容，而不是拐弯抹角的去实现。这和你认识世界是相同的，你越是对世界的理解清晰，你的表达也会越清楚。

### 对象有状态

有状态即会改变。

![image-20200429220622993](assets/image-20200429220622993-1588169185818.png)

这里说的状态的改变即是行为。我的理解是行为导致其状态的改变，行为就是那个能量。 a => b ，这里的箭头就是行为。

### 对象三要素

![image-20200429221132464](assets/image-20200429221132464.png)

- 唯一性
- 状态
- 行为

所有的计算机语言，C 系（C C++ JAVA JAVASCRIPT python）或是非 C 系或是未来的语言，设计出来的对象一定会遵循这三要素，如果这三要素不满足则不是一个面向对象的语言了。

C++ 中将状态叫做成员变量，行为叫做成员方法，标示性叫做对象指针。

有同学提问说对象三要素不应该是封装、多态、继承吗？

- 封装、复用、解耦、内聚是架构上的概念，描述的是你代码在架构上的合理性。
  - 你的代码的封装性好，别人不容易见到里面的细节，就不容易犯错。
  - 复用性，粒度合适、抽象合理的代码就可以大家都用。
  - 解耦，不同的模块之间的关联性比较弱。
  - 内聚和封装相似，但又不同。
- 继承是面向对象的一个子系统。
- 多态性是描述动态性的程度，比较复杂可以去溯源搜论文。

这个三要素可能是从某本书里传出来的，但也确实是和对象有一定的关系。重要的并不是背下来，然后面试的时候去照搬回答，而是要把这些概念都搞清楚，和自己的思想产生联系形成一套自己的理解，从而影响你的编程行为。



对象是偏向于人类思维的东西，而图灵完备更偏向于计算机思维。程序员就是在两种之间切换从而利用计算机来帮助我们解决问题或是完成某个目的，甚至是制作艺术品。



### 面向对象范式

#### class-based oriented object

基于类的面向对象

![image-20200429224319635](assets/image-20200429224319635.png)

如今的主流编程范式，代表 OC C++ Java，一脉相承



两个流派：

- 归类

- 分类

  - 上图属于 object

  两个流派都有其优势和问题





## 课程涉及内容

### 课后作业：

- 找出 JavaScript 标准里有哪些对象是我们无法实现出来的，都有哪些特性？写一篇文章，放在学习总结里。

### 有助于你理解的知识：

- 按照 ECMAScript 标准，一些特定语句（statement) 必须以分号结尾。分号代表这段语句的终止。但是有时候为了方便，这些分号是有可以省略的。这种情况下解释器会自己判断语句该在哪里终止。这种行为被叫做 “自动插入分号”，简称 ASI (Automatic Semicolon Insertion) 。实际上分号并没有真的被插入，这只是个便于解释的形象说法。
- `var` 最好写在函数内最前面或变量第一次出现的地方

