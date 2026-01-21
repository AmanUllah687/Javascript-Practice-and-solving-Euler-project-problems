class Rectangle {
    height = 0;
    width;
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
    get Height() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }

}
var rect = new Rectangle(10, 15);
console.log(`Height of rectanle is ${rect.height} cm`);
console.log(rect.height);
rect.setHeight(20);
console.log(rect.height);