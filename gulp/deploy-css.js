var gulp = require('gulp'),
    config = require('./config'),
    deployConf = require('../deploy.conf'),
    replace = require('gulp-replace'),
    postcss = require('gulp-postcss'),
    postcssCssnext = require('postcss-cssnext'),
    postcssMqpacker = require('css-mqpacker'),
    postcssImport = require('postcss-import'),
    postcssScss = require('postcss-scss'),
    postcssSprites = require('postcss-sprites'),
    postcssFontpath = require('postcss-fontpath'),
    postcssNested = require('postcss-nested'),
    postcssCssnano = require('cssnano'),
    postcssStylelint = require('stylelint'),
    postcssReporter = require('postcss-reporter'),
    postcssUrl = require('postcss-url'),
    sortCssMQ = require('sort-css-media-queries'),
    sourcemaps = require('gulp-sourcemaps'),
    newer = require('gulp-newer'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

gulp.task('deploy-css', function () {
    var processors = [
        postcssImport,
        postcssFontpath({checkFiles: false}),
        // postcssSprites,
        // postcssStylelint({ignoreFiles: 'vendor/**/*.css'}),
        postcssNested,
        postcssCssnext({
            browsers: config.autoprefix
        }),
        postcssMqpacker({
            sort: sortCssMQ
        }),
        postcssUrl({
            filter: '**/fonts/**/*',
            url: function(asset) {
                return asset.url.replace(/^\/?(.*)/, deployConf.assetsPath + '$1');
            }
        }),
        postcssCssnano,
        postcssReporter({ clearReportedMessages: true })
    ];

    gulp.src(config.pathTo.Src.MainCss)
        .pipe(plumber({
            errorHandler: function(error) {
                notify({
                    title: 'Scss Error',
                    message: error.msg
                }).write(error);
                gutil.log(gutil.colors.red(error.message));
                this.emit('end');
            }
        }))
        .pipe(newer(config.pathTo.Deploy.Css))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors, {parser: postcssScss}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.pathTo.Deploy.Css))
        .pipe(browserSync.reload({stream: true}));
});
