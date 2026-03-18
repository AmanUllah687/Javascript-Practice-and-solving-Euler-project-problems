let number = 1;

while (true) {
  let divisibleByAll = true;

  for (let i = 1; i <= 20; i++) {
    if (number % i !== 0) {
      divisibleByAll = false;
      break;
    }
  }

  if (divisibleByAll) {
    console.log(number); // 232792560
    break;
  }

  number++;
}