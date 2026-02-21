try {
    throw new TypeError("Oops");
} catch({name, message}) {
    console.log(name);
    console.log(message);
}