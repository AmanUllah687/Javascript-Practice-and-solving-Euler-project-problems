const arryLike = {
 0 : "1",
 1: "2",
 length: 2,
};
console.log(Array.prototype.join.call(arryLike, "+"));