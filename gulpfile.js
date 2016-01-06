var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect');

gulp.task('process-styles', function() {
  return sass('src/styles/main.scss', {style: 'compressed'})
    .pipe(gulp.dest('dest/styles/'))
    .pipe(connect.reload())
})

gulp.task('process-scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/scripts/'))
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