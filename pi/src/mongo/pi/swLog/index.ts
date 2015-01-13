/**
 * Handle general switch actions
 */

import mongodb = require('mongodb');
import Db = mongodb.Db;
import Collection = mongodb.Collection;
import pi = require('../index');
import schema = require('../schema');
import ISwConData = schema.ISwConData;
import Switch = schema.Switch;
export import Log = schema.Log;
import ILogConData = schema.ILogConData;

var db: Db;
var coll: Collection;
var queue: Function[] = [];

db = pi.db;
coll = db.collection('swLog');
console.log('+++ Collection "swLog" main module loaded');



export function insert(log: Log, callback: (err) => void) {
    // Insert into mongodb
    coll.insert(log, (err, result) => {
        if (err) return callback(err);

        callback(null);
    });
}