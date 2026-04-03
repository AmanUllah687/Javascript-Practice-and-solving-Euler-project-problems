function countDivisors(n) {
  let count = 0;
  for(let i = 1; i <= Math.sqrt(n); i++) {
    if(n % i === 0) {
      count += 2;        // i and n/i are both divisors
      if(i * i === n) {  // perfect square — don't double count
        count--;
      }
    }
  }
  return count;
}

let n=1; 
while(true) {
  let triangle = n * (n+1) / 2;
  if(countDivisors(triangle) > 500) {
    console.log(triangle);
    break;
  }
  n++;
}