var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var async = require('async');

//MongoClient.connect('mongodb://localhost:27017/pi', { w: 1 }, (err, db) => {
MongoClient.connect('mongodb://localhost:27017/pi', function (err, db) {
    if (err)
        return console.log(err);

    db.collection('test', function (err, coll) {
        if (err)
            return console.log(err);

        var tasks = [];

        tasks.push(function (callback) {
            coll.drop(function (err, result) {
                callback(err, result);
            });
        });

        for (var i = 0; i < 1000000; i++) {
            var insertFn = function (callback) {
                coll.insert({ num: i }, function (err, result) {
                    callback(err, result);
                });
            };

            tasks.push(insertFn);
        }

        tasks.push(function (callback) {
            coll.count(function (err, result) {
                console.log(result);
                callback(err, result);
            });
        });

        async.series(tasks);
    });
});
//# sourceMappingURL=writeConcernTest.js.map
