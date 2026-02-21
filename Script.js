try {
    throw new Error()
} catch(e) {
    var e = 2; // Works
}
console.log(e); // undefined 