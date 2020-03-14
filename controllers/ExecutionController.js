Promise = require('promise');

var express = require('express');

var ExecutionService = require('./../services/ExecutionService');

var routes = function (Execution) {
    var executionRouter = express.Router();

    executionRouter.route('/')
        .get(function (req, res) {
            Execution.find(function (err, executions) {
                if (err) res.send(err)
                res.json(executions);
            });
        })
        .post(function (req, res) {
            ExecutionService.createExecution()
                .then(execution => res.status(200).send(execution))
                .catch(err => res.status(500).send(err));
        });

    return executionRouter;
};

module.exports = routes;