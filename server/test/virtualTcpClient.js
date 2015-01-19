/// <reference path="../scripts/_references.ts" />
/**
 * Created by Jun on 2015-01-19.
 */
var net = require('net');
var configAll = require('../src/config');
var config = configAll.pi;
// Try to connect recursively until connected. Interval 1sec.
var socket = new net.Socket();
function connect() {
    console.log('Connecting...');
    socket.connect(config.port, config.ip);
}
socket.on('connect', function () {
    console.log('Connected');
});
socket.on('error', function (err) {
    console.log(err);
});
socket.on('close', function () {
    socket.destroy();
    setTimeout(function () {
        console.log('Reconnecting');
        connect();
    }, 1000);
});
socket.on('data', function (data) {
    console.log(data.toJSON());
    socket.write(new Buffer([1]));
});
connect();
//# sourceMappingURL=virtualTcpClient.js.map