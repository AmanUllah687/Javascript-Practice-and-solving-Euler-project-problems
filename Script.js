class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
// Getter
get Height() {
   return this.height;
}
// Method
setHieght(height) {
     this.height = height;
}
}
const rect = new Rectangle(10,15);
console.log(rect.height); // 10
rect.setHieght(20);
console.log(rect.height); // 20