const people = [
  {
    name: "Milky Smith",
    family: {
            mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith",
    },
    age: 25,
  },
  {
    name: "Tom Jones",
  family: {
     mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones",
  },
  age: 25
},
];

for(const {
  name: n,
  family: {father: f},
}
of people
) {
   console.log(`Name: ${n}, Father: ${f}`)
}
// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"