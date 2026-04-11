function factorial(n) {
  let result = 1n;
  for(let i=1; i<=n; i++) {
    result *= BigInt(i);

  }
  return result;
}

let result = factorial(100);
let string = result.toString();
let sum = 0;
for(let i=0; i<string.length; i++) {
  sum += Number(string[i]);
}
console.log(sum);