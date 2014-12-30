import path = require('path');

module config {
    export var web = {
        bowerFolder: path.join(__dirname, '../../webApp/bower_components')
    };
}

export = config;