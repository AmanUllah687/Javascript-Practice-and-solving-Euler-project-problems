const fruits = ["Strawberry", "Banana", "Mango"];
const start = fruits.indexOf("Banana");
const deleteCount = 1;
const removedItem = fruits.splice(start, deleteCount);
console.log(fruits);
console.log(removedItem);