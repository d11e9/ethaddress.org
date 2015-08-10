var gulp = require('gulp');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concatCSS = require('gulp-concat-css');
var mainBowerFiles = require('main-bower-files');
var flatten = require('gulp-flatten');

var getFileGlobs = function () {
    return ['src/lib/*.js'].concat(mainBowerFiles()).concat(['src/*.js']);
};
var allFiles = getFileGlobs();

gulp.task('watch', function () {
  gulp.watch(allFiles, ['build']);
});

gulp.task('build', function () {
  allFiles = getFileGlobs();
  var jsFilter = filter('*.js', {restore: true});
  var cssFilter = filter('*.css', {restore: true});
  var fontFilter = filter(['*.eot', '*.woff', '*.svg', '*.ttf']); 

  return gulp.src(allFiles)
    .pipe(jsFilter)
    .pipe(concat('all.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./build'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(concatCSS('all.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build'))
    .pipe(cssFilter.restore)
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest('./build/fonts'));
});
