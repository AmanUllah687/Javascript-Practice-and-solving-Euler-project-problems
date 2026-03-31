let triplet = 0;
for(let a=1; a<333; a++) {
  for(let b=a+1; b < (1000 - a) / 2; b++) {
    let c = 1000 - a - b;
    if(a ** 2 + b ** 2 === c ** 2 && c > b) {
      triplet = a * b * c;
     }
  }

}
console.log(triplet)