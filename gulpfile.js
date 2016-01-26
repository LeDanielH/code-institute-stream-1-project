	var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	nanofy = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect'),
	modernizr = require('gulp-modernizr'),
	nanohtml = require('gulp-htmlmin'),
	csspurge = require('gulp-css-purge'),
	uncss = require('gulp-uncss'),
	//imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	stripcsscomments = require('gulp-strip-css-comments'),
	gzip = require('gulp-gzip'),
	stripComments = require('gulp-strip-comments'),
	jshint = require('gulp-jshint'),
	ghPages = require('gulp-gh-pages');

gulp.task('process-styles', ['process-html'], function () {
	gulp.src(['src/styles/**/*.scss', 'src/styles/**/*.sass'])
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		// .pipe(uncss({
		// 	html: ['src/**/*.html'],
		// 	ignore: [
		// 		'.main-navigation-fixed', 
		// 		'.hide-element', 
		// 		'.show-element',
		// 		'.main-navigation .menu-item:first-child #nav-down',
		// 		'.main-navigation .menu-item:first-child #nav-up',
		// 		'.fa',
		// 		'.fa-lg',
		// 		'.fa-facebook',
  //               '.fa-twitter',
  //               '.fa-instagram',
  //               '.fa-youtube',
  //               '.fa-sign-in',
		// 		'.fa-sign-out',
		// 		'.main-navigation .menu-item:first-child .fa-angle-double-down',
		// 		'.main-navigation .menu-item:first-child .fa-angle-double-up',
		// 		'.fa-shopping-cart',
		// 		'.main-navigation',
  //               '#nav-shopping-cart',
  //               '.main-navigation #nav-sign-in',
  //               '.main-navigation #nav-sign-out',
		// 		'.main-navigation #menu-button',
		// 		'.main-navigation .menu-item:first-child',
		// 		'.main-navigation .menu-item:not(:first-child)'
		// 	]
		// }))
		.pipe(csspurge())
		.pipe(stripcsscomments())
		.pipe(gulp.dest('app/styles/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(nanofy())
		.pipe(gulp.dest('app/styles/'))
		.pipe(connect.reload());
});

gulp.task('process-js-libraries', function() {
	return gulp.src([
			// 'bower_components/angular/angular.min.js',
			// 'bower_components/angular-route/angular-route.min.js',
			// 'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/gsap/src/minified/TweenMax.min.js',
			'bower_components/d3/d3.min.js'
		])
		.pipe(concat('libraries.min.js'))
		//.pipe(stripComments())
		//.pipe(jshint())
		//.pipe(uglify())
		.pipe(gulp.dest('app/scripts/'));
});
// gulp.task('process-scripts', ['modernizr'], function () {
gulp.task('process-scripts', function () {
	return gulp.src([
			'!src/scripts/modernizr.js', //added for disabling modernizr
			//'src/scripts/angular/app.js',
			//'src/scripts/angular/controllers.js',
			//'src/scripts/angular/services.js',
			//'src/scripts/angular/directives.js',
			'src/scripts/my-jquery.js',
			'src/scripts/my-javascript.js',
			'src/scripts/my-d3.js',
			'src/scripts/my-gsap.js'
		])
		.pipe(concat('my-scripts.js'))
		.pipe(jshint())
		.pipe(gulp.dest('app/scripts/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('app/scripts/'))
		.pipe(connect.reload());
});

// gulp.task('modernizr', function() {
// 	gulp.src([
// 			'!src/scripts/modernizr.js',
// 			'src/scripts/**/*.js'
// 		])
// 		.pipe(modernizr())
// 		.pipe(gulp.dest("src/scripts/"));
// });

gulp.task('process-html', ['process-scripts'], function () {
	return gulp.src('src/*.html')
		.pipe(stripComments())
		.pipe(nanohtml({
		 	collapseWhitespace: true
		}))
		.pipe(gulp.dest('app'))
		.pipe(connect.reload());
});

// gulp.task('process-images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('app/images/'))
//     .pipe(connect.reload());
// });

gulp.task('webserver', function () {
	connect.server({
		root: 'app',
		livereload: true,
		fallback: 'app/index.html'
	});
});

gulp.task('watch', function () {
	gulp.watch(['src/scripts/**/*.js', '!src/scripts/modernizr.js'], ['process-scripts', 'process-html', 'process-styles']);
	gulp.watch(['src/styles/**/*.scss', 'src/styles/**/*.sass'], ['process-html', 'process-styles']);
	gulp.watch(['src/**/*.html'], ['process-html', 'process-styles']);
	//gulp.watch('src/images/**/*', ['process-images']);
});

gulp.task('gzip-js', ['process-html', 'process-styles', 'process-scripts'], function() {
		gulp.src('app/scripts/*.min.js')
		.pipe(gzip())
		.pipe(gulp.dest('app/scripts/'));
});

gulp.task('gzip-css', ['process-html', 'process-styles', 'process-scripts'], function() {
		gulp.src('app/styles/*.min.css')
		.pipe(gzip())
		.pipe(gulp.dest('app/styles/'));
});

gulp.task('gzip-html',['process-html', 'process-styles', 'process-scripts'], function() {
		gulp.src('app/*.html')
		.pipe(gzip())
		.pipe(gulp.dest('app/'));
});

gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());
});

gulp.task('default', [
	'process-scripts', 
	'process-styles', 
	//'process-images', 
	'process-html', 
	'gzip-js',
	'gzip-css', 
	'gzip-html',
	'webserver', 
	'watch'
]);
