#!/usr/bin/env node
var argv = require('yargs')
        .default('xvalue', 10)
        .default('y', 10)
        .alias('x', 'xvalue')
        .alias('y', 'yvalue')
        .argv
    ;
console.log(argv.x + argv.y);
