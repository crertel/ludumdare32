var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.css')
                                    .pipe(concat('main.css'))
                                    .pipe(gulp.dest('static/css'))
                                    .pipe(rename({suffix: '.min'}))
                                    .pipe(gulp.dest('static/css'))
                                    .pipe(notify({ message: 'Styles task complete'}));
});

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
                                     .pipe(jshint('.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(concat('main.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['static/css', 'static/js'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles','scripts');
});
