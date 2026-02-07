function multiply(multiplyer,...theArgs) {
  return theArgs.map((x) => multiplyer * x);

}
const arry = multiply(2,1,2,3);
console.log(arry); // [2 , 4 , 6]