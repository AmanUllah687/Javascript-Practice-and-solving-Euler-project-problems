function Point(x, Y) {
  this.x = x; 
  this.y = Y;
}
Point.prototype.tostring = function () {
  return  `${this.x},${this.y}`;
}

const p = new Point(1, 2);
console.log(p.tostring());
// The thisArg's value doesn't matter because it's ignored
const YAxisPoint = Point.bind(null, 0 /* x */);
const axisPoint = new YAxisPoint(5);
console.log(axisPoint.tostring()); // '0,5'

console.log(axisPoint instanceof Point);
console.log(axisPoint instanceof YAxisPoint);
console.log(new YAxisPoint(17, 42) instanceof Point);



