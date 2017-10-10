'use strict';

// Load plugins
var gulp 					= require('gulp');
var sass 					= require('gulp-sass');
var stripdebug 		= require('gulp-strip-debug');
var uglify 				= require('gulp-uglify');
var concat 				= require('gulp-concat');
var autoprefixer 	= require('gulp-autoprefixer');
var notify 				= require('gulp-notify');
var plumber 			= require('gulp-plumber');
var gutil 				= require('gulp-util');
var watch					= require('gulp-watch');
var mediaQuery		= require('gulp-group-css-media-queries');
var minify        = require('gulp-minifier');
// var browsersync 	= require('browser-sync');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

var sassOptions = {
	outputStyle: 'compressed'
	//outputStyle: 'compact'
};

var autoprefixerOptions = {
	browsers: ['> 0%'],
	cascade: false
};

// // BrowserSync proxy
// gulp.task('browser-sync', function() {
// 	browsersync.init({
// 		proxy: 'localhost:80',
// 		port: 3000,
// 		startPath: '/crafton/santander-wnioski/_html/'
// 	});
// });
//
// // BrowserSync reload all Browsers
// gulp.task('browsersync-reload', function () {
// 	browsersync.reload();
// });

// CSS task
gulp.task('css', function() {
	return gulp.src([
		'./scss/*.scss'
	])
	.pipe( plumber({ errorHandler: onError }) )
	.pipe( sass( sassOptions ) )
	.pipe( autoprefixer( autoprefixerOptions ) )
	.pipe( mediaQuery() )
	.pipe( sass( sassOptions ) )
	.pipe( gulp.dest('./css/') )
	// .pipe( browsersync.reload({ stream:true }) );
	.pipe( notify({ message: 'CSS done!' }) );
});

// JS task
gulp.task('js', function() {
	return gulp.src([
		'./js/global.js',
    './js/lockScroll.js',
		'./js/isotope.pkgd.min.js',
		'./js/jquery-3.2.1.min.js',
		'./js/class/**/*.js'
	])
	.pipe( concat('main.js') )
	// .pipe( gulp.dest('../js') )
	// .pipe( stripdebug() )
  .pipe(minify({
    minify   : true,
    minifyJS : true
  }))
	.pipe( gulp.dest('./js') )
	.pipe( notify({ message: 'JS done!' }) );
});


// sync-watch task
// gulp.task('sync-watch', ['browser-sync'], function () {
// 	gulp.watch(['./scss/**/*'], ['css']);
// 	gulp.watch(['./js/**/*', '!./js/script.js'], ['js', 'browsersync-reload']);
// 	gulp.watch(['./**/*.php', './**/*.html', './**/*.svg', './**/*.jpg', './**/*.png'], ['browsersync-reload']);
// });

// watch task
gulp.task('watch', function () {
	gulp.watch(['./scss/**/*.scss'], ['css']);
	gulp.watch(['./js/**/*', '!./js/main.js'], ['js']);
});

// default tasks
gulp.task('default', ['css', 'js']);