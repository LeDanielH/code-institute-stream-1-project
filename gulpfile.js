var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
  nanofy = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	connect = require('gulp-connect'),
	modernizr = require('gulp-modernizr'),
  nanohtml = require('gulp-htmlmin'),
  csspurge = require('gulp-css-purge'),
  uncss = require('gulp-uncss');
  //sourcemaps = require('gulp-sourcemaps');
	//plumber = require('gulp-plumber');


gulp.task('process-styles', function () {
	return sass('src/main.scss', {
			style: 'expanded'
		})
    .pipe(uncss({
      html: ['src/*.html']
    }))
    .pipe(csspurge())
		// .pipe(plumber())
		.pipe(gulp.dest('app/styles/'))
    .pipe(rename({
      suffix : '.min'
    }))
    //.pipe(sourcemaps.init())
    .pipe(nanofy())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('app/styles/'))
		.pipe(connect.reload())
})

gulp.task('modernizr', function () {
	gulp.src('src/scripts/**/*.js')
		.pipe(modernizr())
		.pipe(gulp.dest('src/scripts/'))
})

gulp.task('process-scripts', function () {
	return gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/d3/d3.js',
      'src/scripts/**/*.js'

    ])
		// .pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/scripts/'))
		.pipe(rename({
			suffix: '.min'
		}))
    //.pipe(sourcemaps.init())
		.pipe(uglify())
    //.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/scripts/'))
    .pipe(connect.reload());
})

gulp.task('process-html', function() {
  return gulp.src('src/*.html')
    .pipe(nanohtml({ collapseWhitespace: true }))
    .pipe(gulp.dest('app'))
    .pipe(connect.reload());
})

gulp.task('webserver', function () {
	connect.server({
		root: 'app',
		livereload: true,
		fallback: 'app/index.html'
	});
})

gulp.task('watch', function () {
	gulp.watch('src/scripts/**/*.js', ['process-scripts']);
	gulp.watch('src/main.scss', ['process-styles']);
	gulp.watch(['src/**/*.html'], ['html']);
})

gulp.task('default', ['process-styles', 'modernizr', 'process-scripts', 'process-html', 'webserver', 'watch']);