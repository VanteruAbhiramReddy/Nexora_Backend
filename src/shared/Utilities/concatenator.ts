const concat = (array:string[]) => {
    let string = '';
    for(let i = 0; i<array.length; i++){
        string += `${array[i]}=$${i+1}`
        if(i!==array.length-1) string += ",";
    }
    return string;
}

export default concat;
