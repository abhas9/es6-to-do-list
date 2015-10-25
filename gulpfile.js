var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require("gulp-babel");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require("babelify");
gulp.task('clean', function() {
    return gulp.src('build/*', {
        read: false
    }).pipe(clean());
});
gulp.task('movestatic', function() {
    gulp.src(['src/**/*.{html,css,js}', 'src/*.{html,css,js}']).pipe(gulp.dest('./build'));
});
gulp.task('babelify', function() {
    browserify('./src/js/main.js').transform(babelify).bundle().pipe(source('main.js')).pipe(gulp.dest('./build/js/'));
});
gulp.task('watch', function() {
    gulp.watch(['src/**/*.{html,css,js}', 'src/*.{html,css,js}'], ['movestatic', 'babelify']);
});
gulp.task('default', ['movestatic', 'babelify']);