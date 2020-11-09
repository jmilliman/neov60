// const { src, dest, series, parallel, watch } = require('gulp');
// const del = require('del');
// const browserSync = require('browser-sync').create();

const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const useref = require('gulp-useref');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const browserSync = require('browser-sync').create();

const origin = 'dev';
const destination = 'build';


async function clean(cb) {
  await del(destination);
  await del(`${origin}/css`);
  cb();
}

function html(cb) {
  src(`${origin}/**/*.html`).pipe(dest(destination));
  cb();
}

function css(cb) {
  src(`${origin}/scss/**/*.scss`)
  .pipe(sass())
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(dest(`${origin}/css`));
  cb();
}

function uref(cb) {
  src(`${origin}/**/*.html`)
  .pipe(useref())
  .pipe(gulpIf("*.js", uglify()))
  .pipe(gulpIf("*.css", cssnano()))
  .pipe(dest(destination));
  cb();
}

function watch(cb) {
  watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload));
  watch(`${origin}/**/*.scss`).on('change', series(css, browserSync.reload));
  watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload));
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,

    server: {
      baseDir: origin
    }
  })
  cb();
}

exports.html = html;
exports.css = css;
exports.clean = clean;
exports.uref = uref;
exports.sass = sass;
exports.autoprefixer = autoprefixer;
exports.cssnano = cssnano;
exports.uglify = uglify;
exports.gulpIf = gulpIf;
exports.watch = watch;
exports.server = server;

exports.default = series(clean, parallel( css, uref, js), server, watch);




















// function js(cb) {
//   src(`${origin}/js/**/*.js`).pipe(dest(`${destination}/js`));
//   cb();
// }

// exports.default = series(clean, parallel(html, css, js), server, watcher);

// var gulp = require("gulp");
// var sass = require("gulp-sass");
// var browserSync = require("browser-sync").create();
// var useref = require("gulp-useref");
// var uglify = require("gulp-uglify");
// var gulpIf = require("gulp-if");
// var cssnano = require("gulp-cssnano");
// var del = require("del");
// var runSequence = require("run-sequence");
// var imagemin = require("gulp-imagemin");
// var cache = require("gulp-cache");
// var autoprefixer = require("gulp-autoprefixer");
// var cacheBuster = require("gulp-cache-bust");
// var sourcemaps = require("gulp-sourcemaps");

// //var mamp = require('gulp-mamp');
// //var options = {};
// //options.port = 3000;
// //options.site_path = '~/documents/dev/projects/neov40/dev';
// //
// //
// //// Start MAMP
// ////options.site_path = '~/documents/dev/projects/neov40';
// //
// //gulp.task(options, 'config', function(cb) {
// //  mamp(options, 'config', cb);
// //});
// //
// //gulp.task('start', function(cb) {
// //  mamp(options, 'start', cb);
// //  });
// //
// //gulp.task('stop', function(cb) {
// //  mamp(options, 'stop', cb);
// //  });
// //
// //gulp.task('mamp', ['start']);
// //

// gulp.task("clean-dist", function () {
//   return del.sync("dist");
// });

// gulp.task("sass", function () {
//   return (
//     gulp
//       .src("dev/scss/**/*.scss")
//       //.pipe(sourcemaps.init())
//       .pipe(sass())
//       .pipe(
//         autoprefixer({
//           browsers: ["last 2 versions"],
//           cascade: false
//         })
//       )
//       //.pipe(sourcemaps.write('../maps'))
//       .pipe(gulp.dest("dev/css"))
//       .pipe(browserSync.reload({ stream: true }))
//   );
// });

// gulp.task("browserSync", function () {
//   var files = ["./*.css", "./*.php", "./*.html"];

//   browserSync.init({
//     proxy: "localhost:3000",
//     proxy: "neov50.local"
//   });
// });

// gulp.task("images", function () {
//   return gulp
//     .src("dev/images/**.+(png|jpg|gif|svg)")
//     .pipe(cache(imagemin()))
//     .pipe(gulp.dest("dist/images"));
// });

// gulp.task("useref", function () {
//   return gulp
//     .src("dev/*.html")
//     .pipe(useref())
//     .pipe(sourcemaps.init())
//     .pipe(gulpIf("*.js", uglify()))
//     .pipe(gulpIf("*.css", cssnano()))
//     .pipe(sourcemaps.write("../maps"))
//     .pipe(gulp.dest("dist"));
// });

// gulp.task("copyphp", function () {
//   return gulp.src("dev/*.php").pipe(gulp.dest("dist"));
// });

// gulp.task("build", function (callback) {
//   runSequence("clean-dist", ["sass", "useref", "copyphp", "images"], callback);
// });

// gulp.task("watch", ["browserSync", "sass"], function () {
//   gulp.watch("dev/scss/**/*.scss", ["sass"]);
//   gulp.watch("dev/*.html", browserSync.reload);
//   gulp.watch("dev/**/*.php", browserSync.reload);
//   gulp.watch("dev/scripts/**/*.js", browserSync.reload);
// });

// gulp.task("bust", function () {
//   return gulp
//     .src("./dist/**/*.html")
//     .pipe(
//       cacheBuster({
//         type: "timestamp"
//       })
//     )
//     .pipe(gulp.dest("./cachebusted"));
// });
