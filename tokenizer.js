"use strict"

function Tokenizer (str) {
    this.source = str;
    this.pos = 0;
    this.push_back = [];
}

Tokenizer.LBRACE = 1;
Tokenizer.RBRACE = 2;
Tokenizer.NUMBER = 3;
Tokenizer.SYMBOL = 4;
Tokenizer.END    = 5;

Tokenizer.prototype.get = function() {
    if (this.push_back.length) {
        return this.push_back.pop();
    } else {
        return this._getNext();
    }
}

Tokenizer.prototype.pushBack = function(token) {
    this.push_back.push(token);
}

Tokenizer.prototype.ch = function() {
    return this.source.charAt(this.pos);
}

Tokenizer.prototype.log = function(s) {
    console.log(s);
    return s;
}

Tokenizer.prototype.inc = function() {
    this.pos++;
}

Tokenizer.prototype.end_q = function() {
    return this.source.legth === this.pos + 1;
}

Tokenizer.prototype._getNext = function() {
    if (this.end_q()) {
        return {
            type: Tokenizer.END
        };
    }

    this._skipWS();

    if (this.ch() === '(') {
        this.inc();
        return {
            type: Tokenizer.LBRACE,
            str_type: "lbrace"
        };
    } else if (this.ch() === ')') {
        this.inc();
        return {
            type: Tokenizer.RBRACE,
            str_type: "rbrace"
        };
    } else if (this.ch().match(/[0-9]/)) {
        return {
            type: Tokenizer.NUMBER,
            str_type: "number",
            value: this._readNumber()
        };
    } else if (!this.ch().match(/\s/)) {
        return {
            type: Tokenizer.SYMBOL,
            str_type: "symbol",
            value: this._readSymbol()
        }
    } else {
        throw new Error("invalid input character: " + this.ch());
    }
};

Tokenizer.prototype._readNumber = function() {
    var num_str = ''

    while (this.ch().match(/[0-9]/)) {
        num_str += this.ch();
        this.inc();
    }

    let num = Number(num_str);

    if (Number.isNaN(num)) {
        throw new Error("Malformed number encountered: " + num_str)
    }

    return num;
};

Tokenizer.prototype._readSymbol = function() {
    var symbol_str = '';
    while (!this.ch().match(/\s/)) {
        symbol_str += this.ch();
        this.inc();
    }

    return symbol_str;
};

Tokenizer.prototype._skipWS = function() {
    while (this.ch().match(/\s/)) {
        this.inc();
    }
};

module.exports = Tokenizer;
