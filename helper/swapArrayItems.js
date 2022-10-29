export const swapArrayItems = function(array, a, b){
    array[a] = array.splice(b, 1, array[a])[0];
    return array;
}