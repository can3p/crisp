"use strict"

let Tokenizer = require('./tokenizer');
let Parser = require('./parser');

var symbols = {
    'def': (token, value) => symbols[token.value] = value,
    'println': (s) => console.log(s),
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b
}

function eval_list(list) {
    return list.map((item) => eval_tree(item));
}

function eval_form(list) {
    var first = eval_tree(list[0]);
    var rest;

    if (first === symbols.def) {
        rest = [list[1]].concat(eval_list(list.slice(2)));
    } else {
        rest = eval_list(list.slice(1));
    }

    if ((typeof first) !== 'function') {
        throw new Error("Function is expected to be the head of the form, something else found: " + evaled[0]);
    }

    if (first.length !== rest.length) {
        throw new Error("Incorrect arity, function expects " + evaled[0].length + " arguments");
    }

    return first.apply(null, rest);
}

function eval_tree(tree) {
    if (Array.isArray(tree)) {
        return eval_form(tree);
    } else if (tree.type === Tokenizer.NUMBER) {
        return tree.value;
    } else if (tree.type === Tokenizer.SYMBOL) {
        if (symbols.hasOwnProperty(tree.value)) {
            return symbols[tree.value];
        } else {
            throw new Error ("unknown symbol: " + tree.value);
        }
    } else {
        throw new Error("unknown part of AST tree, panic! " + JSON.stringify(tree));
    }
}

module.exports = function(str) {
    var tree;
    var parser = Parser.parse(str);
    var result;

    while (tree = parser.parse(str)) {
        result = eval_tree(tree);
    }

    return result
}
