var vars = require('./vars');

var gulp = require('gulp'),

    localServer = require('gulp-connect'),
    nanofyHtml = require('gulp-htmlmin'),
    stripHtmlComments = require('gulp-strip-comments');


gulp.task('process-html', [], function() {
    return gulp.src(vars.paths.html.src)
        .pipe(stripHtmlComments())
        .pipe(nanofyHtml())
        .pipe(gulp.dest(vars.paths.html.app))
        .pipe(localServer.reload());
});