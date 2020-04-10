# 每周总结可以写在这里

下载 ECMA-262 标准：

- https://www.ecma-international.org/publications/standards/Ecma-262.htm
- 最新的 draft ：https://tc39.es/ecma262/
- 5.1 版本
- MDN：https://developer.mozilla.org/en-US/docs/Web
- Whatwg：https://whatwg.org/
- w3：w3.org



英文：

- 有很多定义
- 外语好坏没差别，只在于花费时间



## 前端技术

### HTML

```HTML
<html lang= lang="en" leng='en'>
  text
</html>
```

以上有多种词汇，都会有不同的语义。

- 比如单引号中使用单单引用号怎么办

不同的语言都有**词法**和**语法**，可以去：https://html.spec.whatwg.org/multipage/parsing.html 查

#### DTD&Entity

要知道在哪里

作业：补全 Entity

Entity：实体，在 HTML 语境中也就是 `&` 符之后的部分

在国外如果缺少 aria 可能被告，aria 给标签添加了 role，用于其他无障碍阅读

### Tag

可以从 MDN 去找，或是从 https://html.spec.whatwg.org/multipage/semantics.html#semantics



### JS

#### Grammar 

- 去 ECMA 上搜索 AGrammar Summary

token 翻译：有效的输入词（中文中没有一个很好的词），comments 注释



##### SynTax

ECMASCRIPT：A2 - A5



运行时

```
Job
	Script/Module
		Promise
			Function
				Statement
					Expression
						Literal
						Identifier
```



凡是严格定义的计算机语言都有“语法”和“词法”



### CSS

```
stylesheet
	:	[ @charset STRING ';']?
		[ @import ]*
		[ [ ruleset | @media | @page ]]
	;
```



Selector 是独立的标准，而非 CSS 独有，不在 CSS 标准内



### API

web platform API - 这些 API 既不属于 DOM 也不属于 BOM



## 其他

脑图的关键：

- 思路
- 以及自己的补全



### 英文

因为来源是英文，所以需要多看英文来理解，中文的翻译反而可能要重新去理解，或是要借着英文来理解。英文的专业名称很多也是临时想的，也不是很好查找。



架构能力

- 只要你能实现大的应用，无论使用什么土方法都是可以