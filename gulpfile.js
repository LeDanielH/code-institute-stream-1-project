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
  gzip = require('gulp-gzip');


gulp.task('process-styles', ['process-html'], function () {
	gulp.src(['src/styles/**/*.scss', 'src/styles/**/*.sass'])
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(uncss({
      html: ['src/**/*.html']
    }))
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

// gulp.task('process-styles', ['process-html'], function() {
//   gulp.src('src/styles/main.css')
//   .pipe(uncss({
//     html: ['src/**/*.html']
//   }))
//   .pipe(csspurge())
//   .pipe(stripcsscomments())
//   .pipe(gulp.dest('app/styles/'))
//   .pipe(rename({
//     suffix: '.min'
//   }))
//   .pipe(nanofy())
//   .pipe(gulp.dest('app/styles/'))
//   .pipe(connect.reload());
// });

gulp.task('process-scripts', ['modernizr'], function () {
	return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/d3/d3.js',
      'bower_components/gsap/src/uncompressed/TweenMax.js',
      'src/scripts/**/*.js'

    ])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/scripts/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('app/scripts/'))
		.pipe(connect.reload());
});

gulp.task('modernizr', function() {
  gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/d3/d3.js',
      'bower_components/gsap/src/uncompressed/TweenMax.js',
      'src/scripts/**/*.js',
      '!src/scripts/modernizr.js'
    ])
    .pipe(modernizr())
    .pipe(gulp.dest("src/scripts/"));
});

gulp.task('process-html', function () {
	return gulp.src('src/*.html')
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
	//gulp.watch(['src/styles/main.css'], ['process-html', 'process-styles']);
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