function collatzLength(n) {
  let length = 1;
  while(n !== 1)  {
    if(n%2 === 0) {
      n = n/2;
    } else {
      n = 3 * n + 1;

    }
    length ++;
  }
  return length;
}
 let maxLength = 0;
 let answer = 0;
 for(let i= 1; i< 1000000; i++) {
 let  length = collatzLength(i);
  if(length > maxLength) {
    maxLength = length;
    answer = i;
  }
 }
 console.log(answer);