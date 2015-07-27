/**
 * Gulpfile.js - Concise builder
 *
 * (c) 2014 Contributors.
 * Released under the MIT license.
 */


'use strict';


/**
 * Dependencies
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var size = require('gulp-size');
//var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();

/**
 * Constants
 */

var AUTOPREFIXER_BROWSERS = [
  'chrome >= 30',
  'ie >= 8',
  'ff >= 24',
  'safari >= 6',
  'opera >= 12',
  'ios >= 6',
  'android 2.3',
  'android >= 4',
  'ie_mob >= 9'
];

/**
 * Distribute SCSS and CSS files
 */

// CSS
gulp.task('dist:css', function () {
  	return gulp.src('src/scss/pure-drawer.scss')
    .pipe(sass({
      	errLogToConsole: true,
      	outputStyle: 'expanded',
      	precision: 5,
    }))
    .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/css'))
    //.pipe(size({ title: 'dist:css' }))
});

gulp.task('copy:scss', function() {
    gulp.src('src/scss/pure-drawer/**/*')
    .pipe(gulp.dest('./dist/scss'));
});

gulp.task('dist', ['dist:css', 'copy:scss']);

/**
 * Minify
 */

// CSS
gulp.task('minify:css', function () {
  return gulp.src('dist/css/pure-drawer.css')
    .pipe($.csso())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'dist:min:css' }))
});

gulp.task('minify', ['minify:css']);

/**
 * Watch for changes
 */

gulp.task('watch', function () {
  	gulp.watch('site/scss/**/*.scss', ['dist:css']);
});

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/scss/**/*.scss", ['sass'], browserSync.reload());
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/scss/app.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

/**
 * Default
 */

gulp.task('default', ['dist', 'minify']);
gulp.task('run', ['server']);