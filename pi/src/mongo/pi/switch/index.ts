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
    coll.drop((err, result) => {
        callback(err);
    });
}



export function startUp(_db: Db, callback: (err: Error) => void) {
    db = _db;

    db.collection('switch', (err, _coll) => {
        if (err) return callback(err);
        // Store collection on variable
        coll = _coll;
        // Give collection to modules
        while (queue.length)
            queue.pop()(coll);

        console.log('+++ Collection "switch" is ready');

        callback(null);
    });
}



export function getCollection(callback: (coll: Collection) => void) {
    if (coll != undefined)
        callback(coll);
    else
        queue.push(callback);
}


import switchFns = require('./switch');
export var sw = switchFns;