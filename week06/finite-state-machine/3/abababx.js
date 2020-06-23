function mactch(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end;
}
function start(c){
    if(c === 'a'){
        return foundA;  // 走foundA方法
    }
    else{
        return start;
    }
}
function end(c){
    return end
}
function foundA(c){
    if(c === 'b'){
        return foundB; // 走foundB方法
    }
    else{
        return start(c);
    }
}
function foundB(c){
    if(c === 'x'){
        return end;   // 走end方法
    }
    else{
        return start(c);  // 如果c!==x,走start(c)方法，继续匹配
    }
}
console.log(mactch('abababx'))