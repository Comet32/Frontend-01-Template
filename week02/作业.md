# 第二周作业

[toc]

## 写一个正则表达式 匹配所有 Number 直接量

规范：

```
NumericLiteral ::
	DecimalLiteral 
	BinaryIntegerLiteral 
	OctalIntegerLiteral 
	HexIntegerLiteral
```

根据规范，需要实现不同的进制表示方式。

### DecimalLiteral

```
DecimalLiteral ::
	DecimalIntegerLiteral . DecimalDigits(opt) 
	. DecimalDigits ExponentPart(opt) 
	DecimalIntegerLiteral ExponentPart(opt)
```

实现十进制正则：

```js
//g
```

