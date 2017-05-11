// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer;
const notifier = require('node-notifier');

const trayBtn = document.getElementById('put-in-tray')
let trayOn = false


trayBtn.addEventListener('click', function (event) {
  if (trayOn) {
    trayOn = false
    ipc.send('remove-tray')
  } else {
    trayOn = true
    ipc.send('put-in-tray')
  }
})

// Tray removed from context menu on icon
ipc.on('tray-removed', function () {
  ipc.send('remove-tray')
  trayOn = false
})

const sendNotification = () => {
  notifier.notify({
    title: 'Water Time!!',
    message: 'Looks like its time to finish another glass of water',
    //icon: path.join(__dirname, 'app/images/slack_icon.png'), // Absolute path (doesn't work on balloons)
    sound: true, // Only Notification Center or Windows Toasters
    wait: true // Wait with callback, until user action is taken against notification
  }, function (err, response) {
    // Response is response from notification
  });
}

document.addEventListener('DOMContentLoaded', function () {
  trayOn = true;
  ipc.send('put-in-tray');
  sendNotification();
})