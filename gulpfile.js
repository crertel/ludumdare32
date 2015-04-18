var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del');

gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
                                     .pipe(jshint('.jshintrc'))
                                     .pipe(jshint.reporter('default'))
                                     .pipe(concat('main.js'))
                                     .pipe(gulp.dest('dist/assets/js'))
                                     .pipe(rename({suffix: '.min'}))
                                     .pipe(gulp.dest('dist/assets/js'))
                                     .pipe(notify({ message: 'Scripts task complete' }));
                                     });
