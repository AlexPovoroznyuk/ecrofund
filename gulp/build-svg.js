/* SVG */
var gulp = require('gulp'),
    config = require('./config'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('build-svg', function () {
    return gulp.src(config.pathTo.Src.Svg)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(newer(config.pathTo.Build.Svg))
        .pipe(gulp.dest(config.pathTo.Build.Svg))
        .pipe(reload({stream: true}));
});
