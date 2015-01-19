/// <reference path="../scripts/_references.ts" />

import path = require('path');

module config {
    export var web = {
        port: 80,
        bowerFolder: path.resolve(__dirname, '../../web/bower_components'),
        distFolder: path.resolve(__dirname, '../../web/dist')
    };

    export var mongo = {
        port: 27017,
        piDbName: 'pi'
    };

    export var pi = {
        ip: 'localhost',
        port: 9090,
        responseTimeout: 1000
    }
}

export = config;
