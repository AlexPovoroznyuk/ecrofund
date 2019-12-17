'use strict';

let fs = require('fs');

const config = {
    path: {
        src: {
            cssFontsFolder: 'src/css/fonts',
            cssFontsFile: 'src/css/components/__fonts.css',
            cssMainFile: 'src/css/main.css'
        }
    }

};

let templates = {
    header: fontName => `
        /* ${fontName} */
    `,
    fontFace: (fontName, fontPath, fontStyle, fontWeight) => `
        @font-face {
            font-family: "${fontName}";
            font-style: ${fontStyle};
            font-weight: ${fontWeight};
            font-path: "${fontPath}";
        }
    `,
};

let styleSections = {
    data: {},
    push: function (file, dir, path) {
        if (this.data[dir]) {
            this.data[dir].appendFile(file);
        } else {
            this.data[dir] = getNewFontPackObject(path)
        }
    },
    getData: function () {
        return Object.keys(this.data).map(key => {
            return {
                fontFamily: key,
                path: this.data[key].pathTo,
                fontStyles: this.data[key].getStyles()
            }
        })
    }
};

function getFontWeight(fontName) {
    if (
        new RegExp('thin', 'i').test(fontName) ||
        new RegExp('hairline', 'i').test(fontName)
    ) {
        return 100;
    } else if (
        new RegExp('((extra)|(ultra))[\\s\\-_]?light', 'i').test(fontName)
    ) {
        return 200;
    } else if (new RegExp('light', 'i').test(fontName)) {
        return 300;
    } else if (new RegExp('(normal)|(regular)', 'i').test(fontName)) {
        return 400;
    } else if (new RegExp('medium', 'i').test(fontName)) {
        return 500;
    } else if (new RegExp('((semi)|(demi))[\\s\\-_]?bold', 'i').test(fontName)) {
        return 600;
    } else if (new RegExp('bold', 'i').test(fontName)) {
        return 700;
    } else if (new RegExp('((extra)|(ultra))[\\s\\-_]?bold', 'i').test(fontName)) {
        return 800;
    } else if (new RegExp('(black)|(heavy)', 'i').test(fontName)) {
        return 900;
    } else {
        return 400;
    }
}

function getFontStyle(fontName) {
    if (new RegExp('(italic)|(oblique)', 'i').test(fontName)) {
        return 'italic';
    } else {
        return 'normal';
    }
}

function getNewFontPackObject(path) {
    return {
        pathTo: path.replace('src/', '/'),
        fontStyles: {},
        appendFile: function (filename) {
            let file = filename.split('.');

            if (this.fontStyles[file[0]]) {
                this.fontStyles[file[0]].pushExtension(file.splice(-1)[0]);
            } else {
                this.fontStyles[file[0]] = getNewFontStyleObject(file[0]);
            }
        },
        getStyles: function () {
            return Object.keys(this.fontStyles).map(key => {
                return {
                    filename: key,
                    extensions: this.fontStyles[key].extensions
                }
            })
        }
    }
}

function getNewFontStyleObject(filename) {
    return {
        extensions: [filename],
        pushExtension: function (extension) {
            this.extensions.push(extension);
        }
    };

}

function processFontFolder(path, folderName) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, function (err, files) {
            // Return the error if something went wrong
            if (err)
                return action(err);

            files.forEach(file => {
                styleSections.push(file, folderName, path)
            });

            resolve();
        });
    });
}

fs.readdir(config.path.src.cssFontsFolder, function (err, files) {
    // Return the error if something went wrong
    if (err)
        return action(err);

    let dir = config.path.src.cssFontsFolder;
    let p = [];

    files.forEach(file => {

        p.push(new Promise((resolve, reject) => {
            let path = dir + "/" + file;
            // Get the file's stats
            fs.stat(path, function (err, stat) {

                // If the file is a directory
                if (stat && stat.isDirectory()) {
                    processFontFolder(path, file)
                        .then(() => {
                            resolve();
                        });
                } else {
                    resolve();
                }
            });
        }));
    });

    let out = '';

    Promise.all(p).then(() => {
        styleSections.getData().forEach(fontFamilyData => {
            out += templates.header(fontFamilyData.fontFamily);

            fontFamilyData.fontStyles.forEach(item => {
                out += templates.fontFace(
                    fontFamilyData.fontFamily,
                    fontFamilyData.path + '/' + item.filename,
                    getFontStyle(item.filename),
                    getFontWeight(item.filename)
                );
            })
        });

        fs.open(config.path.src.cssFontsFile, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error(file + ' already exists');
                    return;
                }

                throw err;
            }

            fs.write(fd, out, (err) => {
                if (err) {

                    throw err;
                }

                fs.close(fd, (err) => {
                    if (err) throw err;
                });
            });
        });
    });
});
