function powerDigitSum () {
  const powerOfTwo = BigInt(2) ** BigInt(1000);
  const digiString = powerOfTwo.toString();
  const sum = digiString.split('').reduce((acc, digit) => acc + Number(digit),0);
  return sum;
}


console.log(powerDigitSum());