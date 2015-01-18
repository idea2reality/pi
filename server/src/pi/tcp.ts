/**
 * Created by Jun on 2015-01-18.
 */

import net = require('net');
import configAll = require('../config');
import config = configAll.pi;

var server:net.Server;

var isConnected:boolean = false;

export function startServer(callback) {
    server = net.createServer((client)=> {
        isConnected = true;
        var address = client.address();
        console.log('+++ Incoming pi client from ' + address.address + ':' + address.port);

        client.write('Welcome', 'ASCII');

        client.on('data', (data)=> {
            console.log('@@@ pi: ' + data.toJSON());
            client.write(new Buffer([1]));
        })
    });

    server.listen(config.port, ()=> {
        console.log('+++ Tcp server is now listening on port ' + config.port);
        testClient();
        callback();
    });
}


function testClient() {
    var client = new net.Socket();

    // Set error listener once
    client.once('error', (err:Error) => {
        console.log('--- Raspberry Pi connection refused');
        // Close socket
        client.destroy();
        // Empty client socket
        client = null;
    });

    // Try to connect
    client.connect(config.port, 'localhost', (event) => {
        console.log('+++ Raspberry Pi connected');
        // Remove all listeners
        client.removeAllListeners();

        client.write(new Buffer([1, 2, 3]));

        client.on('data', (data)=> {
            console.log('@@@ server: ' + data.toString('ASCII'));
        })
    });
}