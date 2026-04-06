function factorial(n) {
  let result = 1n;
  for(let i = 1; i<=n; i++) {
    result *= BigInt(i);

  }
  return result;
}
let answer = factorial(40) / (factorial(20) * factorial(20));
console.log(answer.toString());