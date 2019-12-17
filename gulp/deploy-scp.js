/* JavaScript */
var gulp = require('gulp'),
    scp = require('gulp-scp2'),
    config = require('./config'),
    deployConf = require('../deploy.conf'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    fs = require('fs');
    notify = require('gulp-notify');

gulp.task('deploy-scp', function () {

    var frontConf = deployConf.front;

    if (frontConf.enabled) {
        return gulp.src(config.pathTo.Deploy.files)
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
            .pipe(scp({
                host: frontConf.host,
                username: frontConf.username,
                privateKey: fs.readFileSync(frontConf.privateKey).toString(),
                dest: frontConf.dest
            }))
            .on('error', function(err) {
                console.log(err);
            });
    }
});
