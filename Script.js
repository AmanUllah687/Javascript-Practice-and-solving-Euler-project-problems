function d(n) {
  let sum = 1;
for(let i = 2; i<=Math.sqrt(n); i++) {
  if(n % i === 0) {
    sum += i;
    if(i !== n/i) {
    sum += n/i;
  }
  }
}
return sum;
}
let sum = 0;
for(a=1; a<=10000; a++) {
  let b = d(a);
  if(d(b) === a && a!==b) {
    sum += a;
  }
}
console.log(sum);