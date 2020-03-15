Promise = require('promise');

var UtilsService = require('./UtilsService');
var CypressService = {};

CypressService.execute = testFile => {
    console.log(`CypressService execute start: testFile = ${testFile}`);
    return UtilsService.executeCommand(`./node_modules/cypress-cli/bin/cypress run --spec ${testFile}`);
};

module.exports = CypressService;