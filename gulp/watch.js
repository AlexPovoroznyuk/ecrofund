/* Main watcher */
var gulp = require('gulp'),
    config = require('./config');

gulp.task('watch', ['webserver'],function() {
    gulp.watch(config.pathTo.Src.css, ['build-css']);
    gulp.watch(config.pathTo.Src.Html, ['build-html']);
    gulp.watch(config.pathTo.Src.Images, ['build-images']);
    //gulp.watch(config.pathTo.Src.PngSprite, ['png-sprite']);
    gulp.watch('bower.json', ['bower']);
    gulp.watch(config.pathTo.Src.Txt, ['build-txt']);
    gulp.watch(config.pathTo.Src.JS, ['build-js']);
    gulp.watch(config.pathTo.Src.Fonts, ['build-fonts']);
});
