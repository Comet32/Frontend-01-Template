# 编程语言通识

## 按语法分类

* 非形式语言
  * 中文
* 形式语言
  * 0型: 无限制文法
    * 等号左边不止一个 <a><b> ::= "c"
  * 1型: 上下文相关文法
    * "a"<b>"c"::="a""x""c"
  * 2型: 上下文无关文法
    * js, 大部分情况是上下文无关
  * 3型: 正则文法
    * 限制表达能力

### 产生式 BNF

练习:

```

"a"
"b"
<Program>: = ("a"+ | <Program> "b"+)+


整数连加
"+"
<Number>: "0" | "1" ... "9"
<Deciamal>: "0" | (("1" ~ "9") <Number>+)
<Expression>: <Deciamal> ("+" <Deciamal>)+
<Expression>: Deciamal | (<Expression> "+" <Deciamal>)

四则运算
<PrimaryExpression> = <DecimalNumber> |
"(" <LogicalExpression> ")"


<MultiplicativeExpression> = <PrimaryExpression> |
<MultiplicativeExpression> "*" <PrimaryExpression>|
<MultiplicativeExpression> "/" <PrimaryExpression>


<AdditiveExpression> = <MultiplicativeExpression> |
<AdditiveExpression> "+" <MultiplicativeExpression>|
<AdditiveExpression> "-" <MultiplicativeExpression>

逻辑判断
<LogicalExpression> = <AdditiveExpression> |
<LogicalExpression> "||" <AdditiveExpression> |
<LogicalExpression> "&&" <AdditiveExpression>

```

终结符, 如: "+"
非终结符: 如:  <LogicalExpression>

正则的回溯指的是什么

## 图灵完备性

[wiki](https://zh.wikipedia.org/wiki/%E5%9C%96%E9%9D%88%E5%AE%8C%E5%82%99%E6%80%A7)

* 命令式 -- 图灵机
  * goto
  * if while
* 声明式 -- lambda
  * 递归
  * 分治

## 类型系统

* 动态静态
* 强类型弱类型
* 复合类型
* 子类型
  * 逆变/协变
