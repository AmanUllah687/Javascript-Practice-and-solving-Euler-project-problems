
let distinctPowers = new Set ();
for(a=2; a<=100; a++) {
   for(b=2; b<=100; b++) {
  distinctPowers.add(Math.pow(a, b))
   }

}
console.log(distinctPowers.size);
