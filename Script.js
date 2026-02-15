// Animal properties and method encapsulation
const animalProto = {
  type: "Invertebrates", // default Value of Properties
   displayType() {
    // Method which will Display the type of Animal
    console.log(this.type);
   },
};
// Create a new animal type called `animal`
const animal = Object.create(animalProto);
animal.displayType(); // logs Invertebrates
const fish = Object.create(animalProto);
fish.type = "Fishes";
fish.displayType();