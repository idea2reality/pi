import path = require('path');

module config {
    export var web = {
        bowerFolder: path.resolve(__dirname, '../../webApp/bower_components'),
        distFolder: path.resolve(__dirname, '../../webApp/dist')
    };
}

export = config;