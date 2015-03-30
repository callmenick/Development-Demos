// require gulp
var gulp = require('gulp');

// require plugins
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

// js task
gulp.task('js', function() {
  return gulp.src('./js/src/*.js')
    .pipe(concat('demo.js'))
    .pipe(gulp.dest('./js/dist/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/dist/'))
    .pipe(notify('JS task complete.'));
});

// styles task
gulp.task('styles', function() {
  return sass('./sass', {
      style: 'expanded',
      noCache: true
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'));
});

// default task
gulp.task('default', ['js', 'styles', 'watch']);

// watcher
gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['js']);
  gulp.watch('./sass/*.scss', ['styles']);
});