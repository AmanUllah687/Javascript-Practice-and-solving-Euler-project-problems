function firstFibWithNDigits(n) {
    let a = 1n;
    let b = 1n;
    let index = 2;

    while(true) {
        let next  = a + b; 
        index++;
        if(String(next).length >= n) {
            return index;
        }
        a = b;
        b = next;

    }
}
console.log(firstFibWithNDigits(1000)); // 4782