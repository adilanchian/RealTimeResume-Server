const git = require('express').Router();
const webhook = require('./webhook');

git.get('/', function(request, response) {
    response.status(200).json({
        message: 'Connected to git route'
    });
});

git.post('/webhook', webhook);

module.exports = git;
