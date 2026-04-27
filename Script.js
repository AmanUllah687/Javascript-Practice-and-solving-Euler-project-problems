function isPandigital(a, b, product) {
let combined = a.toString() + b.toString() + product.toString()
let sorted    = combined.split("").sort().join('');
return sorted ==='123456789'
}

let products = new Set();
for(a=1; a<=9; a++) {
   for(b=1000; b<=9999; b++) {
      let product = a * b;
     if(isPandigital(a, b, product)) {
       products.add(product)
     }
   }
}
for(a=10; a<=99; a++) {
   for(b=100; b<=999; b++) {
      let product = a * b;
     if(isPandigital(a, b, product)) {
       products.add(product)
     }
   }
}
let answer = Array.from(products).reduce((a,b) => a + b, 0);
console.log(answer);