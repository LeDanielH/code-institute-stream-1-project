var paths = {
	html: {
		src: 'src/**/*.html',
		srcTemplates: 'src/templates/**/*.html',
		srcRoot: 'src/index.html',
		app: 'app/',
		appTemplates: 'src/templates/**/*.html'
	},

    styles: {
        src: 'src/styles/**/*.+(scss|sass)',
        app: 'app/styles/'
    },

    scripts: {
        src: 'src/scripts/',
        app: 'app/scripts/'
    },

    json: {
    	src: 'src/data/**/*.json',
    	app: 'app/data/'
    },

    images: {
        src: 'src/images/**/*',
        app: 'app/images/'
    },

    fonts: {
    	src: 'src/fonts/**/*',
    	app: 'app/fonts'
    },

    bower: 'bower_components/',
    deploy: './app/**/*',
   
};

var jsLibraries = [
	paths.bower + 'angular/angular',
	paths.bower + 'angular-route/angular-route',
	paths.bower + 'angular-resource/angular-resource',
	paths.bower + 'angular-sanitize/angular-sanitize'
];
var jsLibrariesDebug = jsLibraries.map(function(lib) { return lib + '.js';});
var jsLibrariesMinified = jsLibraries.map(function(lib) { return lib + '.min.js';});

var ignoredJsFilesPaths = [
	'!' + paths.scripts.src + 'temp/*.js',
	'!' + paths.scripts.src + 'autogenerated/templates.js',
	'!' + paths.scripts.src + 'directives/testimonials.js'
];

var ignoredJsFiles = ignoredJsFilesPaths.map(function(file) { return '\'' + file + '\''; }).join();
var ignoreModernizr = '!' + paths.scripts.src + 'autogenerated/modernizr.js';
var watchedJsFiles = [ignoreModernizr, ignoredJsFiles, paths.scripts.src + '**/*.js'];

var renderedJsNames = {
	javascript: {
		myJs: 'my-scripts.js',
		debug: 'libraries-debug.js',
		min: 'libraries.min.js'
	}
};

var gulp = require('gulp'),
	// GENERAL
	concat = require('gulp-concat'),
	duplicate = require('gulp-rename'),
	gzip = require('gulp-gzip'),
	
	// DEPLOYMENT
	localServer = require('gulp-connect'),
	deploy = require('gulp-gh-pages'),

	// HTML
	nanofyHtml = require('gulp-htmlmin'),
	stripHtmlComments = require('gulp-strip-comments'),

	// CSS
	processSass = require('gulp-sass'),
	nanofyCss = require('gulp-cssnano'),
	purgeCss = require('gulp-css-purge'),
	stripCssComments = require('gulp-strip-css-comments'),
	// uncss = require('gulp-uncss'),
	
	// JAVASCRIPT
	uglifyJs = require('gulp-uglify'),
	modernizeJs = require('gulp-modernizr'),
	checkJs = require('gulp-jshint'),
	templateCache = require('gulp-angular-templatecache'),

	// IMAGES
	cache = require('gulp-cache'),
	minifyImages = require('gulp-imagemin');


// function pipeEndProcess(path) {
// 	var pipePath = ".pipe(gulp.dest(paths." + path + ")).pipe(gzip()).pipe(gulp.dest(paths." + path + ")).pipe(localServer.reload())";
// 	return eval(pipePath);
// }

// var pipeEndProcess = function(path) {
// 	var pipePath = ".pipe(gulp.dest(paths." + path + ")).pipe(gzip()).pipe(gulp.dest(paths." + path + ")).pipe(localServer.reload())";
// 	return pipePath;
// };

// WATCHED TASKS
gulp.task('process-html', [], function() {
	return gulp.src(paths.html.src)
		.pipe(stripHtmlComments())
		.pipe(nanofyHtml())
		.pipe(gulp.dest(paths.html.app))
		.pipe(localServer.reload());
	});

gulp.task('gzip-index', ['process-html'], function() {
	return gulp.src(paths.html.srcRoot)
		.pipe(gzip())
		.pipe(gulp.dest(paths.html.app));
	});

gulp.task('process-styles', [], function() {
	return gulp.src([paths.styles.src])
		.pipe(processSass({outputStyle: 'expanded'}).on('error', processSass.logError))
		.pipe(purgeCss())
		.pipe(stripCssComments())
		.pipe(gulp.dest(paths.styles.app))
		.pipe(duplicate({suffix: '.min'}))
		.pipe(nanofyCss())
		.pipe(gulp.dest(paths.styles.app))
		.pipe(gzip())
		.pipe(gulp.dest(paths.styles.app))
		.pipe(localServer.reload());
	});

gulp.task('process-scripts', function() {
	return gulp.src([
		ignoredJsFiles,
		paths.scripts.src + 'app.js',
		paths.scripts.src + 'controllers/index.js',
		paths.scripts.src + 'controllers/*.js',
		paths.scripts.src + 'services/*.js',
		paths.scripts.src + 'directives/*.js',
		paths.scripts.src + 'filters/*.js',
		paths.scripts.src + 'autogenerated/*.js'
		])
		.pipe(concat(renderedJsNames.javascript.myJs))
		.pipe(checkJs())
		.pipe(gulp.dest(paths.scripts.app))
		.pipe(duplicate({suffix: '.min'}))
		.pipe(uglifyJs())
		.pipe(gulp.dest(paths.scripts.app))
		.pipe(gzip())
		.pipe(gulp.dest(paths.scripts.app))
		.pipe(localServer.reload());
	});

gulp.task('cache-angular-templates', ['process-html'], function() {
	return gulp.src(paths.html.srcTemplates)
		.pipe(templateCache())
		.pipe(gulp.dest(paths.scripts.src + 'autogenerated/'));
});

gulp.task('process-json', function() {
	return gulp.src([paths.json.src])
		.pipe(gulp.dest(paths.json.app));
	});

gulp.task('process-images', function() {
	return gulp.src([paths.images.src])
		.pipe(cache(minifyImages({optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(paths.images.app));
	});


// RUN ONCE TASKS
gulp.task('process-fonts', function() {
	return gulp.src([paths.fonts.src])
		.pipe(gulp.dest(paths.fonts.app));
	});

gulp.task('process-js-libraries', function() {
	return gulp.src(jsLibrariesMinified)
		.pipe(concat(renderedJsNames.javascript.min))
		.pipe(uglifyJs())
		.pipe(gulp.dest(paths.scripts.app))
		.pipe(gzip())
		.pipe(gulp.dest(paths.scripts.app));
	});

gulp.task('process-js-debug-libraries', function() {
	return gulp.src(jsLibrariesDebug)
		.pipe(concat(renderedJsNames.javascript.debug))
		.pipe(gulp.dest(paths.scripts.app));
	});

gulp.task('modernizeJs', function() {
	return gulp.src(watchedJsFiles)
		.pipe(modernizeJs())
		.pipe(gulp.dest(paths.scripts.src + 'autogenerated/'));
	});

gulp.task('deploy', function() {
	return gulp.src(paths.deploy)
		.pipe(deploy());
	});

// DEFAULT TASKS
gulp.task('localServer', [], function() {
	localServer.server({
		root: paths.html.app,
		livereload: true,
		fallback: paths.html.srcRoot
	});
});

gulp.task('watch', function() {
	gulp.watch(paths.html.src, ['process-html']);
	gulp.watch(paths.styles.src, ['process-styles']);
	gulp.watch(watchedJsFiles, ['process-scripts']);
	gulp.watch(paths.json.src, ['process-json']);
	gulp.watch(paths.images.src, ['process-images']);
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
	

