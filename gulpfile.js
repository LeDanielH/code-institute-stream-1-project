var vars = require('./gulp/vars');

var gulp = require('gulp'),

	// GENERAL
	duplicate = require('gulp-rename'),
	gzip = require('gulp-gzip'),
	
	// DEPLOYMENT
	localServer = require('gulp-connect'),
	deploy = require('gulp-gh-pages'),

	// HTML
	nanofyHtml = require('gulp-htmlmin'),
	stripHtmlComments = require('gulp-strip-comments'),

	// CSS
	processSass = require('gulp-sass'),
	nanofyCss = require('gulp-cssnano'),
	purgeCss = require('gulp-css-purge'),
	stripCssComments = require('gulp-strip-css-comments'),
	// uncss = require('gulp-uncss'),
	
	// JAVASCRIPT
	concat = require('gulp-concat'),
	uglifyJs = require('gulp-uglify'),
	modernizeJs = require('gulp-modernizr'),
	checkJs = require('gulp-jshint'),
	templateCache = require('gulp-angular-templatecache'),

	// IMAGES
	cache = require('gulp-cache'),
	minifyImages = require('gulp-imagemin');


require('./gulp/process-html');
require('./gulp/process-styles');
require('./gulp/process-scripts');
require('./gulp/process-data');
require('./gulp/deployment');
require('./gulp/process-js-libraries');


gulp.task('watch', function() {
	gulp.watch(vars.paths.html.src, ['process-html']);
	gulp.watch(vars.paths.styles.src, ['process-styles']);
	gulp.watch(vars.watchedJsFiles, ['process-scripts']);
	gulp.watch(vars.paths.json.src, ['process-json']);
	gulp.watch(vars.paths.images.src, ['process-images']);
});

gulp.task('default', [
	'process-html',
	'process-styles',
	'process-scripts',
	'process-json',
	'process-images',
	'watch',
	'localServer'
]);
	

