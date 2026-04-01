let sum = 0;
const limit = 2000000;
const sieve = new Array(limit + 1).fill(true);
sieve[0] = false;
sieve[1] = false;
// elimination lopp
for(let i=2; i<=limit; i++) {
  if(sieve[i] === true) {
    for(let j= i*i; j<=limit; j += i) {
      sieve[j] = false;
    }
  }
}
for(let i=2; i<=limit; i++) {
  if(sieve[i] === true) {
    sum += i;
  }
}
console.log(sum);