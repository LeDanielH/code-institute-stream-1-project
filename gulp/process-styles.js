var vars = require('./vars');

var gulp = require('gulp'),

    // GENERAL
    duplicate = require('gulp-rename'),
    gzip = require('gulp-gzip'),

    // DEPLOYMENT
    localServer = require('gulp-connect'),

    // CSS
    processSass = require('gulp-sass'),
    nanofyCss = require('gulp-cssnano'),
    purgeCss = require('gulp-css-purge'),
    stripCssComments = require('gulp-strip-css-comments');
// uncss = require('gulp-uncss'),

gulp.task('process-styles', [], function() {
    return vars.pipeEndProcess(vars.paths.styles.app, true,
        gulp.src([vars.paths.styles.src])
        .pipe(processSass({
            outputStyle: 'expanded'
        }).on('error', processSass.logError))
        .pipe(purgeCss())
        .pipe(stripCssComments())
        .pipe(gulp.dest(vars.paths.styles.app))
        .pipe(duplicate({
            suffix: '.min'
        }))
        .pipe(nanofyCss())
    );
});

gulp.task('process-fonts', function() {
    return gulp.src([vars.paths.fonts.src])
        .pipe(gulp.dest(vars.paths.fonts.app));
});