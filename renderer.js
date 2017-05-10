// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var path = require('path');
const notifier = require('node-notifier');
var nc = new notifier.NotificationCenter();

var trueAnswer = 'Most def.';


    nc.notify(
      {
        title: 'Notifications',
        message: 'Do you want to reply to them?',
        sound: 'Glass',
        icon: path.join(__dirname, 'slack_icon.png'),
        reply: true,
      },
      function(err, response, metadata) {
        if (err) throw err;
        console.log(metadata);
      }
    );

nc.on('replied', function(obj, options, metadata) {
  console.log('User replied', metadata);
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("basic").addEventListener("click", doNotify);
  document.getElementById("image").addEventListener("click", doNotify);
})