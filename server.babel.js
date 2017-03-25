//  enable runtime transpilation to use ES6/7 in node

var path = require('path');

var repoRoot = path.resolve(__dirname, './');

var babelrcRoot = path.join(repoRoot, './.babelrc');

var fs = require('fs');

var babelrc = fs.readFileSync(babelrcRoot);
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
