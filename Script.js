const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
              'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
              'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty',
              'sixty', 'seventy', 'eighty', 'ninety'];
function toWords(n) {
  if( n === 1000) return "onethousand";
  if(n<20) {
   return ones[n];
  }
  if(n<100) {
    return tens[Math.floor(n/10)] + ones[n%10];
  }
  if(n<1000) {
    let hundred = ones[Math.floor(n/100)];
    let remainder = n % 100;
    if(remainder === 0) {
      return hundred + 'hundred';
    } else {
     return hundred + 'hundredand' + toWords(remainder);
    }

  }
}
let sum = 0;
for(let i=1; i<=1000; i++) {
  let word = toWords(i);
  sum += word.length;
}
console.log(sum);