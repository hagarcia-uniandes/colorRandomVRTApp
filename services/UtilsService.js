var fs = require('fs');
var nrc = require('node-run-cmd');
Promise = require('promise');

var Utils = {};

Utils.readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (!err) resolve(data);
            else reject(err);
        });
    });
};

Utils.writeFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err)
            resolve();
        });
    });
};

Utils.copyFile = (source, target) => {
    console.log(`UtilsService copyFile start: source = ${source}, target = ${target}`);
    return new Promise((resolve, reject) => {
        fs.copyFile(source, target, (err) => {
            if (err) reject(err);
            resolve();
        });
    });
};

Utils.executeCommand = command => {
    return new Promise((resolve, reject) => {
        console.log(`UtilsService executeCommand start: command = ${command}`);
        nrc.run(command)
            .then(function (exitCodes) {
                console.log(`UtilsService executeCommand ends: exitCodes = ${exitCodes}`);
                resolve();
            }, function (err) {
                console.log(`UtilsService executeCommand ends: error = ${err}`);
                reject(err);
            });
    });
};

module.exports = Utils;