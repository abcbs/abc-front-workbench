/*eslint-disable no-multi-str */

'use strict';

var envify = require('loose-envify/custom');
var grunt = require('grunt');
var UglifyJS = require('uglify-js');
var uglifyify = require('uglifyify');
var derequire = require('derequire');
var collapser = require('bundle-collapser/plugin');
var path = require( 'path');

var envifyDev = envify({NODE_ENV: process.env.NODE_ENV || 'development'});
var envifyProd = envify({NODE_ENV: process.env.NODE_ENV || 'production'});

var repoRoot = path.resolve(__dirname, '../');

var simple = path.join(repoRoot, './data/header-template-short.txt');
var license= path.join(repoRoot, './data/header-template-extended.txt');
var SIMPLE_TEMPLATE =
  grunt.file.read(simple);

var LICENSE_TEMPLATE =
  grunt.file.read(license);

function minify(src) {
  return UglifyJS.minify(src, {fromString: true}).code;
}

// TODO: move this out to another build step maybe.
function bannerify(src) {
  var version = grunt.config.data.pkg.version;
  var packageName = this.data.packageName || this.data.standalone;
  return (
    grunt.template.process(
      LICENSE_TEMPLATE,
      {data: {package: packageName, version: version}}
    ) +
    src
  );
}

function simpleBannerify(src) {
  var version = grunt.config.data.pkg.version;
  var packageName = this.data.packageName || this.data.standalone;
  return (
    grunt.template.process(
      SIMPLE_TEMPLATE,
      {data: {package: packageName, version: version}}
    ) +
    src
  );
}

// Our basic config which we'll add to to make our other builds
var basic = {
  entries: [
    './lib/lib/material-ui/*.js',
  ],
  outfile: './lib/abc.js',
  debug: false,
  standalone: 'Abc',
  // Apply as global transform so that we also envify fbjs and any other deps
  globalTransforms: [envifyDev],
  plugins: [collapser],
  after: [derequire, simpleBannerify],
};

var min = {
  entries: [
    './lib/lib/material-ui/*.js',
  ],
  outfile: './lib/abc.min.js',
  debug: false,
  standalone: 'Abc',

  transforms: [envifyProd, uglifyify],
  globalTransforms: [envifyProd],
  plugins: [collapser],

  after: [minify, bannerify],
};

module.exports = {
  basic: basic,
  min: min,
};
