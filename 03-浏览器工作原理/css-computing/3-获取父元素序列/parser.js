const css = require('css');
const EOF = Symbol("EOF");
let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children:[]}];
let currenTextNode = null;

// 加入一个新的函数，addCssRules, 这里我们把css规则暂存到一个数组里
let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    Console.log(JSON.stringify(ast,null, " "));
    rules.push(...ast.stylesheet.rules);
}
function computeCss(element){
   var element = stack.slice().reverse();
}
function emit(token){
    let top = stack[stack.length -1];
    if(token.type == 'startTag'){
        let element = {
            type :"element",
            children: [],
            attributes:[]
        };
        element.tagName = token.tagName;
        for(let p in token){
            if(p != "type" || p != "tagName"){
                element.attributes.push({
                    name:p,
                    value:token[p]
                });
            }
        }
        computeCss(element);
        top.children.push(element);
        if(!token.isSelfCloseing){
            stack.push(element);
        }
        currenTextNode = null;

    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!")
        }else {
            // 遇到style标签时，执行添加css规则的操作
            if(top.tagName === 'style'){
                addCSSRules(top.children[0].content);
            }
            stack.pop();
        }
        currenTextNode = null;
    }else if(token.type == "text"){
       if(currentTextNode == null){
           currentTextNode = {
               type:"text",
               content:""
           }
           top.children.push(currentTextNode);
       }
       currentTextNode.content += token.content;
    }
}

function data(c) {
 if(c == '<'){
     return tagOpen;
 }else if(c == EOF){
     emit({
         type:"EOF"
     })
     return ;
 }else{
    emit({
        type:"text",
        content:c
    });
    return data;
 }
}
function tagOpen(c) {
    if(c == '/'){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
       currentToken = {
           type:"startTag",
           tagName:""
       }
       return tagName(c);
    }else{
       emit({
           type:"text",
           content: c
       });
       return ;
    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)){
       return beforeAttributeName;
    }else if(c == "/"){
       return selfClosingStartTag;
    }else if(c.match(/^[A-Z]$/)){
        currentToken.tagName += c //toLowerCase();
        return tagName;
    }else if(c == ">"){
       emit(currentToken);
       return data;
    }else {
        currentToken.tagName += c;
        return tagName;
    }
}
function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)){
       return beforeAttributeName;
    }else if(c =='/' || c == ">" || c == EOF){
       return afterAttrbutrName(c);
    }else if(c == "="){
       
    }else {
       currentAttribute = {
           name :"",
           value: ""
       }
       return attributeName(c);
    }
}

function attributeName(c) {
    if(c.match(/^[\t\n\f ]$/ || c =="/" || c == ">" || c == EOF)){
       return afterAttrbutrName(c);
    }else if(c =='='){
       return beforeAttributeValue;
    }else if(c == "="){
       
    }else if(c == "\u0000"){
      
    }else if(c == "\"" || c == "'" || c == "<"){

    }else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/ || c =="/" || c == ">" || c == EOF)){
       return beforeAttributeValue;
    }else if(c =="\""){
       return doubleQuotedAttributeValue;
    }else if(c =="\""){
       return singleQuotedAttributeValue;
    }else if(c == ">"){
      data;
    }else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if(c =="\""){
       currentToken[currentAttribute.name] = currentAttribute.value;
       return afterQuotedAttributeValue;
    }else if(c =="\u0000"){
       
    }else if(c == EOF){
      
    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if(c =="\""){
       currentToken[currentAttribute.name] = currentAttribute.value;
       return afterQuotedAttributeValue;
    }else if(c =="\u0000"){
       
    }else if(c == EOF){
      
    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)){
       return beforeAttributeName;
    }else if(c =="/"){
       return selfClosingStartTag
    }else if(c == ">"){
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    }else if(c == EOF){
       
    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
       return beforeAttributeName;
    }else if(c =="/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
       return selfClosingStartTag
    }else if(c == ">"){
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    }else if(c == "\u0000"){

    }else if(c =="\"" || c =="" || c == "<" || c == "=" || c == "`"){

    }
    else if(c == EOF){
       
    }else{
        currentAttribute.value += c;
        return UnquotedAttributeValue
    }
}

function selfClosingStartTag(c) {
    if(c == ">"){
       currentToken.isSelfCloseing = true;
       emit(currentToken);
       return data;
    }else if(c == "EOF"){
      
    }else {
        
    }
}

function endTagOpen(c) {
    if(c.match('/^[a-zA-Z]$/')){
        currentToken = {
            type:'endTag',
            tagName:""
        }
        return tagName(c);
    }else if(c == ">"){
       
    }else if(c == EOF){
        
    }else{

    }
}

function afterAttrbutrName(c) {
    if(c.match('/^[a-zA-Z]$/')){
        return afterAttrbutrName
    }else if(c == "/"){
       return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeName;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == EOF){

    }else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value:""
        }
        return attributeName(c);
    }
}
module.exports.parseHTML = function parseHTML(html){
   let state = data;
   for(let c of html){
       state = state(c);
   }
   state = state(EOF);
   return stack[0];
}

let source = `<html maaa=a>
<head>
  <style>
body div #myid{
  width:100px;
  background-color:#ff5000;
}
body div img {
  width:30px;
  background-color:#ff1111;
}
  </style>
</head>
<body>
  <div>
    <img id="myid"/>
    <img />
  </div>
</body>
</html>
`
let state =data;

for(let c of source){
    state = state(c);
}
state(EOF);