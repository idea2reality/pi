import configAll = require('../config');
import config = configAll.pi;
import net = require('net');

var client: net.Socket;

export function connect(callback: () => void) {
    client = new net.Socket();
    // Try to connect
    client.connect(config.port, config.ip, (event) => {
        console.log('+++ Raspberry Pi connected');
        // Remove all listeners
        client.removeAllListeners();
        client.on('data', (data) => onData(data));

        callback();
    });
    // Set error listener once
    client.once('error', (err: Error) => {
        console.log('--- Raspberry Pi connection refused');
        // Close socket
        client.destroy();
        // Empty client socket
        client = null;

        callback();
    });
}

export function write(data, callback: (err) => void) {
    if (client != null)
        client.write(data, (err) => {
            callback(err);
        });
    else
        callback(new Error('net socket is closed'));
}

function onData(data) {
    console.log('*** pi: ' + data);
}