const numbers = [
  37107287533902102798797998220837590246510135740250n,
  46376937677490009712648124896970078050417018260538n,
  // ... all 100 numbers with "n" at the end for BigInt
];
 let sum = 0n;
 for(let i = 0; i<numbers.length; i++) {
  sum += numbers[i];

 }
 console.log(sum.toString().slice(0, 10));