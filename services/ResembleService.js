var fs = require('fs');
var resemblejsCompare = require('resemblejs').compare;
Promise = require('promise');

var ResembleService = {};

ResembleService.compare = (execution) => {
    return new Promise((resolve, reject) => {
        const options = {};
        resemblejsCompare(execution.beforeImgUri, execution.afterImgUri, options, function (err, data) {
            if (err) reject(err);                                
            fs.writeFile(`public/images/${execution.timestamp}/comparation.png`, data.getBuffer(), (err) => {                
                if (err) reject(err);
                execution.comparation = data;
                execution.comparationImgUri = `public/images/${execution.timestamp}/comparation.png`;
                resolve(execution);
            });
        });
    });
}

module.exports = ResembleService;