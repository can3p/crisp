"use strict"

let crisp = require("./eval");

// let test_str = '(* (+ 10 (- 2 3)) 5)'
// let test_str = '(- 5)'

//let test_str = '(def a 1) (+ 1 a)';
let test_str = '(* 2 2) (+ 1 1)';


let res = crisp(test_str);
console.log(res);
