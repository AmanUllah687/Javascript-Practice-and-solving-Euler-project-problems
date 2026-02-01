const arr = [3,5,7];
arr.foo = "Hello";
for (const i in arr) {
  console.log(i);
}
// 0,1,2,foo

for(const i of arr) {
  console.log(i);
}
// 3, 5 , 7