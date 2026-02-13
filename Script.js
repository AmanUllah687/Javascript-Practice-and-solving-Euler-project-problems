// Match one d followed by one or more b's  followed by one d
// Remember matched b's and the Following d 
// ignore Cases 



const myRE = /d(b+)(d)/i;
const execResult = myRE.exec("cdbBdbsbz");

console.log(execResult.input);
console.log(execResult.index);
console.log(execResult);