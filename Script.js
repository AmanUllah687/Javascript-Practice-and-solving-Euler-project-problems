const myMap = new Map();
myMap.set("JS", {name: "josh", desc: "I Maintain Things."});

const nameBar = myMap.get("CSS")?.name;


console.log(nameBar);