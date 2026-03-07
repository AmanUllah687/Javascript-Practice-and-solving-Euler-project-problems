const objectAssign = Object.assign({
    set foo(val) {
        console.log(val);
    },

},
{foo: 1},
)

// Logs "1"; objectAssign.foo is still the original setter

const spread = {
    set foo(val) {
        console.log(val);
    },
    ...{foo: 1},
};
// Nothing is logged; spread.foo is 1