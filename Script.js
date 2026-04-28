for(num=10; num<=99; num++) {
  for(let den= num + 1; den<=99; den++) {
    let numTens = Math.floor(num/10);
    let numUnits = num % 10;
    let denTens = Math.floor(den/10);
    let denUnits = den % 10;
    if(numUnits === denTens && denUnits !== 0) {
      if(num * denUnits === numTens * den) {
        console.log(num + "/" + den)
      }

    }

  }
}
function gcd(a,b) {
  if(b===0) return a;
  return gcd(b, a % b);
}
let numProduct = 1;
let denProduct = 1;
for(num=10; num<=99; num++) {
  for(let den= num + 1; den<=99; den++) {
      let numTens = Math.floor(num/10);
    let numUnits = num % 10;
    let denTens = Math.floor(den/10);
    let denUnits = den % 10;
    if(numUnits === denTens && denUnits !== 0) {
      if(num * denUnits === numTens * den) {
       numProduct *= num;
       denProduct *= den; 

    }

  }
}}
let common = gcd(numProduct, denProduct);
console.log(denProduct / common);