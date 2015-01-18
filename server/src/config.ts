/// <reference path="../scripts/_references.ts" />

import path = require('path');

module config {
    export var web = {
        port: 80,
        bowerFolder: path.resolve(__dirname, '../../pi-web/bower_components'),
        distFolder: path.resolve(__dirname, '../../pi-web/dist')
    };

    export var mongo = {
        port: 27017,
        piDbName: 'pi'
    };

    export var pi = {
        ip: '192.168.137.10',
        port: 9090,
        responseTimeout: 1000
    }
}

export = config;
