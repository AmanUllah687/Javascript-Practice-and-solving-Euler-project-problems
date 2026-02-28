class LateBloomer {
  constructor () {
    this.petalCount = Math.floor(Math.random() * 12) + 1;
  }
  bloom () {
    // Declare a bloom after a delay of Second 
    setTimeout(this.declare.bind(this), 1000);
  }
  declare () {
    console.log(`I am Beautifull Flower with ${this.petalCount} petals!`);

  }
}

const flower = new LateBloomer();
flower.bloom();
//// After 1 second, calls 'flower.declare()'
