function sumNums(...nums) {
  let sum = 0;
  for(let i = 0; i <nums.length; i++)
    sum += nums[i]
  return sum;
}
console.log(sumNums(1,1,1,1,1));