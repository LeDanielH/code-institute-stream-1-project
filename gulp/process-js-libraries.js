var vars = require('./vars');
var gulp = require('gulp'),

    gzip = require('gulp-gzip'),
    concat = require('gulp-concat'),
    uglifyJs = require('gulp-uglify');

gulp.task('process-js-libraries', function() {
    return vars.pipeEndProcess(vars.paths.scripts.app, false,
        gulp.src([
            // vars.jsLibraries.jquery.min,
            vars.jsLibraries.angular.min,
            vars.jsLibraries.angularRoute.min,
            vars.jsLibraries.angularResource.min,
            vars.jsLibraries.angularSanitize.min,
            vars.jsLibraries.angularAnimate.min,
            vars.jsLibraries.angularFitText.min
            // vars.jsLibraries.d3.min,
            // vars.jsLibraries.gsap.min
        ])
        .pipe(concat(vars.renderedJsNames.javascript.min))
        .pipe(uglifyJs())
    );
});

gulp.task('process-js-debug-libraries', function() {
    return gulp.src([
            // vars.jsLibraries.jquery.debug,
            vars.jsLibraries.angular.debug,
            vars.jsLibraries.angularRoute.debug,
            vars.jsLibraries.angularResource.debug,
            vars.jsLibraries.angularSanitize.debug,
            vars.jsLibraries.angularAnimate.debug,
            vars.jsLibraries.angularFitText.min
            // vars.jsLibraries.d3.debug,
            // vars.jsLibraries.gsap.debug
        ])
        .pipe(concat(vars.renderedJsNames.javascript.debug))
        .pipe(gulp.dest(vars.paths.scripts.app));
});