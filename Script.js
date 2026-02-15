const rand = { name: "Rand", age: 30 };
const ken = { name: "Ken", age: 28 };
function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}
const car1 = new Car("Eagle", "Talon TSi", 1993, rand);
const car2 = new Car("Nissan", "300ZX", 1992, ken);
car1.color = "black";
console.log(car1);
console.log(car2);

