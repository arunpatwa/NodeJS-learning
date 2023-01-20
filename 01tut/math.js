const { builtinModules } = require("module");

const add =(a,b) => a+b;
// exports.add =(a,b) => a+b;
const subtract =(a,b) => a-b;
const multiply =(a,b) => a*b;
const divide =(a,b) => a/b;

//exporting the modules

module.exports={add,subtract,multiply,divide}

