const myFirstPromise = new Promise((resolve, reject) => {
// We Call Resolve(...) when what we  were doing asynchronusly
// was succesfull and reject(...) when it Failed 

setTimeout(() => {
 resolve("Success!"); //Yay! Every Thing went Well!
},250);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log(`Yay! ${successMessage}`)
});