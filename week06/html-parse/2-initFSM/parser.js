const EOF = Symbol('EOF');
function data(c) {

}

module.exports.parseHTML = function parseHTML(html){
   let state = data;
   for(let c of html){
       state = state(c);
   }
   state = state(EOF);
}