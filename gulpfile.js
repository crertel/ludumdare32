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

gulp.task('scripts-defs', function() {
    return gulp.src('src/scripts/defs/**/*.js')
                                     .pipe(jshint('.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(concat('main-defs.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('scripts-client', function() {
    return gulp.src('src/scripts/client/**/*.js')
                                     .pipe(jshint('.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(concat('main-client.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('scripts-server', function() {
    return gulp.src('src/scripts/server/**/*.js')
                                     .pipe(jshint('.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(concat('main-server.js'))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('static/js'))
                                     .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['static/css', 'static/js'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles','scripts-defs', 'scripts-client', 'scripts-server');
});
