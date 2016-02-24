var vars = require('./vars');

var gulp = require('gulp'),
    localServer = require('gulp-connect'),
    minifyImages = require('gulp-imagemin');


gulp.task('process-json', function() {
    return gulp.src([vars.paths.json.src])
        .pipe(gulp.dest(vars.paths.json.app))
        .pipe(localServer.reload());
});

gulp.task('process-images', function() {
    return gulp.src([vars.paths.images.src])
        .pipe(minifyImages({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(vars.paths.images.app));
});

gulp.task('process-videos', function() {
    return gulp.src([vars.paths.videos.src])
        .pipe(gulp.dest(vars.paths.videos.app));
});

gulp.task('process-audio', function() {
    return gulp.src([vars.paths.audio.src])
        .pipe(gulp.dest(vars.paths.audio.app));
});