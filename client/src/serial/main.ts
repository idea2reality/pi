import async = require('async');

import configAll = require('./../config');
import config = configAll.serial;

var isOpen:boolean = false;

var SerialPort = require('serialport').SerialPort;

var serialPort;

export function open() {
    console.log('=== Serial port connecting...');

    serialPort = new SerialPort(config.port, {
        baudrate: config.baudrate
    });

    serialPort.on('open', () => {
        isOpen = true;
        console.log('+++ Serial port open on "%s"', config.port);
    });

    serialPort.on('error', (err)=> {
        isOpen = false;
        console.log('--- Serial port error');
        console.log(err);

        reopen();
    });

    serialPort.on('close', () => {
        isOpen = false;
        console.log('--- Serial port closed');

        reopen();
    });
}

function reopen() {
    setTimeout(open, config.reopenPeriod);
}

export function write(buff:Buffer, callback:(err:Error)=>void) {
    async.series([
            // Check is serial open
            function (callback) {
                if (isOpen)
                    callback();
                else
                    callback(new Error('Serial port is closed'));
            },
            // Send message to serial
            function (callback) {
                serialPort.write(buff, (err)=> {
                    callback(err);
                })
            }
        ],
        (err, results)=> {
            if (err)return callback(err);
            callback(null);
        }
    );
}
