function isFifthPowerSum(n) {
 let digits = n.toString().split('').map(Number);
 let powered = digits.map(d => Math.pow(d, 5));
 let sum = powered.reduce((a,b) => a + b, 0);
 return sum === n;
}

let total = 0;
for(i=2; i<=354294; i++) {
   if(isFifthPowerSum(i)) {
      total += i;
   }
}
console.log(total);