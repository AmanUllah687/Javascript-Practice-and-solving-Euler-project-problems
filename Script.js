let x = 0;
let z = 0;

labelCancelLoops: while(true) {
  console.log("Outer Loops:", x);
  x += 1;
  z = 1;
  while(true) {
    console.log("Inner Loops:", z);
    z += 1;
    if( z === 10 && x === 10) {
      break labelCancelLoops;
    } else if ( z === 10 ) {
      break;
    }
  }
} 