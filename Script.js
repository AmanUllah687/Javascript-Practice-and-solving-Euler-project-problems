const counter = (function () {
    let privateCounter = 0;
    function changeBy(Val) {
      privateCounter += Val;

    }
    return  {
        increment() {
            changeBy(1);
        },
        decerement() {
            changeBy(-1);

        },
        value() {
          return  privateCounter;
        },

    };
    
})();

console.log(counter.value()); // 0
counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1