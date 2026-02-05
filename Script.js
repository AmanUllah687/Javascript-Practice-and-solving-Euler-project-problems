// The followings are defined in global Scope 
const num1 = 20;
const num2 = 3;
const name = "Chamakh";

function multiply() {
    return num1 * num2;
}
console.log(multiply()); //60

// A nested function Example
function getScore () {
    const num1 = 2;
    const num2 = 3;

    function add() {
        return `${name} Scored ${num1 + num2}`;
    }
    return add();
}

console.log(getScore());