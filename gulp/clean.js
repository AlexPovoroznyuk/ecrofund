/* Clean build directory */
var gulp = require('gulp'),
    config = require('./config'),
    del = require('del');

gulp.task('clean-server', function () {
    return del(config.pathTo.Build.Clean);
});
