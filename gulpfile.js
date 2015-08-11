var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concatCSS = require('gulp-concat-css');
var mainBowerFiles = require('main-bower-files');
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');
var rm = require('gulp-rm');

var getFileGlobs = function () {
    return ['src/lib/*.js'].concat(mainBowerFiles()).concat(['src/controllers/*.js', 'src/*.js', 'src/css/*.css']);
};
var allFiles = getFileGlobs();

gulp.task('watch', function () {
  gulp.watch(allFiles, ['build']);
});

gulp.task('clean', function () {
  return gulp.src(['build/**/*'], {read: false}).pipe(rm());
});

gulp.task('hint', function () {
  return gulp.src(['src/*.js', 'src/**/*.js', '!src/lib', '!src/lib/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', ['clean', 'hint'], function () {
  allFiles = getFileGlobs();
  var jsFilter = filter('*.js', {restore: true});
  var cssFilter = filter('*.css', {restore: true});
  var fontFilter = filter(['*.eot', '*.woff', '*.woff2', '*.svg', '*.ttf']); 

  return gulp.src(allFiles)
    .pipe(jsFilter)
    .pipe(concat('all.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./build'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concatCSS('all.css'))
    .pipe(replace(/font\/[^\/]+/ig, './build/fonts'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build'))
    .pipe(cssFilter.restore)
    .pipe(fontFilter)
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('default', ['build', 'watch']);
