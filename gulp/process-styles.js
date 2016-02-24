var vars = require('./vars');

var gulp = require('gulp'),
	// GENERAL
	concat = require('gulp-concat'),
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
	uglifyJs = require('gulp-uglify'),
	modernizeJs = require('gulp-modernizr'),
	checkJs = require('gulp-jshint'),
	templateCache = require('gulp-angular-templatecache'),

	// IMAGES
	cache = require('gulp-cache'),
	minifyImages = require('gulp-imagemin');

gulp.task('process-styles', [], function() {
	return vars.pipeEndProcess(vars.paths.styles.app, true,
		gulp.src([vars.paths.styles.src])
			.pipe(processSass({outputStyle: 'expanded'}).on('error', processSass.logError))
			.pipe(purgeCss())
			.pipe(stripCssComments())
			.pipe(gulp.dest(vars.paths.styles.app))
			.pipe(duplicate({suffix: '.min'}))
			.pipe(nanofyCss())
		);
	});