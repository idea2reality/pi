import async = require('async');
import mongodb = require('mongodb');
import MongoClient = mongodb.MongoClient;

import configAll = require('../../config');
import config = configAll.mongo;

export var db: mongodb.Db;

export function connect(callback: (err) => void) {
    MongoClient.connect('mongodb://localhost:' + config.port + '/' + config.piDbName, (err, _db) => {
        db = _db;

        console.log('+++ Database "pi" is ready');

        callback(err);
    });
}
