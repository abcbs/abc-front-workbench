'use strict';

var grunt = require('grunt');

var version = grunt.config.data.pkg.version;

module.exports = {
  starter: {
    options: {
      archive: './lib/abc-' + version + '.zip',
    },
    files: [
      {cwd: './lib/starter', src: ['**'], dot: true, dest: 'abc-' + version + '/'},
    ],
  },
};
