import async = require('async');
import configAll = require('../config');
import config = configAll.pi;
import net = require('net');
var ping = require('ping');

var client: net.Socket;

function onData(data: Buffer) {
    console.log('@@@ pi: ' + data.toJSON());
}

function connect(callback: (err: Error) => void) {
    client = new net.Socket();

    // Set error listener once
    client.once('error', (err: Error) => {
        console.log('--- Raspberry Pi connection refused');
        // Close socket
        client.destroy();
        // Empty client socket
        client = null;

        callback(new Error('Raspberry pi server is closed'));
    });

    // Try to connect
    client.connect(config.port, config.ip, (event) => {
        console.log('+++ Raspberry Pi connected');
        // Remove all listeners
        client.removeAllListeners();

        callback(null);
    });
}

/**
 * Send tcp request to raspberry pi.
 * Connect to pi when write function is called.
 * After receive response from pi, close socket connection.
 */
export function write(data: Buffer, callback: (err: Error, data: Buffer) => void) {
    // Series tasks
    var tasks = [];
    // Recieved data from raspberry pi
    var piData;
    // Write function started time
    var start = new Date();
    // Write function end time
    var end: Date;

    // Connect raspberry pi
    tasks.push((callback) => {
        // Check pi is alive
        ping.sys.probe(configAll.pi.ip, (isAlive: boolean) => {
            if (isAlive) {
                console.log('+++ Raspberry Pi is alive');
                // Connect pi
                connect((err) => {
                    callback(err);
                });
            } else {
                console.log('--- Raspberry Pi is dead');
                callback(null);
            }
        });
    });

    // If there is no error on connection, send tcp request to pi
    tasks.push((callback) => {
        if (client != null)
            client.write(data, (err) => {
                console.log('@@@ me: ' + data.toJSON());
                callback(err);
            });
        else
            callback(new Error('net socket is closed'));
    });

    // Receive response from pi
    tasks.push((callback) => {
        var isReceived = false;

        // Set timeout
        setTimeout(() => {
            if (isReceived == false)
                callback(new Error('Raspberry pi response timeout'));
        }, config.responseTimeout);
        // Receive data from pi once
        client.once('data', (data) => {
            onData(data);
            isReceived = true;
            piData = data;

            callback(null);
        });
    });

    // Close connection
    tasks.push((callback) => {
        client.destroy();
        client = null;

        callback(null);
    });

    // Run tasks as series
    async.series(tasks, (err, results) => {
        if (err) return callback(err, null);

        end = new Date();
        console.log('@@@ Request took ' + (end.getTime() - start.getTime()) + 'ms');
        callback(null, piData);
    });
}