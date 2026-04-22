function isPrime(n) {
    if(n<=1) {
        return false;
    }
    for(let i=2; i <= Math.sqrt(n); i++) {
        if(n % i  ===  0) {
            return false;
        }
    }
 return true;
}
function countConsecutivePrimes(a,b) {
    let count = 0;
    let n = 0;
    while(isPrime(n*n + a*n + b)) {
        count++;
        n++;
    }
return count;
}
let bestCount = 0;
let bestA = 0;
let bestB = 0;
for(let b=1; b <= 1000; b++) {
    if(!isPrime(b)) continue;
    for(let a= -999; a<= 999; a += 2) {
        let count = countConsecutivePrimes(a,b);
        if(count > bestCount) {
            bestCount = count;
             bestA = a;
             bestB = b;

            
        }
    }
}
console.log(bestA * bestB);