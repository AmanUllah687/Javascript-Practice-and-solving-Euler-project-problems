const obj = {foo: 1, bar: 2};
 for( const [Key, val] of Object.entries(obj)) {
  console.log(Key, val);
 }
 // "foo" 1
 // "bar" 2
