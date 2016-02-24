var vars = require('./vars');

var gulp = require('gulp'),

    // GENERAL
    gzip = require('gulp-gzip'),

    // JAVASCRIPT
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglify');

gulp.task('process-js-libraries', function() {
    return vars.pipeEndProcess(vars.paths.scripts.app, false,
        gulp.src(vars.jsLibrariesMinified)
            .pipe(concat(vars.renderedJsNames.javascript.min))
            .pipe(uglifyJs())
    );
});

gulp.task('process-js-debug-libraries', function() {
    return gulp.src(vars.jsLibrariesDebug)
        .pipe(concat(vars.renderedJsNames.javascript.debug))
        .pipe(gulp.dest(vars.paths.scripts.app));
});