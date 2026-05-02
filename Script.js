function getTruncations(n) {
  let str = n.toString();
  let Truncations = [];
  for(let i=0; i<str.length; i++) {
    Truncations.push(Number(str.slice(i))); 
  }
  for(let i=1; i<str.length; i++) {
    Truncations.push(Number(str.slice(0, -i)))
  }
  return Truncations
}
function isPrime(n) {
  if(n<=1) {
    return false;
  }
  for(i=2; i<=Math.sqrt(n); i++) {
    if(n % i === 0) {
      return false
    }
  }
  return true;
}
let sum = 0;
let count = 0;
let n = 11;
while(count<11) {
 let Truncations = getTruncations(n);
 let allPrime = Truncations.every(r => isPrime(r));
 if(allPrime) {
  sum += n;
  count++;

 }
 n++;
}
console.log(sum);