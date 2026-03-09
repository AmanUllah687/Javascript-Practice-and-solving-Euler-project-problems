const numbers = [3, -1, 1, 4, 1, 5, 9, 2, 6];
const firstThrough = numbers
.filter((num) => num > 0)
.find((num, idx, arr) => {
    // without the arr argument, there is non way to easily acces the
    // intermedite arry without saving it to a variable 
    if(idx > 0 && num >= arr[idx - 1]) return false;
    if(idx < arr.length -1 && num >= arr[idx +1]) return false
    return true;
})
console.log(firstThrough);