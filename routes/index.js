const routes = require('express').Router();
const git = require('./git');
const fs = require('fs');

routes.use('/git', git);
routes.get('/', function(request, response) {
    var html;
    var commits;
    // Check to see if resume is on Server //
    fs.readFile('./resume/resume.html', function(error, data) {
        if (!error) {
            html = data.toString();
        } else {
            if (error.code === 'ENOENT') {
                console.log('Resume is not here yet!');
                html = '<h3>Add your resume.docx to Github to get started!</h3>';
            } else {
                console.log(error);
            }
        }

        fs.readFile('./resume/commits.txt', function(error, data) {
            if (!error) {
                commits = data.toString();
            } else {
                if (error.code === 'ENOENT') {
                    console.log('No Commits.');
                    commits = [];
                } else {
                    console.log(error);
                }
            }

            response.header("Access-Control-Allow-Origin", "*");
            response.status(200).json({
                resume: html,
                commits: commits,
                message: 'Connected to server'
            });
        });
    });
});

module.exports = routes;
