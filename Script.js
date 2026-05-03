function isPandigital(n) {
  let pandigital = n.toString();
  let sorted = pandigital.split('').sort().join('');
  return sorted === '123456789';

}
let largest = 0;
for(let n=1; n<=9999; n++) {
  let concat = '';
  let m = 1;
  while(concat.length<9) {
    concat += (n*m);
    m++;
  }
  if(concat.length === 9 && isPandigital(concat)) {
    if(Number(concat) > largest){
    largest = Number(concat);
    }
  }

}
console.log(largest);
