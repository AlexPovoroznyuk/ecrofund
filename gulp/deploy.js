/* Build */
var gulp = require('gulp'),
    runSequence = require('run-sequence').use(gulp);

gulp.task('deploy', function(callback) {
    runSequence(
        'deploy-clean',
        'deploy-html',
        'deploy-js',
        'deploy-png-sprite',
        'deploy-images',
        'deploy-svg',
//        'svg-sprite',
        'deploy-fonts',
        'deploy-css',
        'deploy-txt',
        callback
    )
});
