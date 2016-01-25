"use strict"

let Tokenizer = require('./tokenizer');
let Parser = require('./parser');

let symbols = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b
}

function eval_list(list) {
    var evaled = list.map((item) => eval_tree(item));

    if ((typeof evaled[0]) !== 'function') {
        throw new Error("Function is expected to be the head of the form, something else found: " + evaled[0]);
    }

    if (evaled[0].length !== evaled.length - 1) {
        throw new Error("Incorrect arity, function expects " + evaled[0].length + " arguments");
    }

    return evaled[0].apply(null, evaled.slice(1));
}

function eval_tree(tree) {
    if (Array.isArray(tree)) {
        return eval_list(tree);
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
