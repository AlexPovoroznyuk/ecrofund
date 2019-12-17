/* BrowserSync local web server*/
var gulp = require('gulp'),
    config = require('./config'),
    browserSync = require("browser-sync");

gulp.task('webserver', function () {
    browserSync(config.browserSync);
});