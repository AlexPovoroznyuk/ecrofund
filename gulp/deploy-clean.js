/* Clean build directory */
var gulp = require('gulp'),
    config = require('./config'),
    del = require('del');

gulp.task('deploy-clean', function () {
    return del(config.pathTo.Deploy.Clean);
});
