'use strict';
require("babel-register");
require("babel-polyfill");

var grunt = require('grunt');
var spawn = grunt.util.spawn;
var fs = require('fs');

var sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  })
};

var start = async function () {
  console.log('start');
  await sleep(1);
  console.log('end');
};



module.exports = function() {
  //var done = this.async();
  console.log("start...");
  start();
  console.log("over...");
};
