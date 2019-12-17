/* PNG Sprite */
var gulp = require('gulp'),
    config = require('./config'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    gutil = require('gulp-util'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');

gulp.task('build-png-sprite', function () {

    // Generate spritesheet
    var spriteData = gulp.src(config.pathTo.Src.PngSprite)
        .pipe(spritesmith({
            imgName: 'png-sprite.png',
            imgPath: '../img/sprite/png-sprite.png',
            padding: 1,
            cssName: '_png-sprite.scss',
            cssVarMap: function (sprite) {
                sprite.name = 'sprite__' + sprite.name;
            }
        }));

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(gulp.dest(config.pathTo.Build.PngSprite))
        .pipe(reload({stream: true}));

    // Pipe CSS stream onto disk
    spriteData.css
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        .pipe(gulp.dest(config.pathTo.Build.PngSpriteCSS))
        .pipe(reload({stream: true}));
});
