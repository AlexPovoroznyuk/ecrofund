/* Fonts */
var gulp = require('gulp'),
    config = require('./config'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

gulp.task('deploy-fonts', function() {
    return gulp.src(config.pathTo.Src.Fonts)
        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'Fonts Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        .pipe(newer(config.pathTo.Deploy.Fonts))
        .pipe(gulp.dest(config.pathTo.Deploy.Fonts))
        .pipe(reload({stream: true}));
});
