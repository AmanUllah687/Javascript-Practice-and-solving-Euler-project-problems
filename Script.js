let largest = 0;
let j;
for(i=999; i>99; i--) {
  for(j=999; j>99; j--) {
    const product = i * j;
    const str = product.toString();
    const isPalindrome = str === str.split("").reverse().join("");
    if(isPalindrome && product > largest) {
      largest = product;
    }
  }
}

console.log(largest);