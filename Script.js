const pipe = 
(...functions) =>
(intialValue) => 
    functions.reduce((acc, fn) => fn(acc), intialValue);


// building blocks to use for Composition 
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const qurdaple = (x) => 4 * x;

// Composed function for multiplication of Specific values

const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(qurdaple, qurdaple);
const multiply24 = pipe(double, triple, qurdaple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240