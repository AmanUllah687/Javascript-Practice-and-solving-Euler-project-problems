function outSide() {
  const  x = 5;
  function inside(x) {
    return x * 2;

  }
  return inside;
}
console.log(outSide()(10)); // 20(Instead of 10)