'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug2');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'pug'], function() {

    browserSync.init({
        server: "./",
        port: 4000
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('pug/**/*.pug', ['pug']);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

// Static Server without watching scss files
gulp.task('serve:lite', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('**/*.css').on('change', browserSync.reload);
    gulp.watch('**/*.pug').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('sass:watch', function () {
    gulp.watch('./scss/**/*.scss');
});

gulp.task('clean:dist', function () {
    return del(paths.dist);
});

gulp.task('copy:bower', function () {
    var files = mainBowerFiles(['**/*.js', '!**/*.min.js']);
    files.push('bower_components/sly/dist/sly.js');
    return gulp.src(files)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist+'/js/libs'));
});

gulp.task('copy:css', function() {
   gulp.src(['./css/**/*', '!./css/**/*.min.css'])
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(gulp.dest(paths.dist+'/css'));
});

gulp.task('copy:img', function() {
   return gulp.src('./images/**/*')
   .pipe(gulp.dest(paths.dist+'/images'));
});

gulp.task('copy:svg', function() {
   return gulp.src('./svg/**/*')
   .pipe(gulp.dest(paths.dist+'/svg'));
});

gulp.task('copy:fonts', function() {
   return gulp.src('./fonts/**/*')
   .pipe(gulp.dest(paths.dist+'/fonts'));
});

gulp.task('copy:js', function() {
   return gulp.src('./js/**/*.js')
   .pipe(uglify())
   // .pipe(rename({ suffix: '.min' }))
   .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('pug',function() {
 return gulp.src('pug/**/*.pug')
   .pipe(pug({ yourTemplate: 'Locals' }))
   .pipe(gulp.dest('./'))
   .pipe(browserSync.stream());
});

gulp.task('copy:html', function() {
   return gulp.src(['./**/*.html', '!./node_modules/**', '!./bower_components/**', '!./includes/**', '!./mixins/**', './**/*.php'])
   .pipe(gulp.dest(paths.dist+'/'));
});

gulp.task('replace:bower', function(){
    return gulp.src([
        './dist/*.html',
        './dist/**/*.js',
    ], {base: './'})
    // .pipe(replace('bower_components', 'js/libs'))
    .pipe(replace(/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, 'js/libs$1'))
    // .pipe(replace(/..\/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, '..\/js/libs$1'))
    // .pipe(replace(/..\/..\/bower_components+.+(\/[a-z0-9][^/]*\.[a-z0-9]+(\'|\"))/ig, '..\/..\/js/libs$1'))
    .pipe(gulp.dest('./'));
});

gulp.task('build:dist', function(callback) {
    runSequence('clean:dist', 'copy:bower', 'copy:css', 'copy:img', 'copy:svg', 'copy:fonts', 'copy:js', 'pug', 'copy:html', 'replace:bower', callback);
});

gulp.task('default', ['serve']);
