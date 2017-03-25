/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
require('babel-register');
require ('babel-polyfill') ;

var gulp = require('gulp');
var babel = require('gulp-babel');
var jest = require('gulp-jest').default;
var webpack= require( 'webpack');
var webpackConfig= require ('./webpack.config').default;
var WebpackDevServer= require ( 'webpack-dev-server');
var host = webpackConfig.devServer.host;
var port=webpackConfig.devServer.port;

var extractErrors = require('./tools/error-codes-babel/gulp-extract-errors');
var devExpressionWithCodes = require('./tools/error-codes-babel/dev-expression-with-codes');
var flatten = require('gulp-flatten');

//var del = require('del');

//var babelPluginModules = require('fbjs-scripts/babel-6/rewrite-modules');
//var extractErrors = require('./scripts/error-codes/gulp-extract-errors');
//var devExpressionWithCodes = require('./scripts/error-codes/dev-expression-with-codes');
//const eslint = require('gulp-eslint');
// Load all of the Gulp plugins.
var plugins = require('gulp-load-plugins')();

var errorCodeOpts = {
	errorMapFilePath: './tools/error-codes-babel/codes.json',
};
var paths = {
	abc: {
		src: [
			'src/**/*.js',
			// 'misrs/decorators/*.js',
			'!src/www/**/*.js',
			'!src/examples/**/*.js',
			'!src/material-ui/**/*.js',
			'!src/todomvc/**/*.js',
		],
		lib: 'lib/modules',
	},
};

function getTask(name) {
	return require(`./tools/gulp.task/${name}`)(gulp, plugins);
}

gulp.task('jest', function () {
	return gulp.src('__tests__').pipe(
		jest({
		config: {
			"rootDir": "",
			"testPathDirs": [
				// "./test",
				"./__tests__",
			],
		}
	}));
});

//清理临时和打包目录
gulp.task('abc:clean', () => {
	return gulp.src(['dist'])
		.pipe(plugins.clean({force: true}));
});

//运行 example
gulp.task('run', () => {
	// Start a webpack-dev-server
	const compiler = webpack(webpackConfig);
	new WebpackDevServer(compiler, webpackConfig.devServer)
		.listen(port, host, (err) => {
			if (err) {
				console.err('[webpack-dev-server]', `http://${host}:${port}/`);
			}
			// Server listening
			console.log('[webpack-dev-server]', `http://${host}:${port}/`);
		});
});

//开启服务
gulp.task('start', getTask('start-server'));

gulp.task('abc:build-cli', getTask('build-cli'));

//删除库
gulp.task('webpack:cleanVendors', getTask('clean-vendors'));
//删除并打包库
gulp.task('webpack:buildVendors', getTask('buildvendors'));

//
gulp.task('abc:release', getTask('release'));

//待调试
gulp.task('gits', getTask('gits'));


var babelOpts = {
	plugins: [
		devExpressionWithCodes, // this pass has to run before `rewrite-modules`
	],
};

//bebal文件处理
gulp.task('abc:modules', function() {
	return gulp
		.src(paths.abc.src)
		.pipe(babel(babelOpts))
		.pipe(flatten())
		.pipe(gulp.dest(paths.abc.lib));
});

gulp.task('abc:extract-errors', function() {
	return gulp
		.src(paths.abc.src)
		.pipe(extractErrors(errorCodeOpts));
});

gulp.task('examples:await', getTask('examples'));

//服务端任务运行
gulp.task('abc:backend-es6', getTask('backServerEs6'));
//buildBackendCli
gulp.task('abc:build-backend-cli', getTask('buildBackendCli'));
//gulp.task('default', ['abc:modules']);
//gulp.task('default', ['examples:await']);
