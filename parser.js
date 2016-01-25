"use strict"

let Tokenizer = require('./tokenizer')

function Parser (str) {
    this.tokenizer = new Tokenizer(str);
}

Parser.prototype.parse = function() {
    var token = this.tokenizer.get();

    switch (token.type) {
        case Tokenizer.NUMBER:
        case Tokenizer.SYMBOL: return token;
        case Tokenizer.LBRACE: return this._parseList();
        case Tokenizer.END: throw new Error("unexpected end of input");
        default: throw new Error("Unexpected token: " + JSON.stringify(token));
    }
};

Parser.prototype._parseList = function() {
    var list = [];
    var token;

    while ((token = this.tokenizer.get()).type !== Tokenizer.RBRACE) {
        if (token.type === Tokenizer.END) {
            throw new Error("input ended inside of the list");
        } else {
            this.tokenizer.pushBack(token);
            list.push(this.parse());
        }
    }

    return list;
};

Parser.parse = function(s) {
    if (!s) throw new Error("Parser expects a non-empty string");

    let p = new Parser(s);
    return p.parse();
}

module.exports = Parser;
