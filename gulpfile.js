
const {src, dest, series, parallel, watch} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const cacheBust = require('gulp-cache-bust');
sass.compiler = require('node-sass');

const origin = 'dev';
const destination = 'build';

function server() {
  browserSync.init({
    //notify: false,
    //open: false,
    server: {
      baseDir: origin
    }   
  })
}

async function clean() {
  await del(destination);
}

function imageSquash(cb) {
  src(`${origin}/images/*`)
  .pipe(imagemin({verbose: true}))
  .pipe(dest(`${destination}/images`))
  cb();
}

function concatenate(cb) {
  src(`${origin}/**/*.html`)
  .pipe(useref()) // concatenation
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(cacheBust({type: 'timestamp'}))
  .pipe(dest(destination));

  cb();
}

function css(cb) {
  src(`${origin}/scss/**/*.scss`)
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer())
  .pipe(dest(`${origin}/css`));
  cb();
}

function watcher(cb) {
  server();
  watch(`${origin}/**/*.html`).on('change', series(browserSync.reload))
  watch(`${origin}/**/*.scss`).on('change', series(css, browserSync.reload))
  watch(`${origin}/**/*.js`).on('change', series(browserSync.reload))
  cb();
}

exports.imageSquash = imageSquash;
exports.concatenate = concatenate;
exports.serve = server;
exports.css = css;
exports.watcher = watcher;
exports.clean = clean;
exports.build = series(clean, css, concatenate, imageSquash);
