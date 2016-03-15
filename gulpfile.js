(function() {

  'use strict'

  /**
   * Requirements
   */
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var jshint = require('gulp-jshint');
  var notify = require("gulp-notify");
  var sass = require('gulp-sass');
  var stylish = require('jshint-stylish');

  /**
   * Paths
   */
  var paths = {
    sass: ['./sass/**/*.scss'],
    scripts: ['./js/src/**/*.js']
  };

  /**
   * Styles
   */
  gulp.task('styles', function() {
    return gulp.src(paths.sass)
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .on('error', notify.onError({
        title: 'Error compiling Sass',
        message: 'Check the console for info'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('./css'));
  });

  /**
   * Scripts linting
   */
  gulp.task('lint', function() {
    return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });

  /**
   * Watch task
   */
  gulp.task('watch', ['styles', 'lint'], function() {
    gulp.watch(paths.sass, ['styles']);
    gulp.watch(paths.scripts, ['lint']);
  });

  /**
   * Default task
   */
  gulp.task('default', ['styles', 'lint']);

})();
