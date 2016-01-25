"use strict"

let crisp = require("./eval");

let test_str = '(* (+ 10 (- 2 3)) 5)'
//let test_str = '(- 5)'


let res = crisp(test_str);
console.log(res);
