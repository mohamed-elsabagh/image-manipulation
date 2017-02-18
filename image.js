#!/usr/bin/node

var gm;
var fs = require('fs');
var path = require('path');
var prompt = require('prompt');
var constants = require('./constants');
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

var imageName = 'ic_support';
var extension = '.png';

console.log('***********************************************');
console.log('******* This is example of input format *******');
console.log('***********************************************');
console.log('imageName = ic_support');
console.log('extension = .png');
console.log('xxxhdpiSize = 500');
console.log('xxhdpiSize = 375');
console.log('xhdpiSize = 250');
console.log('hdpiSize = 187');
console.log('mdpiSize = 125');

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get([{
    name: 'imageName',
    required: true
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

    const fileName = path.join(__dirname, result.imageName + result.extension);

    var xxxhdpiWriteDir = path.join(__dirname, xxxhdpiDir);
    xxxhdpiWriteDir = path.join(xxxhdpiWriteDir, result.imageName + result.extension);
    gm(fileName).resize(result.xxxhdpiSize, result.xxxhdpiSize).noProfile()
        .write(xxxhdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success');
            } else {
                console.log('Failure');
            };
        });

    var xxhdpiWriteDir = path.join(__dirname, xxhdpiDir);
    xxhdpiWriteDir = path.join(xxhdpiWriteDir, result.imageName + result.extension);
    gm(fileName).resize(result.xxhdpiSize, result.xxhdpiSize).noProfile()
        .write(xxhdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success');
            } else {
                console.log('Failure');
            };
        });

    var xhdpiWriteDir = path.join(__dirname, xhdpiDir);
    xhdpiWriteDir = path.join(xhdpiWriteDir, result.imageName + result.extension);
    gm(fileName).resize(result.xhdpiSize, result.xhdpiSize).noProfile()
        .write(xhdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success');
            } else {
                console.log('Failure');
            };
        });

    var hdpiWriteDir = path.join(__dirname, hdpiDir);
    hdpiWriteDir = path.join(hdpiWriteDir, result.imageName + result.extension);
    gm(fileName).resize(result.hdpiSize, result.hdpiSize).noProfile()
        .write(hdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success');
            } else {
                console.log('Failure');
            };
        });

    var mdpiWriteDir = path.join(__dirname, mdpiDir);
    mdpiWriteDir = path.join(mdpiWriteDir, result.imageName + result.extension);
    gm(fileName).resize(result.mdpiSize, result.mdpiSize).noProfile()
        .write(mdpiWriteDir, function(err) {
            if (!err) {
                console.log('Success');
            } else {
                console.log('Failure');
            };
        });
});
