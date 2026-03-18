let PrimeFactors = [];
for(let i =2; i<600851475143; i++) {
  if(600851475143 % i === 0) {
     PrimeFactors.push(i);
    console.log(i);
 }
}

// Alternate Soloution for fast proceesing 

let n = 600851475143;
let factor = 2;

while (factor * factor <= n) {
  if (n % factor === 0) {
    n = n / factor;
  } else {
    factor++;
  }
}

console.log(n);