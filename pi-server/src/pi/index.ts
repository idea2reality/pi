import colors = require('colors');
import async = require('async');
import configAll = require('../config');
import config = configAll.pi;
import net = require('net');
var ping = require('ping');

// Load module 'colors'. Typescript does not import actually if module is not used.
colors;

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

    async.series([
        // Connect raspberry pi
        function (callback) {
            console.log('=== Checking raspberry pi is alive...');
            // Check pi is alive
            ping.sys.probe(configAll.pi.ip, (isAlive: boolean) => {
                if (isAlive) {
                    console.log('+++ Raspberry Pi is alive');
                    console.log('=== Connecting to raspberry pi...');
                    // Connect pi
                    connect((err) => {
                        callback(err);
                    });
                } else {
                    console.log('--- Raspberry Pi is dead');
                    callback(new Error('Raspberry pi is dead'));
                }
            });
        },

        // If there is no error on connection, send tcp request to pi
        function (callback) {
            if (client != null)
                client.write(data, (err) => {
                    console.log('@@@ me: ' + data.toJSON());
                    callback(err);
                });
            else
                callback(new Error('net socket is closed'));
        },

        // Receive response from pi
        function (callback) {
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
        },

        // Close connection
        function (callback) {
            client.destroy();
            client = null;

            callback(null);
        }
    ], function (err, results) {
            if (err) return callback(err, null);

            end = new Date();
            var tookTime = end.getTime() - start.getTime();

            console.log('@@@ Communication with pi took ' + '%dms'.cyan, tookTime);
            callback(null, piData);
        });
}