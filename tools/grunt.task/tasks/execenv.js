/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var assert = require('assert');
var path = require('path');
var grunt = require('grunt');
var spawn = grunt.util.spawn;

module.exports = function() {
  var done = this.async();
  var runPromise = function(cmd, args, opts) {
    var promise = new Promise(function(resolve, reject){
      assert.strictEqual(typeof cmd, 'string');
      assert.ok(args instanceof Array);

      grunt.log.writeln('> ' + cmd + ' ' + args.join(' '));

      // var proc =
      spawn(
        {
          cmd: cmd,//命名行
          args: args,
          opts: opts,//子进程的，Additional options for the Node.js child_process spawn method.
        },
        function(error, result, code) {
          if (error) {
            grunt.log.error(error);
            done(false);
            reject(new Error(error));
          } else {
            //callback(result, code);
            resolve(result, code);
          }
        });

    });
    return promise;
  };

  var pkg = grunt.config.data.pkg;
  var tgz = pkg.name + '-' + pkg.version + '.tgz';

  grunt.log.writeln('Packing ' + tgz + ' (this could take a while)...');

  var promise=runPromise('npm', ['pack', '--verbose', '.']);
  promise.then(function(result, code) {
    require('tmp').dir(function(err, dir) {
      if (err) {
        grunt.log.error(err);
        throw new Error(err)
      }
      var cp=runPromise('cp', [tgz, dir]);
      cp.then(function (result, code) {
        var npmPromise=runPromise('npm', [//args
            'install',
            '--production',
            tgz
          ],
          {cwd: dir}
        );
        npmPromise.then(function(result, code){
          console.log('code-->', result.code);
          console.log('result-->', result.result);
        });
      })
    });
  })
    .catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
      done(false);
  });



};
