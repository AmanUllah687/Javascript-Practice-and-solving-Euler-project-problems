function f() {
 console.log(Array.prototype.join.call(arguments, "+"));
}
f("a", "b");