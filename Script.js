const foo = {someFooProp: "Hi"};

console.log(foo.someFooProp?.toUpperCase() ?? "not Available") // "Hi"
console.log(foo.someBarProp?.toUpperCase() ?? "not Available")  // "not Available"