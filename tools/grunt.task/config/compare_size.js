'use strict';

var gzip = require('gzip-js');

module.exports = {
  files: [
    'lib/*.js',
  ],
  options: {
    compress: {
      gz: function(contents) {
        return gzip.zip(contents, {}).length;
      },
    },
    cache: '.grunt/sizecache.json',
  },
};
