class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
           console.log(`${this.name} Makes a Noise.`)
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        console.log(`${this.name} Barks.`)
    }
}
let d = new Dog('Random Dog')
d.speak();