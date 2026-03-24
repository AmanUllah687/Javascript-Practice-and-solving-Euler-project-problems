let sumOfSquares = 0;
for(let i=1; i<=100; i++) {
    sumOfSquares += i*i;
}
console.log(sumOfSquares);
let sum = 0;
let squareOfSum = 0;
for(let j=1; j<=100; j++) {
    sum += j;
    squareOfSum = sum * sum;
}

console.log(squareOfSum)


let diff = squareOfSum - sumOfSquares;
console.log(diff);