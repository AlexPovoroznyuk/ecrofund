'use strict';

let emmet = require('emmet');
let fs = require('fs');

const config = {
    path: {
        src: {
            htmlPages: 'src/html',
            htmlComponents: 'src/html/components',
            cssComponents: 'src/css/components',
            cssMainFile: 'src/css/main.css'
        }
    },
    prefixes: {
        html: '_',
        css: '_'
    }

};

let templates = {
    htmlInclude: function (filename) {
        return `@@include('./components/${filename}')\n`;
    },
    cssInclude: function (filename) {
        return `@import "components/${filename}";\n`;
    }
};

let components = {
    header: {
        filename: 'header',
        content: 'header.main-header-block'
    },
    firstScreen: {
        filename: 'first-screen-block',
        content: 'section.first-screen-block>.container.text-center>h1+p+.row>.col-md-auto.factoid-item*3>span.factoid-before+p.highlight.factoid-accent+p',
    },
    caseBlockPatentus: {
        filename: 'case-block-patentus',
        content: 'section.case-block.case-patentus-block>.container>.row>.col-auto>.case-image-container>img^^.col-lg-3.case-content>header>h2+p+.badges>span.badge.badge-secondary*3^^+p+a.btn.btn-primary',
    },
    caseBlockStroyfrost: {
        filename: 'case-block-stroyfrost',
        content: 'section.case-block.case-stroyfrost-block>.container>.row>.col-auto>.case-image-container>img^^.col-lg-3.case-content>header>h2+p+.badges>span.badge.badge-secondary*3^^+p+a.btn.btn-primary',
    },
    caseBlockGmk: {
        filename: 'case-block-gmk',
        content: 'section.case-block.case-gmk-block>.container>.row>.col-auto>.case-image-container>img^^.col-lg-3.case-content>header>h2+p+.badges>span.badge.badge-secondary*3^^+p+a.btn.btn-primary',
    },
    caseBlockEmpty: {
        filename: 'case-block-dummy',
        content: 'section.case-block>img',
    },
    calcBlock: {
        filename: 'calc-screen-block',
        content: 'section.calc-screen-block>.container',
    },
    howMuchCostBlock: {
        filename: 'cost-screen-block',
        content: 'section.cost-screen-block>.container.text-center>h2+p',
    },
    taxBlock: {
        filename: 'tax-screen-block',
        content: 'section.tax-screen-block>.container>header.tax-screen-header',
    },
    ctaPhoneBlock: {
        filename: 'cta-phone-block',
        content: 'section.cta-phone-block>.container.text-center>a.cta-phone+p+a.btn.btn-primary',
    },
    footerBlock: {
        filename: 'footer-block',
        content: 'footer.main-footer-block>.container',
    },
};

let pageStructure = [{
    filename: 'index.html',
    components: [
        components.header,
        components.firstScreen,
        components.caseBlockPatentus,
        components.caseBlockStroyfrost,
        components.caseBlockGmk,
        components.caseBlockEmpty,
        components.calcBlock,
        components.howMuchCostBlock,
        components.taxBlock,
        components.ctaPhoneBlock,
        components.footerBlock
    ],
}];

function expandContent(data) {
    return data ? emmet.expandAbbreviation(data, 'html').replaceAll('${0}', '') : '';
}

function createComponentFile(file, data) {
    fs.open(file, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(file + ' already exists');
                return;
            }

            throw err;
        }

        fs.write(fd, data, (err) => {
            if (err) {

                throw err;
            }
        });
    });
}

function createFileName(filename, filetype) {
    let objects = [
        checkHtml(filetype) ? config.path.src.htmlComponents : config.path.src.cssComponents,
        '/',
        checkHtml(filetype) ? config.prefixes.html : config.prefixes.css,
        filename,
        checkHtml(filetype) ? '.html' : '.pcss'
    ];

    return objects.join('');
}

function checkHtml(str) {
    return str === 'html'
}

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.split(search).join(replacement);
};

for (let key in components) {

    createComponentFile(createFileName(components[key].filename, 'html'), expandContent(components[key].content));
    createComponentFile(createFileName(components[key].filename, 'css'), '');

    fs.appendFile(config.path.src.cssMainFile, templates.cssInclude(config.prefixes.css + components[key].filename + '.pcss'), (err) => {
        if (err) throw err;
    });
}

pageStructure.forEach((item) => {
    let includes = '\n' + item.components.map((item) => {
        return templates.htmlInclude(config.prefixes.html + item.filename + '.html');
    }).join('');

    fs.appendFile(config.path.src.htmlPages + '/' + item.filename, includes, (err) => {
        if (err) throw err;
    });
});