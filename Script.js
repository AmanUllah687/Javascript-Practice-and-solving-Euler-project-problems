let coins = [1,2,5,10,20,50,100,200];
let ways = new Array(201).fill(0);
ways[0] = 1;

for(let coin of coins) {
   for(let amount= coin; amount<=200; amount++) {
      ways[amount] += ways[amount - coin]
   }
}
console.log(ways[200]);