function factorial(n) {
  let result = 1;
  for(i=1; i<=n; i++) {
    result *= i
  }
return result;
}
 function isFactorialSum(n) {
  let digits = n.toString().split('').map(Number);
  let factorials = digits.map(d =>factorial(d));
  let factorialsSum = factorials.reduce((a,b) => a + b, 0);
  return factorialsSum === n;
 }
 let total = 0;
 for(let n=3; n<=2540160; n++) {
  if(isFactorialSum(n)) {
    total += n;
  }
 }
 console.log(total);

  