console.log(Array.prototype.flat.call({}));
const a = {
  length: 0.7
}
Array.prototype.push.call(a);
console.log(a);
