const webhook = require('express').Router();
const request = require('request');
const mammoth = require('mammoth');
const fs = require('fs');
const pusher = require('../../pusher.js');
const config = require('../../config.json');
const path = 'resume.docx';

module.exports = (req, res) => {
    // Retrieve URL of document to download and do some fanciness //
    var resumePartial = JSON.stringify(req.body.repository.contents_url);
    var resumeUrl = resumePartial.replace('{+path}', path);
    resumeUrl = resumeUrl.replace(/["']/g, "");

    // Setup options to download resume document from Github //
    var options = {
        url: resumeUrl,
        headers: {
            'User-Agent': config.webhook.userAgent
        }
    };

    // Write all commits to file //
    var commits = JSON.stringify(req.body.commits);

    writeCommitsToFile(commits);

    request(options, (error, response, data) => {

        if (!error && response.statusCode == 200) {
            var content = JSON.parse(data);

            // Get the final url to download resume //
            var docxUrl = content.download_url;

            createHTML(docxUrl, commits);

            res.status(200).json({
                status: 200,
                message: 'Created resume on server.'
            });
        }
    });
}

//-- Helpers --//
var createHTML = function(url, commits) {
    console.log('Creating HTML file.');

    request(url).pipe(fs.createWriteStream('./resume/resume.docx')
    .on('finish', function() {
        console.log('Resume downloaded.');

        mammoth.convertToHtml({path: './resume/resume.docx'})
        .then(function(result) {
            var value = result.value;

            // Write data to file //
            fs.writeFile('./resume/resume.html', value, (error) => {
                if (error) {
                    console.log('Error writing resume html to file: '+error);
                } else {
                    console.log('Writing resume to html file was successful.');
                }
            });

            // Send pusher request //
            pusher.updateResume(value, commits);
        }).done();
    }));
}

var writeCommitsToFile = function(commits) {
    // Write data to file //
    fs.writeFile('./resume/commits.txt', commits, (error) => {
        if (error) {
            console.log('Error writing commits to file: '+error);
        } else {
            console.log('Writing commits to file was successful.');
        }
    });
}
