class Base {
  static baseProp = "base";

}
class Derived extends Base {
  static derivedProp = "derived";
}

const BoundDerived = Derived.bind(null) 
console.log(BoundDerived.baseProp); // "base"
console.log(BoundDerived.derivedProp); // undefined
console.log(new BoundDerived() instanceof Derived); // true