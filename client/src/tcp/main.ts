/// <reference path="../../scripts/_references.d.ts" />

import net = require('net');
import configAll = require('../config');
import config = configAll.tcp;

// Try to open recursively until connected. Interval 1sec.

var socket:net.Socket;
var isConnected:boolean = false;

export function connect() {
    console.log('=== Tcp socket connecting...');

    socket = new net.Socket();
    socket.connect(config.port, config.ip);

    socket.on('connect', ()=> {
        isConnected = true;
        console.log('+++ Tcp connected');

        if (typeof onConnectListener == 'function')
            onConnectListener();
    });

    socket.on('error', (err)=> {
        console.log('--- Tcp socket error');
        console.log(err);
    });

    socket.on('close', ()=> {
        isConnected = false;
        console.log('--- Tcp socket closed');

        socket.destroy();
        delete socket;

        setTimeout(()=> {
            console.log('=== Reconnecting...');
            connect();
        }, 500);
    });

    socket.on('data', (data:Buffer)=> {
        console.log(data.toJSON());

        if (typeof onDataListener == 'function')
            onDataListener(data);
    });
}

var onDataListener:Function;
export function onData(listener:(data:Buffer)=>void) {
    onDataListener = listener;
}

var onConnectListener:Function;
export function onConnect(listener:()=>void) {
    onConnectListener = listener;
}

export function write(buff:Buffer) {
    if (!isConnected)
        return console.log('--- Cannot write on tcp socket: Socket is closed');

    socket.write(buff);
}