module.exports = {
    // Path settings
    control: {
        // sources for vendor-bundle here
        // set them manually to override normal behaviour
        JSVendorBundleSource: [
            //'src/js/vendor/jquery.lazyloadxt.js',
        ]

    },
    pathTo: {
        Src: {
            css: ['src/css/**/*.css', 'src/css/**/*.pcss'],
            MainCss: 'src/css/main.css',
            Html: 'src/html/**/*.html',
            folder: {
                JSVendor: 'src/js/vendor.js',
                CSSVendor: 'src/css/vendor/'
            },
            JSCustom: 'src/js/custom/**/*.*',
            JSVendor: 'src/js/vendor.js',
            Images: ['src/img/**/*.*', '!src/img/sprite/*.*'],
            PngSprite: 'src/img/sprite/**/*.png',
            Fonts: 'src/css/fonts/**/*',
            Txt: ['src/humans.txt', 'src/robots.txt', 'src/.htaccess'],
            Svg: ['src/svg/**/*.*', '!src/svg/sprite/*.*'],
            JS: 'src/js/**/*.*',

            //CSSVendor: 'src/scss/vendor/',
            SvgSprite: 'src/svg/sprite/**/*.svg',
            SvgSpriteTpl: 'src/scss/includes/_svg-sprite-sass.tpl'
        },
        Build: {
            Css: 'server/css',
            Html: 'server/',
            Clean: ['server/**/*', '!server/.gitignore'],
            JSCustomBundle: 'server/js',
            JSVendorBundle: 'server/js',
            JSVendor: 'server/js',
            JSCustom: 'server/js/custom',
            Images: 'server/img',
            Fonts: 'server/css/fonts',
            Txt: 'server/',
            PngSprite: 'server/img/sprite',
            PngSpriteCSS: 'src/scss/includes',
            Svg: 'server/svg',

            SvgSprite: 'dist/svg/sprite/svg-sprite.svg',
            SvgSpriteNoSvg: 'dist/svg/sprite/svg-sprite.png',
            SvgSpriteCSS: 'src/scss/includes/_svg-sprite.scss'
        },
        Deploy: {
            files: ['distribution/**/*.*', 'distribution/components'],
            Css: 'distribution/css',
            Html: 'distribution/',
            Clean: ['distribution/**/*', '!distribution/.gitignore'],
            JSCustomBundle: 'distribution/js',
            JSVendorBundle: 'distribution/js',
            JSVendor: 'distribution/js',
            JSCustom: 'distribution/js/custom',
            Images: 'distribution/img',
            Fonts: 'distribution/css/fonts',
            Txt: 'distribution/',
            PngSprite: 'distribution/img/sprite',
            PngSpriteCSS: 'src/scss/includes',
            Svg: 'distribution/svg',

            SvgSprite: 'dist/svg/sprite/svg-sprite.svg',
            SvgSpriteNoSvg: 'dist/svg/sprite/svg-sprite.png',
            SvgSpriteCSS: 'src/scss/includes/_svg-sprite.scss'
        }
    },

    // Browser versions for automatically prefix
    autoprefix: [
        "> 1%",
        "IE 11",
        "ios >= 8",
        "Android >= 4.4"
    ],

    // BrowserSync local web server settings
    browserSync: {
        server: './server',
        //serve both project distribution directories
        //server: ['./server', './build'],
        baseDir: './server',
        //disable user interface
        ui: false,
        //tunnel to *.localtunnel.me
        // tunnel: true,
        host: 'localhost',
        logPrefix: "Frontend",
        notify: false,
    }

};
