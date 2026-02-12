const fruits = ["Apple", "Strawberry", "Cherry", "Banana", "Mango"];
const start = 0;
const deletecount = 3;
const removedItems = fruits.splice(start, deletecount);
console.log(fruits);
console.log(removedItems);