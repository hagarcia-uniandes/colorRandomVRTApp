// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// models
var Execution = require('./models/Execution');

// configuration =================    
var mongoUri = process.env.MONGODB_URI || "mongodb://heroku_gd96f7jm:zu6v9PJkFb7m2U!@ds111489.mlab.com:11489/heroku_gd96f7jm";

mongoose.connect(mongoUri, function (err, res) {
    if (err) {
        console.log('ERROR connecting');
    } else {
        console.log('Succeeded connected');
    }
})
    .catch(err => console.log(err));

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access_token');
    next();
});

var executionRouter = require('./controllers/ExecutionController')(Execution);

app.use('/api/execution', executionRouter);

app.get('*', function (req, res) {
    res.sendfile('./piublic/index.html');
});

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log("App listening on port 8080");
