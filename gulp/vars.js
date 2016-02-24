var gulp = require('gulp'),
    gzip = require('gulp-gzip'),
    localServer = require('gulp-connect');

var src = 'src',
    dest = 'app';

var paths = {
    html: {
        src: src + '/**/*.html',
        srcTemplates: src + '/templates/**/*.html',
        srcRoot: src + '/index.html',
        app: dest + '/',
        appTemplates: src + '/templates/**/*.html'
    },

    styles: {
        src: src + '/styles/**/*.+(scss|sass)',
        app: dest + '/styles/'
    },

    scripts: {
        src: src + '/scripts/',
        app: dest + '/scripts/'
    },

    json: {
        src: src + '/data/**/*.json',
        app: dest + '/data/'
    },

    images: {
        src: src + '/images/**/*',
        app: dest + '/images/'
    },

    fonts: {
        src: src + '/fonts/**/*',
        app: dest + '/fonts'
    },

    bower: 'bower_components/',
    deploy: './' + dest + '/**/*',

};

var jsLibraries = [
    paths.bower + 'angular/angular',
    paths.bower + 'angular-route/angular-route',
    paths.bower + 'angular-resource/angular-resource',
    paths.bower + 'angular-sanitize/angular-sanitize'
];
var jsLibrariesDebug = jsLibraries.map(function(lib) {
    return lib + '.js';
});
var jsLibrariesMinified = jsLibraries.map(function(lib) {
    return lib + '.min.js';
});

var ignoredJsFilesPaths = [
    '!' + paths.scripts.src + 'temp/*.js',
    '!' + paths.scripts.src + 'autogenerated/templates.js',
    '!' + paths.scripts.src + 'directives/testimonials.js'
];

var ignoredJsFiles = ignoredJsFilesPaths.map(function(file) {
    return '\'' + file + '\'';
}).join();
var ignoreModernizr = '!' + paths.scripts.src + 'autogenerated/modernizr.js';
var watchedJsFiles = [ignoreModernizr, ignoredJsFiles, paths.scripts.src + '**/*.js'];

var renderedJsNames = {
    javascript: {
        myJs: 'my-scripts.js',
        debug: 'libraries-debug.js',
        min: 'libraries.min.js'
    }
};

function pipeEndProcess(path, reload, gulpObj) {
    var result = gulpObj.pipe(gulp.dest(path))
        .pipe(gzip())
        .pipe(gulp.dest(path));

    if (reload) {
        return result.pipe(localServer.reload());
    }
    return result;
}

module.exports = {
    paths: paths,
    jsLibraries: jsLibraries,
    jsLibrariesDebug: jsLibrariesDebug,
    jsLibrariesMinified: jsLibrariesMinified,
    ignoredJsFilesPaths: ignoredJsFilesPaths,
    ignoredJsFiles: ignoredJsFiles,
    ignoreModernizr: ignoreModernizr,
    watchedJsFiles: watchedJsFiles,
    renderedJsNames: renderedJsNames,
    pipeEndProcess: pipeEndProcess
};