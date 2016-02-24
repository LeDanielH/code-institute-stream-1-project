var vars = require('./gulp/vars');

var gulp = require('gulp'),

    // GENERAL
    duplicate = require('gulp-rename'),
    gzip = require('gulp-gzip'),

    // JAVASCRIPT
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglify'),
    checkJs = require('gulp-jshint'),
    templateCache = require('gulp-angular-templatecache');

gulp.task('process-js-libraries', function() {
    return vars.pipeEndProcess(vars.paths.scripts.app, false,
        gulp.src(vars.jsLibrariesMinified)
        .pipe(concat(vars.renderedJsNames.javascript.min))
        .pipe(uglifyJs())
    );
});

gulp.task('process-js-debug-libraries', function() {
    return vars.pipeEndProcess(vars.paths.scripts.app, false,
        gulp.src(vars.jsLibrariesDebug)
        .pipe(concat(vars.renderedJsNames.javascript.debug))
        .pipe(gulp.dest(vars.paths.scripts.app))
    );
});