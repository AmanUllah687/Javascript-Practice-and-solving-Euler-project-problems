// To experiment with error handling, "threshold" values cause errors randomly

const THRESHOLD_A = 8;
function tetheredGetNumber(resolve, reject)  {
  setTimeout(() => {
    const randomInt = Date.now();
    const value = randomInt % 10;
    if(value < THRESHOLD_A) {
      resolve(value);
    } else {
      reject(new RangeError(`Too large: ${value}`));
    }
  }, 500);
}

function determinParity(value) {
  const isOdd = value % 2 === 1;
  return {value, isOdd};
} 

function troubleWithGetNumber(reason) {
  const err = new Error("Trouble Getting Number", {cause: reason});
  console.error(err);
  throw err;
}

function promisGetWord(parityInfo) {
  return new Promise((resolve, reject) => {
    const {value , isOdd} = parityInfo;
    if(value <= THRESHOLD_A - 1) {
      reject(new RangeError(`Still Too large: ${value}`));
    } else {
      parityInfo.wordEvenOdd = isOdd ? "odd" : "even";
      resolve(parityInfo); 
    }
  });
}
new Promise(tetheredGetNumber)
    .then(determinParity, troubleWithGetNumber)
    .then(promisGetWord)
    .then((info) => {
      console.log(`Got: ${info.value}, ${info.wordEvenOdd}`);
      return info;
    })
    .catch((reason) => {
      if(reason.cause) {
        console.log("Had Previusly Handled Error");
      } else {
        console.log(`Trouble with getPromiseWord(): ${reason}`);
      }
    })
    .finally((info) => console.log("All done"));
