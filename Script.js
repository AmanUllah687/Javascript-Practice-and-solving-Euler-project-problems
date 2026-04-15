const abundants = [];

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
for(let n=1; n<= 28123; n++) {
  if( d(n) > n) {
    abundants.push(n)
  }
}
const canBeWritten = new Array(28124).fill(false);
for(let i = 0; i < abundants.length; i++) {
  for(let j = i; j < abundants.length; j++) {
    let sum = abundants[i] + abundants[j];
    if(sum <= 28123) {
      canBeWritten[sum] =  true
    }
  }
}
let total = 0;
for(let i=1; i<=28123; i++) {
  if(!canBeWritten[i]) {
    total += i
  }
}
console.log(total);