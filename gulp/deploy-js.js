/* JavaScript */
var gulp = require('gulp'),
    config = require('./config'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    include = require('gulp-include'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

gulp.task('deploy-js', function () {
    var customJS = gulpFilter(config.pathTo.Src.JSCustom, {restore: true}),
        vendorJS = config.control.JSVendorBundleSource.length ? gulpFilter(config.control.JSVendorBundleSource, {restore: true}) : gulpFilter(config.pathTo.Src.JSVendor, {restore: true});

    return gulp.src(config.pathTo.Src.JS)
        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'JavaScript Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        // Get custom JS
        .pipe(customJS)
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(config.pathTo.Deploy.JSCustomBundle))
        .pipe(concat('custom-bundle.js'))
        .pipe(gulp.dest(config.pathTo.Deploy.JSCustomBundle))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.pathTo.Deploy.JSCustomBundle))
        .pipe(customJS.restore)
        // Get vendor JS
        .pipe(vendorJS)
        .pipe(include())
        .pipe(gulp.dest(config.pathTo.Deploy.JSVendor))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor-bundle.js'))
        .pipe(gulp.dest(config.pathTo.Deploy.JSVendorBundle))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.pathTo.Deploy.JSVendorBundle))
        .pipe(reload({stream: true}));
});
