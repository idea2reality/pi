/// <reference path="../scripts/_references.d.ts" />

import path = require('path');

module config {
    export var tcp = {
        ip: 'ktj7147.iptime.org',
        port: 9090
    };

    export var serial = {
        port: '/dev/ttyUSB0',
        baudrate: 9600,
        reopenPeriod: 1000
    }
}

export = config;
