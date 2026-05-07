let s = "abcde";
let goal = "cdeab";
var rotateString = function (s,goal) {
if (s.length !== goal.length) return false
return (s + s).includes(goal);
}
console.log(rotateString(s,goal));