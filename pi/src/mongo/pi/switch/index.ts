/**
 * Handle general switch actions
 */

import mongodb = require('mongodb');
import Db = mongodb.Db;
import Collection = mongodb.Collection;
import pi = require('../index');
import schema = require('../schema');
import SwitchConstructorData = schema.ISwConData;
import Switch = schema.Switch;

var db: Db;
var coll: Collection;
var queue: Function[] = [];

db = pi.db;
coll = db.collection('switch');
console.log('+++ Collection "switch" main module loaded');

export function insert(data: SwitchConstructorData, callback: (err) => void) {
    // Create new switch object
    var sw = new Switch(data);
    // Insert into mongodb
    coll.insert(sw, (err, result) => {
        if (err) return callback(err);

        callback(null);
    });
}



export function list(callback: (err, sws: Switch[]) => void) {
    coll.find().toArray((err, results) => {
        callback(err, results);
    });
}



export function drop(callback: (err) => void) {
    db.dropCollection('switch', (err, result) => {
        callback(err);
    });
}



import switchFns = require('./switch');
export var sw = switchFns;