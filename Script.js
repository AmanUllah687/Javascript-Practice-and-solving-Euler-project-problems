const products = [
  { name: "sports car" },
  { name: "laptop" },
  { name: "phone" },
];

products.map((product) => {
  product.price = 100;
});
console.log(products);
products.forEach((product) => {
  product.price = 100;
});
console.log(products);