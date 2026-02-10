let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
let arrays = [[1, 2, 3], [4, 5], [6]];
const flattened = arrays.reduce((a, b) => a.concat(b), []);
console.log(flattened);
// → [1, 2, 3, 4, 5, 6]