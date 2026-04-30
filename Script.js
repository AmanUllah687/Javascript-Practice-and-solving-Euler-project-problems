function getRotations(n) {
  let str = n.toString();
  let rotations = [];
  for(i=0; i<=str.length; i++) {
    rotations.push(Number(str));
    str = str.slice(1) + str[0];

  }
  return rotations;
}
function isPrime(n) {
    if(n<=1) {
        return false;
    }
    for(let i = 2;i <= Math.sqrt(n); i++) {
        if(n % i === 0) {
            return false;
        }
    }
    return true;
}
let count=0;
for(let n=2; n<= 1000000; n++) {
  let rotations = getRotations(n);
  let allPrime = rotations.every(r => isPrime(r));
  if(allPrime) {
    count++;
  }
}
console.log(count);
  