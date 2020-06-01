const five = require('johnny-five');
const WebSocket = require('ws');
const express = require('express');
const app = express();
const port = 5000;

const wss = new WebSocket.Server({ port: 8080 });

app.use('/', express.static('public'));
app.listen(port, () => `listening on port ${port}`);


five.Board().on('ready', main);



function main() {
    const led = setLed();
    listenForChanges(led);
}


function setLed() {
    const led = new five.Led.RGB({
        pins: {
            red: 11,
            blue: 10,
            green: 9,
        }
    });

    led.on();
    led.color('#FFFFFF');
    return led;
}


function listenForChanges(led) {
    wss.on('connection', socket => {
        console.log('socket connected..');
        socket.on('message', color => {
            console.log(color);
            led.color(color);
        });
    });
}
