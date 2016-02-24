var vars = require('./vars');

var gulp = require('gulp'),
    localServer = require('gulp-connect'),
    cache = require('gulp-cache'),
    minifyImages = require('gulp-imagemin');


gulp.task('process-json', function() {
    return gulp.src([vars.paths.json.src])
        .pipe(gulp.dest(vars.paths.json.app))
        .pipe(localServer.reload());
});

gulp.task('process-images', function() {
    return gulp.src([vars.paths.images.src])
        .pipe(cache(minifyImages({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(vars.paths.images.app));
});