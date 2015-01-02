import path = require('path');

module config {
    export var web = {
        port: 80,
        bowerFolder: path.resolve(__dirname, '../../webApp/bower_components'),
        distFolder: path.resolve(__dirname, '../../webApp/dist')
    }

    export var mongo = {
        port: 27017,
        piDbName: 'pi'
    }

    export var pi = {

    }
}

export = config;