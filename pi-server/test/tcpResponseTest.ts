import configAll = require('../src/config');
import config = configAll.pi;
import net = require('net');
import async = require('async');

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

export function write(data: Buffer, callback?: (err) => void) {
    // Check callback
    if (callback == undefined)
        callback = () => { };

    if (client != null)
        client.write(data, (err) => {
            console.log('@@@ me: ' + data.toJSON());
            callback(err);
        });
    else
        callback(new Error('net socket is closed'));
}

function onData(data: Buffer) {
    console.log('@@@ pi: ' + data.toJSON());
}

connect(() => {
    var tasks = [];

    tasks.push((callback) => {
        console.log('### Expected request');
        callback(null, null);
    });

    for (var i = 0; i < 4; i++) {
        var j = 1;

        var arr = [];

        var task = (callback) => {
            setTimeout(() => {
                console.log('');
                write(new Buffer([j++]));
                callback(null, null);
            }, 500);
        };

        tasks.push(task);
    }
    tasks.push((callback) => {
        setTimeout(() => {
            console.log('');
            console.log('');
            console.log('### Actual request');
            callback(null, null);
        }, 50);
    });

    for (var i = 0; i < 4; i++) {
        var k = 1;

        var arr = [];

        var task = (callback) => {
            setTimeout(() => {
                console.log('');
                write(new Buffer(oneArr(k++)));
                callback(null, null);
            }, 500);
        };

        tasks.push(task);
    }

    async.series(tasks, () => {
        setTimeout(() => {
            console.log('');
            console.log('');
            console.log('Close socket');
            client.destroy();
        }, 50);
    });
});

function oneArr(num: number): number[] {
    var arr = []

    for (var i = 0; i < num; i++)
        arr.push(1);

    return arr;
}
