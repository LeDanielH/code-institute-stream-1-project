var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    modernizr = require('gulp-modernizr');

gulp.task('process-styles', function() {
  return sass('src/styles/main.scss', {style: 'compressed'})
    .pipe(gulp.dest('assets/styles/'))
    .pipe(connect.reload())
})

gulp.task('modernizr', function() {
  gulp.src('src/scripts/*.js')
    .pipe(modernizr())
    .pipe(gulp.dest('src/scripts/'))
})

gulp.task('process-scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/'))
})

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
})

gulp.task('watch', function() {
  gulp.watch('src/scripts/*.js', ['process-scripts']);
  gulp.watch('src/styles/main.scss', ['process-styles']);
})

gulp.task('default', ['process-styles', 'process-scripts', 'webserver','watch']);