Promise = require('promise');

var Execution = require('./../models/Execution');

var FileService = require('./FileService');
var CypressService = require('./CypressService');
var ResembleService = require('./ResembleService');
var UtilsService = require('./UtilsService');

var ExecutionService = {};

var saveExecution = execution => {
    return new Promise((resolve, reject) => {
        console.log(`ExecutionService saveExecution start`);
        execution.save((err, newExecution) => {
            if (err) reject(err);
            resolve(newExecution);
        });
    });
};

ExecutionService.createExecution = (execution) => {
    return new Promise((resolve, reject) => {
        var timestamp = (new Date()).getTime();
        var execution = new Execution({
            insertionDate: new Date(),
            timestamp: timestamp,
            beforeImgUri: `public/images/${timestamp}/T1-before.png`,
            afterImgUri: `public/images/${timestamp}/T1-after.png`
        });
        FileService.cleanScrennshotFolder()
            .then(() => CypressService.execute('cypress/integration/randomColorTest.js'))
            .then(() => FileService.copyScreenshotFolder(timestamp))
            .then(() => ResembleService.compare(execution))
            .then(data => execution = data)
            .then(() => saveExecution(execution))
            .then(newExecution => resolve(newExecution))
            .catch(err => reject(err));
    });
};

module.exports = ExecutionService;