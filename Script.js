// The outer function defines a variable Called "name"
const pet = function(name) {
    const getName = function () {
        // the inner function has the access to "name" vairiable of outer function
        return name;
    };
    return getName; // Return the inner function exposing it to outer scopes 
}; 
const myPet = pet("Vivie");
console.log(myPet());