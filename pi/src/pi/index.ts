import configAll = require('../config');
import config = configAll.pi;
import net = require('net');

var client;

export function connect(callback: () => void) {
    client = new net.Socket();
    // Try to connect
    client.connect(config.port, config.ip, (event) => {
        console.log('+++ Raspberry Pi connected');
        callback();
    });
    // Set connection timeout
    setTimeout(() => {
        client.destroy();
        client = null;

        console.log('--- Raspberry Pi connection fail');

        callback();
    }, 3000);
}

export function write(data, callback: (err) => void) {
    if (client != null)
        client.write(data, (err) => {
            callback(err);
        });
    else
        callback(new Error('net socket is closed'));
}