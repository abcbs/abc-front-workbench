#!/usr/bin/env node
require('babel-register');
const  path =require( 'path');

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('count', 'Count the lines in a file')
    .example('$0 count -f foo.js', 'count the lines in the given file')
    .alias('f', 'file')
    .nargs('f', 1)
    .describe('f', 'Load a file')
    .demand(1, ['f'])
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var fs = require('fs');
var fi="d:\\DevT\\abc-react-end\\react-redux-tutorial-master\\react-bootstrap-getting\\misrs\\yargs\\bool.js";
fi=argv.f || ''
var ff=path.join(__dirname,fi)

var s = fs.createReadStream(fi);

var lines = 0;
s.on('data', function (buf) {
    lines += buf.toString().match(/\n/g).length;
});

s.on('end', function () {
    console.log(lines);
});