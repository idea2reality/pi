/// <reference path="../scripts/_references.ts" />
var async = require('async');

var mongo = require('../src/mongo/index');
var swColl = require('../src/mongo/pi/switch/index');
var schema = require('../src/mongo/pi/schema');
var Switch = schema.Switch;

/**
* Execute dump tasks as series
*/
async.series([
    function (callback) {
        /**
        * Connect mongodb
        */
        mongo.connect(function (err) {
            callback(err);
        });
    },
    function (callback) {
        /**
        * Drop "switch" collection
        */
        console.log('=== Drop collection "switch"');

        swColl.drop(function (err) {
            // Ignore error. Maybe there is no "switch" collection.
            callback(null);
        });
    },
    function (callback) {
        /**
        * Insert siwtches into db
        */
        console.log('=== Insert switches');

        var sw1 = new Switch({
            name: 'Switch 1',
            gid: 1,
            did: 250,
            tcp: {
                on: 1,
                off: 3
            }
        });

        var sw2 = new Switch({
            name: 'Switch 2',
            gid: 2,
            did: 250,
            tcp: {
                on: 2,
                off: 4
            }
        });

        // Insert each switch as series task
        async.eachSeries([sw1, sw2], function (sw, callback) {
            swColl.insert(sw, function (err) {
                callback(err);
            });
        }, function (err) {
            callback(err);
        });
    },
    function (callback) {
        /**
        * Show inserted switches so that I can check switches inserted correctly
        */
        swColl.list(function (err, sws) {
            if (err)
                return callback(err);
            console.log('=== List of inserted siwtches');
            console.log(sws);
            callback(null);
        });
    }
], function (err, results) {
    if (err)
        console.log(err);
    console.log('Dump finish');
    process.exit(0);
});
//# sourceMappingURL=dump.js.map
