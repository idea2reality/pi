import mongodb = require('mongodb');
import MongoClient = mongodb.MongoClient;

import configAll = require('../../config');
import config = configAll.mongo;

export var db: mongodb.Db;

export function connect(callback: (err) => void) {
    MongoClient.connect('mongodb://localhost:' + config.port + '/' + config.piDbName, (err, _db) => {
        console.log('+++ Database "pi" is ready');
        db = _db;

        // Start up mongodb actions
        require('./switch/index');
        callback(err);
    });
}
