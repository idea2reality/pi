/**
 * Created by Jun on 2015-01-18.
 */
import async = require('async');
import colors = require('colors');
import net = require('net');
import configAll = require('../config');
import config = configAll.pi;

// Load module 'colors'. Typescript does not import actually if module is not used.
colors;

var server:net.Server;
var client:net.Socket;

var isConnected:boolean = false;

export function startServer(callback) {
    server = net.createServer((_client)=> {
        isConnected = true;
        client = _client;

        var address = client.address();
        console.log('+++ Incoming pi client from ' + address.address + ':' + address.port);

        client.write('Welcome', 'ASCII');

        client.on('close', (had_error:boolean)=> {
            if (had_error)
                console.log('--- Tcp client socket closed due to error');
            else
                console.log('+++ Tcp client socket closed successfully');

            isConnected = false;
        });

        client.on('error', (err:Error)=> {
            console.log('--- Tcp client error occurs');
            console.error(err);
        });
    });

    server.listen(config.port, ()=> {
        console.log('+++ Tcp server is now listening on port ' + config.port);
        callback();
    });
}


/**
 * Send tcp request to raspberry pi.
 * Connect to pi when write function is called.
 * After receive response from pi, close socket connection.
 */
export function write(data:Buffer, callback:(err:Error, data:Buffer) => void) {

    // Received data from raspberry pi
    var piData;
    // Write function started time
    var start = new Date();
    // Write function end time
    var end:Date;

    async.series([
            // Is raspberry pi connected?
            function (callback) {
                if (!isConnected)
                    callback(new Error('Raspberry pi is not connected'));
                else
                    callback();
            },

            // Send tcp request to pi
            function (callback) {
                client.write(data, (err) => {
                    console.log('@@@ me: ' + data.toJSON());
                    callback(err);
                });
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
                    console.log('@@@ pi: ' + data.toJSON());

                    isReceived = true;
                    piData = data;

                    callback();
                });
            }
        ],

        function (err, results) {
            if (err) return callback(err, null);

            end = new Date();
            var tookTime = end.getTime() - start.getTime();

            console.log('@@@ Communication with pi took ' + '%dms'.cyan, tookTime);
            callback(null, piData);
        });
}