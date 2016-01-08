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
	uncss = require('gulp-uncss'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache');

gulp.task('process-styles', function () {
	return sass('src/main.scss', {
			style: 'expanded'
		})
		.pipe(uncss({
			html: ['src/*.html']
		}))
		.pipe(csspurge())
		.pipe(gulp.dest('app/styles/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(nanofy())
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
		.pipe(concat('main.js'))
		.pipe(gulp.dest('app/scripts/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('app/scripts/'))
		.pipe(connect.reload());
});

gulp.task('process-html', function () {
	return gulp.src('src/*.html')
		.pipe(nanohtml({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('app'))
		.pipe(connect.reload());
});

gulp.task('process-images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images/'))
    .pipe(connect.reload());
});

gulp.task('webserver', function () {
	connect.server({
		root: 'app',
		livereload: true,
		fallback: 'app/index.html'
	});
});

gulp.task('watch', function () {
	gulp.watch('src/scripts/**/*.js', ['process-scripts']);
	gulp.watch('src/main.scss', ['process-styles']);
	gulp.watch(['src/**/*.html'], ['process-html']);
  gulp.watch('src/images/**/*', ['process-images']);
});


gulp.task('default', ['process-styles', 'modernizr', 'process-scripts', 'process-images', 'process-html', 'webserver', 'watch']);