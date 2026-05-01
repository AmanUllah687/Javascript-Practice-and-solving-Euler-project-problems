function isPalindrome(str) {
  let reversed = str.split('').reverse().join('');
  return str === reversed;
}
let sum = 0;
 for(let n=1; n<=1000000; n++) {
  let decimalPallindrome = isPalindrome(n.toString(10));
  let binaryPallindrome = isPalindrome(n.toString(2));
  if(decimalPallindrome && binaryPallindrome) {
    sum += n;
  }
 }
 console.log(sum);