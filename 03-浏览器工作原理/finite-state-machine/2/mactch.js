function match(string){
    let foundA = false;
    for(let c of string){
        if(c=='a'){
            foundA = true;
        }else if(foundA && c=='b'){
            return true
        }else{
            return false
        }
    }
    return false;
}
console.log(match('I abm groot'))