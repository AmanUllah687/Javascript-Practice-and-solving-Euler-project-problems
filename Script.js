function cycleLength (d) {
    let remainders = [];
    let remainder = 1;
     while (remainder !== 0) {
        if(remainders.includes(remainder)) {
           return  remainders.length - remainders.indexOf(remainder);
        };
        remainders.push(remainder);
        remainder = (remainder * 10) % d;

     }
     return 0;
}
function longestRecuringCycle(limit) {
    let maxLength = 0;
    let answer = 0;
    for(let d=2; d<limit; d++) {
        let length = cycleLength(d);
        if(length > maxLength) {
            maxLength = length;
            answer = d;
        }
    }
 return answer; 
}

console.log(longestRecuringCycle(1000));