
let sum = 1;
for(let n=1; n <= 500; n++) {
   sum += 4 * ((2*n+1) * (2*n+1)) - 12*n
}
console.log(sum)