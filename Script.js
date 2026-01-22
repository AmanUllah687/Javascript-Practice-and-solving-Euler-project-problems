class Rectangle {
    #height = 0;
    #width;
    constructor(height, width) {
        this.#height = height;
        this.#width = width;
    }
    get Hieght() {
        return this.#height
    }
    setHeight(height) {
        this.#height = height
    }
}
var rect = new Rectangle (10, 15);
console.log(`The Hieght of Rectangle is ${rect.height} cm`)
console.log(rect.height);
rect.setHeight(20);
console.log(rect.height)