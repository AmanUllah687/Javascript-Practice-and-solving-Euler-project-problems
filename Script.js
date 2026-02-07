function myConcat (separator) {
  let result = ""; // initializes list
  // iterate through arguments
  for(i=1; i<arguments.length; i++) {
    result += arguments[i] + separator;
  }
  return result;
}
 console.log(myConcat(",","red","orange","blue"));