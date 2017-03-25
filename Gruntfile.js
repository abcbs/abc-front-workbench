'use strict';
require('babel-register');
require ('babel-polyfill') ;
var path = require('path');

var GULP_EXE = 'gulp';
if (process.platform === 'win32') {
	GULP_EXE += '.cmd';
}

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: require('./tools/grunt.task/config/browserify'),//浏览器压缩
		npm: require('./tools/grunt.task/config/npm'),
		'compare_size': require('./tools/grunt.task/config/compare_size'),

	});//初始化设置

	grunt.config.set('compress', require('./tools/grunt.task/config/compress'));

	//切换到Gulp
	function spawnGulp(args, opts, done) {

		grunt.util.spawn({
			// This could be more flexible (require.resolve & lookup bin in package)
			// but if it breaks we'll fix it then.
			cmd: path.join('node_modules', '.bin', GULP_EXE),
			args: args,
			opts: Object.assign({stdio: 'inherit'}, opts),
		}, function(err, result, code) {
			if (err) {
				grunt.fail.fatal('Something went wrong running gulp: ', result);
			}
			done(code === 0);
		});
	}//定义执行Gulp方法

	//读取配置文件
	Object.keys(grunt.file.readJSON('package.json').devDependencies)
		.filter(function(npmTaskName) {//获取包含grunt
			return npmTaskName.indexOf('grunt-') === 0;//过滤掉不包含的true，
		})
		.filter(function(npmTaskName) {
			return npmTaskName !== 'grunt-cli';
		})
		.forEach(function(npmTaskName) {
			grunt.loadNpmTasks(npmTaskName);
		});

	//语法检查
	grunt.registerTask('eslint', function() {
		// Use gulp here.
		spawnGulp(['eslint'], null, this.async());
	});
	//创建
	grunt.registerTask('build-modules', function() {
		spawnGulp(['abc:modules'], null, this.async());
	});
	
	grunt.registerTask('delete-build-modules', function() {
		// Use gulp here.
		spawnGulp(['abc:clean'], null, this.async());
	});

	//待调试
	grunt.registerMultiTask('browserify', require('./tools/grunt.task/tasks/browserify'));


	//基础拷贝与浏览器打包操作
	grunt.registerTask('build:basic', [
		'build-modules',
		//'version-check',
		'browserify:basic',
	]);
	//基础拷贝与浏览器打包操作
	grunt.registerTask('build:min', [
		'build-modules',
		'browserify:basic',
		'browserify:min',
		'compare_size'
	]);

	//待调试
	//grunt.registerMultiTask('npm', require('./tools/grunt.task/tasks/npm'));

	//gitoperation
	//grunt.registerTask('gitoperation', require('./grunt/tasks/gitoperation'));
	//execenv
	//grunt.registerTask('execenv', require('./tools/grunt.task/tasks/execenv'));

	//grunt.registerTask('webpack:startDevlop', webpack.startDevlop);
	
	//grunt.registerTask("default", ["webpack:startDevlop"]);


	// Production build
	grunt.registerTask("build", ["webpack:build"]);
};
