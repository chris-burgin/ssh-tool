//Package Imports
  const gulp = require('gulp'),
      gutil = require('gulp-util'),
      rename = require('gulp-rename'),
      cssnano = require('gulp-cssnano'),
      changed = require('gulp-changed'),
      stylus = require('gulp-stylus');

//run 'gulp css'
gulp.task('stylus', function() {
    return gulp.src('src/css/*.styl')
    .pipe(stylus())
    .pipe(cssnano({
      'zindex' : false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));
});

gulp.task('realcss', function() {
    return gulp.src('src/css/external/*.css')
    .pipe(cssnano({
      'zindex' : false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css/external'));
});

gulp.task('css', ['stylus', 'realcss']);

//run 'gulp js'
gulp.task('js', function(callback) {
  return gulp.src('src/js/*.js')
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('public/js'));
});

// run 'gulp watch'
gulp.task('watch', function() {
    gulp.watch('src/css/**/*.styl', ['stylus']);
    gulp.watch('src/css/external/*.css', ['realcss']);
    gulp.watch('src/js/*.js', ['js']);
});

// Default gulp task that runs when you 'gulp'
gulp.task('default', ['css', 'js']);
