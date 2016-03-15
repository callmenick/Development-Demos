(function() {
  'use strict'

  /**
   * Requirements
   */
  var gulp = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var browserSync = require('browser-sync').create();
  var cssmin = require('gulp-cssmin');
  var jshint = require('gulp-jshint');
  var notify = require('gulp-notify');
  var rename = require('gulp-rename');
  var sass = require('gulp-sass');
  var stylish = require('jshint-stylish');

  /**
   * Paths
   */
  var paths = {
    styles: ['styles/**/*.scss'],
    scripts: ['js/src/**/*.js']
  };

  /**
   * Styles
   */
  gulp.task('styles', function() {
    return gulp.src(paths.styles)
      .pipe(sass({
        outputStyle: 'expanded'
      }))
      .on('error', notify.onError({
        title: 'Error compiling Sass',
        message: 'Check the console for info'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('css'))
      .pipe(cssmin())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest('css'));
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
   * Serve task
   */
  gulp.task('serve', ['styles', 'lint'], function() {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });

    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['lint']);
    gulp.watch('./*.html').on('change', browserSync.reload);
  });

  /**
   * Default task
   */
  gulp.task('default', ['styles', 'lint']);
})();
