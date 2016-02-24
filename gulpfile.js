var vars = require('./gulp/vars');
var gulp = require('gulp');

require('./gulp/process-html');
require('./gulp/process-styles');
require('./gulp/process-scripts');
require('./gulp/process-data');
require('./gulp/deployment');
require('./gulp/process-js-libraries');
require('./gulp/create-angular-templates-cache');

gulp.task('watch', function() {
    gulp.watch(vars.paths.html.src, ['process-html']);
    gulp.watch(vars.paths.styles.src, ['process-styles']);
    gulp.watch(vars.watchedJsFiles, ['process-scripts']);
    gulp.watch(vars.paths.json.src, ['process-json']);
    gulp.watch(vars.paths.images.src, ['process-images']);
});

gulp.task('default', [
    'process-html',
    'process-styles',
    'process-scripts',
    'process-json',
    'process-images',
    'watch',
    'localServer'
]);