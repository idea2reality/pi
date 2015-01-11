import async = require('async');
import mongodb = require('mongodb');
import MongoClient = mongodb.MongoClient;

import configAll = require('../../config');
import config = configAll.mongo;

import switchColl = require('./switch/index');

export var db: mongodb.Db;

export function connect(callback: (err) => void) {
    MongoClient.connect('mongodb://localhost:' + config.port + '/' + config.piDbName, (err, _db) => {
        db = _db;

        // Start up mongodb actions
        var tasks = [];

        tasks.push((callback) => {
            switchColl.startUp(db, (err) => {
                callback(err);
            });
        });

        async.parallel(tasks, (err, results) => {
            console.log('+++ Database "pi" is ready');
            callback(err);
        });
    });
}
