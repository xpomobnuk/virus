var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		fileinclude    = require('gulp-file-include'),
		sourcemaps     = require('gulp-sourcemaps'),
		inject         = require('gulp-inject'),
		merge          = require('merge-stream'),
		naturalSort    = require('gulp-natural-sort'),
		runSequence    = require('run-sequence');


gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

/* === {MAIN TASKS} === */ 

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app/'
		},
		notify: false,
	});
});

gulp.task('custom-js', function() {
	return gulp.src('app/js/custom/*.js')
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('libs-js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery-1.11.2.min.js'
		])
	.pipe(concat('libs.min.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('head-sass', function() {
	return gulp.src('app/sass/head.sass')
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return merge(gulp.src([
		'app/sass/fonts.sass',
		'app/sass/libs.sass',
		'app/sass/main.sass',
		'app/sass/media.sass'
		]))
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(concat('main.min.css'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('inject', function () {
	var paths = {
		html: './app/*.html',
		head: './app/css/head.min.css',
		main: './app/css/main.min.css',
		libs: './app/js/libs.min.js',
		custom: './app/js/common.min.js',
		other: './app/js/other/*',
		out: 'app/'
	};

	var name = function (name) {
		return {ignorePath: 'app', addRootSlash: false, name: name};
	}

	var target = gulp.src(paths.html);

	return target
	.pipe(inject(gulp.src(paths.head, {read: false}), name('head')))
	.pipe(inject(gulp.src(paths.main, {read: false}), name('main')))
	.pipe(inject(gulp.src(paths.libs, {read: false}), name('libs')))
	.pipe(inject(gulp.src(paths.custom, {read: false}), name('custom')))
	.pipe(inject(gulp.src(paths.other, {read: false}), name('other')))
	.pipe(gulp.dest(paths.out));
});

gulp.task('fileinclude', function() {
	return gulp.src([
		'app/html/*.html',
		'!app/html/header.html',
		'!app/html/header_*.html',
		'!app/html/footer.html',
		'!app/html/footer_*.html'
		])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: 'app/html'
		}))
		.pipe(gulp.dest('app/'));
});

gulp.task('generate-template', function (callback) {
	runSequence('fileinclude', 'inject', callback);
});

gulp.task('watch', ['head-sass', 'sass', 'libs-js', 'custom-js'], function() {
	gulp.watch('app/sass/*.sass', ['head-sass', 'sass']);
	gulp.watch('app/js/custom/*', ['custom-js']);
	gulp.watch('app/libs/**/*', ['libs-js']);
	gulp.watch('app/js/other/*', ['generate-template']);
	gulp.watch('app/html/*.html', ['generate-template']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('getWork', function (callback) {
	runSequence('fileinclude', 'watch', 'inject', 'browser-sync', callback);
});


gulp.task('imageMinify', function () {
	gulp.src('app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
});



/* === {BUILD} === */

gulp.task('build-minify', function (callback) {
	runSequence(
		'removedist',
		['fileinclude','get-files-build-minify'],
		'inject',
		'move-html-to-dist',
		callback
	);
});

gulp.task('get-files-build-minify', ['sass', 'head-sass', 'libs-js', 'custom-js'], function() {

	var buildCss = gulp.src(['app/css/*']).pipe(gulp.dest('dist/css'));
	var buildJs = gulp.src(['app/js/*.js']).pipe(gulp.dest('dist/js'));
	var buildOtherJs = gulp.src(['app/js/other/*.js']).pipe(gulp.dest('dist/js/other'));
	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
	var buildImage = gulp.src(['app/img/**/*']).pipe(imagemin()).pipe(gulp.dest('dist/img')); 

	return merge([buildCss, buildJs, buildOtherJs]);

});

gulp.task('move-html-to-dist', function () {
	return gulp.src('app/*.html').pipe(gulp.dest('dist'));
});



gulp.task('build-unminify', function (callback) {
	runSequence(
		'removedist',
		['fileinclude','get-files-build-unminify'],
		'inject-build-unminify',
		callback
	);
});


gulp.task('get-files-build-unminify', function() {

	var buildFiles = gulp.src('app/*.html').pipe(gulp.dest('dist'));
	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
	var buildImage = gulp.src(['app/img/**/*']).pipe(imagemin()).pipe(gulp.dest('dist/img')); 

	//sass to css and move to dist
	var buildCss = gulp.src([
		'app/sass/fonts.sass',
		'app/sass/head.sass',
		'app/sass/main.sass',
		'app/sass/media.sass'
		])
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('dist/css'));

	//directory libs move to dist
	var buildLibs = gulp.src('app/libs/**/*').pipe(gulp.dest('dist/libs'));

	//custom js move to dist
	var buildCustomJs = gulp.src(['app/js/custom/*']).pipe(gulp.dest('dist/js'));

	//custom js move to dist
	var buildOtherJs = gulp.src(['app/js/other/*.js']).pipe(gulp.dest('dist/js/other'));

	return merge([buildFiles, buildCss, buildLibs, buildCustomJs, buildOtherJs]);

});

gulp.task('inject-build-unminify', function () {
	var paths = {
		html: './dist/*.html',
		head: './dist/css/head.css',
		main: ['./dist/css/fonts.css', './dist/css/main.css', './dist/css/media.css'],
		libs: ['./dist/libs/jquery/dist/*', './dist/libs/**/dist/*'],
		custom: ['./dist/js/common.js'],
		other: ['./dist/js/other/*.js'],
		out: 'dist/'
	};

	var name = function (name) {
		return {ignorePath: 'dist', addRootSlash: false, name: name};
	}

	var target = gulp.src(paths.html);

	return target
	.pipe(inject(gulp.src(paths.head, {read: false}), name('head')))
	.pipe(inject(gulp.src(paths.main, {read: false}), name('main')))
	.pipe(naturalSort())
	.pipe(inject(gulp.src(paths.libs, {read: false}), name('libs')))
	.pipe(naturalSort())
	.pipe(inject(gulp.src(paths.custom, {read: false}), name('custom')))
	.pipe(naturalSort())
	.pipe(inject(gulp.src(paths.other, {read: false}), name('other')))
	.pipe(gulp.dest(paths.out));
});