const myCar = {
  make: "Ford",
  model: "Mustang",
  year: 1969,
};

function showAllProperties(myObj) {
  let objectToInspect = myObj;
  let result = [];

  while (objectToInspect !== null) {
    result = result.concat(
      Object.getOwnPropertyNames(objectToInspect)
    );
    objectToInspect = Object.getPrototypeOf(objectToInspect);
  }

   
    return console.log([...new Set(result)]);
}

showAllProperties(myCar);
 console.log(result);