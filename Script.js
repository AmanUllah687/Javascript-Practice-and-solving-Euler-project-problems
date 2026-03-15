 function fibonacci(limit) {
  let series = [0,1];
  for(let i = 2; ; i++) {
  // Current Number = prev1 + prev2 
    series[i] = series[i-1] + series[i-2];
    if(series[i] > limit) {
      break;
    }
  }
    return series;
}
let  FibonaciNumbers = fibonacci(4000000);
console.log(FibonaciNumbers.reduce((sum, num) => {
  if (num % 2 === 0) {
    return sum + num;
  }
  return sum;
}, 0));