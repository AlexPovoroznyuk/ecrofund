/* Images */
var gulp = require('gulp'),
    config = require('./config'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    jpegoptim = require('imagemin-jpegoptim'),
    reload = browserSync.reload,
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');


gulp.task('deploy-images', function () {
    return gulp.src(config.pathTo.Src.Images)

        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'Images Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        .pipe(newer(config.pathTo.Deploy.Images))
        .pipe(imagemin({
            progressive: true,
            optimizationLevel: 7,
            use: [pngquant(),jpegoptim({max: 61})],
            interlaced: true
        }))
        .pipe(gulp.dest(config.pathTo.Deploy.Images))
        .pipe(reload({stream: true}));
});
