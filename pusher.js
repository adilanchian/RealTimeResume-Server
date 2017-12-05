const Pusher = require('pusher');
const config = require('./config.json')

var pusher = new Pusher(config.pusher.init);

module.exports = {
    updateResume: function(resume, commits) {
        console.log('Sending event to pusher channel.');
        pusher.trigger(config.pusher.channel_details.channel, config.pusher.channel_details.event, {
            'html': resume,
            'commits': commits
        }, function(error, request, response) {
            if (error) console.log('Pusher Error: '+error);
        });

        console.log('Resume sent to component.');
    }
}
