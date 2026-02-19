
const myCar = {
  make: "Ford",
  model: "Mustang",
  year: 1969,
};

function showProps(obj, objName) {
  let result = "";

  for (const i in obj) {
    if (Object.hasOwn(obj, i)) {
           // Object.hasOwn() is used to exclude properties from the object's
    // prototype chain and only show "own properties"
      result += `${objName}.${i} = ${obj[i]}\n`;
    }
  }

  console.log(result);
}

showProps(myCar, "myCar");
