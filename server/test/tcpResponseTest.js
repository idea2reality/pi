var configAll = require('../src/config');
var config = configAll.pi;
var net = require('net');
var async = require('async');
var client;
function connect(callback) {
    client = new net.Socket();
    // Try to connect
    client.connect(config.port, config.ip, function (event) {
        console.log('+++ Raspberry Pi connected');
        // Remove all listeners
        client.removeAllListeners();
        client.on('data', function (data) { return onData(data); });
        callback();
    });
    // Set error listener once
    client.once('error', function (err) {
        console.log('--- Raspberry Pi connection refused');
        // Close socket
        client.destroy();
        // Empty client socket
        client = null;
        callback();
    });
}
exports.connect = connect;
function write(data, callback) {
    // Check callback
    if (callback == undefined)
        callback = function () {
        };
    if (client != null)
        client.write(data, function (err) {
            console.log('@@@ me: ' + data.toJSON());
            callback(err);
        });
    else
        callback(new Error('net socket is closed'));
}
exports.write = write;
function onData(data) {
    console.log('@@@ pi: ' + data.toJSON());
}
connect(function () {
    var tasks = [];
    tasks.push(function (callback) {
        console.log('### Expected request');
        callback(null, null);
    });
    for (var i = 0; i < 4; i++) {
        var j = 1;
        var arr = [];
        var task = function (callback) {
            setTimeout(function () {
                console.log('');
                write(new Buffer([j++]));
                callback(null, null);
            }, 500);
        };
        tasks.push(task);
    }
    tasks.push(function (callback) {
        setTimeout(function () {
            console.log('');
            console.log('');
            console.log('### Actual request');
            callback(null, null);
        }, 50);
    });
    for (var i = 0; i < 4; i++) {
        var k = 1;
        var arr = [];
        var task = function (callback) {
            setTimeout(function () {
                console.log('');
                write(new Buffer(oneArr(k++)));
                callback(null, null);
            }, 500);
        };
        tasks.push(task);
    }
    async.series(tasks, function () {
        setTimeout(function () {
            console.log('');
            console.log('');
            console.log('Close socket');
            client.destroy();
        }, 50);
    });
});
function oneArr(num) {
    var arr = [];
    for (var i = 0; i < num; i++)
        arr.push(1);
    return arr;
}
//# sourceMappingURL=tcpResponseTest.js.map