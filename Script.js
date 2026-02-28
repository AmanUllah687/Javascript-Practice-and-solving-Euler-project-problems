function Point(x, y) {
  this.x = x;
  this.y = y;
}
const emptyObj = {}
const YAxisPoint = Point.bind(emptyObj , 0);

// Can still be called as a normal function
// (although usually this is undesirable)
YAxisPoint(13);
// The modifications to `this` is now observable from the outside
console.log(emptyObj); // { x: 0, y: 13 }