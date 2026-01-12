function StrFun(p1) {
  p1.value = "eleven"
}
var a = {value: "ten"}
StrFun(a)
console.log(a.value);
