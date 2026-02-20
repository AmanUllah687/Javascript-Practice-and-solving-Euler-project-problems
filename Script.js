const myObj = { a: 0};
Object.defineProperties(myObj,{
    b: {
        get() {
            return this.a + 1;
        }

    },
    c: {
        set(x) {
            this.a = x / 2;
            
        }
    },

})

myObj.c = 10; // Runs the setter, which assigns 10 / 2 (5) to the 'a' property
console.log(myObj.b); // Runs the getter, which yields a + 1 or 6