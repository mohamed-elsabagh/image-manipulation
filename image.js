#!/usr/bin/node

var gm;
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var constants = require('./constants');
var async = require('async');
if (constants.useImagemagick) {
    gm = require('gm');
} else {
    gm = require('gm').subClass({
        imageMagick: true
    });
}

const xxxhdpiDir = './drawable-xxxhdpi';
const xxhdpiDir = './drawable-xxhdpi';
const xhdpiDir = './drawable-xhdpi';
const hdpiDir = './drawable-hdpi';
const mdpiDir = './drawable-mdpi';
const imagesDir = './images/';

// Create folders if not exist before
if (!fs.existsSync(xxxhdpiDir)) {
    fs.mkdirSync(xxxhdpiDir);
}
if (!fs.existsSync(xxhdpiDir)) {
    fs.mkdirSync(xxhdpiDir);
}
if (!fs.existsSync(xhdpiDir)) {
    fs.mkdirSync(xhdpiDir);
}
if (!fs.existsSync(hdpiDir)) {
    fs.mkdirSync(hdpiDir);
}
if (!fs.existsSync(mdpiDir)) {
    fs.mkdirSync(mdpiDir);
}
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

var imageName = 'ic_support';
var extension = '.png';

console.log('***********************************************');
console.log('******* This is example of input format *******');
console.log('***********************************************');
console.log('imageName = ic_support     hint: if you leave the image name empty all images in the folder will be converted');
console.log('extension = .png');
console.log('xxxhdpiSize = 500');
console.log('xxhdpiSize = 375');
console.log('xhdpiSize = 250');
console.log('hdpiSize = 187');
console.log('mdpiSize = 125');

var finalResult;
//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get([{
    name: 'imageName',
    required: false
}, {
    name: 'extension',
    required: false
}, {
    name: 'xxxhdpiSize',
    required: false
}, {
    name: 'xxhdpiSize',
    required: false
}, {
    name: 'xhdpiSize',
    required: false
}, {
    name: 'hdpiSize',
    required: false
}, {
    name: 'mdpiSize',
    required: false
}], function(err, result) {
    //
    // Log the results.
    //
    if (result.imageName == null || result.imageName === '') {
        console.log('All images in the folder will be converted');
    }

    if (result.extension == null || result.extension === '') {
        console.log('default extension will be used ' + constants.defaultExtension);
        result.extension = constants.defaultExtension;
    }

    if (result.xxxhdpiSize == null || result.xxxhdpiSize === '') {
        console.log('default xxxhdpiSize will be used ' + constants.defaultXxxhdpi);
        result.xxxhdpiSize = constants.defaultXxxhdpi;
    }

    if (result.xxhdpiSize == null || result.xxhdpiSize === '') {
        console.log('default xxhdpiSize will be used ' + constants.defaultXxhdpi);
        result.xxhdpiSize = constants.defaultXxhdpi;
    }

    if (result.xhdpiSize == null || result.xhdpiSize === '') {
        console.log('default xhdpiSize will be used ' + constants.defaultXhdpi);
        result.xhdpiSize = constants.defaultXhdpi;
    }

    if (result.hdpiSize == null || result.hdpiSize === '') {
        console.log('default hdpiSize will be used ' + constants.defaultHdpi);
        result.hdpiSize = constants.defaultHdpi;
    }

    if (result.mdpiSize == null || result.mdpiSize === '') {
        console.log('default mdpiSize will be used ' + constants.defaultMdpi);
        result.mdpiSize = constants.defaultMdpi;
    }

    var fileNameArray = [];

    if (result.imageName == null || result.imageName === '') {
        fileNameArray = fs.readdirSync(imagesDir);
    } else {
        fileNameArray.push(path.join(__dirname, imagesDir + result.imageName + result.extension));
    }

    finalResult = result;

    async.forEachSeries(fileNameArray, iteratorFile,
        doneIteratingFile);
});

var iteratorFile = function(fileName, done) {
    console.log('Now processing file ' + fileName);
    var xxxhdpiWriteDir = path.join(__dirname, xxxhdpiDir);
    xxxhdpiWriteDir = path.join(xxxhdpiWriteDir, fileName);
    var requiredFile = path.join(imagesDir, fileName);
    gm(requiredFile).resize(finalResult.xxxhdpiSize, finalResult.xxxhdpiSize).noProfile()
        .write(xxxhdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success xxxhdpi');
                var xxhdpiWriteDir = path.join(__dirname, xxhdpiDir);
                xxhdpiWriteDir = path.join(xxhdpiWriteDir, fileName);
                gm(requiredFile).resize(finalResult.xxhdpiSize, finalResult.xxhdpiSize).noProfile()
                    .write(xxhdpiWriteDir, function(err) {
                        if (!err) {
                            console.log('Success xxhdpi');
                            var xhdpiWriteDir = path.join(__dirname, xhdpiDir);
                            xhdpiWriteDir = path.join(xhdpiWriteDir, fileName);
                            gm(requiredFile).resize(finalResult.xhdpiSize, finalResult.xhdpiSize).noProfile()
                                .write(xhdpiWriteDir, function(err) {
                                    if (!err) {
                                        console.log('Success xhdpi');
                                        var hdpiWriteDir = path.join(__dirname, hdpiDir);
                                        hdpiWriteDir = path.join(hdpiWriteDir, fileName);
                                        gm(requiredFile).resize(finalResult.hdpiSize,
                                           finalResult.hdpiSize).noProfile()
                                            .write(hdpiWriteDir, function(err) {
                                                if (!err) {
                                                    console.log('Success hdpi');
                                                    var mdpiWriteDir = path.join(__dirname, mdpiDir);
                                                    mdpiWriteDir = path.join(mdpiWriteDir, fileName);
                                                    gm(requiredFile).resize(finalResult.mdpiSize,
                                                            finalResult.mdpiSize).noProfile()
                                                        .write(mdpiWriteDir, function(err) {
                                                            if (!err) {
                                                                console.log('Success mdpi');
                                                            } else {
                                                                console.log('Failure mdpi');
                                                            };
                                                            done();
                                                        });
                                                } else {
                                                    console.log('Failure hdpi');
                                                    done();
                                                };
                                            });
                                    } else {
                                        console.log('Failure xhdpi');
                                        done();
                                    };
                                });
                        } else {
                            console.log('Failure xxhdpi');
                            done();
                        };
                    });
            } else {
                console.log('Failure xxxhdpi');
                done();
            };
        });
}

var doneIteratingFile = function(err) {
    if (err) {
        console.log('Error = ' + err);
    } else {
        console.log('No Errors');
    }
}
