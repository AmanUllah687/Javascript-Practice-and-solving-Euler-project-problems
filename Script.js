let nums =  [1,2,4,6];
function isPrime(n) {
    if(n<=1) return false;
    for(i=2; i<=Math.sqrt(n); i++) {
      if(n % i === 0) {
        return false;
      }
    }
    return true;
}
let moves = [];
var minJumps = function(nums) {
    let n = nums.length -1;
   for(i=0; i<=n; i++){
    for(j=i; j<=n; j++){
       moves.push(nums[i]);
        if(isPrime(nums[i]) && nums[j] % nums[i] === 0) {
            moves.push(nums[j])
            
        }
        
   }} return moves.length
}
console.log(moves.length);