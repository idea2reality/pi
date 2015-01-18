import mongodb = require('mongodb');
import MongoClient = mongodb.MongoClient;
import async = require('async');

//MongoClient.connect('mongodb://localhost:27017/pi', { w: 1 }, (err, db) => {
MongoClient.connect('mongodb://localhost:27017/pi', (err, db) => {
    if (err) return console.log(err);

    db.collection('test', (err, coll) => {
        if (err) return console.log(err);

        var tasks = [];

        tasks.push((callback) => {
            coll.drop((err, result) => {
                callback(err, result);
            });
        });

        for (var i = 0; i < 1000000; i++) {
            var insertFn = (callback) => {
                coll.insert({ num: i }, (err, result) => {
                    callback(err, result);
                });
            };

            tasks.push(insertFn);
        }

        tasks.push((callback) => {
            coll.count((err, result) => {
                console.log(result);
                callback(err, result);
            });
        });

        async.series(tasks);
    });
});